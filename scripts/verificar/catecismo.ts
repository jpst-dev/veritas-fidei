import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

const BASE = 'https://www.vatican.va/archive/cathechism_po/index_new/'

/** Páginas do texto oficial em português no vatican.va, com a faixa de parágrafos de cada uma. */
const PAGINAS: [inicio: number, fim: number, arquivo: string][] = [
  [1, 25, 'prologo%201-25_po.html'],
  [26, 49, 'p1s1c1_26-49_po.html'],
  [50, 141, 'p1s1c2_50-141_po.html'],
  [142, 184, 'p1s1c3_142-184_po.html'],
  [185, 197, 'p1s2_185-197_po.html'],
  [198, 421, 'p1s2c1_198-421_po.html'],
  [422, 682, 'p1s2cap2_422-682_po.html'],
  [683, 1065, 'p1s2cap3_683-1065_po.html'],
  [1066, 1075, 'p2s1cap1_1066-1075_po.html'],
  [1076, 1134, 'p2s1cap1_1076-1134_po.html'],
  [1135, 1209, 'p2s1cap2_1135-1209_po.html'],
  [1210, 1419, 'p2s2cap1_1210-1419_po.html'],
  [1420, 1532, 'p2s2cap1_1420-1532_po.html'],
  [1533, 1666, 'p2s2cap3_1533-1666_po.html'],
  [1667, 1690, 'p2s2cap4_1667-1690_po.html'],
  [1691, 1698, 'p3-intr_1691-1698_po.html'],
  [1699, 1876, 'p3s1cap1_1699-1876_po.html'],
  [1877, 1948, 'p3s1cap2_1877-1948_po.html'],
  [1949, 2051, 'p3s1cap3_1949-2051_po.html'],
  [2052, 2082, 'p3s2-intr_2052-2082_po.html'],
  [2083, 2195, 'p3s2cap1_2083-2195_po.html'],
  [2196, 2557, 'p3s2cap2_2196-2557_po.html'],
  [2558, 2565, 'p4-intr_2558-2565_po.html'],
  [2566, 2649, 'p4s1cap1_2566-2649_po.html'],
  [2650, 2696, 'p4s1cap2_2650-2696_po.html'],
  [2697, 2758, 'p4s1cap3_2697-2758_po.html'],
  [2759, 2865, 'p4s2_2759-2865_po.html'],
]

export function urlDoParagrafo(n: number): string | undefined {
  const pagina = PAGINAS.find(([inicio, fim]) => n >= inicio && n <= fim)
  return pagina ? BASE + pagina[2] : undefined
}

const ACENTOS: Record<string, string> = {
  acute: '́', grave: '̀', circ: '̂', tilde: '̃', uml: '̈', cedil: '̧',
}
const ENTIDADES: Record<string, string> = {
  nbsp: ' ', amp: '&', quot: '"', laquo: '«', raquo: '»', lsquo: '‘', rsquo: '’', ldquo: '“',
  rdquo: '”', hellip: '…', ndash: '–', mdash: '—', ordm: 'º', ordf: 'ª', deg: '°', sect: '§',
}

export function decodificarEntidades(html: string): string {
  return html
    .replace(/&([a-zA-Z])(acute|grave|circ|tilde|uml|cedil);/g, (_, letra, acento) => letra + ACENTOS[acento])
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&([a-z]+);/g, (todo, nome) => ENTIDADES[nome] ?? todo)
    .normalize('NFC')
}

/** Texto de um parágrafo do Catecismo a partir do HTML da página oficial. */
export function extrairParagrafo(html: string, n: number): string | undefined {
  // O número vem como "<b>1374.</b>" ou, em algumas páginas, "<b>1210</b>."
  const inicio = html.search(new RegExp(`<b>\\s*${n}\\s*\\.?\\s*</b>`))
  if (inicio < 0) return undefined
  const resto = html.slice(inicio)
  const proximo = resto.slice(1).search(/<b>\s*\d+\s*\.?\s*<\/b>/)
  const trecho = proximo < 0 ? resto : resto.slice(0, proximo + 1)
  return decodificarEntidades(trecho.replace(/<[^>]+>/g, ' '))
    .replace(/^\s*\d+\s*\.\s*/, '')
    .replace(/\s+/g, ' ')
    .trim()
}

/**
 * Normaliza para comparar citações: sem caixa, acentos, pontuação, aspas nem
 * notas "(203)". O texto do vatican.va é de Portugal; as consoantes mudas
 * (acção, baptismo, objecto) caem para comparar com a grafia brasileira.
 */
export function normalizar(texto: string): string {
  return texto
    .normalize('NFC')
    .toLowerCase()
    .replace(/\(\d+\)/g, ' ')
    .replace(/[cp](?=[çt])/g, '')
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .trim()
}

/**
 * Confere se a citação está no texto oficial. Reticências separam trechos
 * omitidos; cada trecho com 3 palavras ou mais precisa aparecer na fonte.
 */
export function trechosAusentes(citacao: string, fonte: string): string[] {
  const alvo = normalizar(fonte)
  return citacao
    .split(/\[?(?:\.\.\.|…)\]?/)
    .map((t) => t.trim())
    .filter((t) => normalizar(t).split(' ').length >= 3)
    .filter((t) => !alvo.includes(normalizar(t)))
}

const CACHE = join(process.cwd(), 'node_modules', '.cache', 'veritas-cic')

/** Baixa (uma vez) e devolve o texto dos parágrafos pedidos, em ordem. */
export async function textoDoCatecismo(inicio: number, fim = inicio): Promise<string | undefined> {
  const partes: string[] = []
  for (let n = inicio; n <= fim; n++) {
    const url = urlDoParagrafo(n)
    if (!url) return undefined
    const arquivo = join(CACHE, url.split('/').pop()!)
    let html: string
    try {
      html = await readFile(arquivo, 'utf8')
    } catch {
      const resposta = await fetch(url)
      if (!resposta.ok) throw new Error(`vatican.va respondeu ${resposta.status} para ${url}`)
      // As páginas antigas do vatican.va são ISO-8859-1
      html = new TextDecoder('latin1').decode(await resposta.arrayBuffer())
      await mkdir(CACHE, { recursive: true })
      await writeFile(arquivo, html)
    }
    const paragrafo = extrairParagrafo(html, n)
    if (paragrafo) partes.push(paragrafo)
  }
  return partes.join(' ')
}
