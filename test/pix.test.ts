import { describe, expect, it } from 'vitest'
import { crc16, pixCopiaECola } from '../app/utils/pix'

describe('Pix copia e cola', () => {
  it('reproduz o exemplo do manual do Banco Central', () => {
    expect(
      pixCopiaECola({ chave: '123e4567-e12b-12d1-a456-426655440000', nome: 'Fulano de Tal', cidade: 'BRASILIA' }),
    ).toBe(
      '00020126580014br.gov.bcb.pix0136123e4567-e12b-12d1-a456-4266554400005204000053039865802BR5913Fulano de Tal6008BRASILIA62070503***63041D3D',
    )
  })

  it('termina com o CRC do próprio conteúdo', () => {
    const codigo = pixCopiaECola({ chave: 'a@b.com', nome: 'João', cidade: 'São Paulo' })
    expect(codigo.slice(-4)).toBe(crc16(codigo.slice(0, -4)))
  })

  it('tira acentos e corta nome e cidade no limite', () => {
    const codigo = pixCopiaECola({ chave: 'x', nome: 'João Teixeira de Albuquerque Neto', cidade: 'São José dos Campos' })
    expect(codigo).toContain('5925Joao Teixeira de Albuquer')
    expect(codigo).toContain('6015Sao Jose dos Ca62')
  })
})
