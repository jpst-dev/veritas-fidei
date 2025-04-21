import type { Category } from "./types";

export const escrituraTradicao: Category = {
  id: "escritura-tradicao",
  title: "Escritura e Tradição",
  description: "A relação entre a Sagrada Escritura e a Sagrada Tradição",
  icon: "BookOpenIcon",
  subcategories: [
    {
      id: "sola-scriptura",
      title: "Sola Scriptura",
      description: "Respostas à doutrina protestante do Sola Scriptura",
      icon: "BookOpenIcon",
      topics: [
        {
          id: 1,
          title: "Sola Scriptura",
          description: "Resposta à doutrina protestante da Sola Scriptura",
          contentPath: "sola-scriptura.md",
          references: [
            {
              title: "2 Tessalonicenses 2:15",
              author: "São Paulo",
              link: "https://www.bibliaonline.com.br/acf/2ts/2/15",
            },
            {
              title: "1 Timóteo 3:15",
              author: "São Paulo",
              link: "https://www.bibliaonline.com.br/acf/1tm/3/15",
            },
          ],
          tags: ["Bíblia", "Tradição", "Magistério"],
          stats: {
            readingTime: "10 min",
            difficulty: "Iniciante",
            lastUpdated: "2024-04-17",
            progress: 0,
          },
        },
        {
          id: 2,
          title: "Sola Scriptura: Uma Análise Crítica",
          description:
            "Por que o princípio protestante da 'Somente a Escritura' é inconsistente com o próprio testemunho bíblico",
          contentPath: "escritura-tradicao/sola-scriptura-uma-analise-critica.md",
          references: [
            {
              title: "Dei Verbum",
              author: "Concílio Vaticano II",
              link: "https://www.vatican.va/archive/hist_councils/ii_vatican_council/documents/vat-ii_const_19651118_dei-verbum_po.html",
            },
            {
              title: "Não Só Pela Escritura",
              author: "James Akin",
              link: "https://www.catholic.com/magazine/print-edition/not-by-scripture-alone",
            },
            {
              title: "A Fé dos Nossos Pais",
              author: "James Gibbons",
              link: "https://www.amazon.com.br/F%C3%A9-dos-Nossos-Pais/dp/8580660912",
            },
          ],
          tags: ["Bíblia", "Tradição", "Apologética", "Magistério"],
          stats: {
            readingTime: "20",
            difficulty: "Intermediário",
            lastUpdated: "2024-04-17",
            progress: 0,
          },
        },
      ],
      stats: {
        totalTopics: 2,
        readingTime: "35 min",
        difficulty: "Intermediário",
        lastUpdated: "2024-04-17",
      },
    },
    {
      id: "desenvolvimento-doutrinal",
      title: "Desenvolvimento Doutrinal",
      description: "Como a doutrina católica se desenvolve ao longo do tempo",
      icon: "AcademicCapIcon",
      topics: [
        {
          id: 7,
          title: "O Desenvolvimento da Doutrina",
          description:
            "Como a Igreja Católica entende o desenvolvimento doutrinal",
          contentPath: "escritura-tradicao/o-desenvolvimento-da-doutrina.md",
          references: [
            {
              title: "Ensaio sobre o Desenvolvimento da Doutrina Cristã",
              author: "John Henry Newman",
              link: "https://www.newmanreader.org/works/development/index.html",
            },
            {
              title: "Catecismo da Igreja Católica §§ 94, 2651",
              author: "Igreja Católica",
              link: "https://www.vatican.va/archive/catechism_po/index_new/catechism/catechism-pt.html",
            },
            {
              title: "Dei Verbum §8",
              author: "Concílio Vaticano II",
              link: "https://www.vatican.va/archive/hist_councils/ii_vatican_council/documents/vat-ii_const_19651118_dei-verbum_po.html",
            },
            {
              title: "Luz do Mundo",
              author: "Papa Bento XVI",
              link: "https://www.vaticannews.va/pt/papa/news/2020-12/livro-entrevista-papa-bento-xvi-luz-do-mundo.html",
            },
            {
              title: "Commonitorium",
              author: "São Vicente de Lérins",
              link: "https://www.newadvent.org/fathers/3506.htm",
            },
          ],
          tags: ["Doutrina", "Desenvolvimento", "Teologia", "Tradição"],
          stats: {
            readingTime: "18",
            difficulty: "Avançado",
            lastUpdated: "2024-04-17",
            progress: 0,
          },
        },
      ],
      stats: {
        totalTopics: 1,
        readingTime: "18 min",
        difficulty: "Avançado",
        lastUpdated: "2024-04-17",
      },
    },
  ],
  stats: {
    totalTopics: 3,
    readingTime: "48 min",
    difficulty: "Intermediário",
    lastUpdated: "2024-04-17",
  },
  tags: ["Bíblia", "Tradição", "Magistério", "Doutrina"],
};

