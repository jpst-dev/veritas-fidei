import { existsSync, readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { redirecionamentos } from '../config/redirecionamentos'
import antigas from '../config/urls-antigas.json'

// As URLs do site antigo nunca podem cair num 404 do site novo
const regras = Object.entries(redirecionamentos())
const publicado = (slug: string) => /^status: publicado$/m.test(readFileSync(`content/artigos/${slug}.md`, 'utf8'))

describe('redirecionamentos do site antigo', () => {
  it('cobre todos os tópicos, subcategorias e categorias antigas', () => {
    const total = Object.keys(antigas.artigos).length + Object.keys(antigas.secoes).length + Object.keys(antigas.categorias).length
    expect(regras.length).toBe(total + 5)
  })

  it('aponta só temas que existem', () => {
    const temas = [...Object.values(antigas.artigos).map((a) => a.tema), ...Object.values(antigas.secoes), ...Object.values(antigas.categorias)]
    for (const tema of temas.filter((t): t is string => !!t && t !== 'defesa-da-fe')) {
      expect(existsSync(`content/temas/${tema}.yml`), tema).toBe(true)
    }
  })

  it.each(regras)('%s leva a uma página gerada', (_, { redirect }) => {
    const artigo = redirect.to.match(/^\/artigos\/(.+)$/)?.[1]
    if (artigo) return expect(publicado(artigo)).toBe(true)
    const tema = redirect.to.match(/^\/temas\/(.+)$/)?.[1]
    if (tema) {
      const doTema = Object.values(antigas.artigos).filter((a) => a.tema === tema && existsSync(`content/artigos/${a.slug}.md`))
      return expect(doTema.some((a) => publicado(a.slug))).toBe(true)
    }
    expect(['/temas', '/artigos', '/defesa-da-fe']).toContain(redirect.to)
  })

  it('artigo publicado vai para ele mesmo, com 301', () => {
    const [, regra] = regras.find(([de]) => de === '/explorar/doutrina/doutrina-1/1')!
    expect(regra.redirect).toEqual({ to: '/artigos/santissima-trindade', statusCode: 301 })
  })
})
