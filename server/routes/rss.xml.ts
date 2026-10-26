import { queryCollection } from '@nuxt/content/server'

const escapar = (texto: string) =>
  texto.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

/** Feed RSS 2.0 com os artigos publicados. Gerado como arquivo estático no build. */
export default defineEventHandler(async (event) => {
  const { siteUrl } = useRuntimeConfig(event).public
  const artigos = await queryCollection(event, 'artigos')
    .where('status', '=', 'publicado')
    .order('publicadoEm', 'DESC')
    .limit(30)
    .all()

  const itens = artigos
    .map((a) => {
      const link = `${siteUrl}${a.path}`
      const data = a.publicadoEm ? `\n      <pubDate>${new Date(`${a.publicadoEm}T12:00:00Z`).toUTCString()}</pubDate>` : ''
      return `    <item>
      <title>${escapar(a.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <description>${escapar(a.description)}</description>${data}
    </item>`
    })
    .join('\n')

  setHeader(event, 'content-type', 'application/rss+xml; charset=utf-8')
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Veritas Fidei</title>
    <link>${siteUrl}</link>
    <description>Formação e defesa da fé católica</description>
    <language>pt-BR</language>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml" />
${itens}
  </channel>
</rss>
`
})
