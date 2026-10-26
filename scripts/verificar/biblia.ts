/**
 * Os 73 livros do cânon católico, com as siglas da tradução oficial da CNBB
 * e o número de capítulos. Onde as edições divergem (Ester grego, Joel,
 * Malaquias), vale o maior número, para não acusar erro falso.
 */
export const LIVROS: Record<string, { nome: string; capitulos: number }> = {
  Gn: { nome: 'Gênesis', capitulos: 50 },
  Ex: { nome: 'Êxodo', capitulos: 40 },
  Lv: { nome: 'Levítico', capitulos: 27 },
  Nm: { nome: 'Números', capitulos: 36 },
  Dt: { nome: 'Deuteronômio', capitulos: 34 },
  Js: { nome: 'Josué', capitulos: 24 },
  Jz: { nome: 'Juízes', capitulos: 21 },
  Rt: { nome: 'Rute', capitulos: 4 },
  '1Sm': { nome: '1 Samuel', capitulos: 31 },
  '2Sm': { nome: '2 Samuel', capitulos: 24 },
  '1Rs': { nome: '1 Reis', capitulos: 22 },
  '2Rs': { nome: '2 Reis', capitulos: 25 },
  '1Cr': { nome: '1 Crônicas', capitulos: 29 },
  '2Cr': { nome: '2 Crônicas', capitulos: 36 },
  Esd: { nome: 'Esdras', capitulos: 10 },
  Ne: { nome: 'Neemias', capitulos: 13 },
  Tb: { nome: 'Tobias', capitulos: 14 },
  Jt: { nome: 'Judite', capitulos: 16 },
  Est: { nome: 'Ester', capitulos: 16 },
  '1Mc': { nome: '1 Macabeus', capitulos: 16 },
  '2Mc': { nome: '2 Macabeus', capitulos: 15 },
  Jó: { nome: 'Jó', capitulos: 42 },
  Sl: { nome: 'Salmos', capitulos: 150 },
  Pr: { nome: 'Provérbios', capitulos: 31 },
  Ecl: { nome: 'Eclesiastes', capitulos: 12 },
  Ct: { nome: 'Cântico dos Cânticos', capitulos: 8 },
  Sb: { nome: 'Sabedoria', capitulos: 19 },
  Eclo: { nome: 'Eclesiástico', capitulos: 51 },
  Is: { nome: 'Isaías', capitulos: 66 },
  Jr: { nome: 'Jeremias', capitulos: 52 },
  Lm: { nome: 'Lamentações', capitulos: 5 },
  Br: { nome: 'Baruc', capitulos: 6 },
  Ez: { nome: 'Ezequiel', capitulos: 48 },
  Dn: { nome: 'Daniel', capitulos: 14 },
  Os: { nome: 'Oseias', capitulos: 14 },
  Jl: { nome: 'Joel', capitulos: 4 },
  Am: { nome: 'Amós', capitulos: 9 },
  Ab: { nome: 'Abdias', capitulos: 1 },
  Jn: { nome: 'Jonas', capitulos: 4 },
  Mq: { nome: 'Miqueias', capitulos: 7 },
  Na: { nome: 'Naum', capitulos: 3 },
  Hab: { nome: 'Habacuc', capitulos: 3 },
  Sf: { nome: 'Sofonias', capitulos: 3 },
  Ag: { nome: 'Ageu', capitulos: 2 },
  Zc: { nome: 'Zacarias', capitulos: 14 },
  Ml: { nome: 'Malaquias', capitulos: 4 },
  Mt: { nome: 'Mateus', capitulos: 28 },
  Mc: { nome: 'Marcos', capitulos: 16 },
  Lc: { nome: 'Lucas', capitulos: 24 },
  Jo: { nome: 'João', capitulos: 21 },
  At: { nome: 'Atos dos Apóstolos', capitulos: 28 },
  Rm: { nome: 'Romanos', capitulos: 16 },
  '1Cor': { nome: '1 Coríntios', capitulos: 16 },
  '2Cor': { nome: '2 Coríntios', capitulos: 13 },
  Gl: { nome: 'Gálatas', capitulos: 6 },
  Ef: { nome: 'Efésios', capitulos: 6 },
  Fl: { nome: 'Filipenses', capitulos: 4 },
  Cl: { nome: 'Colossenses', capitulos: 4 },
  '1Ts': { nome: '1 Tessalonicenses', capitulos: 5 },
  '2Ts': { nome: '2 Tessalonicenses', capitulos: 3 },
  '1Tm': { nome: '1 Timóteo', capitulos: 6 },
  '2Tm': { nome: '2 Timóteo', capitulos: 4 },
  Tt: { nome: 'Tito', capitulos: 3 },
  Fm: { nome: 'Filêmon', capitulos: 1 },
  Hb: { nome: 'Hebreus', capitulos: 13 },
  Tg: { nome: 'Tiago', capitulos: 5 },
  '1Pd': { nome: '1 Pedro', capitulos: 5 },
  '2Pd': { nome: '2 Pedro', capitulos: 3 },
  '1Jo': { nome: '1 João', capitulos: 5 },
  '2Jo': { nome: '2 João', capitulos: 1 },
  '3Jo': { nome: '3 João', capitulos: 1 },
  Jd: { nome: 'Judas', capitulos: 1 },
  Ap: { nome: 'Apocalipse', capitulos: 22 },
}

/** Siglas de outras traduções (Ave-Maria, protestantes) → sigla CNBB. */
const EQUIVALENTES: Record<string, string> = {
  Gên: 'Gn', Êx: 'Ex', Lev: 'Lv', Núm: 'Nm', Deut: 'Dt', Jos: 'Js', Juí: 'Jz',
  Tob: 'Tb', Jdt: 'Jt', Ecle: 'Ecl', Cânt: 'Ct', Sab: 'Sb', Ecli: 'Eclo',
  Jer: 'Jr', Lam: 'Lm', Bar: 'Br', Dan: 'Dn', Mat: 'Mt', Mar: 'Mc',
  Luc: 'Lc', Joã: 'Jo', Rom: 'Rm', Gál: 'Gl', Efé: 'Ef', Fil: 'Fl', Col: 'Cl',
  Heb: 'Hb', Tia: 'Tg', Apo: 'Ap', Apoc: 'Ap', Sal: 'Sl',
}

export interface ProblemaBiblico {
  trecho: string
  mensagem: string
}

const siglas = Object.keys(LIVROS).sort((a, b) => b.length - a.length)
const SIGLA = siglas.join('|')

/**
 * Procura referências bíblicas e aponta as que fogem do padrão
 * (Jo 6,55; 1Cor 11,27) ou que não existem (capítulo além do último).
 */
export function verificarReferencias(texto: string): ProblemaBiblico[] {
  const problemas: ProblemaBiblico[] = []

  // "1 Cor 11,27" ou "I Cor 11,27" → "1Cor 11,27"
  for (const m of texto.matchAll(/\b([1-3]|I{1,3})\s+([A-ZÁÉÍÓÚ][a-záéíóú]{1,3})\.?\s+\d+/g)) {
    const num = { I: '1', II: '2', III: '3' }[m[1]!] ?? m[1]
    const sigla = `${num}${m[2]}`
    if (LIVROS[sigla]) problemas.push({ trecho: m[0], mensagem: `use "${sigla}" (sem espaço)` })
  }

  // Dois-pontos em vez de vírgula: "Jo 6:55"
  for (const m of texto.matchAll(new RegExp(`\\b(${SIGLA})\\.?\\s(\\d+):(\\d+)`, 'g'))) {
    problemas.push({ trecho: m[0], mensagem: `use vírgula: "${m[1]} ${m[2]},${m[3]}"` })
  }

  // Siglas de outras traduções: "Mat 5,3", "Apoc 12,1"
  for (const m of texto.matchAll(/\b([A-ZÁÉÍÓÚ][a-záéíóúâêô]{1,4})\.?\s(\d+)[,:]\d+/g)) {
    const certa = EQUIVALENTES[m[1]!]
    if (certa && certa !== m[1]) problemas.push({ trecho: m[0], mensagem: `use a sigla da CNBB "${certa}"` })
  }

  // Nome por extenso dentro de parênteses: "(João 6,55)"
  for (const m of texto.matchAll(/\(((?:[1-3]\s?)?[A-ZÁÉÍÓÚ][a-záéíóúçãõâêô]{3,})\s\d+[,:]\d+/g)) {
    const nome = m[1]!.replace(/\s/, ' ')
    const sigla = Object.entries(LIVROS).find(([, l]) => l.nome === nome)?.[0]
    if (sigla) problemas.push({ trecho: m[0], mensagem: `use a sigla "${sigla}" na referência` })
  }

  // Capítulo inexistente: só onde há versículo, para não confundir "Os 12 apóstolos"
  for (const m of texto.matchAll(new RegExp(`\\b(${SIGLA})\\s(\\d+),\\d+`, 'g'))) {
    const livro = LIVROS[m[1]!]!
    const capitulo = Number(m[2])
    if (capitulo < 1 || capitulo > livro.capitulos) {
      problemas.push({ trecho: m[0], mensagem: `${livro.nome} tem ${livro.capitulos} capítulo(s)` })
    }
  }

  return problemas
}
