import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { parse } from 'yaml'

// YAML quebrado em tema, trilha ou obra some em silêncio no servidor de desenvolvimento e derruba o build
const arquivos = ['temas', 'trilhas', 'obras'].flatMap((pasta) =>
  readdirSync(join('content', pasta))
    .filter((f) => f.endsWith('.yml'))
    .map((f) => join('content', pasta, f)),
)

describe('YAML do conteúdo', () => {
  it.each(arquivos)('%s é válido', (arquivo) => {
    expect(() => parse(readFileSync(arquivo, 'utf8'))).not.toThrow()
  })
})
