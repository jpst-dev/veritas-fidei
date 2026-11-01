/**
 * Conferência visual de artigos no site local (http://localhost:3000, o `npm run dev`).
 *
 *   npm run conferir -- a-ressurreicao o-advento
 *   npm run conferir -- --rotas /,/temas            # rotas quaisquer
 *   npm run conferir -- a-ressurreicao --so-escuro
 *
 * Para cada artigo abre a página do artigo, a do seu tema e /creditos, nas
 * larguras 390, 768, 1024, 1280 e 1440, no tema escuro e no claro, e confere:
 * - rolagem horizontal e elementos que saem da tela;
 * - erros no console e status HTTP;
 * - a faixa de abertura: a imagem tem resolução para a largura em que aparece?
 *
 * Salva capturas da página inteira e do topo (o recorte da faixa, como o leitor
 * vê ao abrir) numa pasta temporária, que o script imprime no fim, para eu olhar
 * antes de mostrar ao autor. Sai com código 1 se houver problema.
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import puppeteer, { type Page } from 'puppeteer-core'

const BASE = process.env.SITE_LOCAL ?? 'http://localhost:3000'
const CHROME = process.env.CHROME_PATH ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const LARGURAS = [390, 768, 1024, 1280, 1440]

const args = process.argv.slice(2)
const iRotas = args.indexOf('--rotas')
const soEscuro = args.includes('--so-escuro')
const slugs = args.filter((a, i) => !a.startsWith('--') && (iRotas < 0 || i !== iRotas + 1))

// O Git Bash troca "/" por "C:/Program Files/Git/": desfaz a conversão
const rotas = new Set<string>(iRotas >= 0 ? args[iRotas + 1]!.split(',').map((r) => r.replace(/^[A-Za-z]:\/Program Files\/Git\//, '/')) : [])
for (const slug of slugs) {
  rotas.add(`/artigos/${slug}`)
  const fonte = await readFile(join(process.cwd(), 'content', 'artigos', `${slug}.md`), 'utf8').catch(() => '')
  const tema = fonte.match(/^tema:\s*(\S+)/m)?.[1]
  if (tema) rotas.add(`/temas/${tema}`)
}
if (slugs.length) rotas.add('/creditos')
if (!rotas.size) {
  console.error('Uso: npm run conferir -- <slug> [<slug>...] [--rotas /,/temas] [--so-escuro]')
  process.exit(1)
}

try {
  await fetch(BASE, { signal: AbortSignal.timeout(20_000) })
} catch {
  console.error(`O site local não respondeu em ${BASE}. Suba com "npm run dev -- --port 3000".`)
  process.exit(1)
}

const pasta = join(tmpdir(), 'veritas-conferir', new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19))
await mkdir(pasta, { recursive: true })
const temas = soEscuro ? ['dark'] : ['dark', 'light']

interface Resultado {
  rota: string
  largura: number
  tema: string
  status?: number
  problemas: string[]
}

async function prepararPagina(page: Page, tema: string, largura: number, altura = 900) {
  await page.evaluateOnNewDocument((t) => {
    try {
      localStorage.setItem('vf-tema', t)
    } catch {}
  }, tema)
  await page.setViewport({ width: largura, height: altura, deviceScaleFactor: largura <= 768 ? 2 : 1 })
}

async function esperarRender(page: Page) {
  await page.evaluate(async () => {
    await document.fonts.ready
    for (const img of document.images) img.loading = 'eager'
    await Promise.race([
      Promise.all([...document.images].map((img) => img.decode().catch(() => {}))),
      new Promise((r) => setTimeout(r, 8000)),
    ])
    await Promise.all(document.getAnimations().map((a) => a.finished.catch(() => {})))
  })
}

const navegador = await puppeteer.launch({ executablePath: CHROME, headless: true })
const resultados: Resultado[] = []

for (const rota of rotas) {
  for (const tema of temas) {
    for (const largura of LARGURAS) {
      const page = await navegador.newPage()
      const problemas: string[] = []
      page.on('console', (m) => {
        if (m.type() === 'error') problemas.push(`console: ${m.text().slice(0, 160)}`)
      })
      page.on('pageerror', (e) => problemas.push(`erro na página: ${String(e).slice(0, 160)}`))
      await prepararPagina(page, tema, largura)
      // No dev server a primeira visita a uma rota compila a página e pode demorar; o HMR mantém
      // uma conexão aberta, por isso networkidle2 (até 2 conexões) e não networkidle0
      const resposta = await page.goto(BASE + rota, { waitUntil: 'networkidle2', timeout: 120_000 }).catch((e: Error) => {
        problemas.push(`não carregou: ${e.message.slice(0, 120)}`)
        return null
      })
      if (!resposta) {
        resultados.push({ rota, largura, tema, problemas })
        await page.close()
        continue
      }
      await esperarRender(page)
      problemas.push(
        ...(await page.evaluate(async () => {
          const achados: string[] = []
          const vw = window.innerWidth
          if (document.documentElement.scrollWidth > vw) achados.push(`rolagem horizontal (${document.documentElement.scrollWidth} px)`)
          for (const el of document.querySelectorAll('body *')) {
            const r = el.getBoundingClientRect()
            if (!r.width || !r.height || el.closest('.sr-only, nuxt-devtools-frame, #nuxt-devtools-container')) continue
            if (r.right > vw + 1 || r.left < -1) {
              achados.push(`sai da tela: <${el.tagName.toLowerCase()}> "${(el.textContent ?? '').trim().slice(0, 40)}"`)
            }
          }
          // A faixa de abertura (a primeira imagem grande) precisa de resolução para a largura em que aparece
          const faixa = [...document.images].find((img) => img.getBoundingClientRect().width >= vw * 0.9)
          if (faixa?.currentSrc) {
            // naturalWidth de uma <img> com srcset vem dividido pela densidade; o arquivo isolado dá a largura real
            const real = await new Promise<number>((ok) => {
              const img = new Image()
              img.onload = () => ok(img.naturalWidth)
              img.onerror = () => ok(0)
              img.src = faixa.currentSrc
            })
            const necessario = faixa.getBoundingClientRect().width * window.devicePixelRatio
            if (real && real < necessario * 0.7) {
              achados.push(`faixa ampliada: imagem de ${real} px mostrada em ${Math.round(necessario)} px (${faixa.currentSrc.split('/').pop()})`)
            }
          }
          return [...new Set(achados)].slice(0, 8)
        })),
      )
      if (!resposta?.ok()) problemas.push(`status HTTP ${resposta?.status()}`)
      const nome = `${rota === '/' ? 'home' : rota.slice(1).replace(/[/?=&]/g, '_')}-${tema === 'dark' ? 'escuro' : 'claro'}-${largura}`
      await page.screenshot({ path: join(pasta, `${nome}.png`), fullPage: true })
      // Topo como o leitor vê ao abrir (para julgar o recorte da faixa)
      if (rota.startsWith('/artigos/') && (largura === 390 || largura === 1280 || largura === 1440)) {
        await page.evaluate(() => window.scrollTo(0, 0))
        await page.setViewport({ width: largura, height: largura === 390 ? 844 : 800, deviceScaleFactor: largura === 390 ? 2 : 1 })
        await new Promise((r) => setTimeout(r, 400))
        await page.screenshot({ path: join(pasta, `topo-${nome}.png`) })
      }
      resultados.push({ rota, largura, tema, status: resposta?.status(), problemas })
      await page.close()
    }
  }
}
await navegador.close()

await writeFile(join(pasta, 'relatorio.json'), JSON.stringify(resultados, null, 1))
const comProblema = resultados.filter((r) => r.problemas.length)
console.log(`${resultados.length} capturas (${[...rotas].join(', ')}); ${comProblema.length} com problema`)
for (const r of comProblema) console.log(`  ✖ ${r.rota} ${r.tema} ${r.largura}px: ${r.problemas.join(' · ')}`)
console.log(`Capturas em ${pasta}`)
process.exitCode = comProblema.length ? 1 : 0
