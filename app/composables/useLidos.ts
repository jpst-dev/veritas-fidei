const CHAVE = 'vf-lidos'

/**
 * Artigos que o leitor terminou, guardados só no navegador (sem contas).
 * Começa vazio no servidor e é preenchido ao montar, para não divergir na hidratação.
 */
export function useLidos() {
  const lidos = useState<string[]>('lidos', () => [])

  onMounted(() => {
    try {
      lidos.value = JSON.parse(localStorage.getItem(CHAVE) ?? '[]')
    } catch {
      lidos.value = []
    }
  })

  function marcarLido(slug: string) {
    if (lidos.value.includes(slug)) return
    lidos.value = [...lidos.value, slug]
    try {
      localStorage.setItem(CHAVE, JSON.stringify(lidos.value))
    } catch {
      // Navegação privada ou armazenamento bloqueado: o progresso só não persiste
    }
  }

  /** Estado de cada passo de uma trilha: o primeiro não lido é o "continuar". */
  function estadosDaTrilha(slugs: string[]) {
    const proximo = slugs.find((s) => !lidos.value.includes(s))
    return slugs.map((s) => (lidos.value.includes(s) ? 'lido' : s === proximo ? 'continuar' : 'a-seguir'))
  }

  return { lidos, marcarLido, estadosDaTrilha }
}
