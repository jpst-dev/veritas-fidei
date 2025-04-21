import type { Category } from "./types";

export const doutrina: Category = {
  id: "doutrina",
  title: "Doutrina Católica",
  description: "As verdades fundamentais da fé católica",
  icon: "ScaleIcon",
  stats: {
    totalTopics: 36,
    readingTime: "12 horas e 30 min",
    difficulty: "Intermediário",
    lastUpdated: "2024-06-15",
  },
  tags: ["Doutrina", "Dogmas", "Magistério", "Catecismo"],
  subcategories: [
    {
      id: "doutrina-1",
      title: "Credo",
      description: "Os artigos de fé do Credo",
      icon: "ScaleIcon",
      stats: {
        totalTopics: 13,
        readingTime: "4 horas e 30 min",
        difficulty: "Iniciante",
        lastUpdated: "2024-06-15",
      },
      topics: [
        {
          id: 1,
          title: "A Santíssima Trindade",
          description:
            "O mistério central da fé cristã: um só Deus em três Pessoas divinas",
          contentPath: "santissima-trindade.md",
          references: [
            {
              title: "Catecismo da Igreja Católica §§ 232-267",
              author: "Igreja Católica",
              link: "https://www.vatican.va/archive/cathechism_po/index_new/p1s2c1_198-421_po.html",
            },
            {
              title: "Constituição Dogmática Dei Verbum",
              author: "Concílio Vaticano II",
              link: "https://www.vatican.va/archive/hist_councils/ii_vatican_council/documents/vat-ii_const_19651118_dei-verbum_po.html",
            },
            {
              title: "De Trinitate",
              author: "Santo Agostinho",
              link: "https://www.ecclesia.com.br/biblioteca/pais_da_igreja/a_trindade_santo_agostinho.html",
            },
            {
              title: "Suma Teológica, I, q. 27-43",
              author: "São Tomás de Aquino",
              link: "https://sumateologica.wordpress.com/download/",
            },
            {
              title: "Introdução ao Cristianismo",
              author: "Joseph Ratzinger (Bento XVI)",
              link: "https://www.loyolajesuitas.com.br/introducao-ao-cristianismo-joseph-ratzinger/",
            },
          ],
          tags: ["Trindade", "Dogma", "Mistério", "Deus", "Revelação"],
          stats: {
            readingTime: "30",
            difficulty: "Intermediário",
            lastUpdated: "2024-06-15",
            progress: 0,
          },
        },
      ],
    },
    {
      id: "doutrina-2",
      title: "Sacramentos",
      description: "Os sete sacramentos da Igreja",
      icon: "GiftIcon",
      stats: {
        totalTopics: 7,
        readingTime: "2.5 horas",
        difficulty: "Intermediário",
        lastUpdated: "2024-04-17",
      },
      topics: [
        {
          id: 1,
          title: "Os Sete Sacramentos",
          description:
            "Introdução geral aos sacramentos como sinais eficazes da graça",
          contentPath: "os-sete-sacramentos.md",
          references: [
            {
              title: "Catecismo da Igreja Católica §§ 1113–1134",
              author: "Igreja Católica",
              link: "https://www.vatican.va/archive/catechism_po/index_new/catechism/catechism-pt.html",
            },
            {
              title: "Sacramentum Caritatis",
              author: "Papa Bento XVI",
              link: "https://www.vatican.va/content/benedict-xvi/pt/apost_exhortations/documents/hf_ben-xvi_exh_20070222_sacramentum-caritatis.html",
            },
            {
              title: "Manual de Teologia Sacramentária",
              author: "Dom Estêvão Bettencourt",
              link: "https://cleofas.com.br/manual-de-teologia-sacramentaria/",
            },
            {
              title: "Suma Teológica (Parte III)",
              author: "Santo Tomás de Aquino",
              link: "https://sumateologica.wordpress.com/parte-iii/",
            },
            {
              title: "Ecclesia de Eucharistia",
              author: "Papa João Paulo II",
              link: "https://www.vatican.va/content/john-paul-ii/pt/apost_exhortations/documents/hf_jp-ii_exh_20030417_ecclesia-de-eucharistia.html",
            },
          ],
          tags: ["Sacramentos", "Graça", "Igreja", "Doutrina"],
          stats: {
            readingTime: "15",
            difficulty: "Iniciante",
            lastUpdated: "2025-04-21",
            progress: 0,
          },
        },
        {
          id: 2,
          title: "A Presença Real na Eucaristia",
          description:
            "Explicação do dogma da Presença Real de Cristo na Eucaristia e suas bases bíblicas e patrísticas",
          contentPath: "a-presenca-real-na-eucaristia.md",
          references: [
            {
              title: "Catecismo da Igreja Católica §§ 1373-1381",
              author: "Igreja Católica",
              link: "https://www.vatican.va/archive/cathechism_po/index_new/prima-pagina-cic_po.html",
            },
            {
              title: "Mysterium Fidei",
              author: "Papa Paulo VI",
              link: "https://www.vatican.va/content/paul-vi/pt/encyclicals/documents/hf_p-vi_enc_03091965_mysterium.html",
            },
            {
              title: "Ecclesia de Eucharistia",
              author: "Papa João Paulo II",
              link: "https://www.vatican.va/content/john-paul-ii/pt/encyclicals/documents/hf_jp-ii_enc_20030417_eccl-de-euch.html",
            },
            {
              title: "Concílio de Trento, Sessão XIII",
              author: "Igreja Católica",
              link: "https://www.montfort.org.br/bra/documentos/concilios/trento/",
            },
            {
              title: "Suma Teológica, III, q. 75-76",
              author: "São Tomás de Aquino",
              link: "https://sumateologica.wordpress.com/download/",
            },
          ],
          tags: [
            "Eucaristia",
            "Transubstanciação",
            "Presença Real",
            "Sacramentos",
            "Doutrina",
          ],
          stats: {
            readingTime: "20",
            difficulty: "Intermediário",
            lastUpdated: "2024-05-15",
            progress: 0,
          },
        },
      ],
    },
    {
      id: "doutrina-3",
      title: "Moral",
      description: "Os princípios da moral católica",
      icon: "ScaleIcon",
      stats: {
        totalTopics: 16,
        readingTime: "5.5 horas",
        difficulty: "Avançado",
        lastUpdated: "2024-04-17",
      },
      topics: [],
    },
  ],
};
