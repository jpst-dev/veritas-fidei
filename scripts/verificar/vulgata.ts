import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { LIVROS } from './biblia.ts'
import { decodificarEntidades } from './catecismo.ts'

const BASE = 'https://www.vatican.va/archive/bible/nova_vulgata/documents/'

/** Página de cada livro na Nova Vulgata do vatican.va, pela sigla da CNBB. */
const PAGINAS: Record<string, string> = {
  Gn: 'vt_genesis', Ex: 'vt_exodus', Lv: 'vt_leviticus', Nm: 'vt_numeri', Dt: 'vt_deuteronomii',
  Js: 'vt_iosue', Jz: 'vt_iudicum', Rt: 'vt_ruth', '1Sm': 'vt_i-samuelis', '2Sm': 'vt_ii-samuelis',
  '1Rs': 'vt_i-regum', '2Rs': 'vt_ii-regum', '1Cr': 'vt_i-paralipomenon', '2Cr': 'vt_ii-paralipomenon',
  Esd: 'vt_esdrae', Ne: 'vt_nehemiae', Tb: 'vt_thobis', Jt: 'vt_iudith', Est: 'vt_esther',
  '1Mc': 'vt_i-maccabaeorum', '2Mc': 'vt_ii-maccabaeorum', Jó: 'vt_iob', Sl: 'vt_psalmorum',
  Pr: 'vt_proverbiorum', Ecl: 'vt_ecclesiastes', Ct: 'vt_canticum-canticorum', Sb: 'vt_sapientiae',
  Eclo: 'vt_ecclesiasticus', Is: 'vt_isaiae', Jr: 'vt_ieremiae', Lm: 'vt_lamentationes', Br: 'vt_baruch',
  Ez: 'vt_ezechielis', Dn: 'vt_danielis', Os: 'vt_osee', Jl: 'vt_ioel', Am: 'vt_amos', Ab: 'vt_abdiae',
  Jn: 'vt_ionae', Mq: 'vt_michaeae', Na: 'vt_nahum', Hab: 'vt_habacuc', Sf: 'vt_sophoniae',
  Ag: 'vt_aggaei', Zc: 'vt_zachariae', Ml: 'vt_malachiae',
  Mt: 'nt_evang-matthaeum', Mc: 'nt_evang-marcum', Lc: 'nt_evang-lucam', Jo: 'nt_evang-ioannem',
  At: 'nt_actus-apostolorum', Rm: 'nt_epist-romanos', '1Cor': 'nt_epist-i-corinthios',
  '2Cor': 'nt_epist-ii-corinthios', Gl: 'nt_epist-galatas', Ef: 'nt_epist-ephesios',
  Fl: 'nt_epist-philippenses', Cl: 'nt_epist-colossenses', '1Ts': 'nt_epist-i-thessalonicenses',
  '2Ts': 'nt_epist-ii-thessalonicenses', '1Tm': 'nt_epist-i-timotheum', '2Tm': 'nt_epist-ii-timotheum',
  Tt: 'nt_epist-titum', Fm: 'nt_epist-philemonem', Hb: 'nt_epist-hebraeos', Tg: 'nt_epist-iacobi',
  '1Pd': 'nt_epist-i-petri', '2Pd': 'nt_epist-ii-petri', '1Jo': 'nt_epist-i-ioannis',
  '2Jo': 'nt_epist-ii-ioannis', '3Jo': 'nt_epist-iii-ioannis', Jd: 'nt_epist-iudae',
  Ap: 'nt_apocalypsis-ioannis',
}

/**
 * Livros em que a numeração da Nova Vulgata e a da CNBB podem divergir
 * (acréscimos gregos de Ester e Daniel, capítulos de Joel e Malaquias,
 * versículos do Eclesiástico). Neles, referência não encontrada é aviso.
 */
export const NUMERACAO_INCERTA = new Set(['Est', 'Dn', 'Jl', 'Ml', 'Eclo'])

export function urlDoLivro(sigla: string): string | undefined {
  const pagina = PAGINAS[sigla]
  return pagina ? `${BASE}nova-vulgata_${pagina}_lt.html` : undefined
}

/** Capítulo → versículo → texto. Versículos com letra (Est 1,1a) entram pelo número. */
export type Livro = Map<number, Map<number, string>>

export function extrairLivro(html: string): Livro {
  const corpo = html.slice(Math.max(0, html.indexOf('INIZIO TESTO')))
  const livro: Livro = new Map()
  // Cada capítulo começa num <a name="N"> (ou "PSALMUS N" nos Salmos); livros de um só capítulo não têm âncora
  const ancoras = [...corpo.matchAll(/<a name="(?:PSALMUS\s+)?(\d+)"[^>]*>[\s\S]*?<\/a>/g)]
  if (!ancoras.length) {
    const inicio = corpo.search(/<br\s*\/?>\s*1\s/)
    livro.set(1, extrairVersiculos(corpo.slice(Math.max(0, inicio))))
    return livro
  }
  ancoras.forEach((a, i) => {
    const fim = i + 1 < ancoras.length ? ancoras[i + 1]!.index : corpo.length
    livro.set(Number(a[1]), extrairVersiculos(corpo.slice(a.index! + a[0].length, fim)))
  })
  return livro
}

/** Texto latino que marca, no lugar do versículo, que a Nova Vulgata o omite (Mt 17,21; Jo 5,4). */
export const OMITIDO = '(omitido na Nova Vulgata)'

/**
 * Os números de versículo nem sempre abrem linha ("… 19 benedixit ei"), então
 * o texto é lido em sequência: só conta como versículo o número que vem logo
 * depois do atual. "(21)" marca versículo omitido. Texto antes do primeiro
 * número é o versículo 1 (Nm 1,1 vem sem número).
 */
function extrairVersiculos(html: string): Map<number, string> {
  const texto = decodificarEntidades(html.replace(/<br\s*\/?>/g, ' ').replace(/<[^>]+>/g, ' '))
    .replace(/­/g, '')
    .replace(/\s+/g, ' ')
  const versiculos = new Map<number, string>()
  let atual = 0
  let desde = 0
  const fechar = (ate: number) => {
    const trecho = texto.slice(desde, ate).trim()
    if (atual) versiculos.set(atual, `${versiculos.get(atual) ?? ''} ${trecho}`.trim())
    else if (/\p{L}{3}/u.test(trecho.replace(/^\(\d+\)/, ''))) versiculos.set(1, trecho)
  }
  for (const m of texto.matchAll(/(?<=^|\s)(\()?(\d{1,3})[a-z]?\)?(?=[\s“«‘\"])/g)) {
    const n = Number(m[2])
    const base = Math.max(atual, versiculos.has(1) && !atual ? 1 : atual)
    if (n <= base || n > base + 3) continue
    fechar(m.index!)
    atual = n
    desde = m.index! + m[0].length
    if (m[1]) {
      versiculos.set(n, OMITIDO)
      atual = n
    }
  }
  fechar(texto.length)
  for (const [n, t] of versiculos) if (t.startsWith(OMITIDO) && t.length > OMITIDO.length) versiculos.set(n, OMITIDO)
  return versiculos
}

const CACHE = join(process.cwd(), 'node_modules', '.cache', 'veritas-nova-vulgata')
const livros = new Map<string, Livro>()

/** Baixa (uma vez) e devolve o livro da Nova Vulgata. */
export async function livroDaVulgata(sigla: string): Promise<Livro | undefined> {
  const url = urlDoLivro(sigla)
  if (!url) return undefined
  if (livros.has(sigla)) return livros.get(sigla)
  const arquivo = join(CACHE, url.split('/').pop()!)
  let html: string
  try {
    html = await readFile(arquivo, 'utf8')
  } catch {
    const resposta = await fetch(url)
    if (!resposta.ok) throw new Error(`vatican.va respondeu ${resposta.status} para ${url}`)
    html = new TextDecoder('latin1').decode(await resposta.arrayBuffer())
    await mkdir(CACHE, { recursive: true })
    await writeFile(arquivo, html)
  }
  const livro = extrairLivro(html)
  livros.set(sigla, livro)
  return livro
}

export interface ReferenciaBiblica {
  /** Como aparece no texto: "Lc 1,28.47" */
  texto: string
  sigla: string
  /** Cada capítulo,versículo citado (as faixas já expandidas). */
  versiculos: { capitulo: number; versiculo: number }[]
}

const SIGLA = Object.keys(LIVROS)
  .sort((a, b) => b.length - a.length)
  .join('|')
// "1,26-38", "1,28.47", "11,19-12,1", "1,42-43.48"
const VERSOS = String.raw`\d+,\d+[a-z]?(?:\s?[-–]\s?(?:\d+,)?\d+[a-z]?)?(?:\.\d+[a-z]?(?:[-–]\d+[a-z]?)?)*`

function expandir(capitulo: number, versos: string): ReferenciaBiblica['versiculos'] {
  const lista: ReferenciaBiblica['versiculos'] = []
  const [primeiro, ...outros] = versos.split('.')
  const faixa = (de: number, ate: number, cap: number) => {
    for (let v = de; v <= ate && v - de < 200; v++) lista.push({ capitulo: cap, versiculo: v })
  }
  // A primeira parte pode atravessar capítulos: "19-12,1"
  const cruzado = primeiro!.match(/^(\d+)[a-z]?\s?[-–]\s?(\d+),(\d+)/)
  if (cruzado) {
    lista.push({ capitulo, versiculo: Number(cruzado[1]) })
    lista.push({ capitulo: Number(cruzado[2]), versiculo: Number(cruzado[3]) })
  }
  for (const parte of cruzado ? outros : [primeiro!, ...outros]) {
    const [de, ate] = parte.split(/\s?[-–]\s?/).map((n) => Number.parseInt(n!, 10))
    faixa(de!, ate ?? de!, capitulo)
  }
  return lista
}

/**
 * Referências bíblicas com versículo: "Lc 1,28", "Gn 13,8; 14,14" (o livro
 * vale para os capítulos seguintes depois de ";"), "Ap 11,19-12,1".
 */
export function referenciasBiblicas(texto: string): ReferenciaBiblica[] {
  const refs: ReferenciaBiblica[] = []
  const re = new RegExp(String.raw`\b(${SIGLA})\s(${VERSOS})((?:;\s?${VERSOS})*)`, 'g')
  for (const m of texto.matchAll(re)) {
    const sigla = m[1]!
    for (const pedaco of [m[2]!, ...m[3]!.split(';').map((p) => p.trim()).filter(Boolean)]) {
      const [cap, versos] = [pedaco.slice(0, pedaco.indexOf(',')), pedaco.slice(pedaco.indexOf(',') + 1)]
      refs.push({ texto: `${sigla} ${pedaco}`, sigla, versiculos: expandir(Number(cap), versos) })
    }
  }
  return refs
}

/** Texto latino de uma referência, versículo por versículo; ausentes vêm como undefined. */
export async function textoDaReferencia(ref: ReferenciaBiblica): Promise<{ capitulo: number; versiculo: number; texto?: string }[]> {
  const livro = await livroDaVulgata(ref.sigla)
  return ref.versiculos.map((v) => ({ ...v, texto: livro?.get(v.capitulo)?.get(v.versiculo) }))
}
