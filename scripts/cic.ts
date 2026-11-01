/**
 * Mostra o texto oficial do Catecismo (vatican.va) com as notas de rodapé de
 * cada parágrafo, para conferir o que o artigo afirma e de onde vem uma
 * citação de Padre ou de concílio que o Catecismo traz.
 *
 *   npm run cic -- 638-658 1013
 *   npm run cic -- --artigo content/artigos/x.md   # todos os parágrafos citados no artigo
 */
import { readFile } from 'node:fs/promises'
import { paragrafosNoTexto } from './verificar/acervo.ts'
import { lerArtigo } from './verificar/artigo.ts'
import { paragrafosComNotas, urlDoParagrafo } from './verificar/catecismo.ts'

const args = process.argv.slice(2)
const i = args.indexOf('--artigo')
let faixas: [number, number][]
if (i >= 0) {
  const artigo = lerArtigo(await readFile(args[i + 1]!, 'utf8'))
  const numeros = [...new Set(paragrafosNoTexto(artigo).map((p) => p.numero))].sort((a, b) => a - b)
  faixas = numeros.map((n): [number, number] => [n, n])
} else {
  faixas = args.map((a) => {
    const [x, y] = a.split('-').map(Number)
    return [x!, y ?? x!] as [number, number]
  })
}
if (!faixas.length) {
  console.error('Uso: npm run cic -- 638-658 1013   |   npm run cic -- --artigo content/artigos/x.md')
  process.exitCode = 1
}

const vistos = new Set<number>()
for (const [inicio, fim] of faixas) {
  if (fim - inicio > 40) {
    console.log(`\nCIC ${inicio}-${fim}: faixa grande demais (máximo 40 parágrafos por vez)`)
    continue
  }
  for (const p of await paragrafosComNotas(inicio, fim)) {
    if (vistos.has(p.n)) continue
    vistos.add(p.n)
    console.log(`\n== CIC ${p.n}  ${urlDoParagrafo(p.n) ?? ''}`)
    console.log(p.texto ?? '(parágrafo não encontrado na página oficial)')
    for (const [k, nota] of p.notas) console.log(`   nota ${k}: ${nota}`)
  }
}
