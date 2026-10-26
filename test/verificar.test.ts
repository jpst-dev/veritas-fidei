import { describe, expect, it } from 'vitest'
import { citacoesDoCatecismo, lerArtigo, verificarEstrutura, verificarFormato } from '../scripts/verificar/artigo.ts'
import { verificarReferencias } from '../scripts/verificar/biblia.ts'
import { extrairParagrafo, trechosAusentes, urlDoParagrafo } from '../scripts/verificar/catecismo.ts'

const mensagens = (texto: string) => verificarReferencias(texto).map((p) => p.mensagem)

describe('referências bíblicas', () => {
  it('aceita o padrão CNBB', () => {
    expect(mensagens('(Jo 6,55; 1Cor 11,27; Jo 6,53-56; Sl 23,1; Eclo 3,30)')).toEqual([])
  })

  it('acusa espaço no número do livro', () => {
    expect(mensagens('(1 Cor 11,27)')).toEqual(['use "1Cor" (sem espaço)'])
    expect(mensagens('(I Cor 11,27)')).toEqual(['use "1Cor" (sem espaço)'])
  })

  it('acusa dois-pontos', () => {
    expect(mensagens('(Jo 6:55)')).toEqual(['use vírgula: "Jo 6,55"'])
  })

  it('acusa siglas de outras traduções e nomes por extenso', () => {
    expect(mensagens('(Mat 5,3)')).toEqual(['use a sigla da CNBB "Mt"'])
    expect(mensagens('(João 6,55)')).toEqual(['use a sigla "Jo" na referência'])
  })

  it('acusa capítulo inexistente', () => {
    expect(mensagens('(Jo 22,1)')).toEqual(['João tem 21 capítulo(s)'])
  })

  it('não confunde o artigo "Os" com Oseias', () => {
    expect(mensagens('Os 12 apóstolos estavam reunidos.')).toEqual([])
  })
})

describe('Catecismo', () => {
  const html = '<p><b>1374.</b> O modo da presen&ccedil;a &eacute; &uacute;nico &laquo;Cristo completo&raquo; (204).</p><p><b>1375.</b> Outro.</p>'

  it('extrai o parágrafo e decodifica as entidades', () => {
    expect(extrairParagrafo(html, 1374)).toBe('O modo da presença é único «Cristo completo» (204).')
  })

  it('confere citação ignorando aspas, caixa e notas', () => {
    const fonte = extrairParagrafo(html, 1374)!
    expect(trechosAusentes('o modo da presença é único “Cristo completo”', fonte)).toEqual([])
    expect(trechosAusentes('O modo da presença […] Cristo completo', fonte)).toEqual([])
    expect(trechosAusentes('O modo da presença é diferente', fonte)).toEqual(['O modo da presença é diferente'])
  })

  it('encontra a página oficial do parágrafo', () => {
    expect(urlDoParagrafo(1374)).toMatch(/p2s2cap1_1210-1419_po\.html$/)
    expect(urlDoParagrafo(3000)).toBeUndefined()
  })
})

describe('artigo', () => {
  const artigo = lerArtigo(`---
title: A Eucaristia é Apenas um Símbolo Vazio?
secao: defesa-da-fe
status: publicado
---

## Introdução

Texto com "aspas retas" (CIC § 1374).

> No santíssimo sacramento da Eucaristia estão contidos…
>
> — CIC 1374
`)

  it('aponta título, seções e frontmatter fora do padrão', () => {
    const estrutura = verificarEstrutura(artigo).map((a) => a.mensagem)
    expect(estrutura).toContain('o artigo começa com título; a abertura vem sem título')
    expect(estrutura).toContain('seção "Introdução" fora do padrão')
    expect(estrutura).toContain('artigo da Defesa da fé sem "quaestio"')
    expect(estrutura.some((m) => m.startsWith('título em "Title Case"'))).toBe(true)
  })

  it('aponta formato de citação e aspas retas', () => {
    const formato = verificarFormato(artigo).map((a) => a.mensagem)
    expect(formato).toContain('"CIC § 1374": use "CIC 1374"')
    expect(formato).toContain('aspas retas ("…"); use aspas curvas (“…”)')
  })

  it('encontra a citação em bloco com a atribuição no fim', () => {
    expect(citacoesDoCatecismo(artigo)).toEqual([
      { linha: 11, texto: 'No santíssimo sacramento da Eucaristia estão contidos…', inicio: 1374, fim: 1374 },
    ])
  })
})
