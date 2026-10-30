/** Todos os artigos visíveis, do mais recente ao mais antigo. Base do índice, dos temas e da home. */
export function useArtigos() {
  return useAsyncData('artigos-visiveis', () =>
    queryCollection('artigos')
      .where('status', 'IN', statusVisiveis())
      .order('publicadoEm', 'DESC')
      .select('path', 'title', 'description', 'tema', 'secao', 'status', 'minutos', 'nivel', 'publicadoEm')
      .all(),
  )
}
