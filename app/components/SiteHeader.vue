<script setup lang="ts">
const liturgia = useLiturgia()
const route = useRoute()

const links = [
  { to: '/temas', rotulo: 'Temas', resumo: 'Os temas da fé, do Credo à moral' },
  { to: '/trilhas', rotulo: 'Trilhas', resumo: 'Estudos em sequência, passo a passo' },
  { to: '/defesa-da-fe', rotulo: 'Defesa da fé', resumo: 'Objeções comuns e respostas' },
  { to: '/artigos', rotulo: 'Artigos', resumo: 'Todos os artigos, como o índice de um livro' },
  { to: '/sobre', rotulo: 'Sobre', resumo: 'O projeto e como os textos são revisados' },
]

// Gaveta do celular: fecha ao navegar e com Esc, e trava a rolagem do fundo
const aberto = ref(false)
watch(() => route.fullPath, () => (aberto.value = false))
watch(aberto, (v) => {
  if (import.meta.client) document.documentElement.style.overflow = v ? 'hidden' : ''
})
function aoTeclar(e: KeyboardEvent) {
  if (e.key === 'Escape') aberto.value = false
}
onMounted(() => window.addEventListener('keydown', aoTeclar))
onBeforeUnmount(() => {
  window.removeEventListener('keydown', aoTeclar)
  document.documentElement.style.overflow = ''
})
</script>

<template>
  <header class="mx-auto w-full max-w-6xl px-6 pt-4 lg:pt-7">
    <div class="filete-duplo flex items-center gap-x-8 border-b-[3px] pb-4 lg:pb-5">
      <NuxtLink to="/" class="font-display text-lg font-semibold tracking-[0.12em] hover:no-underline sm:text-2xl">
        <span class="text-accent" aria-hidden="true">✠</span> VERITAS FIDEI
      </NuxtLink>

      <nav aria-label="Principal" class="hidden lg:block">
        <ul class="flex gap-x-7 font-display text-sm tracking-[0.1em] uppercase">
          <li v-for="link in links" :key="link.to">
            <NuxtLink :to="link.to" active-class="text-accent">{{ link.rotulo }}</NuxtLink>
          </li>
        </ul>
      </nav>

      <p class="ml-auto hidden items-center gap-2 font-display text-xs tracking-[0.12em] whitespace-nowrap text-muted uppercase xl:flex">
        <span class="size-2 rounded-full bg-accent" aria-hidden="true" />
        <span>{{ liturgia.rotulo }}</span>
      </p>

      <div class="ml-auto flex gap-2 xl:ml-0">
        <ThemeToggle />
        <button
          type="button"
          class="grid size-11 cursor-pointer place-items-center border border-line lg:hidden"
          :aria-label="aberto ? 'Fechar menu' : 'Abrir menu'"
          :aria-expanded="aberto"
          aria-controls="menu-celular"
          @click="aberto = !aberto"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
            <path v-if="aberto" d="M6 6l12 12M18 6L6 18" />
            <path v-else d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Gaveta em tela cheia (celular e tablet) -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      leave-active-class="transition duration-150 ease-in"
      leave-to-class="opacity-0"
    >
      <div
        v-if="aberto"
        id="menu-celular"
        class="fixed inset-x-0 top-[4.6rem] bottom-0 z-50 flex flex-col overflow-y-auto bg-bg px-6 pt-2 pb-8 lg:hidden"
      >
        <nav aria-label="Principal" class="mx-auto w-full max-w-xl">
          <ul>
            <li v-for="(link, i) in links" :key="link.to">
              <NuxtLink :to="link.to" class="flex items-baseline gap-4 border-b border-line py-5 hover:no-underline" active-class="text-accent">
                <span class="w-7 shrink-0 font-display text-sm text-accent" aria-hidden="true">{{ romano(i + 1) }}</span>
                <span class="flex flex-col gap-1">
                  <span class="text-2xl">{{ link.rotulo }}</span>
                  <span class="text-[0.95rem] text-muted">{{ link.resumo }}</span>
                </span>
              </NuxtLink>
            </li>
          </ul>
        </nav>
        <div class="mx-auto mt-auto w-full max-w-xl border-l-[3px] border-accent bg-surface px-5 py-4">
          <p class="rubrica mb-1.5 text-[0.65rem]">Hoje na liturgia</p>
          <p>{{ liturgia.rotulo }}</p>
          <p class="mt-1 text-sm text-muted">A cor do site acompanha o tempo litúrgico.</p>
        </div>
      </div>
    </Transition>
  </header>
</template>
