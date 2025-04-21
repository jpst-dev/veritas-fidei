import type { Category } from "./types";

export const papado: Category = {
  id: "papado",
  title: "Papado e Sucessão Apostólica",
  description:
    "Fundamentos bíblicos, históricos e teológicos do primado de Pedro",
  icon: "KeyIcon",
  tags: ["Pedro", "Igreja", "Magistério"],
  stats: {
    totalTopics: 4,
    readingTime: "71 min",
    difficulty: "Intermediário",
    lastUpdated: "2025-04-21",
  },
  subcategories: [
    {
      id: "primado-de-pedro",
      title: "Primado de Pedro",
      description: "O papel de Pedro na fundação e governo da Igreja",
      icon: "CrownIcon",
      topics: [
        {
          id: 1,
          title: "O Papado nas Escrituras",
          description:
            "Bases bíblicas do primado de Pedro e sua missão na Igreja",
          contentPath: "o-papado-nas-escrituras.md",
          references: [
            {
              title: "Catecismo da Igreja Católica §§ 880–882",
              author: "Igreja Católica",
              link: "https://www.vatican.va/archive/catechism_po/p123a9p4.htm",
            },
            {
              title: "Pastor Aeternus",
              author: "Concílio Vaticano I",
              link: "https://www.ewtn.com/catholicism/library/pastor-aeternus-on-the-church-of-christ-1518",
            },
            {
              title: "Roma Doce Lar",
              author: "Scott Hahn",
              link: "https://www.cléofas.com.br/roma-doce-lar-scott-hahn/",
            },
            {
              title: "Upon This Rock",
              author: "Stephen K. Ray",
              link: "https://shop.catholic.com/upon-this-rock-the-papacy-and-the-church/",
            },
            {
              title: "Contra as Heresias",
              author: "Santo Irineu de Lyon",
              link: "https://www.newadvent.org/fathers/0103.htm",
            },
          ],
          tags: ["Pedro", "Magistério", "Sucessão"],
          stats: {
            readingTime: "15",
            difficulty: "Intermediário",
            lastUpdated: "2025-04-20",
            progress: 0,
          },
        },
        {
          id: 2,
          title: "Infalibilidade Papal",
          description: "O que a Igreja ensina sobre a infalibilidade do Papa",
          contentPath: "infalibilidade-papal.md",
          references: [
            {
              title: "Catecismo da Igreja Católica §§ 891–892",
              author: "Igreja Católica",
              link: "https://www.vatican.va/archive/catechism_po/p123a9p4.htm",
            },
            {
              title: "Pastor Aeternus",
              author: "Concílio Vaticano I",
              link: "https://www.ewtn.com/catholicism/library/pastor-aeternus-on-the-church-of-christ-1518",
            },
            {
              title: "A Fé Cristã Ontem e Hoje",
              author: "Joseph Ratzinger (Bento XVI)",
              link: "https://www.amazon.com.br/F%C3%A9-Crist%C3%A3-Ontem-Hoje/dp/8574652423",
            },
            {
              title: "Manual de Teologia Dogmática",
              author: "Ludwig Ott",
              link: "https://www.paulus.com.br/loja/manual-de-teologia-dogmatica",
            },
            {
              title: "A Infalibilidade Papal",
              author: "Dom Estêvão Bettencourt",
              link: "https://cleofas.com.br/a-infalibilidade-papal/",
            },
          ],
          tags: [],
          stats: {
            readingTime: "12",
            difficulty: "Avançado",
            lastUpdated: "2025-04-21",
            progress: 0,
          },
        },
        {
          id: 4,
          title: "Definição e Limites da Infalibilidade Papal",
          description:
            "Uma análise aprofundada sobre as condições e limites precisos da infalibilidade papal",
          contentPath: "infalibilidade-papa-definicao-limites.md",
          references: [
            {
              title: "Catecismo da Igreja Católica §§ 888-892",
              author: "Igreja Católica",
              link: "https://www.vatican.va/archive/catechism_po/p123a9p4.htm",
            },
            {
              title: "Pastor Aeternus",
              author: "Concílio Vaticano I",
              link: "https://www.ewtn.com/catholicism/library/pastor-aeternus-on-the-church-of-christ-1518",
            },
            {
              title: "Constituição Dogmática Lumen Gentium, capítulo III",
              author: "Concílio Vaticano II",
              link: "https://www.vatican.va/archive/hist_councils/ii_vatican_council/documents/vat-ii_const_19641121_lumen-gentium_po.html",
            },
            {
              title: "Ut Unum Sint, nn. 88-96",
              author: "São João Paulo II",
              link: "https://www.vatican.va/content/john-paul-ii/pt/encyclicals/documents/hf_jp-ii_enc_25051995_ut-unum-sint.html",
            },
            {
              title: "Sobre o Conceito de Infalibilidade na Teologia Católica",
              author: "Karl Rahner",
              link: "https://books.google.com/books/about/Theological_Investigations.html?id=0cYQAQAAIAAJ",
            },
          ],
          tags: ["Infalibilidade", "Magistério", "Limites", "Papado"],
          stats: {
            readingTime: "20",
            difficulty: "Avançado",
            lastUpdated: "2025-04-21",
            progress: 0,
          },
        },
        {
          id: 3,
          title: "Sucessão Apostólica",
          description:
            "Como a autoridade apostólica continua na Igreja através dos bispos",
          contentPath: "sucessao-apostolica.md",
          references: [
            {
              title: "Catecismo da Igreja Católica §§ 77–79; 861–862",
              author: "Igreja Católica",
              link: "https://www.vatican.va/archive/catechism_po/index_new/catechism/catechism-pt.html",
            },
            {
              title: "Lumen Gentium §§ 18–21",
              author: "Concílio Vaticano II",
              link: "https://www.vatican.va/archive/hist_councils/ii_vatican_council/documents/vat-ii_const_19641121_lumen-gentium_po.html",
            },
            {
              title: "Contra as Heresias, Livro III",
              author: "Santo Irineu de Lyon",
              link: "https://www.newadvent.org/fathers/0103.htm",
            },
            {
              title: "Chamados à Comunhão",
              author: "Joseph Ratzinger",
              link: "https://www.paulus.com.br/loja/chamados-a-comunhao-produto",
            },
            {
              title: "Tradição e Tradições",
              author: "Yves Congar",
              link: "https://www.livrariadominus.com.br/tradicao-e-tradicoes-yves-congar",
            },
          ],
          tags: [],
          stats: {
            readingTime: "12",
            difficulty: "Intermediário",
            lastUpdated: "2025-04-21",
            progress: 0,
          },
        },
      ],
      stats: {
        totalTopics: 4,
        readingTime: "59 min",
        difficulty: "Intermediário",
        lastUpdated: "2025-04-21",
      },
    },
    {
      id: "magisterio-da-igreja",
      title: "Magistério da Igreja",
      description:
        "A missão da Igreja de ensinar e interpretar autenticamente a Revelação",
      icon: "AcademicCapIcon",
      topics: [
        {
          id: 1,
          title: "Magistério da Igreja",
          description:
            "O papel do Magistério como intérprete da Revelação divina",
          contentPath: "magisterio-da-igreja.md",
          references: [
            {
              title: "Catecismo da Igreja Católica §§ 85–95, 888–892",
              author: "Igreja Católica",
              link: "https://www.vatican.va/archive/catechism_po/index_new/catechism/catechism-pt.html",
            },
            {
              title: "Dei Verbum §10",
              author: "Concílio Vaticano II",
              link: "https://www.vatican.va/archive/hist_councils/ii_vatican_council/documents/vat-ii_const_19651118_dei-verbum_po.html",
            },
            {
              title: "Verbum Domini",
              author: "Papa Bento XVI",
              link: "https://www.vatican.va/content/benedict-xvi/pt/apost_exhortations/documents/hf_ben-xvi_exh_20100930_verbum-domini.html",
            },
            {
              title: "A Autoridade da Igreja",
              author: "Scott Hahn",
              link: "https://www.cléofas.com.br/a-autoridade-da-igreja-scott-hahn/",
            },
            {
              title: "Magistério: Níveis e Autoridade",
              author: "Dom Estêvão Bettencourt",
              link: "https://permanencia.org.br/drupal/node/3227",
            },
          ],
          tags: ["Magistério", "Revelação", "Igreja"],
          stats: {
            readingTime: "12",
            difficulty: "Intermediário",
            lastUpdated: "2025-04-21",
            progress: 0,
          },
        },
      ],
      stats: {
        totalTopics: 1,
        readingTime: "12 min",
        difficulty: "Intermediário",
        lastUpdated: "2025-04-21",
      },
    },
  ],
};
