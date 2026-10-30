/**
 * Mostra o texto da Nova Vulgata (vatican.va) das referências bíblicas, para
 * conferir se cada versículo diz o que o artigo afirma.
 *
 *   npm run biblia -- "Lc 1,28; Gn 12,5"
 *   npm run biblia -- --artigo content/artigos/x.md   # todas as do artigo, com a linha
 */
import { readFile } from 'node:fs/promises'
import { lerArtigo, textosComReferencias } from './verificar/artigo.ts'
import { referenciasBiblicas, textoDaReferencia } from './verificar/vulgata.ts'

const args = process.argv.slice(2)
const i = args.indexOf('--artigo')
const fontes =
  i >= 0
    ? textosComReferencias(lerArtigo(await readFile(args[i + 1]!, 'utf8')))
    : [{ n: undefined, texto: args.join(' ') }]

const vistas = new Set<string>()
for (const { n, texto } of fontes) {
  for (const ref of referenciasBiblicas(texto)) {
    if (vistas.has(ref.texto)) continue
    vistas.add(ref.texto)
    console.log(`\n${ref.texto}${n ? `  (linha ${n})` : ''}`)
    for (const v of await textoDaReferencia(ref)) {
      console.log(`  ${v.capitulo},${v.versiculo}  ${v.texto ?? '— não existe na Nova Vulgata'}`)
    }
  }
}
