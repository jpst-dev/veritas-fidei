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
 * Para refazer as imagens de uma obra já catalogada, pelo arquivo do campo `fonte`:
 *
 *   npm run obra -- --refazer <slug>
 *
 * As imagens são limitadas pela **largura** (1600 e 800 px), porque as faixas
 * dos artigos ocupam a tela inteira: um quadro vertical limitado pela altura
 * ficaria estreito e seria ampliado (borrado) no navegador. A altura tem um
 * teto (2× a largura) para o arquivo não crescer demais.
 */
import { access, mkdir, readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import sharp from 'sharp'
import { parse, stringify } from 'yaml'
import { arquivoDaFonte, dimensoesDaSaida, exigeCredito as pedeCredito, licencaAceita } from './verificar/obras.ts'

const args = process.argv.slice(2)
const refazer = args[0] === '--refazer'
const slug = refazer ? args[1] : args[0]
let arquivo = refazer ? undefined : args[1]
if (refazer && slug) {
  const dados = parse(await readFile(join(process.cwd(), 'content', 'obras', `${slug}.yml`), 'utf8')) as { fonte?: string }
  arquivo = dados.fonte ? arquivoDaFonte(dados.fonte) : undefined
}
if (!slug || !arquivo || !/^[a-z0-9-]+$/.test(slug)) {
  console.error('Uso: npm run obra -- <slug-em-minusculas> "<arquivo no Commons>"')
  console.error('     npm run obra -- --refazer <slug>')
  process.exit(1)
}

const AGENTE = 'VeritasFidei/1.0 (https://veritas.jteixeira.dev)'
const LARGURAS = [1600, 800]
const QUALIDADES = [72, 64, 56, 48]
const TETO_KB: Record<number, number> = { 1600: 420, 800: 140 }
const ESCALA_MINIMA: Record<number, number> = { 1600: 0.7, 800: 1 }

const titulo = arquivo.replace(/^File:/, '')
const api = new URL('https://commons.wikimedia.org/w/api.php')
api.search = new URLSearchParams({
  action: 'query',
  format: 'json',
  titles: `File:${titulo}`,
  prop: 'imageinfo',
  iiprop: 'url|size|extmetadata',
  // Miniatura pela largura: o Commons não amplia, e o original pode ter dezenas de MB
  iiurlwidth: '1600',
}).toString()

const resposta = await fetch(api, { headers: { 'User-Agent': AGENTE } })
if (!resposta.ok) throw new Error(`Commons respondeu ${resposta.status}`)
const pagina = Object.values((await resposta.json()).query.pages)[0] as {
  missing?: string
  imageinfo?: { thumburl?: string; url: string; width: number; height: number; descriptionurl: string; extmetadata: Record<string, { value: string }> }[]
}
const info = pagina.imageinfo?.[0]
if (pagina.missing !== undefined || !info) throw new Error(`Arquivo não encontrado no Commons: ${titulo}`)

const meta = (campo: string) => (info.extmetadata[campo]?.value ?? '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()
const licenca = meta('LicenseShortName')
if (!licencaAceita(licenca)) {
  console.error(`Licença "${licenca}" não permitida. Use domínio público ou Creative Commons (docs/imagens.md).`)
  process.exit(1)
}
const exigeCredito = pedeCredito(licenca)

if (info.width < 1600) {
  console.warn(`Atenção: o original tem só ${info.width} px de largura; a faixa do artigo vai ficar ampliada. Procure uma reprodução maior.`)
}
const original = Buffer.from(await (await fetch(info.thumburl ?? info.url, { headers: { 'User-Agent': AGENTE } })).arrayBuffer())
const pastaImagens = join(process.cwd(), 'public', 'obras')
await mkdir(pastaImagens, { recursive: true })
for (const largura of LARGURAS) {
  const saida = join(pastaImagens, `${slug}-${largura}.webp`)
  const { width, height } = dimensoesDaSaida(info.width, info.height, largura)
  // A qualidade cai aos poucos até caber no teto de peso (afrescos e ícones com muita textura
  // pesam mais); se nem assim couber, a de 1600 encolhe 15% por vez, até 70% (abaixo disso a
  // faixa fica borrada: melhor um arquivo mais pesado). A de 800 nunca encolhe (cartões em tela 2×).
  let webp: Buffer = Buffer.alloc(0)
  let qualidade = 0
  const cabe = () => webp.length > 0 && webp.length <= TETO_KB[largura]! * 1024
  for (let escala = 1; escala >= ESCALA_MINIMA[largura]! - 0.01 && !cabe(); escala -= 0.15) {
    const redimensionada = await sharp(original, { limitInputPixels: false })
      .resize({ width: Math.round(width * escala), height: Math.round(height * escala), fit: 'fill' })
      .toBuffer()
    for (qualidade of QUALIDADES) {
      webp = await sharp(redimensionada).webp({ quality: qualidade, effort: 6 }).toBuffer()
      if (cabe()) break
    }
  }
  if (!cabe()) console.warn(`Atenção: ${slug}-${largura}.webp ficou acima do teto de ${TETO_KB[largura]} KB (textura muito fina).`)
  await writeFile(saida, webp)
  const final = await sharp(webp).metadata()
  console.log(`public/obras/${slug}-${largura}.webp  ${final.width}x${final.height}  ${Math.round(webp.length / 1024)} KB (qualidade ${qualidade})`)
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
