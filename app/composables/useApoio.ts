// Doações: só aparecem quando há pelo menos uma forma de apoio configurada (nuxt.config.ts)
export function useApoio() {
  const { pix, pixNome, apoiaSe } = useRuntimeConfig().public.apoio
  return { pix, pixNome, apoiaSe, ativo: Boolean(pix || apoiaSe) }
}
