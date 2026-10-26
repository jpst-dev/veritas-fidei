/**
 * Status visíveis no site. Em produção, só o que passou pela revisão;
 * em desenvolvimento, tudo — com selo de status — para revisar no próprio layout.
 */
export function statusVisiveis(): string[] {
  return import.meta.dev ? ['rascunho', 'em-revisao', 'publicado'] : ['publicado']
}

/** Último segmento do caminho de um item de coleção (ex.: "temas/maria" → "maria"). */
export function slugDe(caminho: string): string {
  return caminho.split('/').filter(Boolean).pop() ?? caminho
}

const ROMANOS: [number, string][] = [
  [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I'],
]

/** Numeral romano para índices pequenos (capítulos, passos de trilha). */
export function romano(n: number): string {
  let resto = n
  let saida = ''
  for (const [valor, simbolo] of ROMANOS) {
    while (resto >= valor) {
      saida += simbolo
      resto -= valor
    }
  }
  return saida
}
