import { describe, expect, it } from 'vitest'
import { artigoLd, jsonLd, migalhasLd, projetoLd, siteLd } from '../app/utils/dadosEstruturados'

const SITE = 'https://veritas.jteixeira.dev'

describe('dados estruturados', () => {
  it('liga o site e o artigo ao projeto pelo mesmo @id', () => {
    const projeto = projetoLd(SITE)
    const artigo = artigoLd(SITE, {
      path: '/artigos/a-presenca-real-na-eucaristia',
      title: 'A presença real de Cristo na Eucaristia',
      description: 'Resumo.',
      publicadoEm: '2026-05-01',
      imagem: `${SITE}/og/artigos/a-presenca-real-na-eucaristia.png`,
      tema: 'Sacramentos',
    })
    expect(siteLd(SITE).publisher).toEqual({ '@id': projeto['@id'] })
    expect(artigo.author).toEqual({ '@id': projeto['@id'] })
    expect(artigo.url).toBe(`${SITE}/artigos/a-presenca-real-na-eucaristia`)
  })

  it('usa a data de publicação como modificação quando o artigo não foi atualizado', () => {
    const base = { path: '/artigos/x', title: 'X', description: 'Y', imagem: `${SITE}/og/padrao.png`, tema: 'Moral' }
    expect(artigoLd(SITE, { ...base, publicadoEm: '2026-05-01' }).dateModified).toBe('2026-05-01')
    expect(artigoLd(SITE, { ...base, publicadoEm: '2026-05-01', atualizadoEm: '2026-09-10' }).dateModified).toBe('2026-09-10')
    expect(artigoLd(SITE, base)).not.toHaveProperty('datePublished')
  })

  it('numera as migalhas a partir do início e deixa a última sem link', () => {
    const lista = migalhasLd(SITE, [{ nome: 'Sacramentos', path: '/temas/sacramentos' }, { nome: 'Artigo' }])
    expect(lista.itemListElement).toEqual([
      { '@type': 'ListItem', position: 1, name: 'Veritas Fidei', item: `${SITE}/` },
      { '@type': 'ListItem', position: 2, name: 'Sacramentos', item: `${SITE}/temas/sacramentos` },
      { '@type': 'ListItem', position: 3, name: 'Artigo' },
    ])
  })

  it('não deixa um título fechar a tag do script', () => {
    const saida = jsonLd([{ name: '</script><b>' }])
    expect(saida).not.toContain('</script>')
    expect(JSON.parse(saida)['@graph'][0].name).toBe('</script><b>')
  })
})
