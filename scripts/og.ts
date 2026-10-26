/**
 * Gera as imagens de compartilhamento (Open Graph, 1200×630) antes do build:
 *
 *   public/og/padrao.png           todas as páginas
 *   public/og/artigos/<slug>.png   cada artigo que não é rascunho
 *
 * Roda sozinho no `npm run generate`; em desenvolvimento, `npm run og`.
 * Usa as mesmas fontes e cores do site (app/assets/css/main.css).
 */
import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { Resvg } from '@resvg/resvg-js'
import satori from 'satori'
import { parse } from 'yaml'
import { lerArtigo } from './verificar/artigo.ts'

export const LARGURA = 1200
export const ALTURA = 630

// Paleta "Noite", com o verde do Tempo Comum como destaque fixo
const COR = { bg: '#0d1015', surface: '#141922', line: '#2a313c', text: '#ece6d8', muted: '#a49d8e', accent: '#6fbf8a' }

const SECOES: Record<string, string> = { aprender: 'Aprender', 'defesa-da-fe': 'Defesa da fé' }
const NIVEIS: Record<string, string> = { iniciante: 'Iniciante', intermediario: 'Intermediário', avancado: 'Avançado' }

const RAIZ = process.cwd()
const SAIDA = join(RAIZ, 'public', 'og')

type No = { type: string; props: Record<string, unknown> & { children?: unknown } }
const h = (type: string, style: Record<string, unknown>, children?: unknown, extra: Record<string, unknown> = {}): No => ({
  type,
  props: { style, children, ...extra },
})

async function fonte(pacote: string, arquivo: string) {
  return readFile(join(RAIZ, 'node_modules', '@fontsource', pacote, 'files', arquivo))
}

const FONTES = [
  { name: 'Literata', data: await fonte('literata', 'literata-latin-400-normal.woff'), weight: 400, style: 'normal' },
  { name: 'Literata', data: await fonte('literata', 'literata-latin-500-normal.woff'), weight: 500, style: 'normal' },
  { name: 'Literata', data: await fonte('literata', 'literata-latin-400-italic.woff'), weight: 400, style: 'italic' },
  { name: 'Cinzel', data: await fonte('cinzel', 'cinzel-latin-400-normal.woff'), weight: 400, style: 'normal' },
  { name: 'Cinzel', data: await fonte('cinzel', 'cinzel-latin-500-normal.woff'), weight: 500, style: 'normal' },
] as const

// A cruz do logotipo (✠ no site); a Cinzel não tem o glifo, então vai em SVG
const CRUZ = `data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${COR.accent}"><path d="M12 12 6.8 1h10.4zM12 12l-5.2 11h10.4zM12 12 1 6.8v10.4zM12 12l11-5.2v10.4z"/></svg>`,
)}`

function marca(tamanho: number): No {
  return h('div', { display: 'flex', alignItems: 'center', gap: tamanho * 0.5 }, [
    h('img', { width: tamanho, height: tamanho }, undefined, { src: CRUZ, width: tamanho, height: tamanho }),
    h('div', { fontFamily: 'Cinzel', fontWeight: 500, fontSize: tamanho, letterSpacing: tamanho * 0.16, color: COR.text }, 'VERITAS FIDEI'),
  ])
}

function rubrica(texto: string, tamanho = 22): No {
  return h('div', { fontFamily: 'Cinzel', fontSize: tamanho, letterSpacing: tamanho * 0.22, color: COR.accent }, texto.toUpperCase())
}

function moldura(conteudo: No[]): No {
  const margem = 28
  return h('div', { width: LARGURA, height: ALTURA, display: 'flex', position: 'relative', background: COR.bg }, [
    h(
      'div',
      {
        position: 'absolute',
        top: margem,
        left: margem,
        right: margem,
        bottom: margem,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        border: `1px solid ${COR.line}`,
        borderTop: `6px solid ${COR.accent}`,
        background: COR.surface,
        padding: '48px 60px 44px',
      },
      conteudo,
    ),
  ])
}

/** Imagem padrão: a frase da página inicial, com a capitular em Cinzel. */
export function padrao(): No {
  const palavras = 'onhecer a fé para amá-la — e saber dar razão dela.'.split(' ')
  return moldura([
    marca(30),
    h('div', { display: 'flex', flexDirection: 'column', gap: 26 }, [
      rubrica('Formação católica'),
      h('div', { display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', columnGap: 22, fontFamily: 'Literata', fontWeight: 500, fontSize: 74, lineHeight: 1.1, color: COR.text }, [
        h('div', { display: 'flex', alignItems: 'baseline' }, [
          h('span', { fontFamily: 'Cinzel', fontSize: 84, color: COR.accent }, 'C'),
          h('span', {}, palavras[0]),
        ]),
        ...palavras.slice(1).map((p) => h('span', {}, p)),
      ]),
    ]),
    h('div', { display: 'flex', alignItems: 'center', gap: 22 }, [
      h('div', { width: 56, height: 2, background: COR.accent }),
      h('div', { fontFamily: 'Literata', fontStyle: 'italic', fontSize: 27, color: COR.muted }, '“Estai sempre prontos a dar razão da vossa esperança.”'),
      rubrica('1Pd 3,15', 19),
    ]),
  ])
}

export type DadosArtigo = { titulo: string; secao?: string; tema?: string; minutos?: number; nivel?: string }

/** Imagem de um artigo: seção e tema, título e tempo de leitura. */
export function artigo(a: DadosArtigo): No {
  const tamanho = a.titulo.length <= 34 ? 78 : a.titulo.length <= 60 ? 66 : 54
  const topo = [a.secao && SECOES[a.secao], a.tema].filter(Boolean).join(' · ')
  const rodape = [a.minutos && `${a.minutos} min de leitura`, a.nivel && `Nível ${NIVEIS[a.nivel]?.toLowerCase() ?? a.nivel}`]
    .filter(Boolean)
    .join('   ·   ')
  return moldura([
    marca(26),
    h('div', { display: 'flex', flexDirection: 'column', gap: 24 }, [
      topo ? rubrica(topo) : h('div', {}),
      h('div', { fontFamily: 'Literata', fontWeight: 500, fontSize: tamanho, lineHeight: 1.12, color: COR.text, maxWidth: 1000 }, a.titulo),
    ]),
    h('div', { display: 'flex', alignItems: 'center', gap: 22 }, [
      h('div', { width: 56, height: 2, background: COR.accent }),
      h('div', { fontFamily: 'Cinzel', fontSize: 20, letterSpacing: 3, color: COR.muted }, rodape.toUpperCase()),
    ]),
  ])
}

export async function png(no: No): Promise<Buffer> {
  const svg = await satori(no as Parameters<typeof satori>[0], { width: LARGURA, height: ALTURA, fonts: [...FONTES] })
  return new Resvg(svg, { fitTo: { mode: 'width', value: LARGURA } }).render().asPng()
}

async function nomesDosTemas(): Promise<Record<string, string>> {
  const pasta = join(RAIZ, 'content', 'temas')
  const nomes: Record<string, string> = {}
  for (const f of await readdir(pasta)) {
    if (f.endsWith('.yml')) nomes[f.replace(/\.yml$/, '')] = parse(await readFile(join(pasta, f), 'utf8')).nome
  }
  return nomes
}

// Executado como script (não quando importado pelos testes)
if (import.meta.filename === process.argv[1]) {
  const inicio = Date.now()
  await mkdir(join(SAIDA, 'artigos'), { recursive: true })
  await writeFile(join(SAIDA, 'padrao.png'), await png(padrao()))

  const temas = await nomesDosTemas()
  const pasta = join(RAIZ, 'content', 'artigos')
  let total = 0
  for (const f of await readdir(pasta)) {
    if (!f.endsWith('.md')) continue
    const bruto = await readFile(join(pasta, f), 'utf8')
    const { dados } = lerArtigo(bruto)
    if (!dados.status || dados.status === 'rascunho') continue
    // Mesmo cálculo do hook content:file:afterParse (nuxt.config.ts)
    const palavras = bruto.replace(/^---[\s\S]*?\n---/, '').split(/\s+/).filter(Boolean).length
    const imagem = artigo({
      titulo: String(dados.title),
      secao: dados.secao,
      tema: dados.tema && temas[dados.tema],
      minutos: Math.max(1, Math.round(palavras / 200)),
      nivel: dados.nivel,
    })
    await writeFile(join(SAIDA, 'artigos', f.replace(/\.md$/, '.png')), await png(imagem))
    total++
  }
  console.log(`og: padrão + ${total} artigo(s) em public/og (${Date.now() - inicio} ms)`)
}
