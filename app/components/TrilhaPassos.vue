<script setup lang="ts">
/** Passos de uma trilha no estilo "Capítulos", com o progresso de leitura do navegador. */
const props = defineProps<{
  passos: { path: string; title: string; description?: string; minutos?: number; status?: string }[]
  /** Versão compacta, sem resumo (home) */
  compacto?: boolean
}>()

const { estadosDaTrilha } = useLidos()
const estados = computed(() => estadosDaTrilha(props.passos.map((p) => slugDe(p.path))))

// Quem ainda não leu nenhum passo começa a trilha; quem já leu algum continua
const ROTULOS = computed(() => ({
  lido: 'Lido ✓',
  continuar: estados.value.includes('lido') ? 'Continuar' : 'Começar',
  'a-seguir': 'A seguir',
}))
</script>

<template>
  <ol class="grid gap-4 sm:grid-cols-2 sm:gap-5">
    <li v-for="(passo, i) in passos" :key="passo.path">
      <NuxtLink
        :to="passo.path"
        class="card-capitulo flex h-full gap-4 border-l-[3px] p-5 sm:gap-5 sm:p-7"
        :class="estados[i] === 'a-seguir' ? 'border-line' : 'border-accent'"
      >
        <span
          class="min-w-[0.9em] shrink-0 font-display leading-[0.9]"
          :class="[compacto ? 'text-3xl' : 'text-3xl sm:text-5xl', estados[i] === 'a-seguir' ? 'text-line' : 'text-accent']"
          aria-hidden="true"
        >{{ romano(i + 1) }}</span>
        <span class="flex min-w-0 flex-col gap-2">
          <span class="flex flex-wrap items-center gap-3 font-display text-[0.68rem] tracking-[0.16em] uppercase">
            <span :class="estados[i] === 'continuar' ? 'text-accent' : 'text-muted'">
              {{ ROTULOS[estados[i] ?? 'a-seguir'] }}<template v-if="passo.minutos"> · {{ passo.minutos }} min</template>
            </span>
            <StatusSelo v-if="passo.status" :status="passo.status" />
          </span>
          <span class="leading-snug" :class="compacto ? 'text-[1.2rem]' : 'text-[1.4rem]'">{{ passo.title }}</span>
          <span v-if="!compacto && passo.description" class="text-muted">{{ passo.description }}</span>
        </span>
      </NuxtLink>
    </li>
  </ol>
</template>
