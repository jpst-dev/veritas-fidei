import { parse } from 'yaml'
import { verificarReferencias } from './biblia.ts'

export type Gravidade = 'erro' | 'aviso'

export interface Achado {
  gravidade: Gravidade
  linha?: number
  mensagem: string
}

export interface CitacaoCIC {
  linha: number
  texto: string
  inicio: number
  fim: number
}

export interface Artigo {
  dados: Record<string, any>
  /** Linhas do corpo, com o número real no arquivo; blocos de código ficam de fora. */
  linhas: { n: number; texto: string }[]
}

export function lerArtigo(fonte: string): Artigo {
  const m = fonte.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/)
  const dados = m ? (parse(m[1]!) ?? {}) : {}
  const deslocamento = m ? m[0].split('\n').length - 1 : 0
  const linhas: Artigo['linhas'] = []
  let emCodigo = false
  fonte
    .slice(m ? m[0].length : 0)
    .split(/\r?\n/)
    .forEach((texto, i) => {
      if (/^\s*```/.test(texto)) emCodigo = !emCodigo
      else if (!emCodigo) linhas.push({ n: i + 1 + deslocamento, texto })
    })
  return { dados, linhas }
}

const PROIBIDOS = /^(introdução|conclusão|conclusões|referências|bibliografia|leitura recomendada|leituras recomendadas)$/i

const OBRIGATORIAS = {
  aprender: ['O que a Igreja ensina', 'Em resumo'],
  'defesa-da-fe': ['A objeção', 'O que a Igreja ensina', 'A resposta', 'Respondendo às objeções', 'Em resumo'],
} as const

const LIMITES = { aprender: [1200, 2500], 'defesa-da-fe': [900, 1800] } as const

/** Título em "Title Case": a maioria das palavras longas começa com maiúscula. */
/** Nomes que levam maiúscula em qualquer posição (nomes divinos, a Igreja, livros, sacramentos). */
const SEMPRE_MAIUSCULA = new Set([
  'Deus', 'Cristo', 'Jesus', 'Senhor', 'Espírito', 'Santo', 'Santa', 'Trindade', 'Pai', 'Filho', 'Maria',
  'Nossa', 'Senhora', 'Virgem', 'Igreja', 'Escritura', 'Escrituras', 'Sagrada', 'Bíblia', 'Evangelho',
  'Tradição', 'Magistério', 'Catecismo', 'Batismo', 'Confirmação', 'Crisma', 'Eucaristia', 'Penitência',
  'Confissão', 'Unção', 'Enfermos', 'Ordem', 'Matrimônio', 'Missa', 'Papa', 'Concílio', 'Apóstolos', 'Antigo', 'Novo', 'Testamento',
])

function pareceTitleCase(titulo: string): boolean {
  const palavras = titulo
    .split(/\s+/)
    .slice(1)
    .filter((p) => p.length >= 4 && !SEMPRE_MAIUSCULA.has(p.replace(/[^\p{L}]/gu, '')))
  const maiusculas = palavras.filter((p) => /^\p{Lu}/u.test(p))
  return palavras.length >= 3 && maiusculas.length / palavras.length > 0.6
}

export function verificarEstrutura({ dados, linhas }: Artigo): Achado[] {
  const achados: Achado[] = []
  const publicado = dados.status === 'publicado'
  const gravePublicado: Gravidade = publicado ? 'erro' : 'aviso'
  const secao = (dados.secao ?? 'aprender') as keyof typeof OBRIGATORIAS

  // Frontmatter
  if (typeof dados.title === 'string' && pareceTitleCase(dados.title)) {
    achados.push({ gravidade: gravePublicado, mensagem: `título em "Title Case"; use frase: "${dados.title}"` })
  }
  if (typeof dados.description === 'string' && dados.description.length > 160) {
    achados.push({ gravidade: gravePublicado, mensagem: `description com ${dados.description.length} caracteres (máximo 160)` })
  }
  if (!dados.nivel) achados.push({ gravidade: gravePublicado, mensagem: 'falta "nivel"' })
  if (publicado && !dados.publicadoEm) achados.push({ gravidade: 'erro', mensagem: 'falta "publicadoEm"' })
  if ((dados.referencias?.length ?? 0) < 3) {
    achados.push({ gravidade: gravePublicado, mensagem: `${dados.referencias?.length ?? 0} referência(s); mínimo 3` })
  }
  if (secao === 'defesa-da-fe' && !dados.quaestio) {
    achados.push({ gravidade: gravePublicado, mensagem: 'artigo da Defesa da fé sem "quaestio"' })
  }
  if (publicado && !(dados.revisao?.citacoesConferidas && dados.revisao?.referenciasConferidas)) {
    achados.push({ gravidade: 'erro', mensagem: 'publicado sem "revisao.citacoesConferidas" e "referenciasConferidas"' })
  }

  // Estrutura do corpo
  const conteudo = linhas.filter((l) => l.texto.trim())
  if (conteudo[0] && /^#{1,6}\s/.test(conteudo[0].texto)) {
    achados.push({ gravidade: 'erro', linha: conteudo[0].n, mensagem: 'o artigo começa com título; a abertura vem sem título' })
  }

  const titulos = linhas
    .map((l) => ({ ...l, m: l.texto.match(/^(#{1,6})\s+(.+?)\s*$/) }))
    .filter((l) => l.m)
    .map((l) => ({ n: l.n, nivel: l.m![1]!.length, texto: l.m![2]! }))

  for (const t of titulos) {
    if (t.nivel === 1) achados.push({ gravidade: 'erro', linha: t.n, mensagem: 'não use "#"; o título vem do frontmatter' })
    if (t.nivel >= 4) achados.push({ gravidade: 'erro', linha: t.n, mensagem: `não use "${'#'.repeat(t.nivel)}"; o limite é "###"` })
    if (PROIBIDOS.test(t.texto)) achados.push({ gravidade: 'erro', linha: t.n, mensagem: `seção "${t.texto}" fora do padrão` })
    if (pareceTitleCase(t.texto)) achados.push({ gravidade: 'aviso', linha: t.n, mensagem: `título em "Title Case": "${t.texto}"` })
  }

  const secoes = titulos.filter((t) => t.nivel === 2)
  if (secoes.length > 6) achados.push({ gravidade: 'erro', mensagem: `${secoes.length} seções "##" (máximo 6)` })
  for (const nome of OBRIGATORIAS[secao] ?? []) {
    if (!secoes.some((s) => s.texto === nome)) {
      achados.push({ gravidade: gravePublicado, mensagem: `falta a seção "## ${nome}"` })
    }
  }

  const palavras = conteudo.map((l) => l.texto).join(' ').split(/\s+/).filter(Boolean).length
  const [min, max] = LIMITES[secao] ?? LIMITES.aprender
  if (palavras < min || palavras > max) {
    achados.push({ gravidade: 'aviso', mensagem: `${palavras} palavras (o padrão é de ${min} a ${max})` })
  }

  return achados
}

export function verificarFormato({ linhas }: Artigo): Achado[] {
  const achados: Achado[] = []
  for (const { n, texto } of linhas) {
    if (/^#{1,6}\s/.test(texto)) continue

    for (const p of verificarReferencias(texto)) {
      achados.push({ gravidade: 'erro', linha: n, mensagem: `"${p.trecho}": ${p.mensagem}` })
    }

    for (const m of texto.matchAll(/\b(CIC|Catecismo(?: da Igreja Católica)?)\s*,?\s*(?:§+|n\.?º?|parágrafos?)\s*(\d+)/g)) {
      achados.push({ gravidade: 'erro', linha: n, mensagem: `"${m[0]}": use "CIC ${m[2]}"` })
    }
    for (const m of texto.matchAll(/\bCIC,\s*(\d+)/g)) {
      achados.push({ gravidade: 'erro', linha: n, mensagem: `"${m[0]}": use "CIC ${m[1]}"` })
    }

    if (/"[^"\s][^"]*"/.test(texto.replace(/`[^`]*`/g, '').replace(/\]\([^)]*\)/g, ''))) {
      achados.push({ gravidade: 'aviso', linha: n, mensagem: 'aspas retas ("…"); use aspas curvas (“…”)' })
    }
  }
  return achados
}

/**
 * Citações literais do Catecismo:
 * - bloco `>` terminado em "— CIC 1374" (o padrão);
 * - trecho entre aspas seguido de "(CIC 1374)" no mesmo parágrafo.
 */
export function citacoesDoCatecismo({ linhas }: Artigo): CitacaoCIC[] {
  const citacoes: CitacaoCIC[] = []
  const REF = /CIC\s*,?\s*§*\s*(\d+)(?:\s*-\s*(\d+))?/

  // Blocos de citação
  for (let i = 0; i < linhas.length; i++) {
    if (!linhas[i]!.texto.startsWith('>')) continue
    const bloco: typeof linhas = []
    while (i < linhas.length && linhas[i]!.texto.startsWith('>')) bloco.push(linhas[i++]!)
    const texto = bloco.map((l) => l.texto.replace(/^>\s?/, '')).join(' ').trim()
    const atribuicao = texto.match(new RegExp(`(?:—|\\()\\s*${REF.source}\\)?\\s*$`))
    if (!atribuicao) continue
    const inicio = Number(atribuicao[1])
    citacoes.push({
      linha: bloco[0]!.n,
      texto: texto.slice(0, atribuicao.index).replace(/^[“"«]|[”"»]\s*$/g, '').trim(),
      inicio,
      fim: atribuicao[2] ? Number(atribuicao[2]) : inicio,
    })
  }

  // Citações no texto corrido
  for (const { n, texto } of linhas) {
    if (texto.startsWith('>')) continue
    for (const m of texto.matchAll(new RegExp(`[“"«]([^”"»]{15,})[”"»][^“"«(]{0,40}\\(\\s*${REF.source}[^)]*\\)`, 'g'))) {
      const inicio = Number(m[2])
      citacoes.push({ linha: n, texto: m[1]!, inicio, fim: m[3] ? Number(m[3]) : inicio })
    }
  }

  return citacoes
}

/** Linhas com referências bíblicas: o corpo e a quaestio do frontmatter. */
export function textosComReferencias({ dados, linhas }: Artigo): { n?: number; texto: string }[] {
  const quaestio = dados.quaestio ? Object.values(dados.quaestio as Record<string, string>) : []
  return [...quaestio.map((texto) => ({ texto })), ...linhas]
}
