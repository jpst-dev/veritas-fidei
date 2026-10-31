import { queryCollection } from '@nuxt/content/server'
import { textoPlano, type DocBusca } from '../../app/utils/busca'

/**
 * Índice da busca: o texto corrido de cada artigo visível. Gerado como arquivo estático no
 * build e baixado pela página Artigos só quando alguém busca.
 */
export default defineEventHandler(async (event) => {
  // Como statusVisiveis() do app: em desenvolvimento entram os rascunhos, para revisar
  const status = import.meta.dev ? ['rascunho', 'em-revisao', 'publicado'] : ['publicado']
  const artigos = await queryCollection(event, 'artigos').where('status', 'IN', status).all()

  return artigos.map(
    (a): DocBusca => ({
      path: a.path,
      title: a.title,
      description: a.description,
      texto: textoPlano(a.body as { value?: unknown[] }),
      tema: a.tema,
      secao: a.secao,
      status: a.status,
      minutos: a.minutos,
      nivel: a.nivel,
    }),
  )
})
