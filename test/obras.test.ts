import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { parse } from 'yaml'

// Confere o catálogo de obras (docs/imagens.md): dados revistos, imagens geradas e referências válidas
const RAIZ = process.cwd()
const PASTA = join(RAIZ, 'content', 'obras')
const obras = readdirSync(PASTA).map((arquivo) => ({
  slug: arquivo.replace(/\.yml$/, ''),
  dados: parse(readFileSync(join(PASTA, arquivo), 'utf8')) as Record<string, string>,
}))
const slugs = new Set(obras.map((o) => o.slug))

function obraDe(arquivo: string): string | undefined {
  return readFileSync(arquivo, 'utf8').match(/^obra:\s*(\S+)/m)?.[1]
}

describe('obras', () => {
  it.each(obras)('$slug está revista e tem as duas imagens', ({ slug, dados }) => {
    expect(JSON.stringify(dados)).not.toContain('REVISAR')
    for (const largura of [800, 1600]) expect(existsSync(join(RAIZ, 'public', 'obras', `${slug}-${largura}.webp`))).toBe(true)
    if (/^CC BY/i.test(dados.licenca)) expect(dados.credito).toBeTruthy()
  })

  it('todo tema aponta para uma obra existente', () => {
    const temas = join(RAIZ, 'content', 'temas')
    for (const arquivo of readdirSync(temas)) expect(slugs, arquivo).toContain(obraDe(join(temas, arquivo)))
  })

  it('a obra de cada artigo, quando houver, existe', () => {
    const artigos = join(RAIZ, 'content', 'artigos')
    for (const arquivo of readdirSync(artigos)) {
      const obra = obraDe(join(artigos, arquivo))
      if (obra) expect(slugs, arquivo).toContain(obra)
    }
  })

  it('as obras fixas da home existem', () => {
    for (const slug of ['jeronimo', 'tome', 'sao-paulo']) expect(slugs).toContain(slug)
  })
})
