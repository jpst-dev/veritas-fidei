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

export const NIVEIS: Record<string, string> = {
  iniciante: 'Iniciante',
  intermediario: 'Intermediário',
  avancado: 'Avançado',
}

/** "1 artigo", "4 artigos". */
export function qtdArtigos(n: number): string {
  return `${n} ${n === 1 ? 'artigo' : 'artigos'}`
}

/** Texto sem acentos e em minúsculas, para buscas ("eucaristia" acha "Eucaristia"). */
export function semAcentos(texto: string): string {
  return texto.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase()
}

/** Ordem de leitura dentro de um tema: a da trilha, quando houver; o resto em ordem alfabética. */
export function ordemDeLeitura<T extends { path: string; title: string }>(artigos: T[], trilha?: { artigos: string[] }): T[] {
  const posicao = (a: T) => {
    const i = trilha?.artigos.indexOf(slugDe(a.path)) ?? -1
    return i === -1 ? Infinity : i
  }
  return [...artigos].sort((a, b) => posicao(a) - posicao(b) || a.title.localeCompare(b.title, 'pt-BR'))
}
