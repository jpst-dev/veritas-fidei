/**
 * Dados estruturados (schema.org em JSON-LD): o leitor não vê; o Google lê para
 * mostrar o nome do site, o caminho (tema › artigo), a imagem e as datas no resultado.
 * Funções puras; as páginas publicam com useDadosEstruturados().
 */

export const NOME_DO_SITE = 'Veritas Fidei'

type No = Record<string, unknown>

/** O projeto como organização: assina e publica os artigos. */
export function projetoLd(siteUrl: string): No {
  return { '@type': 'Organization', '@id': `${siteUrl}/#projeto`, name: NOME_DO_SITE, url: `${siteUrl}/` }
}

/** O site, para o Google mostrar "Veritas Fidei" no resultado em vez do domínio. */
export function siteLd(siteUrl: string): No {
  return {
    '@type': 'WebSite',
    '@id': `${siteUrl}/#site`,
    name: NOME_DO_SITE,
    url: `${siteUrl}/`,
    inLanguage: 'pt-BR',
    publisher: { '@id': `${siteUrl}/#projeto` },
  }
}

export interface Migalha {
  nome: string
  /** Caminho da página; o último item (a própria página) pode ficar sem. */
  path?: string
}

/** Caminho até a página ("Veritas Fidei › Sacramentos › Artigo"), começando pelo início. */
export function migalhasLd(siteUrl: string, itens: Migalha[]): No {
  const todos: Migalha[] = [{ nome: NOME_DO_SITE, path: '/' }, ...itens]
  return {
    '@type': 'BreadcrumbList',
    itemListElement: todos.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.nome,
      ...(item.path && { item: `${siteUrl}${item.path === '/' ? '/' : item.path}` }),
    })),
  }
}

export interface ArtigoLd {
  path: string
  title: string
  description: string
  publicadoEm?: string
  atualizadoEm?: string
  /** URL absoluta da imagem de compartilhamento. */
  imagem: string
  /** Nome do tema, como seção do artigo. */
  tema: string
}

export function artigoLd(siteUrl: string, artigo: ArtigoLd): No {
  const url = `${siteUrl}${artigo.path}`
  const publicado = artigo.publicadoEm
  return {
    '@type': 'Article',
    '@id': `${url}#artigo`,
    mainEntityOfPage: url,
    url,
    headline: artigo.title,
    description: artigo.description,
    image: [artigo.imagem],
    ...(publicado && { datePublished: publicado }),
    ...((artigo.atualizadoEm ?? publicado) && { dateModified: artigo.atualizadoEm ?? publicado }),
    author: { '@id': `${siteUrl}/#projeto` },
    publisher: { '@id': `${siteUrl}/#projeto` },
    articleSection: artigo.tema,
    inLanguage: 'pt-BR',
    isAccessibleForFree: true,
  }
}

/**
 * O conteúdo do <script type="application/ld+json">: um grafo com os nós da página.
 * "<" vira < para nenhum título fechar a tag do script.
 */
export function jsonLd(nos: No[]): string {
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': nos }).replace(/</g, '\\u003c')
}
