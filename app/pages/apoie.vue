<script setup lang="ts">
import { renderSVG } from 'uqr'

const { pix, pixNome, pixCodigo, apoiaSe, ativo } = useApoio()
if (!ativo) {
  throw createError({ statusCode: 404, message: 'Página não encontrada', fatal: true })
}

useSeoMeta({
  title: 'Apoie',
  description: 'O Veritas Fidei é gratuito, sem anúncios e mantido por quem lê. Veja como ajudar.',
  ogTitle: 'Apoie · Veritas Fidei',
  ogDescription: 'O Veritas Fidei é gratuito, sem anúncios e mantido por quem lê. Veja como ajudar.',
})

// QR Code do "Pix copia e cola", gerado no build: preto no branco, com margem, para qualquer câmera ler
const qrPix = pixCodigo ? renderSVG(pixCodigo, { border: 2 }) : ''

// Copiar a chave Pix: o botão confirma por dois segundos
const copiado = ref(false)
async function copiarPix() {
  try {
    await navigator.clipboard.writeText(pix)
    copiado.value = true
    setTimeout(() => (copiado.value = false), 2000)
  } catch {
    // Sem permissão para a área de transferência: a chave continua visível para copiar à mão
  }
}
</script>

<template>
  <div class="mx-auto max-w-3xl px-6 pt-20">
    <header class="mb-12 flex flex-col gap-4">
      <p class="rubrica">Apoie</p>
      <h1 class="text-[clamp(2.4rem,5vw,3.6rem)] leading-tight font-medium">Gratis accepistis, gratis date</h1>
      <p class="text-[1.15rem] text-muted italic">De graça recebestes, de graça dai — Mt 10,8</p>
    </header>

    <div class="prose prose-vf sem-capitular max-w-none">
      <p>
        O Veritas Fidei é gratuito e vai continuar assim: sem anúncios, sem patrocínio e sem área paga. Cada artigo leva
        dias de pesquisa nas fontes, revisão doutrinal e conferência de cada citação. Se esse trabalho já te ajudou a
        conhecer ou a defender a fé, você pode ajudar a mantê-lo.
      </p>

      <h2>Como ajudar</h2>

      <div class="not-prose mt-6 grid gap-4" :class="pix && apoiaSe ? 'sm:grid-cols-2' : ''">
        <section v-if="pix" class="flex flex-col gap-3 border border-line p-6" aria-labelledby="titulo-pix">
          <h3 id="titulo-pix" class="rubrica">Pix · uma vez</h3>
          <p class="text-muted">Qualquer valor, sem taxa. Aponte a câmera do app do seu banco para o código.</p>
          <!-- SVG gerado aqui mesmo (uqr), a partir da chave configurada -->
          <div class="w-48 self-center bg-white [&>svg]:block [&>svg]:size-full" role="img" aria-label="QR Code do Pix" v-html="qrPix" />
          <p v-if="pixNome" class="text-center text-sm text-muted">Em nome de {{ pixNome }}</p>
          <div class="mt-auto flex flex-col gap-2 border-t border-line pt-4">
            <p class="text-sm text-muted">Ou copie a chave e cole no app:</p>
            <p class="font-mono break-all select-all">{{ pix }}</p>
            <button type="button" class="self-start border border-line px-4 py-2 text-sm hover:border-accent" @click="copiarPix">
              {{ copiado ? 'Chave copiada ✓' : 'Copiar chave Pix' }}
            </button>
          </div>
        </section>

        <section v-if="apoiaSe" class="flex flex-col gap-3 border border-line p-6" aria-labelledby="titulo-mensal">
          <h3 id="titulo-mensal" class="rubrica">Apoio mensal</h3>
          <p class="text-muted">Um valor fixo por mês, pelo Apoia.se. Dá para cancelar quando quiser.</p>
          <a :href="apoiaSe" rel="noopener" target="_blank" class="mt-auto self-start bg-accent px-5 py-2.5 text-on-accent hover:no-underline">
            Apoiar todo mês →
          </a>
        </section>
      </div>

      <h2>Para onde vai</h2>
      <ul>
        <li>Tempo para escrever artigos novos e revisar os que já existem.</li>
        <li>Domínio, hospedagem e as ferramentas usadas na pesquisa.</li>
      </ul>

      <h2>O que não muda</h2>
      <p>
        Quem doa não recebe conteúdo exclusivo nem influencia o que é escrito: o critério de cada texto continua sendo o
        ensinamento da Igreja, como está em <NuxtLink to="/compromisso">Nosso compromisso</NuxtLink>. E se você não
        pode doar, rezar pelo projeto e mandar um artigo para quem precisa dele também ajuda muito.
      </p>
    </div>
  </div>
</template>
