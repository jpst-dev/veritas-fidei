/**
 * Busca no texto dos artigos, feita no navegador sobre /busca.json (gerado no build).
 * São poucas dezenas de artigos: uma varredura simples com pesos basta e não pede biblioteca.
 */

/** Um artigo como vem de /busca.json. */
export interface DocBusca {
  path: string
  title: string
  description: string
  texto: string
  tema: string
  secao: string
  status: string
  minutos?: number
  nivel?: string
}

interface DocIndexado extends DocBusca {
  tituloN: string
  descricaoN: string
  textoN: string
}

/** Pedaço de trecho; `marca` indica a palavra procurada. */
export interface ParteTrecho {
  texto: string
  marca: boolean
}

export interface Resultado extends DocBusca {
  trecho: ParteTrecho[]
}

/** Sem acentos e em minúsculas, preservando o comprimento (o texto vem em NFC). */
const normalizar = (t: string) => t.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase()

export function prepararIndice(docs: DocBusca[]): DocIndexado[] {
  return docs.map((d) => {
    const title = d.title.normalize('NFC')
    const description = d.description.normalize('NFC')
    const texto = d.texto.normalize('NFC')
    return { ...d, title, description, texto, tituloN: normalizar(title), descricaoN: normalizar(description), textoN: normalizar(texto) }
  })
}

/** Termos da consulta, normalizados; letras soltas ("a", "e") não ajudam e ficam de fora. */
export function termosDaBusca(consulta: string): string[] {
  return normalizar(consulta).split(/[^\p{L}\d]+/u).filter((t) => t.length >= 2)
}

/** Formas aceitas de um termo: "batismos" também acha "batismo". */
const variantes = (termo: string) => (termo.length > 4 && termo.endsWith('s') ? [termo, termo.slice(0, -1)] : [termo])

const letra = /[\p{L}\d]/u

/** Ocorrências do termo no começo de uma palavra ("fe" acha "fé", mas não "refere"). */
function contar(texto: string, termo: string): number {
  let n = 0
  for (let i = texto.indexOf(termo); i !== -1; i = texto.indexOf(termo, i + 1)) {
    if (i === 0 || !letra.test(texto[i - 1]!)) n++
  }
  return n
}

const primeiraOcorrencia = (texto: string, termo: string) => {
  for (let i = texto.indexOf(termo); i !== -1; i = texto.indexOf(termo, i + 1)) {
    if (i === 0 || !letra.test(texto[i - 1]!)) return i
  }
  return -1
}

/** Pontos de um termo no artigo: título vale mais que resumo, que vale mais que o texto. */
function pontos(d: DocIndexado, termo: string): number {
  return Math.max(
    ...variantes(termo).map((v) => contar(d.tituloN, v) * 10 + contar(d.descricaoN, v) * 4 + Math.min(contar(d.textoN, v), 10)),
  )
}

/** Trecho de até ~220 caracteres em torno da primeira ocorrência, com a palavra marcada. */
function trecho(original: string, normalizado: string, termos: string[]): ParteTrecho[] {
  const formas = termos.flatMap(variantes)
  const posicoes = formas.map((f) => primeiraOcorrencia(normalizado, f)).filter((i) => i !== -1)
  const primeira = posicoes.length ? Math.min(...posicoes) : 0

  let inicio = Math.max(0, primeira - 70)
  let fim = Math.min(original.length, primeira + 150)
  // Corta em palavra inteira
  if (inicio > 0) inicio = original.indexOf(' ', inicio) + 1 || inicio
  if (fim < original.length) fim = original.lastIndexOf(' ', fim) > primeira ? original.lastIndexOf(' ', fim) : fim

  // Marca as palavras que começam com um dos termos ("Lutero", "Transubstanciação")
  const partes: ParteTrecho[] = []
  const palavra = /[\p{L}\d]+/gu
  const pedaco = original.slice(inicio, fim)
  const pedacoN = normalizado.slice(inicio, fim)
  let ultimo = 0
  for (const m of pedacoN.matchAll(palavra)) {
    if (!formas.some((f) => m[0].startsWith(f))) continue
    if (m.index > ultimo) partes.push({ texto: pedaco.slice(ultimo, m.index), marca: false })
    partes.push({ texto: pedaco.slice(m.index, m.index + m[0].length), marca: true })
    ultimo = m.index + m[0].length
  }
  if (ultimo < pedaco.length) partes.push({ texto: pedaco.slice(ultimo), marca: false })

  if (inicio > 0) partes.unshift({ texto: '…', marca: false })
  if (fim < original.length) partes.push({ texto: '…', marca: false })
  return partes
}

/** Artigos com todos os termos, do mais relevante ao menos. */
export function buscar(indice: DocIndexado[], consulta: string): Resultado[] {
  const termos = termosDaBusca(consulta)
  if (!termos.length) return []

  return indice
    .map((d) => {
      const porTermo = termos.map((t) => pontos(d, t))
      return { d, total: porTermo.every((p) => p > 0) ? porTermo.reduce((a, b) => a + b, 0) : 0 }
    })
    .filter((r) => r.total > 0)
    .sort((a, b) => b.total - a.total || a.d.title.localeCompare(b.d.title, 'pt-BR'))
    .map(({ d }) => {
      const noResumo = termos.flatMap(variantes).some((f) => primeiraOcorrencia(d.descricaoN, f) !== -1)
      const { tituloN, descricaoN, textoN, ...doc } = d
      return { ...doc, trecho: noResumo ? trecho(d.description, descricaoN, termos) : trecho(d.texto, textoN, termos) }
    })
}

type No = string | [string, Record<string, unknown>, ...No[]]

/** Texto corrido de um corpo minimark do Nuxt Content (títulos, parágrafos, listas, citações). */
export function textoPlano(corpo: { value?: unknown[] } | undefined): string {
  const partes: string[] = []
  const visitar = (no: No) => {
    if (typeof no === 'string') return partes.push(no)
    const [tag, , ...filhos] = no
    if (tag === 'style' || tag === 'script') return
    const bloco = /^(h\d|p|li|blockquote|td|th|pre)$/.test(tag)
    if (bloco) partes.push(' ')
    filhos.forEach(visitar)
    if (bloco) partes.push(' ')
  }
  ;(corpo?.value as No[] | undefined)?.forEach(visitar)
  return partes.join('').replace(/\s+/g, ' ').trim()
}
