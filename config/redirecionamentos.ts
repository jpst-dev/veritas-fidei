import { readFileSync } from 'node:fs'
import antigas from './urls-antigas.json'

/**
 * Redirecionamentos das URLs do site antigo (Vue SPA, até out/2026), extraídas do
 * router e de src/data/categories no commit 51d0b14.
 *
 * Calculados a cada build, porque dependem do que já está publicado:
 * - artigo publicado → o próprio artigo (301, definitivo);
 * - artigo ainda em rascunho → a página do tema, se ela já tem artigos; senão, /temas
 *   (302, provisório: quando o artigo sair, o destino muda).
 */
type Destino = string | null
type Redirect = { to: string; statusCode: 301 | 302 }

function frontMatter(slug: string): { status?: string; tema?: string } {
  try {
    const texto = readFileSync(`content/artigos/${slug}.md`, 'utf8')
    const campo = (nome: string) => texto.match(new RegExp(`^${nome}: (.+)$`, 'm'))?.[1]?.trim()
    return { status: campo('status'), tema: campo('tema') }
  } catch {
    return {}
  }
}

export function redirecionamentos() {
  const publicados = Object.values(antigas.artigos)
    .map(({ slug }) => ({ slug, ...frontMatter(slug) }))
    .filter((a) => a.status === 'publicado')
  const temasComArtigos = new Set(publicados.map((a) => a.tema))

  // Tema ou seção do site novo: só aponta para páginas que o build de fato gera
  const paraSecao = (destino: Destino): Redirect => {
    if (destino === 'defesa-da-fe') return { to: '/defesa-da-fe', statusCode: 301 }
    if (destino && temasComArtigos.has(destino)) return { to: `/temas/${destino}`, statusCode: 302 }
    return { to: '/temas', statusCode: 302 }
  }

  const regras: Record<string, { redirect: Redirect }> = {}
  const redirecionar = (de: string, para: Redirect) => (regras[de] = { redirect: para })

  for (const [de, { slug, tema }] of Object.entries(antigas.artigos)) {
    const publicado = publicados.some((a) => a.slug === slug)
    redirecionar(de, publicado ? { to: `/artigos/${slug}`, statusCode: 301 } : paraSecao(tema))
  }
  for (const [de, tema] of Object.entries(antigas.secoes as Record<string, Destino>)) redirecionar(de, paraSecao(tema))
  for (const [de, tema] of Object.entries(antigas.categorias as Record<string, Destino>)) redirecionar(de, paraSecao(tema))

  // Temas renomeados na revisão de 30/10/2026; tema ainda sem artigo não tem página
  const temaRenomeado = (novo: string): Redirect =>
    temasComArtigos.has(novo) ? { to: `/temas/${novo}`, statusCode: 301 } : { to: '/temas', statusCode: 302 }
  redirecionar('/temas/escritura-e-tradicao', temaRenomeado('biblia-e-tradicao'))
  redirecionar('/temas/filosofia', temaRenomeado('fe-e-razao'))
  redirecionar('/temas/novissimos', temaRenomeado('vida-eterna'))

  redirecionar('/explorar', { to: '/temas', statusCode: 301 })
  redirecionar('/topicos', { to: '/artigos', statusCode: 301 })
  redirecionar('/buscar', { to: '/artigos', statusCode: 301 })
  redirecionar('/tags', { to: '/temas', statusCode: 301 })
  redirecionar('/tags/**', { to: '/temas', statusCode: 301 })
  return regras
}
