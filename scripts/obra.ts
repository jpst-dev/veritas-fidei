/**
 * Traz uma obra de arte do Wikimedia Commons para o site (ver docs/imagens.md):
 *
 *   npm run obra -- <slug> "<arquivo no Commons>"
 *   npm run obra -- emaus "1602-3 Caravaggio,Supper at Emmaus National Gallery, London.jpg"
 *
 * 1. Lê a licença e o autor no Commons e recusa o que não for domínio público ou CC.
 * 2. Gera public/obras/<slug>-1600.webp e <slug>-800.webp.
 * 3. Cria content/obras/<slug>.yml com os dados da fonte; título, autor, data,
 *    acervo e descrição (alt) são revistos à mão, em português.
 *
 * Não sobrescreve um .yml existente: para refazer só as imagens, rode de novo.
 */
import { access, mkdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import sharp from 'sharp'
import { stringify } from 'yaml'

const [slug, arquivo] = process.argv.slice(2)
if (!slug || !arquivo || !/^[a-z0-9-]+$/.test(slug)) {
  console.error('Uso: npm run obra -- <slug-em-minusculas> "<arquivo no Commons>"')
  process.exit(1)
}

// Só entra o que pode ser usado sem pedir autorização
const LICENCAS = [/^Public domain$/i, /^PD/i, /^CC0/i, /^CC BY(-SA)? \d/i]
const AGENTE = 'VeritasFidei/1.0 (https://veritas.jteixeira.dev)'
const LARGURAS = [1600, 800]

const titulo = arquivo.replace(/^File:/, '')
const api = new URL('https://commons.wikimedia.org/w/api.php')
api.search = new URLSearchParams({
  action: 'query',
  format: 'json',
  titles: `File:${titulo}`,
  prop: 'imageinfo',
  iiprop: 'url|size|extmetadata',
  iiurlwidth: '2400',
}).toString()

const resposta = await fetch(api, { headers: { 'User-Agent': AGENTE } })
if (!resposta.ok) throw new Error(`Commons respondeu ${resposta.status}`)
const pagina = Object.values((await resposta.json()).query.pages)[0] as {
  missing?: string
  imageinfo?: { thumburl?: string; url: string; descriptionurl: string; extmetadata: Record<string, { value: string }> }[]
}
const info = pagina.imageinfo?.[0]
if (pagina.missing !== undefined || !info) throw new Error(`Arquivo não encontrado no Commons: ${titulo}`)

const meta = (campo: string) => (info.extmetadata[campo]?.value ?? '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()
const licenca = meta('LicenseShortName')
if (!LICENCAS.some((re) => re.test(licenca))) {
  console.error(`Licença "${licenca}" não permitida. Use domínio público ou Creative Commons (docs/imagens.md).`)
  process.exit(1)
}
const exigeCredito = /^CC BY/i.test(licenca)

const original = Buffer.from(await (await fetch(info.thumburl ?? info.url, { headers: { 'User-Agent': AGENTE } })).arrayBuffer())
const pastaImagens = join(process.cwd(), 'public', 'obras')
await mkdir(pastaImagens, { recursive: true })
for (const largura of LARGURAS) {
  const saida = join(pastaImagens, `${slug}-${largura}.webp`)
  const { size } = await sharp(original).resize({ width: largura, height: largura, fit: 'inside', withoutEnlargement: true }).webp({ quality: 72 }).toFile(saida)
  console.log(`public/obras/${slug}-${largura}.webp  ${Math.round(size / 1024)} KB`)
}

const yml = join(process.cwd(), 'content', 'obras', `${slug}.yml`)
const existe = await access(yml).then(() => true, () => false)
if (existe) {
  console.log(`content/obras/${slug}.yml já existe; mantido.`)
} else {
  await mkdir(join(process.cwd(), 'content', 'obras'), { recursive: true })
  const dados = {
    titulo: `REVISAR: ${meta('ObjectName') || titulo}`,
    autor: `REVISAR: ${meta('Artist')}`,
    data: `REVISAR: ${meta('DateTimeOriginal')}`,
    acervo: 'REVISAR',
    alt: 'REVISAR: descreva a cena em uma frase',
    posicao: 'center',
    licenca,
    ...(exigeCredito ? { credito: `REVISAR: ${meta('Artist')}, ${licenca}` } : {}),
    fonte: info.descriptionurl,
  }
  await writeFile(yml, stringify(dados))
  console.log(`content/obras/${slug}.yml criado: revise os campos marcados com REVISAR.`)
}
console.log(`Licença: ${licenca}${exigeCredito ? ' (exige crédito ao autor da foto)' : ''}`)
