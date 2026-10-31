import { defineCollection, defineContentConfig } from '@nuxt/content'
import { z } from 'zod/v4'

/**
 * Status editorial de um artigo. Só `publicado` aparece no site em produção;
 * em desenvolvimento os demais aparecem com um selo, para facilitar a revisão.
 */
export const STATUS = ['rascunho', 'em-revisao', 'publicado'] as const

/** Slugs dos temas. Cada um tem um arquivo em content/temas/<slug>.yml. */
export const TEMAS = [
  'deus-e-trindade',
  'biblia-e-tradicao',
  'jesus-cristo',
  'igreja',
  'maria',
  'vida-eterna',
  'sacramentos',
  'moral',
  'oracao',
  'fe-e-razao',
  'historia-da-igreja',
] as const

/** Seções do site. Novos públicos e formatos entram como novas seções/coleções. */
export const SECOES = ['aprender', 'defesa-da-fe'] as const

const referencia = z.object({
  titulo: z.string(),
  autor: z.string().optional(),
  url: z.url().optional(),
})

export default defineContentConfig({
  collections: {
    artigos: defineCollection({
      type: 'page',
      source: 'artigos/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        tema: z.enum(TEMAS),
        secao: z.enum(SECOES).default('aprender'),
        status: z.enum(STATUS).default('rascunho'),
        nivel: z.enum(['iniciante', 'intermediario', 'avancado']).optional(),
        /** Preenchido no build (hook em nuxt.config.ts). */
        minutos: z.number().optional(),
        tags: z.array(z.string()).default([]),
        publicadoEm: z.iso.date().optional(),
        atualizadoEm: z.iso.date().optional(),
        referencias: z.array(referencia).default([]),
        /** Slug de uma obra em content/obras; sem ela, o artigo usa a obra do tema. */
        obra: z.string().optional(),
        /** Resumo no formato das quaestiones de S. Tomás, usado nos destaques da Defesa da fé. */
        quaestio: z
          .object({
            pareceQue: z.string(),
            emSentidoContrario: z.string(),
            respondo: z.string(),
          })
          .optional(),
        /** Controle do processo de revisão (ver docs/revisao.md). */
        revisao: z
          .object({
            citacoesConferidas: z.boolean().default(false),
            referenciasConferidas: z.boolean().default(false),
            revisorDoutrinal: z.string().optional(),
            notas: z.string().optional(),
          })
          .default({ citacoesConferidas: false, referenciasConferidas: false }),
      }),
    }),

    trilhas: defineCollection({
      type: 'data',
      source: 'trilhas/*.yml',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        tema: z.enum(TEMAS),
        status: z.enum(STATUS).default('rascunho'),
        /** Slugs dos artigos, na ordem de leitura. */
        artigos: z.array(z.string()).min(1),
      }),
    }),

    temas: defineCollection({
      type: 'data',
      source: 'temas/*.yml',
      schema: z.object({
        nome: z.string(),
        resumo: z.string(),
        descricao: z.string(),
        ordem: z.number().int(),
        /** Slug da obra que representa o tema (content/obras/<slug>.yml). */
        obra: z.string(),
      }),
    }),

    /** Obras de arte usadas no site, com a procedência conferida (docs/imagens.md). */
    obras: defineCollection({
      type: 'data',
      source: 'obras/*.yml',
      schema: z.object({
        titulo: z.string(),
        autor: z.string(),
        data: z.string(),
        acervo: z.string(),
        /** Descrição da cena, para leitores de tela. */
        alt: z.string(),
        /** object-position do recorte (ex.: "center 40%"). */
        posicao: z.string().default('center'),
        /** Recorte nas faixas em largura total (abertura de artigo, tema e trilha), quando difere do `posicao`. */
        posicaoFaixa: z.string().optional(),
        licenca: z.string(),
        /** Obrigatório quando a licença é CC BY ou CC BY-SA. */
        credito: z.string().optional(),
        fonte: z.url(),
      }),
    }),
  },
})
