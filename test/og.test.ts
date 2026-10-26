import { describe, expect, it } from 'vitest'
import { ALTURA, LARGURA, artigo, padrao, png } from '../scripts/og'

/** Largura e altura gravadas no cabeçalho IHDR do PNG. */
function dimensoes(imagem: Buffer) {
  return { largura: imagem.readUInt32BE(16), altura: imagem.readUInt32BE(20) }
}

describe('imagens de compartilhamento', () => {
  it('gera a imagem padrão em 1200×630', async () => {
    expect(dimensoes(await png(padrao()))).toEqual({ largura: LARGURA, altura: ALTURA })
  })

  it('gera a imagem de um artigo com título longo sem mudar o tamanho', async () => {
    const imagem = await png(
      artigo({ titulo: 'Um título bem comprido para testar a quebra em várias linhas sem transbordar', secao: 'aprender', minutos: 9, nivel: 'avancado' }),
    )
    expect(dimensoes(imagem)).toEqual({ largura: LARGURA, altura: ALTURA })
  })
})
