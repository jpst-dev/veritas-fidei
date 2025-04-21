import type { Category } from "./types";

export const doutrina: Category = {
  id: "doutrina",
  title: "Doutrina Católica",
  description: "As verdades fundamentais da fé católica",
  icon: "ScaleIcon",
  stats: {
    totalTopics: 40,
    readingTime: "14 horas",
    difficulty: "Intermediário",
    lastUpdated: "2024-06-27",
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
          contentPath: "doutrina/santissima-trindade.md",
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
          contentPath: "doutrina/os-sete-sacramentos.md",
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
          contentPath: "doutrina/a-presenca-real-na-eucaristia.md",
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
        lastUpdated: "2024-06-27",
      },
      topics: [
        {
          id: 1,
          title: "Virtudes Cardeais e Teologais",
          description:
            "Exploração das quatro virtudes cardeais (prudência, justiça, fortaleza e temperança) e das três virtudes teologais (fé, esperança e caridade)",
          contentPath: "virtudes-cardeais-teologais.md",
          references: [
            {
              title: "Catecismo da Igreja Católica §§ 1803-1845",
              author: "Igreja Católica",
              link: "https://www.vatican.va/archive/cathechism_po/index_new/p3s1cap1_1699-1876_po.html",
            },
            {
              title: "Suma Teológica, I-II, q. 49-67 e II-II, q. 1-170",
              author: "São Tomás de Aquino",
              link: "https://sumateologica.wordpress.com/download/",
            },
            {
              title: "Veritatis Splendor",
              author: "São João Paulo II",
              link: "https://www.vatican.va/content/john-paul-ii/pt/encyclicals/documents/hf_jp-ii_enc_06081993_veritatis-splendor.html",
            },
            {
              title: "Sermão sobre o Monte (nn. 38-40)",
              author: "Santo Agostinho",
              link: "https://www.ecclesia.com.br/biblioteca/pais_da_igreja/santo_agostinho_sermao_da_montanha.html",
            },
          ],
          tags: ["Virtudes", "Moral", "Ética", "Vida Cristã"],
          stats: {
            readingTime: "25 min",
            difficulty: "Intermediário",
            lastUpdated: "2024-06-27",
            progress: 0,
          },
        },
        {
          id: 2,
          title: "Doutrina Social da Igreja",
          description:
            "Os princípios fundamentais do ensino social católico: dignidade da pessoa humana, bem comum, subsidiariedade e solidariedade",
          contentPath: "doutrina/doutrina-social-igreja.md",
          references: [
            {
              title: "Compêndio da Doutrina Social da Igreja",
              author: "Pontifício Conselho Justiça e Paz",
              link: "https://www.vatican.va/roman_curia/pontifical_councils/justpeace/documents/rc_pc_justpeace_doc_20060526_compendio-dott-soc_po.html",
            },
            {
              title: "Rerum Novarum",
              author: "Papa Leão XIII",
              link: "https://www.vatican.va/content/leo-xiii/pt/encyclicals/documents/hf_l-xiii_enc_15051891_rerum-novarum.html",
            },
            {
              title: "Laudato Si'",
              author: "Papa Francisco",
              link: "https://www.vatican.va/content/francesco/pt/encyclicals/documents/papa-francesco_20150524_enciclica-laudato-si.html",
            },
            {
              title: "Fratelli Tutti",
              author: "Papa Francisco",
              link: "https://www.vatican.va/content/francesco/pt/encyclicals/documents/papa-francesco_20201003_enciclica-fratelli-tutti.html",
            },
          ],
          tags: ["Doutrina Social", "Justiça", "Caridade", "Bem Comum"],
          stats: {
            readingTime: "30 min",
            difficulty: "Intermediário",
            lastUpdated: "2024-06-27",
            progress: 0,
          },
        },
        {
          id: 3,
          title: "Formação da Consciência Moral",
          description:
            "Como a consciência se forma e funciona na vida moral cristã, e o papel do discernimento ético",
          contentPath: "formacao-consciencia-moral.md",
          references: [
            {
              title: "Catecismo da Igreja Católica §§ 1776-1802",
              author: "Igreja Católica",
              link: "https://www.vatican.va/archive/cathechism_po/index_new/p3s1cap1_1699-1876_po.html",
            },
            {
              title: "Veritatis Splendor §§ 54-64",
              author: "São João Paulo II",
              link: "https://www.vatican.va/content/john-paul-ii/pt/encyclicals/documents/hf_jp-ii_enc_06081993_veritatis-splendor.html",
            },
            {
              title: "Amoris Laetitia, Capítulo 8",
              author: "Papa Francisco",
              link: "https://www.vatican.va/content/francesco/pt/apost_exhortations/documents/papa-francesco_esortazione-ap_20160319_amoris-laetitia.html",
            },
            {
              title: "Gaudium et Spes §§ 16-17",
              author: "Concílio Vaticano II",
              link: "https://www.vatican.va/archive/hist_councils/ii_vatican_council/documents/vat-ii_const_19651207_gaudium-et-spes_po.html",
            },
          ],
          tags: ["Consciência", "Moral", "Discernimento", "Ética"],
          stats: {
            readingTime: "20 min",
            difficulty: "Intermediário",
            lastUpdated: "2024-06-25",
            progress: 0,
          },
        },
        {
          id: 4,
          title: "Moral Sexual Católica",
          description:
            "Visão integral da sexualidade humana segundo o ensinamento católico",
          contentPath: "moral-sexual-catolica.md",
          references: [
            {
              title: "Catecismo da Igreja Católica §§ 2331-2400",
              author: "Igreja Católica",
              link: "https://www.vatican.va/archive/cathechism_po/index_new/p3s2c2a6_2331-2400_po.html",
            },
            {
              title: "Humanae Vitae",
              author: "Papa Paulo VI",
              link: "https://www.vatican.va/content/paul-vi/pt/encyclicals/documents/hf_p-vi_enc_25071968_humanae-vitae.html",
            },
            {
              title: "Teologia do Corpo",
              author: "São João Paulo II",
              link: "https://www.amazon.com.br/Teologia-do-Corpo-Christopher-West/dp/8529502477",
            },
            {
              title: "Familiaris Consortio",
              author: "São João Paulo II",
              link: "https://www.vatican.va/content/john-paul-ii/pt/apost_exhortations/documents/hf_jp-ii_exh_19811122_familiaris-consortio.html",
            },
            {
              title: "Amoris Laetitia, Capítulo 4-6",
              author: "Papa Francisco",
              link: "https://www.vatican.va/content/francesco/pt/apost_exhortations/documents/papa-francesco_esortazione-ap_20160319_amoris-laetitia.html",
            },
          ],
          tags: ["Sexualidade", "Moral", "Matrimônio", "Família", "Bioética"],
          stats: {
            readingTime: "25 min",
            difficulty: "Intermediário",
            lastUpdated: "2024-06-27",
            progress: 0,
          },
        },
      ],
    },
    {
      id: "doutrina-4",
      title: "Escatologia",
      description: "As últimas coisas: morte, juízo, céu e inferno",
      icon: "ClockIcon",
      stats: {
        totalTopics: 4,
        readingTime: "1.5 horas",
        difficulty: "Intermediário",
        lastUpdated: "2024-06-27",
      },
      topics: [
        {
          id: 1,
          title: "A Vida Eterna: Céu, Inferno e Purgatório",
          description:
            "Compreensão católica sobre os destinos eternos e o estado intermediário da purificação",
          contentPath: "doutrina/vida-eterna-ceu-inferno-purgatorio.md",
          references: [
            {
              title: "Catecismo da Igreja Católica §§ 1020-1065",
              author: "Igreja Católica",
              link: "https://www.vatican.va/archive/cathechism_po/index_new/p123a12_1033-1065_po.html",
            },
            {
              title: "Spe Salvi §§ 44-48",
              author: "Papa Bento XVI",
              link: "https://www.vatican.va/content/benedict-xvi/pt/encyclicals/documents/hf_ben-xvi_enc_20071130_spe-salvi.html",
            },
            {
              title: "A Divina Comédia",
              author: "Dante Alighieri",
              link: "https://www.amazon.com.br/Divina-Comédia-Dante-Alighieri/dp/8573261528",
            },
            {
              title:
                "Carta sobre Algumas Questões Concernentes à Escatologia (1979)",
              author: "Congregação para a Doutrina da Fé",
              link: "https://www.vatican.va/roman_curia/congregations/cfaith/documents/rc_con_cfaith_doc_19790517_escatologia_po.html",
            },
          ],
          tags: ["Escatologia", "Céu", "Inferno", "Purgatório", "Vida Eterna"],
          stats: {
            readingTime: "25 min",
            difficulty: "Intermediário",
            lastUpdated: "2024-06-27",
            progress: 0,
          },
        },
        {
          id: 2,
          title: "A Segunda Vinda de Cristo e o Fim dos Tempos",
          description:
            "Doutrina católica sobre a parusia, a ressurreição dos mortos e o juízo final",
          contentPath: "doutrina/segunda-vinda-cristo-fim-tempos.md",
          references: [
            {
              title: "Catecismo da Igreja Católica §§ 668-682",
              author: "Igreja Católica",
              link: "https://www.vatican.va/archive/cathechism_po/index_new/p1s2c2a7_668-682_po.html",
            },
            {
              title: "Lumen Gentium §§ 48-51",
              author: "Concílio Vaticano II",
              link: "https://www.vatican.va/archive/hist_councils/ii_vatican_council/documents/vat-ii_const_19641121_lumen-gentium_po.html",
            },
            {
              title: "Apocalipse de São João",
              author: "São João",
              link: "https://www.bibliacatolica.com.br/biblia-ave-maria/apocalipse/1/",
            },
            {
              title: "A Vinda de Cristo na Glória e o Triunfo de Seu Reino",
              author: "Cardeal Joseph Ratzinger",
              link: "https://www.vatican.va/roman_curia/congregations/cfaith/documents/rc_con_cfaith_doc_20070629_responsa-quaestiones_po.html",
            },
          ],
          tags: ["Escatologia", "Parusia", "Juízo Final", "Ressurreição"],
          stats: {
            readingTime: "20 min",
            difficulty: "Intermediário",
            lastUpdated: "2024-06-27",
            progress: 0,
          },
        },
      ],
    },
  ],
};

