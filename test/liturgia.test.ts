import { describe, expect, it } from 'vitest'
import { batismoDoSenhor, diaLiturgico, pascoa, primeiroDomingoDoAdvento } from '../app/utils/liturgia'

/** Data local (como o navegador a teria), para testar a função como ela é usada. */
const em = (iso: string) => {
  const [a, m, d] = iso.split('-').map(Number)
  return new Date(a!, m! - 1, d!)
}
const iso = (d: Date) => d.toISOString().slice(0, 10)

describe('datas móveis', () => {
  it.each([
    [2024, '2024-03-31'],
    [2025, '2025-04-20'],
    [2026, '2026-04-05'],
    [2027, '2027-03-28'],
  ])('Páscoa de %i', (ano, esperado) => {
    expect(iso(pascoa(ano))).toBe(esperado)
  })

  it('1º Domingo do Advento cai entre 27/11 e 03/12', () => {
    expect(iso(primeiroDomingoDoAdvento(2026))).toBe('2026-11-29')
    expect(iso(primeiroDomingoDoAdvento(2027))).toBe('2027-11-28')
  })

  it('Batismo do Senhor segue a transferência da Epifania no Brasil', () => {
    expect(iso(batismoDoSenhor(2026))).toBe('2026-01-11') // Epifania em 04/01
    expect(iso(batismoDoSenhor(2024))).toBe('2024-01-08') // Epifania em 07/01 → segunda-feira
  })
})

describe('diaLiturgico', () => {
  it.each([
    ['2026-10-26', 'comum', 'verde', 'Tempo Comum · 30ª semana'],
    ['2026-02-17', 'comum', 'verde', 'Tempo Comum · 6ª semana'],
    ['2026-05-25', 'comum', 'verde', 'Tempo Comum · 8ª semana'],
    ['2026-01-12', 'comum', 'verde', 'Tempo Comum · 1ª semana'],
    ['2026-11-29', 'advento', 'roxo', 'Advento · 1ª semana'],
    ['2026-12-24', 'advento', 'roxo', 'Advento · 4ª semana'],
    ['2026-12-25', 'natal', 'branco', 'Tempo do Natal'],
    ['2027-01-05', 'natal', 'branco', 'Tempo do Natal'],
    ['2026-02-18', 'quaresma', 'roxo', 'Quaresma · Cinzas'],
    ['2026-02-22', 'quaresma', 'roxo', 'Quaresma · 1ª semana'],
    ['2026-03-29', 'quaresma', 'vermelho', 'Semana Santa'],
    ['2026-04-02', 'quaresma', 'branco', 'Tríduo Pascal'],
    ['2026-04-03', 'quaresma', 'vermelho', 'Sexta-feira Santa'],
    ['2026-04-05', 'pascoa', 'branco', 'Tempo Pascal · 1ª semana'],
    ['2026-05-24', 'pascoa', 'vermelho', 'Pentecostes'],
  ])('%s → %s (%s)', (dia, tempo, cor, rotulo) => {
    expect(diaLiturgico(em(dia))).toMatchObject({ tempo, cor, rotulo })
  })
})
