export type Tema = 'dark' | 'light'

const CHAVE = 'vf-tema'

/**
 * Script executado no <head> antes da primeira pintura, para quem escolheu o
 * tema claro não ver o escuro piscar. O escuro é o padrão do site.
 */
export const scriptTemaInicial = `(function(){try{if(localStorage.getItem('${CHAVE}')==='light')document.documentElement.dataset.theme='light'}catch(e){}})()`

export function useTema() {
  const tema = useState<Tema>('tema', () => 'dark')

  onMounted(() => {
    tema.value = document.documentElement.dataset.theme === 'light' ? 'light' : 'dark'
  })

  function alternar() {
    tema.value = tema.value === 'dark' ? 'light' : 'dark'
    if (tema.value === 'light') document.documentElement.dataset.theme = 'light'
    else delete document.documentElement.dataset.theme
    try {
      localStorage.setItem(CHAVE, tema.value)
    } catch {
      // navegação privada ou armazenamento bloqueado: o tema vale só para esta visita
    }
  }

  return { tema, alternar }
}
