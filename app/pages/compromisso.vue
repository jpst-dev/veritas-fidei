<script setup lang="ts">
useSeoMeta({
  title: 'Nosso compromisso',
  description: 'A fidelidade ao Magistério, como os textos são revisados e como apontar um erro.',
  ogTitle: 'Nosso compromisso · Veritas Fidei',
  ogDescription: 'A fidelidade ao Magistério, como os textos são revisados e como apontar um erro.',
})
</script>

<template>
  <div class="mx-auto max-w-3xl px-6 pt-20">
    <header class="mb-12 flex flex-col gap-4">
      <p class="rubrica">Nosso compromisso</p>
      <h1 class="text-[clamp(2.4rem,5vw,3.6rem)] leading-tight font-medium">Sentire cum Ecclesia</h1>
      <p class="text-[1.15rem] text-muted italic">Sentir com a Igreja — Santo Inácio de Loyola</p>
    </header>
    <div class="prose prose-vf sem-capitular max-w-none">
      <blockquote>
        <p>
          O Veritas Fidei submete tudo o que publica ao juízo do Magistério da Igreja Católica. Tomamos como referência a
          Sagrada Escritura, a Tradição e o <i>Catecismo da Igreja Católica</i>, e não apresentamos opiniões pessoais como
          se fossem doutrina. Se algum texto contiver erro, ele será corrigido assim que for apontado, com gratidão e
          sempre segundo o que a Igreja ensina.
        </p>
      </blockquote>

      <h2>Fidelidade ao Magistério</h2>
      <p>
        O critério de cada artigo é o ensinamento da Igreja como o Magistério o propõe, e não a preferência de quem
        escreve. Onde a Igreja deixa liberdade entre os católicos, o texto diz que se trata de opinião.
      </p>
      <p>
        Este é um projeto leigo e independente. Não é um site oficial da Igreja, não fala em nome dela e os artigos não
        têm <i>imprimatur</i>.
      </p>

      <h2>Como os textos são revisados</h2>
      <ul>
        <li>As citações do Catecismo e dos documentos da Igreja são conferidas no texto oficial, no vatican.va.</li>
        <li>As referências bíblicas são conferidas na Nova Vulgata; a tradução citada é a da CNBB.</li>
        <li>Os Padres da Igreja são citados com obra e passagem, a partir de edições publicadas.</li>
        <li>
          Cada artigo passa por uma revisão doutrinal interna, nos critérios que a Igreja pede a quem revisa livros de fé
          (cân. 830). Ela prepara o texto, mas não substitui a aprovação eclesiástica.
        </li>
      </ul>

      <h2>O peso de cada afirmação</h2>
      <p>
        Nem tudo o que a Igreja ensina tem o mesmo grau. Os artigos distinguem o que é dogma de fé, o que é doutrina
        segura e o que é opinião teológica ou piedade, para que o leitor saiba o que é obrigatório crer e o que é livre.
      </p>

      <h2>Correções</h2>
      <p>
        Todo fiel tem o direito de manifestar o que pensa sobre o bem da Igreja (cân. 212 §3). Se você encontrar um erro
        de doutrina, uma citação imprecisa ou uma referência quebrada, use o link “Sugerir uma correção” no fim de
        qualquer artigo. Cada aviso é lido, e o que estiver errado é corrigido.
      </p>

      <h2>Independência</h2>
      <p>
        O site não tem anúncios, patrocínio nem vínculo com movimentos ou grupos. É escrito por um leigo católico,
        desenvolvedor de software, e não guarda dados de quem lê. As imagens são obras de domínio público ou de licença
        livre, com os <NuxtLink to="/creditos">créditos</NuxtLink> de cada uma.
      </p>
    </div>
  </div>
</template>
