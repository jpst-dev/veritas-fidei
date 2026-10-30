<script setup lang="ts">
const { data: obras } = await useObras()
const lista = computed(() => Object.values(obras.value ?? {}).sort((a, b) => a.autor.localeCompare(b.autor, 'pt-BR')))

useSeoMeta({
  title: 'Créditos das imagens',
  description: 'As obras de arte usadas no Veritas Fidei, com autor, acervo, licença e fonte.',
  ogTitle: 'Créditos das imagens · Veritas Fidei',
  ogDescription: 'As obras de arte usadas no Veritas Fidei, com autor, acervo, licença e fonte.',
})
</script>

<template>
  <div class="mx-auto max-w-4xl px-6 pt-16 sm:pt-20">
    <header class="mb-12 flex flex-col gap-4">
      <p class="rubrica">Créditos</p>
      <h1 class="text-[clamp(2.2rem,5vw,3.2rem)] leading-tight font-medium">Créditos das imagens</h1>
      <p class="text-[1.1rem] text-muted">
        As imagens do site são obras de arte sacra em domínio público ou sob licença Creative Commons, obtidas no
        Wikimedia Commons. Cada uma traz o autor, o acervo onde está hoje e o link para a fonte.
      </p>
    </header>
    <ul class="border-t border-line">
      <li v-for="obra in lista" :key="obra.slug" class="grid grid-cols-[5rem_minmax(0,1fr)] gap-5 border-b border-line py-6 sm:grid-cols-[7rem_minmax(0,1fr)] sm:gap-7">
        <ObraImagem :obra="obra" decorativa sizes="112px" class="aspect-square w-full" />
        <div class="flex flex-col gap-1">
          <p class="text-[1.2rem] leading-snug"><i>{{ obra.titulo }}</i></p>
          <p class="text-muted">{{ obra.autor }}, {{ obra.data }} · {{ obra.acervo }}</p>
          <p class="text-sm text-muted">
            <!-- A licença CC já vem no crédito, junto com o autor da foto -->
            {{ obra.credito ?? (obra.licenca === 'Public domain' ? 'Domínio público' : obra.licenca) }}
            · <a :href="obra.fonte" rel="noopener" class="text-accent">Fonte</a>
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>
