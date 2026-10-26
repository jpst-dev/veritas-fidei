/** Temas em ordem de leitura, com o slug extraído do nome do arquivo. */
export function useTemas() {
  return useAsyncData('temas', async () => {
    const temas = await queryCollection('temas').order('ordem', 'ASC').all()
    return temas.map((tema) => ({ ...tema, slug: slugDe(tema.stem) }))
  }, {
    transform: (temas) => ({
      lista: temas,
      nomes: Object.fromEntries(temas.map((t) => [t.slug, t.nome])) as Record<string, string>,
    }),
  })
}
