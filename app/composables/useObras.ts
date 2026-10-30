/** Obras de arte do site (content/obras), indexadas pelo slug. */
export function useObras() {
  return useAsyncData('obras', async () => {
    const obras = await queryCollection('obras').all()
    return Object.fromEntries(obras.map((obra) => [slugDe(obra.stem), { ...obra, slug: slugDe(obra.stem) }]))
  })
}
