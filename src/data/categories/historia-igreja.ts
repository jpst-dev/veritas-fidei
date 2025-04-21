import type { Category } from "./types";

export const historiaIgreja: Category = {
  id: "historia-igreja",
  title: "História da Igreja",
  description: "A jornada da Igreja através dos séculos",
  icon: "ClockIcon",
  stats: {
    totalTopics: 30,
    readingTime: "10 horas",
    difficulty: "Intermediário",
    lastUpdated: "13/04/2024",
  },
  tags: ["História", "Padres da Igreja", "Concílios", "Santos"],
  subcategories: [
    {
      id: "idade-media",
      title: "Idade Média",
      description:
        "O papel da Igreja na formação cultural e espiritual da Europa medieval",
      icon: "BookOpenIcon",
      topics: [
        {
          id: 1,
          title: "A Igreja na Idade Média",
          description:
            "A ação evangelizadora, intelectual e cultural da Igreja na Idade Média",
          contentPath: "a-igreja-na-idade-media.md",
          references: [
            {
              title: "A Civilização do Ocidente Medieval",
              author: "Jacques Le Goff",
              link: "https://www.amazon.com.br/dp/8501012994",
            },
            {
              title: "A Igreja nos Primeiros Séculos e a Idade Média",
              author: "Jean Daniélou",
              link: "https://www.amazon.com.br/dp/8535601957",
            },
            {
              title: "Introdução ao Cristianismo",
              author: "Joseph Ratzinger",
              link: "https://www.paulus.com.br/loja/introducao-ao-cristianismo-produto",
            },
            {
              title: "Suma Teológica",
              author: "Santo Tomás de Aquino",
              link: "https://sumateologica.wordpress.com/",
            },
            {
              title: "São Bento e os Fundamentos da Europa",
              author: "Bento XVI",
              link: "https://www.vatican.va/content/benedict-xvi/pt/speeches/2007/may/documents/hf_ben-xvi_spe_20070524_subiaco.html",
            },
          ],
          tags: ["Idade Média", "Evangelização", "Monges", "Cultura"],
          stats: {
            readingTime: "15",
            difficulty: "Intermediário",
            lastUpdated: "2025-04-21",
            progress: 0,
          },
        },
      ],
      stats: {
        totalTopics: 1,
        readingTime: "15 min",
        difficulty: "Intermediário",
        lastUpdated: "2025-04-21",
      },
    },
    {
      id: "concilios-ecumenicos",
      title: "Concílios Ecumênicos",
      description:
        "As grandes assembleias da Igreja que definiram a doutrina ao longo da história",
      icon: "BookOpenIcon",
      topics: [
        {
          id: 1,
          title: "Os Concílios Ecumênicos",
          description:
            "O papel dos concílios na definição da fé e no enfrentamento das heresias",
          contentPath: "os-concilios-ecumenicos.md",
          references: [
            {
              title: "Catecismo da Igreja Católica §§ 888–891",
              author: "Igreja Católica",
              link: "https://www.vatican.va/archive/catechism_po/index_new/catechism/catechism-pt.html",
            },
            {
              title: "Documentos dos Concílios Ecumênicos",
              author: "Vários Autores (Compêndio)",
              link: "https://www.dominiopublico.gov.br/pesquisa/DetalheObraForm.do?select_action=&co_obra=173502",
            },
            {
              title: "História dos Concílios",
              author: "Dom Estêvão Bettencourt",
              link: "https://cleofas.com.br/historia-dos-concilios-dom-estevao-bettencourt/",
            },
            {
              title: "Os Principais Documentos do Concílio Vaticano II",
              author: "Joseph Ratzinger",
              link: "https://www.paulus.com.br/loja/os-principais-documentos-do-concilio-vaticano-ii-produto",
            },
            {
              title: "Manual de Teologia Dogmática",
              author: "Ludwig Ott",
              link: "https://www.amazon.com.br/Manual-Teologia-Dogm%C3%A1tica-Ludwig-Ott/dp/8515020702",
            },
          ],
          tags: ["Concílios", "Dogmas", "História"],
          stats: {
            readingTime: "15",
            difficulty: "Intermediário",
            lastUpdated: "2025-04-21",
            progress: 0,
          },
        },
      ],
      stats: {
        totalTopics: 1,
        readingTime: "15 min",
        difficulty: "Intermediário",
        lastUpdated: "2025-04-21",
      },
    },
    {
      id: "historia-igreja-1",
      title: "Igreja Primitiva",
      description: "Os primeiros séculos do cristianismo",
      icon: "ClockIcon",
      stats: {
        totalTopics: 10,
        readingTime: "3 horas",
        difficulty: "Iniciante",
        lastUpdated: "2024-04-17",
      },
      topics: [
        {
          id: 18,
          title: "Os Cristãos nos Três Primeiros Séculos",
          description:
            "Como viviam os primeiros cristãos e como era organizada a Igreja primitiva",
          contentPath: "os-cristaos-nos-tres-primeiros-seculos.md",
          references: [
            {
              title: "História Eclesiástica",
              author: "Eusébio de Cesareia",
              link: "https://www.newadvent.org/fathers/2501.htm",
            },
            {
              title: "Cartas de Santo Inácio de Antioquia",
              author: "Santo Inácio de Antioquia",
              link: "https://www.newadvent.org/fathers/0102.htm",
            },
            {
              title: "Carta de São Clemente aos Coríntios",
              author: "São Clemente de Roma",
              link: "https://www.newadvent.org/fathers/1010.htm",
            },
            {
              title: "Apologia de São Justino Mártir",
              author: "São Justino",
              link: "https://www.newadvent.org/fathers/0126.htm",
            },
            {
              title: "Catecismo da Igreja Católica §§ 816–822",
              author: "Igreja Católica",
              link: "https://www.vatican.va/archive/catechism_po/p123a9p2.htm",
            },
          ],
          tags: ["História", "Igreja Primitiva", "Mártires"],
          stats: {
            readingTime: "15 min",
            difficulty: "Iniciante",
            lastUpdated: "2024-04-17",
            progress: 0,
          },
        },
        {
          id: 19,
          title: "As Perseguições e os Mártires",
          description:
            "História das perseguições romanas e o testemunho dos mártires cristãos",
          contentPath: "as-perseguicoes-e-os-martires.md",
          references: [
            {
              title: "Martírio de São Policarpo",
              author: "Igreja de Esmirna",
              link: "https://www.newadvent.org/fathers/0102.htm",
            },
            {
              title: "A Paixão de Perpétua e Felicidade",
              author: "Tertuliano (atribuído)",
              link: "https://www.newadvent.org/fathers/0324.htm",
            },
          ],
          tags: ["História", "Mártires", "Perseguições"],
          stats: {
            readingTime: "20 min",
            difficulty: "Iniciante",
            lastUpdated: "2024-04-17",
            progress: 0,
          },
        },
        {
          id: 20,
          title: "Constantino e o Édito de Milão",
          description: "A conversão de Constantino e o fim das perseguições",
          contentPath: "constantino-e-o-edito-de-milao.md",
          references: [
            {
              title: "Vida de Constantino",
              author: "Eusébio de Cesareia",
              link: "https://www.newadvent.org/fathers/2502.htm",
            },
            {
              title: "Concílio de Niceia I (325)",
              author: "Concílio Ecumênico",
              link: "https://www.newadvent.org/cathen/11044a.htm",
            },
            {
              title: "Catecismo da Igreja Católica §§ 675–677",
              author: "Igreja Católica",
              link: "https://www.vatican.va/archive/catechism_po/p1s2c2a7_po.htm",
            },
            {
              title: "Luz do Mundo",
              author: "Papa Bento XVI",
              link: "https://www.vaticannews.va/pt/papa/news/2020-12/livro-entrevista-papa-bento-xvi-luz-do-mundo.html",
            },
            {
              title: "The Apostasy That Wasn’t",
              author: "Rod Bennett",
              link: "https://shop.catholic.com/the-apostasy-that-wasnt-the-extraordinary-story-of-the-unbreakable-early-church/",
            },
          ],
          tags: ["História", "Constantino", "Édito de Milão"],
          stats: {
            readingTime: "15 min",
            difficulty: "Iniciante",
            lastUpdated: "2024-04-17",
            progress: 0,
          },
        },
      ],
    },
  ],
};
