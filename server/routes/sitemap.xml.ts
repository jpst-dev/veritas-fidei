import { queryCollection } from '@nuxt/content/server'

const PAGINAS = ['/', '/temas', '/trilhas', '/defesa-da-fe', '/artigos', '/sobre', '/creditos']

/** Sitemap com as páginas fixas, os temas e o que está publicado. Gerado como arquivo estático no build. */
export default defineEventHandler(async (event) => {
  const { siteUrl } = useRuntimeConfig(event).public
  const [temas, trilhas, artigos] = await Promise.all([
    queryCollection(event, 'temas').all(),
    queryCollection(event, 'trilhas').where('status', '=', 'publicado').all(),
    queryCollection(event, 'artigos').where('status', '=', 'publicado').all(),
  ])

  const entradas: { caminho: string; data?: string }[] = [
    ...PAGINAS.map((caminho) => ({ caminho })),
    ...temas.map((t) => ({ caminho: `/temas/${t.stem.split('/').pop()}` })),
    ...trilhas.map((t) => ({ caminho: `/trilhas/${t.stem.split('/').pop()}` })),
    ...artigos.map((a) => ({ caminho: a.path, data: a.publicadoEm })),
  ]

  const urls = entradas
    .map(({ caminho, data }) => {
      const loc = `${siteUrl}${caminho === '/' ? '' : caminho}`
      return `  <url>\n    <loc>${loc}</loc>${data ? `\n    <lastmod>${data}</lastmod>` : ''}\n  </url>`
    })
    .join('\n')

  setHeader(event, 'content-type', 'application/xml; charset=utf-8')
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`
})
