import type { Category } from "./types";

export const filosofiaTeologia: Category = {
  id: "filosofia-teologia",
  title: "Filosofia e Teologia",
  description: "Argumentos filosóficos e teológicos para a fé católica",
  icon: "AcademicCapIcon",
  subcategories: [
    {
      id: "filosofia-teologia-1",
      title: "Provas da Existência de Deus",
      description:
        "Argumentos clássicos e contemporâneos para a existência de Deus",
      icon: "FireIcon",
      topics: [
        {
          id: 1,
          title: "As Cinco Vias de São Tomás de Aquino",
          description:
            "Análise detalhada dos argumentos clássicos para a existência de Deus",
          contentPath: "as-cinco-vias-de-sao-tomas-de-aquino.md",
          references: [
            {
              title: "Suma Teológica, Parte I, Questão 2, Artigo 3",
              author: "São Tomás de Aquino",
              link: "https://permanencia.org.br/drupal/node/4665",
            },
            {
              title: "A Existência de Deus: As Cinco Vias de Tomás de Aquino",
              author: "Edward Feser",
              link: "https://www.amazon.com/Five-Proofs-Existence-Edward-Feser/dp/1621641333",
            },
          ],
          tags: ["Filosofia", "Teologia", "Metafísica"],
          stats: {
            readingTime: "20",
            difficulty: "Avançado",
            lastUpdated: "2024-04-17",
            progress: 0,
          },
        },
        {
          id: 2,
          title: "O Argumento Ontológico",
          description:
            "Análise do argumento ontológico para a existência de Deus",
          contentPath: "o-argumento-ontologico.md",
          references: [
            {
              title: "Proslogion",
              author: "Santo Anselmo",
              link: "https://www.newadvent.org/fathers/1101.htm",
            },
            {
              title: "Crítica da Razão Pura",
              author: "Immanuel Kant",
              link: "https://www.gutenberg.org/ebooks/4280", // versão em inglês
            },
            {
              title: "The Nature of Necessity",
              author: "Alvin Plantinga",
              link: "https://global.oup.com/academic/product/the-nature-of-necessity-9780198244141",
            },
            {
              title: "Catecismo da Igreja Católica §§ 31–39",
              author: "Igreja Católica",
              link: "https://www.vatican.va/archive/catechism_po/p1s1c1a3_po.htm",
            },
            {
              title: "Deus e a Filosofia",
              author: "Étienne Gilson",
              link: "https://www.amazon.com.br/Deus-Filosofia-Etienne-Gilson/dp/8525415969",
            },
          ],
          tags: ["Filosofia", "Metafísica", "Apologética"],
          stats: {
            readingTime: "20",
            difficulty: "Avançado",
            lastUpdated: "2024-04-17",
            progress: 0,
          },
        },
        {
          id: 3,
          title: "O Problema do Mal",
          description:
            "Como conciliar a existência de Deus com a presença do mal no mundo",
          contentPath: "o-problema-do-mal.md",
          references: [
            {
              title: "Deus, a Liberdade e o Mal",
              author: "Alvin Plantinga",
              link: "https://www.amazon.com/Deus-Liberdade-Portuguese-Alvin-Plantinga/dp/8527505711",
            },
            {
              title: "O Problema do Sofrimento",
              author: "C.S. Lewis",
              link: "https://www.amazon.com.br/problema-sofrimento-C-S-Lewis/dp/8578607805",
            },
          ],
          tags: ["Filosofia", "Teodiceia", "Apologética"],
          stats: {
            readingTime: "20",
            difficulty: "Intermediário",
            lastUpdated: "2024-04-17",
            progress: 0,
          },
        },
      ],
      stats: {
        totalTopics: 3,
        readingTime: "27 min",
        difficulty: "Intermediário",
        lastUpdated: "2024-04-17",
      },
    },
    {
      id: "filosofia-teologia-2",
      title: "Filosofia Moral e Teodiceia",
      description: "Fundamentos racionais da moralidade e do problema do mal",
      icon: "ScaleIcon",
      topics: [
        {
          id: 4,
          title: "Lei Natural",
          description:
            "Compreendendo a lei natural como base da moral católica",
          contentPath: "lei-natural.md",
          references: [
            {
              title: "Catecismo da Igreja Católica §§1954–1960",
              author: "Igreja Católica",
              link: "https://www.vatican.va/archive/catechism_po/p3s1c3a1_po.htm",
            },
            {
              title: "Suma Teológica, I-II, qq. 91–94",
              author: "São Tomás de Aquino",
              link: "https://www.newadvent.org/summa/2091.htm",
            },
            {
              title: "Veritatis Splendor",
              author: "São João Paulo II",
              link: "https://www.vatican.va/content/john-paul-ii/pt/encyclicals/documents/hf_jp-ii_enc_06081993_veritatis-splendor.html",
            },
            {
              title: "Discurso ao Parlamento Alemão (22/09/2011)",
              author: "Papa Bento XVI",
              link: "https://www.vatican.va/content/benedict-xvi/pt/speeches/2011/september/documents/hf_ben-xvi_spe_20110922_reichstag-berlin.html",
            },
            {
              title: "Os Direitos do Homem e a Lei Natural",
              author: "Jacques Maritain",
              link: "https://www.academia.edu/35482727/Os_direitos_do_homem_e_a_lei_natural_Jacques_Maritain",
            },
          ],
          tags: ["Filosofia", "Ética", "Lei Natural"],
          stats: {
            readingTime: "15",
            difficulty: "Intermediário",
            lastUpdated: "2024-04-17",
            progress: 0,
          },
        },
        {
          id: 5,
          title: "O Livre-Arbítrio e o Mal",
          description:
            "Análise da relação entre o livre-arbítrio e a existência do mal",
          contentPath: "o-livre-arbitrio-e-o-mal.md",
          references: [
            {
              title: "Suma Teológica, Parte I, q. 22–25; q. 49",
              author: "São Tomás de Aquino",
              link: "https://www.newadvent.org/summa/",
            },
            {
              title: "Confissões (Livro VII)",
              author: "Santo Agostinho",
              link: "https://www.augustinus.it/portugues/confissoes/index2.htm",
            },
            {
              title: "Catecismo da Igreja Católica",
              author: "Igreja Católica",
              link: "https://www.vatican.va/archive/catechism_po/index_new/catechism/catechism-pt.html",
            },
            {
              title: "Spe Salvi §§ 35–40",
              author: "Papa Bento XVI",
              link: "https://www.vatican.va/content/benedict-xvi/pt/encyclicals/documents/hf_ben-xvi_enc_20071130_spe-salvi.html",
            },
            {
              title: "God, Freedom and Evil",
              author: "Alvin Plantinga",
              link: "https://www.amazon.com/dp/0802817319",
            },
          ],
          tags: ["Filosofia", "Livre-Arbítrio", "Teodiceia"],
          stats: {
            readingTime: "15",
            difficulty: "Intermediário",
            lastUpdated: "2024-04-17",
            progress: 0,
          },
        },
      ],
      stats: {
        totalTopics: 2,
        readingTime: "27 min",
        difficulty: "Intermediário",
        lastUpdated: "2024-04-17",
      },
    },
  ],
  stats: {
    totalTopics: 3,
    readingTime: "27 min",
    difficulty: "Intermediário",
    lastUpdated: "2024-03-15",
  },
  tags: ["Filosofia", "Teologia", "Apologética"],
};
