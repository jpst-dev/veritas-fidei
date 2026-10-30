<script setup lang="ts">
/** Passos de uma trilha, cada um com a sua obra e o progresso de leitura do navegador. */
const props = defineProps<{
  passos: { path: string; title: string; description?: string; minutos?: number; status?: string; imagem?: { slug: string; alt: string; posicao: string } }[]
}>()

const { estadosDaTrilha } = useLidos()
const estados = computed(() => estadosDaTrilha(props.passos.map((p) => slugDe(p.path))))

// Quem ainda não leu nenhum passo começa a trilha; quem já leu algum continua
const ROTULOS = computed(() => ({
  lido: 'Lido ✓',
  continuar: estados.value.includes('lido') ? 'Continuar aqui →' : 'Começar aqui →',
  'a-seguir': 'A seguir',
}))
</script>

<template>
  <ol class="border-t border-line">
    <li v-for="(passo, i) in passos" :key="passo.path" class="border-b border-line" :class="{ 'opacity-75': estados[i] === 'a-seguir' }">
      <NuxtLink
        :to="passo.path"
        class="group grid grid-cols-[5.5rem_minmax(0,1fr)] items-center gap-4 py-5 hover:no-underline sm:grid-cols-[3.5rem_10rem_minmax(0,1fr)] sm:gap-7 sm:py-7 lg:grid-cols-[4.5rem_12.5rem_minmax(0,1fr)_11rem] lg:gap-8"
      >
        <span
          class="hidden font-display text-[2.75rem] leading-none sm:block"
          :class="estados[i] === 'a-seguir' ? 'text-muted' : 'text-accent'"
          aria-hidden="true"
        >{{ romano(i + 1) }}</span>
        <span class="relative block aspect-square overflow-hidden bg-surface sm:aspect-[4/3]">
          <ObraImagem
            v-if="passo.imagem"
            :obra="passo.imagem"
            decorativa
            sizes="(min-width: 1024px) 200px, (min-width: 640px) 160px, 88px"
            class="size-full transition-transform duration-700 group-hover:scale-[1.04] motion-reduce:transition-none"
          />
          <span class="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/70 sm:hidden" aria-hidden="true" />
          <span class="absolute bottom-1 left-1.5 font-display text-xl text-[#ECE6D8] [text-shadow:0_1px_6px_rgb(0_0_0/0.8)] sm:hidden" aria-hidden="true">{{ romano(i + 1) }}</span>
        </span>
        <span class="flex min-w-0 flex-col gap-2">
          <span class="flex flex-wrap items-center gap-x-3 gap-y-1 font-display text-[0.68rem] tracking-[0.14em] uppercase lg:hidden">
            <span :class="estados[i] === 'a-seguir' ? 'text-muted' : 'text-accent'">{{ ROTULOS[estados[i] ?? 'a-seguir'] }}</span>
            <span v-if="passo.minutos" class="text-muted">{{ passo.minutos }} min</span>
            <StatusSelo v-if="passo.status" :status="passo.status" />
          </span>
          <span class="text-[1.2rem] leading-snug group-hover:text-accent sm:text-[1.5rem]">{{ passo.title }}</span>
          <span v-if="passo.description" class="hidden text-muted sm:block">{{ passo.description }}</span>
        </span>
        <span class="hidden flex-col items-end gap-1.5 font-display text-[0.68rem] tracking-[0.14em] uppercase lg:flex">
          <span :class="estados[i] === 'a-seguir' ? 'text-muted' : 'text-accent'">{{ ROTULOS[estados[i] ?? 'a-seguir'] }}</span>
          <span v-if="passo.minutos" class="text-muted">{{ passo.minutos }} min</span>
          <StatusSelo v-if="passo.status" :status="passo.status" />
        </span>
      </NuxtLink>
    </li>
  </ol>
</template>
