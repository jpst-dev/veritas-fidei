/**
 * Acha um navegador Chromium instalado para o `npm run conferir` (puppeteer-core
 * não baixa navegador). Ordem: CHROME_PATH, Chrome, Edge, Brave, nas pastas de
 * programas e na pasta do usuário (LOCALAPPDATA).
 */
import { existsSync } from 'node:fs'

const PROGRAMAS = ['C:/Program Files', 'C:/Program Files (x86)']

const NAVEGADORES = [
  'Google/Chrome/Application/chrome.exe',
  'Microsoft/Edge/Application/msedge.exe',
  'BraveSoftware/Brave-Browser/Application/brave.exe',
]

export function acharNavegador(
  env: Record<string, string | undefined> = process.env,
  existe: (caminho: string) => boolean = existsSync,
): string | undefined {
  if (env.CHROME_PATH) return env.CHROME_PATH
  const pastas = [...PROGRAMAS, env.LOCALAPPDATA?.replaceAll('\\', '/')].filter(Boolean) as string[]
  for (const navegador of NAVEGADORES) {
    for (const pasta of pastas) {
      const caminho = `${pasta}/${navegador}`
      if (existe(caminho)) return caminho
    }
  }
  return undefined
}
