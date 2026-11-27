// Doações: só aparecem quando há pelo menos uma forma de apoio configurada (nuxt.config.ts)
export function useApoio() {
  const { pix, pixNome, pixCidade, apoiaSe } = useRuntimeConfig().public.apoio
  // Código "Pix copia e cola", que também vira o QR Code
  const pixCodigo = pix ? pixCopiaECola({ chave: pix, nome: pixNome || 'Veritas Fidei', cidade: pixCidade || 'BRASIL' }) : ''
  return { pix, pixNome, pixCodigo, apoiaSe, ativo: Boolean(pix || apoiaSe) }
}
