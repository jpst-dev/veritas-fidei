<template>
  <div class="flex min-h-screen flex-col">
    <a href="#conteudo" class="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-10 focus:bg-surface focus:px-4 focus:py-2">
      Pular para o conteúdo
    </a>
    <SiteHeader />
    <main id="conteudo" class="flex-1">
      <slot />
    </main>
    <SiteFooter />
  </div>
</template>
