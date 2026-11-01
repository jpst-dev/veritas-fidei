import { mkdirSync, mkdtempSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { type Acervo, linksInternos, paragrafosNasReferencias, paragrafosNoTexto, verificarAcervo } from '../scripts/verificar/acervo.ts'
import { fraseComReferencia, lerArtigo, padresSemObra } from '../scripts/verificar/artigo.ts'
import { extrairParagrafo, notasCitadas, notasDaPagina } from '../scripts/verificar/catecismo.ts'
import { arquivoDaFonte, avaliarCandidata, dimensoesDaSaida, licencaAceita, normalizarAutor, originalAparado } from '../scripts/verificar/obras.ts'

describe('obras: tamanho das imagens', () => {
  it('limita pela largura, sem ampliar', () => {
    expect(dimensoesDaSaida(4000, 3000, 1600)).toEqual({ width: 1600, height: 1200 })
    expect(dimensoesDaSaida(1000, 1265, 1600)).toEqual({ width: 1000, height: 1265 })
  })

  it('quadro vertical fica com 1600 de largura (antes ficava estreito)', () => {
    expect(dimensoesDaSaida(2845, 4701, 1600)).toEqual({ width: 1600, height: 2644 })
  })

  it('altura no máximo 2× a largura pedida', () => {
    expect(dimensoesDaSaida(1000, 5000, 1600)).toEqual({ width: 640, height: 3200 })
  })

  it('aparar margens converte o recorte da miniatura para a escala do original', () => {
    // original 2562 px, miniatura 1600 px, recorte de 1460x2078 na miniatura
    expect(originalAparado(2562, 1600, 1460, 2078)).toEqual({ largura: 2338, altura: 3327 })
    expect(dimensoesDaSaida(2338, 3327, 1600)).toEqual({ width: 1600, height: 2277 })
  })
})

describe('obras: Commons', () => {
  it('lê o arquivo da URL da fonte', () => {
    expect(arquivoDaFonte('https://commons.wikimedia.org/wiki/File:Matthias_Gr%C3%BCnewald_-_Resurrection.jpg')).toBe(
      'Matthias Grünewald - Resurrection.jpg',
    )
    expect(arquivoDaFonte('https://example.com/x.jpg')).toBeUndefined()
  })

  it('aceita só domínio público e CC sem NC/ND', () => {
    expect(licencaAceita('Public domain')).toBe(true)
    expect(licencaAceita('CC BY-SA 4.0')).toBe(true)
    expect(licencaAceita('CC0')).toBe(true)
    expect(licencaAceita('CC BY-NC-SA 2.0')).toBe(false)
    expect(licencaAceita('CC BY-ND 3.0')).toBe(false)
  })

  it('avalia a candidata', () => {
    const base = { arquivo: 'x.jpg', largura: 3000, altura: 2000, licenca: 'Public domain', autor: 'Caravaggio' }
    expect(avaliarCandidata(base)).toEqual({ avisos: [] })
    expect(avaliarCandidata({ ...base, licenca: 'CC BY-NC 2.0' }).recusada).toMatch(/não aceita/)
    expect(avaliarCandidata({ ...base, largura: 800, altura: 1000 }).avisos).toEqual([
      'só 800 px de largura (mínimo 1600)',
      'vertical: a faixa vai precisar de posicaoFaixa',
    ])
    expect(avaliarCandidata({ ...base, licenca: 'CC BY-SA 3.0' }).avisos).toContain('exige crédito (CC BY)')
    expect(avaliarCandidata(base, ['Michelangelo Merisi da Caravaggio', 'caravaggio']).avisos).toContain('artista já usado neste tema')
  })

  it('compara artistas sem acento nem complementos', () => {
    expect(normalizarAutor('Pieter Bruegel, o Velho')).toBe(normalizarAutor('pieter bruegel the elder'))
    expect(normalizarAutor('Matthias Grünewald (c. 1470–1528)')).toBe('matthias grunewald')
  })
})

describe('Catecismo: notas de rodapé', () => {
  const html =
    '<p><b>650.</b> Os Santos Padres «une as duas partes» (577).</p><p><b>651.</b> Outro (578).</p><hr />' +
    '<p>576. Cf. <i>Mc</i> 8, 31.</p><p>1. Cf. <i>Mc</i> 1, 1.</p><p>2. Cf. Lc 1, 68. 3.Cf. Lc 1, 55. 4 Cf. Mc 1, 11.</p>' +
    '<p>5. S&atilde;o Greg&oacute;rio de Nissa, De tridui spatio (PG 46, 417B).</p>'

  it('o último parágrafo da página não leva as notas junto', () => {
    expect(extrairParagrafo(html, 651)).toBe('Outro (578).')
  })

  it('lê as notas em sequência, tolerando "3.Cf." e "4 Cf."', () => {
    const notas = notasDaPagina(html)
    expect(notas.get(1)).toBe('Cf. Mc 1, 1.')
    expect(notas.get(3)).toBe('Cf. Lc 1, 55.')
    expect(notas.get(4)).toBe('Cf. Mc 1, 11.')
    expect(notas.get(5)).toBe('São Gregório de Nissa, De tridui spatio (PG 46, 417B).')
  })

  it('acha as notas citadas num parágrafo', () => {
    expect(notasCitadas('«une as duas partes» (577). Ver (578 ).')).toEqual([577, 578])
  })
})

describe('acervo', () => {
  const artigo = (corpo: string, dados = 'status: publicado\npublicadoEm: 2026-11-05') =>
    lerArtigo(`---\ntitle: X\n${dados}\n---\n${corpo}`)

  it('acha links internos', () => {
    expect(linksInternos(artigo('Veja [A](/artigos/a-volta-de-cristo) e [B](/temas/maria#x).'))).toEqual([
      { n: 6, tipo: 'artigos', slug: 'a-volta-de-cristo' },
      { n: 6, tipo: 'temas', slug: 'maria' },
    ])
  })

  it('lê os parágrafos do Catecismo citados sem confundir com a Bíblia', () => {
    const numeros = paragrafosNoTexto(artigo('(CIC 638; 1Cor 15,14) e (CIC 645-646) e (CIC 2174, 2175; Mt 1,1).')).map((p) => p.numero)
    expect(numeros).toEqual([638, 645, 646, 2174, 2175])
  })

  it('lê as faixas das referências, ignorando o que está entre parênteses', () => {
    const cobertos = paragrafosNasReferencias([{ titulo: 'Catecismo da Igreja Católica, 638-640 e 1013 (ao terceiro dia)' }, { titulo: 'Outro, 5' }])
    expect([...cobertos]).toEqual([638, 639, 640, 1013])
  })

  function acervoFalso(): Acervo {
    const raiz = mkdtempSync(join(tmpdir(), 'acervo-'))
    mkdirSync(join(raiz, 'docs', 'pareceres'), { recursive: true })
    writeFileSync(join(raiz, 'docs', 'pareceres', 'novo.md'), '# Parecer\n- Voto: favorável\n')
    writeFileSync(join(raiz, 'docs', 'pareceres', 'antigo.md'), '# Parecer\n- Voto: favorável\n')
    return {
      raiz,
      artigos: new Map([
        ['novo', { status: 'publicado', obra: 'tome' }],
        ['vizinho', { status: 'publicado', obra: 'tome' }],
        ['rascunho', { status: 'rascunho' }],
      ]),
      obras: new Map([
        ['tome', { largura: 1600, altura: 1200 }],
        ['estreita', { largura: 900, altura: 1600 }],
      ]),
      temas: new Set(['maria']),
    }
  }

  it('acusa link para artigo inexistente ou não publicado', () => {
    const msgs = verificarAcervo('novo', artigo('[a](/artigos/nao-existe) [b](/artigos/rascunho) [c](/temas/nada)'), acervoFalso()).map((a) => a.mensagem)
    expect(msgs).toContain('link para artigo inexistente: /artigos/nao-existe')
    expect(msgs).toContain('link para /artigos/rascunho, que não está publicado (daria 404 no site)')
    expect(msgs).toContain('link para tema inexistente: /temas/nada')
  })

  it('avisa obra repetida, estreita ou vertical sem recorte', () => {
    const acervo = acervoFalso()
    expect(verificarAcervo('novo', artigo('x', 'status: rascunho\nobra: tome'), acervo).map((a) => a.mensagem)).toContain(
      'a obra "tome" já abre vizinho',
    )
    const msgs = verificarAcervo('novo', artigo('x', 'status: rascunho\nobra: estreita'), acervo).map((a) => a.mensagem)
    expect(msgs.some((m) => m.includes('só 900 px'))).toBe(true)
    expect(msgs.some((m) => m.includes('vertical e não tem posicaoFaixa'))).toBe(true)
  })

  it('exige o parecer com a revisão independente nos artigos novos', () => {
    const acervo = acervoFalso()
    const novo = verificarAcervo('novo', artigo('x'), acervo)
    expect(novo.some((a) => a.gravidade === 'erro' && a.mensagem.includes('Revisão independente'))).toBe(true)
    const antigo = verificarAcervo('antigo', artigo('x', 'status: publicado\npublicadoEm: 2026-10-30'), acervo)
    expect(antigo.some((a) => a.mensagem.includes('Revisão independente'))).toBe(false)
    const semParecer = verificarAcervo('sem', artigo('x'), acervo)
    expect(semParecer.some((a) => a.gravidade === 'erro' && a.mensagem.includes('falta o parecer'))).toBe(true)
  })
})

describe('npm run biblia: frase do artigo', () => {
  it('pega a frase que termina na referência', () => {
    const t = 'Primeira frase (Mt 1,1). Jesus aparece com as portas fechadas (Jo 20,19), não é reconhecido por Maria (Jo 20,14-15).'
    expect(fraseComReferencia(t, 'Jo 20,19')).toBe('Jesus aparece com as portas fechadas')
    expect(fraseComReferencia(t, 'Jo 20,14-15')).toBe('não é reconhecido por Maria')
    expect(fraseComReferencia(t, 'Mt 1,1')).toBe('Primeira frase')
  })
})

describe('verificador: Padre sem obra', () => {
  const artigo = (corpo: string) => lerArtigo(`---\ntitle: X\n---\n${corpo}`)
  it('avisa Padre em destaque citado só pelo Catecismo', () => {
    expect(padresSemObra(artigo('- **São Cipriano** chama de “sacramento duplo” (CIC 1290).'))).toHaveLength(1)
  })
  it('aceita quando a obra vem em itálico', () => {
    expect(padresSemObra(artigo('- **São Cipriano** fala de “sacramento duplo” (São Cipriano, *Carta* 73, 21, citado em CIC 1290).'))).toHaveLength(0)
    expect(padresSemObra(artigo('- **Santo Inácio** escreve aos fiéis (Santo Inácio, *Carta aos Esmirnenses*, 7,1).'))).toHaveLength(0)
  })
  it('não confunde "**São palavras…**" com o nome de um santo', () => {
    expect(padresSemObra(artigo('- **São palavras da Aliança.** Deus lembra o que fez (CIC 2061).'))).toHaveLength(0)
  })
})
