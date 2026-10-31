<script setup lang="ts">
import type { DocBusca } from '~/utils/busca'

const { data: temas } = await useTemas()
const { data: artigos } = await useArtigos()
const { data: trilhas } = await useAsyncData('trilhas-visiveis', () =>
  queryCollection('trilhas').where('status', 'IN', statusVisiveis()).all(),
)

// Busca no título, no resumo e no texto (app/utils/busca.ts). O índice só é baixado quando alguém busca.
const route = useRoute()
const router = useRouter()
const campo = ref<HTMLInputElement | null>(null)
const busca = ref('')
const termo = computed(() => busca.value.trim())
const ativa = computed(() => termosDaBusca(termo.value).length > 0)

const indice = shallowRef<ReturnType<typeof prepararIndice> | null>(null)
const erroIndice = ref(false)
async function carregarIndice() {
  if (indice.value) return
  try {
    indice.value = prepararIndice(await $fetch<DocBusca[]>('/busca.json'))
  } catch {
    erroIndice.value = true
  }
}

// A página gerada não conhece a busca: ela entra só no navegador, para não divergir da hidratação
onMounted(() => {
  if (typeof route.query.busca === 'string') busca.value = route.query.busca
  if (route.hash === '#busca') campo.value?.focus()
})
watch(ativa, (sim) => sim && carregarIndice())
// Guarda a busca no endereço: dá para compartilhar, e o "voltar" do artigo retorna aos resultados
watch(termo, (t) => router.replace({ query: t ? { busca: t } : {} }))

const resultados = computed(() => (indice.value && ativa.value ? buscar(indice.value, termo.value) : []))

/** Grupos na ordem dos temas, com o número romano do tema; temas sem artigos ficam de fora. */
const grupos = computed(() =>
  (temas.value?.lista ?? [])
    .map((tema, i) => ({
      ...tema,
      num: romano(i + 1),
      artigos: ordemDeLeitura(
        (artigos.value ?? []).filter((a) => a.tema === tema.slug),
        trilhas.value?.find((t) => t.tema === tema.slug),
      ),
    }))
    .filter((g) => g.artigos.length),
)

const temaDe = (slug: string) => grupos.value.find((g) => g.slug === slug)
const porTema = (slug: string) => resultados.value.filter((r) => r.tema === slug).length

function limpar() {
  busca.value = ''
  campo.value?.focus()
}

const descricao = 'Todos os artigos do Veritas Fidei, organizados por tema como o índice de um livro.'
useSeoMeta({
  title: 'Todos os artigos',
  description: descricao,
  ogTitle: 'Todos os artigos · Veritas Fidei',
  ogDescription: descricao,
})
</script>

<template>
  <div class="mx-auto max-w-6xl px-6 pt-20">
    <div class="flex flex-col gap-12 lg:grid lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-16">
      <header class="flex flex-col gap-4 lg:col-start-2">
        <p class="rubrica">Artigos</p>
        <h1 class="text-[clamp(2.4rem,5vw,3.6rem)] leading-tight font-medium">Todos os artigos</h1>
        <p class="max-w-2xl text-[1.15rem] text-muted">
          {{ qtdArtigos(artigos?.length ?? 0) }}, organizados como o índice de um livro.
          <span class="font-display text-accent">Q</span> marca as questões da Defesa da fé.
        </p>
      </header>

      <!-- Busca e atalhos: acima da lista no celular, numa coluna lateral no desktop -->
      <aside class="flex flex-col gap-8 lg:sticky lg:top-10 lg:row-span-2 lg:row-start-1 lg:self-start">
        <div class="flex flex-col gap-2.5">
          <label for="busca" class="rubrica text-muted">Procurar</label>
          <input
            id="busca"
            ref="campo"
            v-model="busca"
            type="search"
            placeholder="Ex.: batismo, Lutero"
            aria-describedby="dica-busca"
            class="h-11 scroll-mt-24 border border-line bg-surface px-3.5 text-base text-text placeholder:text-muted focus:border-accent focus:outline-none"
          >
          <p id="dica-busca" class="text-sm text-muted">No título, no resumo e no texto.</p>
        </div>
        <nav v-if="!ativa" aria-labelledby="titulo-atalhos" class="max-lg:hidden">
          <p id="titulo-atalhos" class="rubrica mb-2 text-muted">Ir para o tema</p>
          <ul>
            <li v-for="g in grupos" :key="g.slug">
              <a :href="`#tema-${g.slug}`" class="flex justify-between gap-3 border-b border-line py-2.5 hover:no-underline">
                <span>{{ g.nome }}</span>
                <span class="text-muted">{{ g.artigos.length }}</span>
              </a>
            </li>
          </ul>
        </nav>
        <div v-else-if="indice" class="max-lg:hidden">
          <p class="rubrica mb-2 text-muted">Resultados por tema</p>
          <ul>
            <li
              v-for="g in grupos"
              :key="g.slug"
              class="flex justify-between gap-3 border-b border-line py-2.5"
              :class="{ 'opacity-45 text-muted': !porTema(g.slug) }"
            >
              <span>{{ g.nome }}</span>
              <span :class="porTema(g.slug) ? 'text-accent' : ''">{{ porTema(g.slug) }}</span>
            </li>
          </ul>
        </div>
      </aside>

      <!-- Com busca: lista única por relevância, com o trecho onde a palavra aparece -->
      <div v-if="ativa" class="lg:col-start-2">
        <p class="filete-duplo flex flex-wrap justify-between gap-2 border-b-[3px] pb-3 font-display text-[0.72rem] tracking-[0.14em] text-muted uppercase" aria-live="polite">
          <span v-if="erroIndice">Não foi possível carregar a busca. Recarregue a página.</span>
          <span v-else-if="!indice">Buscando…</span>
          <span v-else>{{ qtdArtigos(resultados.length) }} com “{{ termo }}”</span>
          <button type="button" class="cursor-pointer text-accent uppercase" @click="limpar">Limpar busca</button>
        </p>
        <ol v-if="resultados.length">
          <li v-for="r in resultados" :key="r.path" class="border-b border-line">
            <NuxtLink
              :to="r.path"
              class="group grid grid-cols-[1.75rem_minmax(0,1fr)] items-baseline gap-x-4 gap-y-1 py-4.5 hover:no-underline sm:grid-cols-[1.75rem_minmax(0,1fr)_auto]"
            >
              <span class="col-start-2 font-display text-[0.66rem] tracking-[0.16em] text-accent uppercase sm:col-[2/4]">
                {{ temaDe(r.tema)?.num }} · {{ temaDe(r.tema)?.nome }}
              </span>
              <span class="col-start-1 font-display text-sm text-accent">
                <template v-if="r.secao === 'defesa-da-fe'">Q<span class="sr-only"> (Defesa da fé)</span></template>
                <span v-else aria-hidden="true">·</span>
              </span>
              <span class="flex flex-wrap items-center gap-3 text-[1.3rem] leading-snug group-hover:text-accent">
                {{ r.title }} <StatusSelo :status="r.status" />
              </span>
              <span class="col-start-2 font-display text-[0.68rem] tracking-[0.14em] whitespace-nowrap text-muted uppercase sm:col-start-3">
                <template v-if="r.minutos">{{ r.minutos }} min</template>
                <template v-if="r.minutos && r.nivel"> · </template>
                <template v-if="r.nivel">{{ NIVEIS[r.nivel] }}</template>
              </span>
              <span class="col-start-2 mt-1 border-l-2 border-line pl-3 text-[0.95rem] leading-relaxed text-muted sm:col-[2/4]">
                <template v-for="(parte, i) in r.trecho" :key="i"><mark v-if="parte.marca" class="marca-busca">{{ parte.texto }}</mark><template v-else>{{ parte.texto }}</template></template>
              </span>
            </NuxtLink>
          </li>
        </ol>
        <p v-else-if="indice" class="mt-6 text-muted italic">
          Nenhum artigo com “{{ termo }}”. Tente outra palavra, ou
          <button type="button" class="cursor-pointer text-accent italic" @click="limpar">veja o índice completo</button>.
        </p>
      </div>

      <!-- Sem busca: o índice por tema -->
      <div v-else class="lg:col-start-2">
        <section v-for="g in grupos" :id="`tema-${g.slug}`" :key="g.slug" class="mb-12 scroll-mt-8" :aria-labelledby="`titulo-${g.slug}`">
          <h2 :id="`titulo-${g.slug}`" class="filete-duplo flex items-baseline gap-4 border-b-[3px] pb-3.5 text-[1.75rem] font-medium">
            <span class="font-display text-base text-accent" aria-hidden="true">{{ g.num }}</span>
            <NuxtLink :to="`/temas/${g.slug}`">{{ g.nome }}</NuxtLink>
          </h2>
          <ol>
            <li v-for="artigo in g.artigos" :key="artigo.path" class="border-b border-line">
              <NuxtLink
                :to="artigo.path"
                class="group grid grid-cols-[1.75rem_minmax(0,1fr)] items-baseline gap-x-4 gap-y-1 py-4.5 hover:no-underline sm:grid-cols-[1.75rem_minmax(0,1fr)_auto]"
              >
                <span class="font-display text-sm text-accent">
                  <template v-if="artigo.secao === 'defesa-da-fe'">Q<span class="sr-only"> (Defesa da fé)</span></template>
                  <span v-else aria-hidden="true">·</span>
                </span>
                <span class="flex flex-wrap items-center gap-3 text-[1.3rem] leading-snug group-hover:text-accent">
                  {{ artigo.title }} <StatusSelo :status="artigo.status" />
                </span>
                <span class="col-start-2 font-display text-[0.68rem] tracking-[0.14em] whitespace-nowrap text-muted uppercase sm:col-start-3 sm:row-start-1">
                  <template v-if="artigo.minutos">{{ artigo.minutos }} min</template>
                  <template v-if="artigo.minutos && artigo.nivel"> · </template>
                  <template v-if="artigo.nivel">{{ NIVEIS[artigo.nivel] }}</template>
                </span>
                <span class="col-[2/3] text-muted sm:col-[2/4]">{{ artigo.description }}</span>
              </NuxtLink>
            </li>
          </ol>
        </section>

        <p v-if="!grupos.length" class="text-muted italic">Os primeiros artigos estão em revisão e serão publicados em breve.</p>
      </div>
    </div>
  </div>
</template>
