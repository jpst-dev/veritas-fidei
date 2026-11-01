/**
 * Procura obras no Wikimedia Commons e já aplica as regras de docs/imagens.md:
 * licença aceita, largura mínima, quadro vertical, obra ou artista repetidos.
 *
 *   npm run commons -- "Fra Angelico Noli me tangere"
 *   npm run commons -- "Caravaggio Emmaus" --tema jesus-cristo   # avisa artista já usado no tema
 *   npm run commons -- "..." --baixar pasta/                     # salva prévias de 1280 px para olhar
 *   npm run commons -- --arquivo "Matthias Grünewald - Resurrection.jpg"
 *
 * As recusadas (licença) não aparecem; as que pedem cuidado vêm com "!".
 */
import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { parse } from 'yaml'
import { arquivoDaFonte, avaliarCandidata, type Candidata } from './verificar/obras.ts'

const AGENTE = 'VeritasFidei/1.0 (https://veritas.jteixeira.dev)'
const RAIZ = process.cwd()

const args = process.argv.slice(2)
const valor = (flag: string) => {
  const i = args.indexOf(flag)
  return i >= 0 ? args[i + 1] : undefined
}
const tema = valor('--tema')
const pastaPrevias = valor('--baixar')
const arquivo = valor('--arquivo')
const usados = new Set([tema, pastaPrevias, arquivo].filter(Boolean))
const busca = args.filter((a) => !a.startsWith('--') && !usados.has(a)).join(' ')
if (!busca && !arquivo) {
  console.error('Uso: npm run commons -- "<busca>" [--tema <tema>] [--baixar <pasta>]   |   --arquivo "<arquivo>"')
  process.exit(1)
}

interface Pagina {
  title: string
  imageinfo?: { width: number; height: number; thumburl?: string; descriptionurl: string; extmetadata: Record<string, { value: string }> }[]
}

const api = new URL('https://commons.wikimedia.org/w/api.php')
api.search = new URLSearchParams({
  action: 'query',
  format: 'json',
  prop: 'imageinfo',
  iiprop: 'url|size|extmetadata',
  iiurlwidth: '1280',
  ...(arquivo
    ? { titles: `File:${arquivo.replace(/^File:/, '')}` }
    : { generator: 'search', gsrnamespace: '6', gsrlimit: '20', gsrsearch: `${busca} filetype:bitmap` }),
}).toString()

const resposta = await fetch(api, { headers: { 'User-Agent': AGENTE } })
if (!resposta.ok) throw new Error(`Commons respondeu ${resposta.status}`)
const paginas = Object.values(((await resposta.json()) as { query?: { pages: Record<string, Pagina & { index?: number }> } }).query?.pages ?? {})
  .sort((a, b) => (a.index ?? 0) - (b.index ?? 0))

// O que o site já usa: obras catalogadas (pela fonte) e, com --tema, os artistas desse tema
const obras = await Promise.all(
  (await readdir(join(RAIZ, 'content', 'obras'))).map(async (f) => ({
    slug: f.replace(/\.yml$/, ''),
    ...(parse(await readFile(join(RAIZ, 'content', 'obras', f), 'utf8')) as { autor?: string; fonte?: string }),
  })),
)
const porArquivo = new Map(obras.map((o) => [arquivoDaFonte(o.fonte ?? ''), o.slug]))
const autoresDoTema: string[] = []
if (tema) {
  const artigos = join(RAIZ, 'content', 'artigos')
  const slugsDoTema = new Set<string>()
  for (const f of await readdir(artigos)) {
    const texto = await readFile(join(artigos, f), 'utf8')
    if (new RegExp(`^tema:\\s*${tema}\\s*$`, 'm').test(texto) && !/^status:\s*rascunho/m.test(texto)) {
      const obra = texto.match(/^obra:\s*(\S+)/m)?.[1]
      if (obra) slugsDoTema.add(obra)
    }
  }
  const temaYml = await readFile(join(RAIZ, 'content', 'temas', `${tema}.yml`), 'utf8').catch(() => '')
  const obraDoTema = temaYml.match(/^obra:\s*(\S+)/m)?.[1]
  if (obraDoTema) slugsDoTema.add(obraDoTema)
  for (const o of obras) if (slugsDoTema.has(o.slug) && o.autor) autoresDoTema.push(o.autor)
}

const limpar = (html = '') => html.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()
if (pastaPrevias) await mkdir(pastaPrevias, { recursive: true })

let mostradas = 0
for (const p of paginas) {
  const info = p.imageinfo?.[0]
  if (!info) {
    console.log(`\n✖ ${p.title}: não existe no Commons`)
    continue
  }
  const nome = p.title.replace(/^File:/, '')
  const meta = (campo: string) => limpar(info.extmetadata[campo]?.value)
  const c: Candidata = { arquivo: nome, largura: info.width, altura: info.height, licenca: meta('LicenseShortName'), autor: meta('Artist') }
  const { recusada, avisos } = avaliarCandidata(c, autoresDoTema)
  if (recusada) {
    if (arquivo) console.log(`\n✖ ${nome}: ${recusada}`)
    continue
  }
  const jaUsada = porArquivo.get(nome)
  if (jaUsada) avisos.unshift(`já catalogada como "${jaUsada}"`)
  mostradas++
  console.log(`\n${avisos.length ? '!' : '✔'} ${nome}`)
  console.log(`  ${c.largura}x${c.altura} · ${c.licenca} · ${c.autor || 'autor não informado'}`)
  const descricao = meta('ImageDescription')
  if (descricao) console.log(`  ${descricao.slice(0, 160)}`)
  for (const a of avisos) console.log(`  ! ${a}`)
  console.log(`  ${info.descriptionurl}`)
  if (pastaPrevias && info.thumburl) {
    const destino = join(pastaPrevias, `${String(mostradas).padStart(2, '0')}-${nome.replace(/[^\w.-]+/g, '_').slice(0, 60)}.jpg`)
    const img = await fetch(info.thumburl, { headers: { 'User-Agent': AGENTE } })
    if (img.ok) {
      await writeFile(destino, Buffer.from(await img.arrayBuffer()))
      console.log(`  prévia: ${destino}`)
    }
  }
}
if (!mostradas && !arquivo) console.log('Nenhuma candidata com licença aceita. Tente outros termos (em inglês ou italiano costuma render mais).')
