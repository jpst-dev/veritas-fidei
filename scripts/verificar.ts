/**
 * Confere artigos contra o padrão editorial (docs/padrao-editorial.md).
 *
 *   npm run verificar                         # artigos em revisão ou publicados
 *   npm run verificar -- content/artigos/x.md # artigos específicos
 *   npm run verificar -- --links --ortografia x.md
 *
 * --links       testa cada URL de "referencias"
 * --ortografia  envia o texto ao LanguageTool (api.languagetool.org, pt-BR)
 *
 * Sai com código 1 se houver erros.
 */
import { readdir, readFile } from 'node:fs/promises'
import { join, relative } from 'node:path'
import {
  type Achado,
  type Artigo,
  citacoesDoCatecismo,
  lerArtigo,
  verificarEstrutura,
  verificarFormato,
} from './verificar/artigo.ts'
import { textoDoCatecismo, trechosAusentes, urlDoParagrafo } from './verificar/catecismo.ts'

const args = process.argv.slice(2)
const comLinks = args.includes('--links')
const comOrtografia = args.includes('--ortografia')
let arquivos = args.filter((a) => !a.startsWith('--'))

const PASTA = join(process.cwd(), 'content', 'artigos')

async function conferirCatecismo(artigo: Artigo): Promise<Achado[]> {
  const achados: Achado[] = []
  for (const c of citacoesDoCatecismo(artigo)) {
    const ref = c.fim > c.inicio ? `CIC ${c.inicio}-${c.fim}` : `CIC ${c.inicio}`
    if (!urlDoParagrafo(c.inicio) || c.fim - c.inicio > 20) {
      achados.push({ gravidade: 'erro', linha: c.linha, mensagem: `${ref}: parágrafo inexistente ou faixa grande demais` })
      continue
    }
    try {
      const fonte = await textoDoCatecismo(c.inicio, c.fim)
      if (!fonte) {
        achados.push({ gravidade: 'aviso', linha: c.linha, mensagem: `${ref}: não encontrei o parágrafo na página oficial` })
        continue
      }
      for (const trecho of trechosAusentes(c.texto, fonte)) {
        const curto = trecho.length > 70 ? `${trecho.slice(0, 70)}…` : trecho
        achados.push({
          gravidade: 'erro',
          linha: c.linha,
          mensagem: `${ref}: o trecho "${curto}" não confere com o texto oficial (${urlDoParagrafo(c.inicio)})`,
        })
      }
    } catch (e) {
      achados.push({ gravidade: 'aviso', linha: c.linha, mensagem: `${ref}: não consegui baixar o texto oficial (${(e as Error).message})` })
    }
  }
  return achados
}

async function conferirLinks(artigo: Artigo): Promise<Achado[]> {
  const achados: Achado[] = []
  for (const ref of artigo.dados.referencias ?? []) {
    if (!ref.url) continue
    try {
      const r = await fetch(ref.url, { redirect: 'follow', signal: AbortSignal.timeout(15_000) })
      if (!r.ok) achados.push({ gravidade: 'erro', mensagem: `link quebrado (${r.status}): ${ref.url}` })
    } catch (e) {
      achados.push({ gravidade: 'erro', mensagem: `link inacessível: ${ref.url} (${(e as Error).message})` })
    }
  }
  return achados
}

/** Texto corrido sem marcação, em blocos de até ~18 KB (limite da API pública: 20 KB). */
function textoParaRevisao(artigo: Artigo): string[] {
  const texto = artigo.linhas
    .map((l) => l.texto)
    .join('\n')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/^>\s?/gm, '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    // Itálico é latim ou título de obra: o corretor de português não deve opinar
    .replace(/(?<![*\w])[*_]([^*_\n]+)[*_](?![*\w])/g, 'Obra')
    .replace(/[*_`]/g, '')
  const blocos: string[] = []
  let atual = ''
  for (const paragrafo of texto.split(/\n{2,}/)) {
    if (atual.length + paragrafo.length > 18_000) {
      blocos.push(atual)
      atual = ''
    }
    atual += `${paragrafo}\n\n`
  }
  if (atual.trim()) blocos.push(atual)
  return blocos
}

async function conferirOrtografia(artigo: Artigo): Promise<Achado[]> {
  const achados: Achado[] = []
  for (const bloco of textoParaRevisao(artigo)) {
    const corpo = new URLSearchParams({ text: bloco, language: 'pt-BR', level: 'picky' })
    const r = await fetch('https://api.languagetool.org/v2/check', { method: 'POST', body: corpo })
    if (!r.ok) {
      achados.push({ gravidade: 'aviso', mensagem: `LanguageTool respondeu ${r.status}` })
      break
    }
    const { matches } = (await r.json()) as {
      matches: { message: string; context: { text: string; offset: number; length: number }; replacements: { value: string }[] }[]
    }
    for (const m of matches) {
      const errado = m.context.text.slice(m.context.offset, m.context.offset + m.context.length)
      const sugestao = m.replacements.slice(0, 3).map((s) => s.value).join(' / ')
      achados.push({ gravidade: 'aviso', mensagem: `ortografia: "${errado}" — ${m.message}${sugestao ? ` → ${sugestao}` : ''}` })
    }
  }
  return achados
}

if (!arquivos.length) {
  const todos = (await readdir(PASTA)).filter((f) => f.endsWith('.md')).map((f) => join(PASTA, f))
  for (const f of todos) {
    const { dados } = lerArtigo(await readFile(f, 'utf8'))
    if (dados.status && dados.status !== 'rascunho') arquivos.push(f)
  }
}

if (!arquivos.length) console.log('Nenhum artigo em revisão ou publicado. Passe arquivos para conferir rascunhos.')

let erros = 0
let avisos = 0
for (const arquivo of arquivos) {
  const artigo = lerArtigo(await readFile(arquivo, 'utf8'))
  const achados = [
    ...verificarEstrutura(artigo),
    ...verificarFormato(artigo),
    ...(await conferirCatecismo(artigo)),
    ...(comLinks ? await conferirLinks(artigo) : []),
    ...(comOrtografia ? await conferirOrtografia(artigo) : []),
  ].sort((a, b) => (a.linha ?? 0) - (b.linha ?? 0))

  const nome = relative(process.cwd(), arquivo)
  const e = achados.filter((a) => a.gravidade === 'erro').length
  erros += e
  avisos += achados.length - e
  console.log(`\n${achados.length ? (e ? '✖' : '!') : '✔'} ${nome} (${artigo.dados.status ?? 'sem status'})`)
  for (const a of achados) {
    const onde = a.linha ? `${String(a.linha).padStart(4)}  ` : '      '
    console.log(`  ${a.gravidade === 'erro' ? 'erro ' : 'aviso'} ${onde}${a.mensagem}`)
  }
}

if (arquivos.length) console.log(`\n${arquivos.length} artigo(s): ${erros} erro(s), ${avisos} aviso(s)`)
// exitCode em vez de process.exit(): sair à força com fetch aberto derruba o Node no Windows
process.exitCode = erros ? 1 : 0
