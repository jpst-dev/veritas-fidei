import { describe, expect, it } from 'vitest'
import { citacoesDoCatecismo, lerArtigo, verificarEstrutura, verificarFormato } from '../scripts/verificar/artigo.ts'
import { verificarReferencias } from '../scripts/verificar/biblia.ts'
import { extrairParagrafo, trechosAusentes, urlDoParagrafo } from '../scripts/verificar/catecismo.ts'
import { extrairLivro, OMITIDO, referenciasBiblicas } from '../scripts/verificar/vulgata.ts'

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

  it('aceita o ponto em itálico dentro do negrito', () => {
    expect(extrairParagrafo('<p><b>510<i>. </i></b><i>Maria permaneceu.</i></p><p><b>511<i>. </i></b>Outro.</p>', 510)).toBe(
      'Maria permaneceu.',
    )
  })

  it('aceita o número com o ponto fora do negrito', () => {
    expect(extrairParagrafo('<p><b>1210</b>. Os sacramentos&#x2013;sete.</p><p><b>1211.</b> Outro.</p>', 1210)).toBe(
      'Os sacramentos–sete.',
    )
  })

  it('compara a grafia de Portugal com a do Brasil', () => {
    const fonte = 'Há na Igreja sete sacramentos: Baptismo, Confirmação e Matrimónio, objecto da acção de Cristo.'
    expect(trechosAusentes('sete sacramentos: Batismo, Confirmação e Matrimônio, objeto da ação de Cristo', fonte)).toEqual([])
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

  it('reserva o título em pergunta para a Defesa da fé', () => {
    const aprender = lerArtigo(`---
title: Quem é Deus?
secao: aprender
status: publicado
---

Texto.
`)
    const defesa = lerArtigo(`---
title: A Trindade foi inventada
secao: defesa-da-fe
---

Texto.
`)
    expect(verificarEstrutura(aprender)).toContainEqual({
      gravidade: 'erro',
      mensagem: 'título em pergunta fora da Defesa da fé; em Aprender o título afirma',
    })
    expect(verificarEstrutura(defesa).map((a) => a.mensagem).some((m) => m.startsWith('título em pergunta'))).toBe(false)
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

describe('Nova Vulgata', () => {
  const html =
    '<!--INIZIO TESTO--><p><a name="1"> 1</a>&nbsp;<br />&nbsp;Locutusque est Dominus <br />2 Tolle summam.<br />' +
    '(3) 4 Et ait: 5&#x201c; Ave &#x201d;. 6 benedixit ei</p><p><a name="2"> 2</a><br />1 Factum est.</p>'

  it('lê versículos sem número, no meio da linha, colados à aspa e omitidos', () => {
    const livro = extrairLivro(html)
    expect([...livro.get(1)!.keys()]).toEqual([1, 2, 3, 4, 5, 6])
    expect(livro.get(1)!.get(1)).toBe('Locutusque est Dominus')
    expect(livro.get(1)!.get(3)).toBe(OMITIDO)
    expect(livro.get(1)!.get(5)).toBe('“ Ave ”.')
    expect(livro.get(2)!.get(1)).toBe('Factum est.')
  })

  it('lê os Salmos pela numeração hebraica, sem confundir a da Vulgata', () => {
    const livro = extrairLivro('<a name="PSALMUS 105"> PSALMUS 105</a> (104)<br /> 1 <i>ALLELUIA</i>.<br /> Confitemini<br /> 2 Cantate')
    expect([...livro.keys()]).toEqual([105])
    expect(livro.get(105)!.get(1)).toBe('ALLELUIA . Confitemini')
  })

  it('expande as referências do texto', () => {
    const refs = referenciasBiblicas('(Gn 13,8; 14,14) e (Lc 1,42-43.48) e (Ap 11,19-12,1); Os 12 apóstolos')
    expect(refs.map((r) => r.texto)).toEqual(['Gn 13,8', 'Gn 14,14', 'Lc 1,42-43.48', 'Ap 11,19-12,1'])
    expect(refs[2]!.versiculos.map((v) => v.versiculo)).toEqual([42, 43, 48])
    expect(refs[3]!.versiculos).toEqual([
      { capitulo: 11, versiculo: 19 },
      { capitulo: 12, versiculo: 1 },
    ])
  })
})
