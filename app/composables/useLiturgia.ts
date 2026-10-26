import { diaLiturgico, type DiaLiturgico } from '~/utils/liturgia'

/**
 * Dia litúrgico compartilhado. No build ele é calculado para a data do build;
 * no navegador, o plugin `liturgia.client` recalcula para a data de hoje.
 */
export function useLiturgia() {
  return useState<DiaLiturgico>('liturgia', () => diaLiturgico())
}
