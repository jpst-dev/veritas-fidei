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
  <header class="mx-auto w-full max-w-6xl px-6 pt-6 lg:pt-7">
    <!-- No celular: logo e tema na 1ª linha, menu e tempo litúrgico abaixo -->
    <div class="filete-duplo flex flex-wrap items-center gap-x-5 gap-y-4 border-b-[3px] pb-5 lg:justify-between">
      <NuxtLink to="/" class="order-1 font-display text-xl font-semibold tracking-[0.12em] hover:no-underline sm:text-2xl">
        <span class="text-accent" aria-hidden="true">✠</span> VERITAS FIDEI
      </NuxtLink>

      <nav aria-label="Principal" class="order-3 w-full lg:order-2 lg:w-auto">
        <ul class="flex flex-wrap gap-x-5 gap-y-2 font-display text-xs tracking-[0.1em] uppercase sm:gap-x-7 sm:text-sm">
          <li v-for="link in links" :key="link.to">
            <NuxtLink :to="link.to" active-class="text-accent">{{ link.rotulo }}</NuxtLink>
          </li>
        </ul>
      </nav>

      <p class="order-4 flex w-full items-center gap-2 font-display text-[0.65rem] tracking-[0.12em] whitespace-nowrap text-muted uppercase sm:text-xs lg:order-3 lg:w-auto">
        <span class="size-2 rounded-full bg-accent" aria-hidden="true" />
        <span>{{ liturgia.rotulo }}</span>
      </p>

      <ThemeToggle class="order-2 ml-auto lg:order-4 lg:ml-0" />
    </div>
  </header>
</template>
