<script setup lang="ts">
const liturgia = useLiturgia()

const links = [
  { to: '/temas', rotulo: 'Aprender' },
  { to: '/trilhas', rotulo: 'Trilhas' },
  { to: '/defesa-da-fe', rotulo: 'Defesa da fé' },
  { to: '/sobre', rotulo: 'Sobre' },
]
</script>

<template>
  <header class="mx-auto w-full max-w-6xl px-6 pt-7">
    <div class="filete-duplo flex flex-wrap items-center justify-between gap-5 border-b-[3px] pb-5">
      <NuxtLink to="/" class="font-display text-2xl font-semibold tracking-[0.12em] hover:no-underline">
        <span class="text-accent" aria-hidden="true">✠</span> VERITAS FIDEI
      </NuxtLink>

      <nav aria-label="Principal">
        <ul class="flex flex-wrap gap-x-7 gap-y-2 font-display text-sm tracking-[0.1em] uppercase">
          <li v-for="link in links" :key="link.to">
            <NuxtLink :to="link.to" active-class="text-accent">{{ link.rotulo }}</NuxtLink>
          </li>
        </ul>
      </nav>

      <div class="flex items-center gap-3">
        <p class="flex items-center gap-2 font-display text-xs tracking-[0.12em] text-muted uppercase">
          <span class="size-2 rounded-full bg-accent" aria-hidden="true" />
          <span>{{ liturgia.rotulo }}</span>
        </p>
        <ThemeToggle />
      </div>
    </div>
  </header>
</template>
