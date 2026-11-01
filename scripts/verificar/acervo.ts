/**
 * Conferências que dependem do resto do acervo (outros artigos, obras,
 * pareceres), e não só do texto do artigo.
 */
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { parse } from 'yaml'
import { type Achado, type Artigo, lerArtigo } from './artigo.ts'
import { PROPORCAO_VERTICAL } from './obras.ts'

/** A partir de quando todo parecer precisa da seção do revisor independente (docs/fluxo-artigo.md). */
export const INICIO_REVISOR_INDEPENDENTE = '2026-11-02'

export interface Acervo {
  raiz: string
  artigos: Map<string, { status?: string; obra?: string; tema?: string }>
  obras: Map<string, { posicaoFaixa?: string; largura?: number; altura?: number }>
  temas: Set<string>
}

/** Lê o que o verificador precisa do repositório (uma vez por execução). */
export async function lerAcervo(raiz = process.cwd()): Promise<Acervo> {
  const artigos: Acervo['artigos'] = new Map()
  const pastaArtigos = join(raiz, 'content', 'artigos')
  for (const f of readdirSync(pastaArtigos).filter((f) => f.endsWith('.md'))) {
    const { dados } = lerArtigo(readFileSync(join(pastaArtigos, f), 'utf8'))
    artigos.set(f.replace(/\.md$/, ''), { status: dados.status, obra: dados.obra, tema: dados.tema })
  }
  const obras: Acervo['obras'] = new Map()
  const pastaObras = join(raiz, 'content', 'obras')
  // sharp só para medir as imagens; sem ele (ambiente sem binário), a checagem de tamanho fica de fora
  const sharp = await import('sharp').then((m) => m.default, () => undefined)
  for (const f of readdirSync(pastaObras).filter((f) => f.endsWith('.yml'))) {
    const slug = f.replace(/\.yml$/, '')
    const dados = (parse(readFileSync(join(pastaObras, f), 'utf8')) ?? {}) as { posicaoFaixa?: string }
    const imagem = join(raiz, 'public', 'obras', `${slug}-1600.webp`)
    let largura: number | undefined
    let altura: number | undefined
    if (sharp && existsSync(imagem)) ({ width: largura, height: altura } = await sharp(imagem).metadata())
    obras.set(slug, { posicaoFaixa: dados.posicaoFaixa, largura, altura })
  }
  const temas = new Set(readdirSync(join(raiz, 'content', 'temas')).map((f) => f.replace(/\.yml$/, '')))
  return { raiz, artigos, obras, temas }
}

/** Links internos do corpo: [texto](/artigos/x), (/temas/y), (/trilhas/z). */
export function linksInternos({ linhas }: Artigo): { n: number; tipo: string; slug: string }[] {
  const links: { n: number; tipo: string; slug: string }[] = []
  for (const { n, texto } of linhas) {
    for (const m of texto.matchAll(/\]\(\/(artigos|temas|trilhas)\/([a-z0-9-]+)(?:#[^)]*)?\)/g)) {
      links.push({ n, tipo: m[1]!, slug: m[2]! })
    }
  }
  return links
}

/** Parágrafos do Catecismo citados no corpo ("CIC 638", "CIC 645-646", "CIC 1166, 2174"). */
export function paragrafosNoTexto({ linhas }: Artigo): { n: number; numero: number }[] {
  const saida: { n: number; numero: number }[] = []
  for (const { n, texto } of linhas) {
    for (const m of texto.matchAll(/CIC\s+((?:\d+(?:\s*-\s*\d+)?(?:\s*[,;]\s*(?=\d+(?![\p{L}\d]|,\d)))?)+)/gu)) {
      for (const parte of m[1]!.split(/[,;]/)) {
        const [a, b] = parte.split('-').map((x) => Number(x.trim()))
        if (!a) continue
        for (let k = a; k <= (b && b >= a && b - a < 60 ? b : a); k++) saida.push({ n, numero: k })
      }
    }
  }
  return saida
}

/** Faixas de parágrafos cobertas pelas referências "Catecismo da Igreja Católica, 638-658 (…)". */
export function paragrafosNasReferencias(referencias: { titulo?: string }[]): Set<number> {
  const cobertos = new Set<number>()
  for (const { titulo } of referencias) {
    if (!titulo?.startsWith('Catecismo')) continue
    const semParenteses = titulo.replace(/\([^)]*\)/g, '')
    for (const m of semParenteses.matchAll(/(\d+)(?:\s*-\s*(\d+))?/g)) {
      const a = Number(m[1])
      const b = m[2] ? Number(m[2]) : a
      for (let k = a; k <= b && k - a < 400; k++) cobertos.add(k)
    }
  }
  return cobertos
}

export function verificarAcervo(slug: string, artigo: Artigo, acervo: Acervo): Achado[] {
  const { dados } = artigo
  const achados: Achado[] = []
  const publicado = dados.status === 'publicado'
  const grave = publicado ? 'erro' : 'aviso'

  // Links internos: o destino existe e, se este artigo está no ar, também está
  for (const l of linksInternos(artigo)) {
    if (l.tipo === 'temas' && !acervo.temas.has(l.slug)) {
      achados.push({ gravidade: 'erro', linha: l.n, mensagem: `link para tema inexistente: /temas/${l.slug}` })
    }
    if (l.tipo !== 'artigos') continue
    const alvo = acervo.artigos.get(l.slug)
    if (!alvo) achados.push({ gravidade: 'erro', linha: l.n, mensagem: `link para artigo inexistente: /artigos/${l.slug}` })
    else if (publicado && alvo.status !== 'publicado') {
      achados.push({ gravidade: 'erro', linha: l.n, mensagem: `link para /artigos/${l.slug}, que não está publicado (daria 404 no site)` })
    }
  }

  // Obra
  if (dados.obra) {
    const obra = acervo.obras.get(dados.obra)
    if (!obra) achados.push({ gravidade: 'erro', mensagem: `obra "${dados.obra}" não existe em content/obras` })
    else {
      const repetida = [...acervo.artigos].filter(([s, a]) => s !== slug && a.obra === dados.obra && a.status === 'publicado').map(([s]) => s)
      if (repetida.length) achados.push({ gravidade: 'aviso', mensagem: `a obra "${dados.obra}" já abre ${repetida.join(', ')}` })
      if (obra.largura && obra.largura < 1200) {
        achados.push({ gravidade: 'aviso', mensagem: `a obra "${dados.obra}" tem só ${obra.largura} px de largura: a faixa fica ampliada; procure reprodução maior` })
      }
      if (obra.largura && obra.altura && obra.altura > obra.largura * PROPORCAO_VERTICAL && !obra.posicaoFaixa) {
        achados.push({ gravidade: 'aviso', mensagem: `a obra "${dados.obra}" é vertical e não tem posicaoFaixa: confira o recorte da faixa (npm run conferir)` })
      }
    }
  }

  // Busca: o Google corta títulos longos
  if (typeof dados.tituloBusca === 'string' && dados.tituloBusca.length > 60) {
    achados.push({ gravidade: 'aviso', mensagem: `tituloBusca com ${dados.tituloBusca.length} caracteres (o Google mostra uns 60)` })
  }

  // Parecer doutrinal
  const parecer = join(acervo.raiz, 'docs', 'pareceres', `${slug}.md`)
  if (publicado || dados.status === 'em-revisao') {
    if (!existsSync(parecer)) {
      achados.push({ gravidade: grave, mensagem: `falta o parecer doutrinal (docs/pareceres/${slug}.md)` })
    } else {
      const texto = readFileSync(parecer, 'utf8')
      const novo = !dados.publicadoEm || String(dados.publicadoEm) >= INICIO_REVISOR_INDEPENDENTE
      if (novo && !/^## Revisão independente/m.test(texto)) {
        achados.push({ gravidade: grave, mensagem: `o parecer não tem a seção "## Revisão independente" (docs/fluxo-artigo.md, passo 6)` })
      }
      if (/^- Voto:\s*desfavorável/m.test(texto)) achados.push({ gravidade: 'erro', mensagem: 'o parecer tem voto desfavorável' })
    }
    if (publicado && !/Parecer doutrinal interno/.test(dados.revisao?.notas ?? '')) {
      achados.push({ gravidade: 'aviso', mensagem: 'revisao.notas não registra o parecer doutrinal' })
    }
  }

  return achados
}
