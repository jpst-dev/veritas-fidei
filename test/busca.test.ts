import { describe, expect, it } from 'vitest'
import { buscar, prepararIndice, termosDaBusca, textoPlano, type DocBusca } from '../app/utils/busca'

const doc = (path: string, title: string, description: string, texto: string): DocBusca => ({
  path, title, description, texto, tema: 'maria', secao: 'aprender', status: 'publicado',
})

const indice = prepararIndice([
  doc('/artigos/a', 'A Reforma e o Concílio de Trento', 'O que Lutero contestava e o que Trento respondeu.', 'Lutero afixou as teses. Lutero foi excomungado.'),
  doc('/artigos/b', 'Maria, Mãe de Deus', 'Por que a Igreja chama Maria de Mãe de Deus.', 'Os reformadores aceitavam Éfeso, e Lutero usava o título com naturalidade.'),
  doc('/artigos/c', 'O Batismo', 'O primeiro dos sacramentos.', 'O batismo apaga o pecado original. Batismos de desejo e de sangue.'),
  doc('/artigos/d', 'A Eucaristia', 'A presença real.', 'Transubstanciação é a palavra da Igreja para a conversão do pão.'),
])

describe('termosDaBusca', () => {
  it('normaliza acentos e caixa e ignora termos de uma letra', () => {
    expect(termosDaBusca('  Concílio  de   TRENTO a ')).toEqual(['concilio', 'de', 'trento'])
  })
})

describe('buscar', () => {
  it('acha no texto o que não está no título', () => {
    expect(buscar(indice, 'lutero').map((r) => r.path)).toEqual(['/artigos/a', '/artigos/b'])
  })

  it('ordena por relevância: título e resumo pesam mais que o texto', () => {
    expect(buscar(indice, 'maria')[0]!.path).toBe('/artigos/b')
  })

  it('exige todos os termos', () => {
    expect(buscar(indice, 'lutero efeso').map((r) => r.path)).toEqual(['/artigos/b'])
  })

  it('não diferencia acentos nem maiúsculas', () => {
    expect(buscar(indice, 'TRANSUBSTANCIACAO').map((r) => r.path)).toEqual(['/artigos/d'])
  })

  it('acha o singular a partir do plural', () => {
    expect(buscar(indice, 'batismos').map((r) => r.path)).toEqual(['/artigos/c'])
    expect(buscar(indice, 'sacramentos').map((r) => r.path)).toEqual(['/artigos/c'])
  })

  it('acha só no começo da palavra', () => {
    const idx = prepararIndice([doc('/f', 'A fé', 'x', 'y'), doc('/g', 'Éfeso', 'Refere-se a isso', 'y')])
    expect(buscar(idx, 'fé').map((r) => r.path)).toEqual(['/f'])
  })

  it('consulta vazia não traz nada', () => {
    expect(buscar(indice, '  ')).toEqual([])
  })
})

describe('trecho', () => {
  it('usa o resumo quando a palavra está nele', () => {
    const [r] = buscar(indice, 'contestava')
    expect(r!.trecho.map((p) => p.texto).join('')).toBe('O que Lutero contestava e o que Trento respondeu.')
  })

  it('marca a palavra encontrada com a grafia original', () => {
    const [r] = buscar(indice, 'transubstanciacao')
    expect(r!.trecho.filter((p) => p.marca).map((p) => p.texto)).toEqual(['Transubstanciação'])
  })

  it('corta trechos longos em palavra inteira, com reticências', () => {
    const longo = `${'palavra '.repeat(40)}Lutero ${'outra '.repeat(60)}`
    const [r] = buscar(prepararIndice([doc('/x', 'X', 'Y', longo)]), 'lutero')
    const texto = r!.trecho.map((p) => p.texto).join('')
    expect(texto.startsWith('…palavra')).toBe(true)
    expect(texto.endsWith('outra…')).toBe(true)
    expect(texto.length).toBeLessThan(260)
  })
})

describe('textoPlano', () => {
  it('extrai o texto de um corpo minimark', () => {
    const corpo = {
      type: 'minimark',
      value: [
        ['h2', { id: 'x' }, 'Título'],
        ['p', {}, 'Um ', ['strong', {}, 'texto'], ' corrido.'],
      ],
    }
    expect(textoPlano(corpo)).toBe('Título Um texto corrido.')
  })
})
