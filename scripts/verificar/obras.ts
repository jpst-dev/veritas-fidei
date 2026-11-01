/**
 * Regras do catálogo de obras (docs/imagens.md) usadas pelo `npm run obra`,
 * pelo `npm run commons` e pelo verificador.
 */

/** Largura mínima de uma reprodução para a faixa do artigo não ficar ampliada. */
export const LARGURA_MINIMA = 1600

/** Quadros com altura maior que isto × a largura são "verticais": a faixa (~2:1) corta muito. */
export const PROPORCAO_VERTICAL = 1.15

/** Licenças aceitas sem pedir autorização (docs/imagens.md, seção 2). */
export const LICENCAS = [/^Public domain$/i, /^PD/i, /^CC0/i, /^CC BY(-SA)? \d/i]

export function licencaAceita(licenca: string): boolean {
  return LICENCAS.some((re) => re.test(licenca.trim()))
}

export function exigeCredito(licenca: string): boolean {
  return /^CC BY/i.test(licenca.trim())
}

/** Nome do arquivo no Commons a partir da URL do campo `fonte`. */
export function arquivoDaFonte(fonte: string): string | undefined {
  const m = fonte.match(/\/wiki\/File:([^?#]+)/)
  return m ? decodeURIComponent(m[1]!).replace(/_/g, ' ') : undefined
}

/**
 * Tamanho de saída de uma imagem: limitada pela largura (sem ampliar) e com a
 * altura no máximo 2× a largura pedida, para quadros muito verticais.
 */
export function dimensoesDaSaida(largura: number, altura: number, alvo: number): { width: number; height: number } {
  let width = Math.min(alvo, largura)
  let height = Math.round((width * altura) / largura)
  if (height > alvo * 2) {
    height = alvo * 2
    width = Math.round((height * largura) / altura)
  }
  return { width, height }
}

/**
 * Tamanho equivalente no original depois de aparar as margens da miniatura baixada
 * (`npm run obra -- --aparar`): a miniatura tem `larguraMiniatura` px, o original
 * `larguraOriginal`, e a parte aproveitada mede `largura` x `altura` na miniatura.
 */
export function originalAparado(larguraOriginal: number, larguraMiniatura: number, largura: number, altura: number): { largura: number; altura: number } {
  const fator = larguraOriginal / larguraMiniatura
  return { largura: Math.round(largura * fator), altura: Math.round(altura * fator) }
}

export interface Candidata {
  arquivo: string
  largura: number
  altura: number
  licenca: string
  autor?: string
}

/** Problemas e cuidados de uma candidata, em português, para a lista do `npm run commons`. */
export function avaliarCandidata(c: Candidata, autoresDoTema: string[] = []): { recusada?: string; avisos: string[] } {
  const avisos: string[] = []
  if (!licencaAceita(c.licenca)) return { recusada: `licença "${c.licenca}" não aceita`, avisos }
  if (exigeCredito(c.licenca)) avisos.push('exige crédito (CC BY)')
  if (c.largura < LARGURA_MINIMA) avisos.push(`só ${c.largura} px de largura (mínimo ${LARGURA_MINIMA})`)
  if (c.altura > c.largura * PROPORCAO_VERTICAL) avisos.push('vertical: a faixa vai precisar de posicaoFaixa')
  if (c.largura > c.altura * 2.6) avisos.push('muito larga: nos cartões 3:4 sobra só o centro')
  const autor = normalizarAutor(c.autor ?? '')
  if (autor && autoresDoTema.some((a) => normalizarAutor(a) === autor)) avisos.push('artista já usado neste tema')
  return { avisos }
}

/** Compara nomes de artistas sem acento, caixa nem complementos ("o Velho", "(1475-1564)"). */
export function normalizarAutor(nome: string): string {
  return nome
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .toLowerCase()
    .replace(/\(.*?\)/g, ' ')
    .replace(/,?\s+(o velho|o jovem|the elder|the younger|il vecchio|der altere)\b/g, ' ')
    .replace(/[^a-z ]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}
