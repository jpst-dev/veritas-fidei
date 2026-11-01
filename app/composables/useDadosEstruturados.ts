/**
 * Publica os dados estruturados da página (app/utils/dadosEstruturados.ts).
 * Recebe uma função para usar o siteUrl do runtimeConfig; o projeto entra sempre no grafo,
 * porque os outros nós apontam para ele.
 */
export function useDadosEstruturados(nos: (siteUrl: string) => Record<string, unknown>[]) {
  const { siteUrl } = useRuntimeConfig().public
  useHead({
    script: [
      {
        key: 'dados-estruturados',
        type: 'application/ld+json',
        innerHTML: jsonLd([projetoLd(siteUrl), ...nos(siteUrl)]),
      },
    ],
  })
}
