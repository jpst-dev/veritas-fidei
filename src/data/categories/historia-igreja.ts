import type { Category } from "./types";

export const historiaIgreja: Category = {
  id: "historia-igreja",
  title: "História da Igreja",
  description:
    "A jornada da Igreja Católica através dos séculos, desde os primórdios até os dias atuais",
  icon: "ClockIcon",
  subcategories: [
    {
      id: "historia-igreja-1",
      title: "Igreja Primitiva (30-313 d.C.)",
      description: "O período apostólico e a Igreja sob perseguição romana",
      icon: "FireIcon",
      topics: [
        {
          id: 1,
          title: "A Igreja Apostólica",
          description:
            "Os primeiros anos da Igreja sob a liderança dos apóstolos",
          contentPath: "historia-igreja/igreja-apostolica.md",
          references: [
            {
              title: "História da Igreja Cristã",
              author: "Justo L. González",
              link: "https://www.amazon.com.br/História-Igreja-Cristã-Justo-González/dp/8527505703",
            },
            {
              title: "Atos dos Apóstolos",
              author: "São Lucas",
              link: "https://www.vatican.va/archive/bible/nova_vulgata/documents/nova-vulgata_nt_actus-apostolorum_lt.html",
            },
            {
              title: "História da Igreja Católica",
              author: "Daniel-Rops",
              link: "https://amzn.to/3gXgD3K",
            },
          ],
          tags: ["História", "Período Apostólico", "Apóstolos", "São Pedro"],
          stats: {
            readingTime: "20",
            difficulty: "Iniciante",
            lastUpdated: "2024-06-28",
            progress: 0,
          },
        },
        {
          id: 2,
          title: "As Perseguições e os Mártires",
          description:
            "O testemunho heroico dos cristãos durante as perseguições romanas",
          contentPath: "historia-igreja/perseguicoes-martires.md",
          references: [
            {
              title: "História dos Mártires",
              author: "John Foxe",
              link: "https://www.amazon.com.br/Livro-dos-Mártires-John-Foxe/dp/8526304097",
            },
            {
              title: "As Perseguições da Igreja Primitiva",
              author: "H. B. Workman",
              link: "https://www.amazon.com/Persecution-Early-Church-Chapter-History/dp/1498187803",
            },
            {
              title: "Acta Martyrum",
              author: "Igreja Católica",
              link: "https://www.newadvent.org/fathers/0148.htm",
            },
          ],
          tags: ["História", "Mártires", "Perseguições", "Império Romano"],
          stats: {
            readingTime: "25",
            difficulty: "Iniciante",
            lastUpdated: "2024-06-28",
            progress: 0,
          },
        },
        {
          id: 3,
          title: "Os Cristãos nos Três Primeiros Séculos",
          description: "A vida, liturgia e organização da Igreja primitiva",
          contentPath: "historia-igreja/cristaos-tres-primeiros-seculos.md",
          references: [
            {
              title: "A Vida Quotidiana dos Primeiros Cristãos",
              author: "Claude Lepelley",
              link: "https://www.amazon.com.br/Vida-Quotidiana-dos-Primeiros-Cristãos/dp/8573256281",
            },
            {
              title: "A Didaqué",
              author: "Escritos Apostólicos",
              link: "https://www.newadvent.org/fathers/0714.htm",
            },
            {
              title: "A Tradição Apostólica de Hipólito",
              author: "Hipólito de Roma",
              link: "https://www.amazon.com.br/Tradição-Apostólica-Hipólito-Roma/dp/8534927758",
            },
          ],
          tags: ["História", "Igreja Primitiva", "Liturgia", "Vida Cristã"],
          stats: {
            readingTime: "20",
            difficulty: "Intermediário",
            lastUpdated: "2024-06-28",
            progress: 0,
          },
        },
      ],
      stats: {
        totalTopics: 3,
        readingTime: "1 hora e 5 min",
        difficulty: "Iniciante",
        lastUpdated: "2024-06-28",
      },
    },
    {
      id: "historia-igreja-2",
      title: "Igreja Imperial (313-476 d.C.)",
      description:
        "Da liberdade religiosa à queda do Império Romano do Ocidente",
      icon: "BuildingLibraryIcon",
      topics: [
        {
          id: 1,
          title: "Constantino e o Édito de Milão",
          description: "A legalização do cristianismo e suas consequências",
          contentPath: "historia-igreja/constantino-edito-milao.md",
          references: [
            {
              title: "Vida de Constantino",
              author: "Eusébio de Cesareia",
              link: "https://www.newadvent.org/fathers/2502.htm",
            },
            {
              title: "Constantino e o Triunfo da Igreja",
              author: "Paul Veyne",
              link: "https://www.amazon.com.br/Constantino-Triunfo-Igreja-Paul-Veyne/dp/8539001257",
            },
            {
              title: "Édito de Milão (313 d.C.)",
              author: "Constantino e Licínio",
              link: "https://www.newadvent.org/fathers/2502.htm",
            },
          ],
          tags: [
            "História",
            "Constantino",
            "Império Romano",
            "Liberdade Religiosa",
          ],
          stats: {
            readingTime: "15",
            difficulty: "Iniciante",
            lastUpdated: "2024-06-28",
            progress: 0,
          },
        },
        {
          id: 2,
          title: "O Concílio de Niceia",
          description:
            "O primeiro concílio ecumênico e a definição da divindade de Cristo",
          contentPath: "historia-igreja/concilio-niceia.md",
          references: [
            {
              title: "História dos Concílios Ecumênicos",
              author: "Hubert Jedin",
              link: "https://www.amazon.com.br/História-dos-Concílios-Ecumênicos/dp/8534901147",
            },
            {
              title: "Credo Niceno-Constantinopolitano",
              author: "Concílio de Niceia",
              link: "https://www.vatican.va/archive/cathechism_po/index_new/p1s1c3a2_185-1065_po.html",
            },
            {
              title: "Atanásio: A Vida de Antão",
              author: "Santo Atanásio",
              link: "https://www.newadvent.org/fathers/2811.htm",
            },
          ],
          tags: ["História", "Concílios", "Arianismo", "Credos"],
          stats: {
            readingTime: "25",
            difficulty: "Intermediário",
            lastUpdated: "2024-06-28",
            progress: 0,
          },
        },
        {
          id: 3,
          title: "O Concílio de Éfeso",
          description:
            "O terceiro concílio ecumênico e a definição de Maria como Theotokos",
          contentPath: "historia-igreja/concilio-efeso.md",
          references: [
            {
              title: "O Concílio de Éfeso",
              author: "John McGuckin",
              link: "https://www.amazon.com/Council-Ephesus-431-Documents-Illustrating/dp/0198269064",
            },
            {
              title: "Maria na Tradição Patrística",
              author: "Luigi Gambero",
              link: "https://www.amazon.com.br/Maria-nos-Padres-Igreja-Luigi-Gambero/dp/8515015536",
            },
            {
              title: "Os Doze Anátemas de Cirilo",
              author: "São Cirilo de Alexandria",
              link: "https://www.newadvent.org/fathers/3810.htm",
            },
          ],
          tags: ["História", "Concílios", "Mariologia", "Cristologia"],
          stats: {
            readingTime: "25",
            difficulty: "Intermediário",
            lastUpdated: "2024-06-29",
            progress: 0,
          },
        },
        {
          id: 4,
          title: "Os Grandes Padres da Igreja",
          description:
            "Ambrósio, Agostinho, Jerônimo e outros Padres que definiram a teologia",
          contentPath: "historia-igreja/grandes-padres-igreja.md",
          references: [
            {
              title: "Patrologia Latina",
              author: "J.P. Migne",
              link: "https://www.documentacatholicaomnia.eu/1815-1875,_Migne,_Patrologia_Latina_01._Rerum_Conspectus_Pro_Tomis_Ordinatus,_MLT.html",
            },
            {
              title: "Os Padres da Igreja",
              author: "Hubertus R. Drobner",
              link: "https://www.amazon.com.br/Os-Padres-Igreja-Hubertus-Drobner/dp/8532652921",
            },
            {
              title: "Confissões",
              author: "Santo Agostinho",
              link: "https://www.vatican.va/spirit/documents/spirit_20010116_agostino_po.html",
            },
          ],
          tags: ["História", "Patrística", "Santo Agostinho", "São Jerônimo"],
          stats: {
            readingTime: "30",
            difficulty: "Intermediário",
            lastUpdated: "2024-06-28",
            progress: 0,
          },
        },
      ],
      stats: {
        totalTopics: 4,
        readingTime: "1 hora e 35 min",
        difficulty: "Intermediário",
        lastUpdated: "2024-06-29",
      },
    },
    {
      id: "historia-igreja-3",
      title: "Idade Média (476-1417 d.C.)",
      description: "Da queda de Roma ao fim do Grande Cisma do Ocidente",
      icon: "BookOpenIcon",
      topics: [
        {
          id: 1,
          title: "A Igreja na Idade Média",
          description: "O papel da Igreja na cultura e sociedade medievais",
          contentPath: "historia-igreja/igreja-idade-media.md",
          references: [
            {
              title: "A Igreja Medieval",
              author: "Joseph H. Lynch",
              link: "https://www.amazon.com.br/Igreja-Medieval-Joseph-Lynch/dp/8532651968",
            },
            {
              title: "O Apogeu da Cristandade",
              author: "Christopher Dawson",
              link: "https://www.amazon.com.br/apogeu-cristandade-Christopher-Dawson/dp/8580332184",
            },
            {
              title: "A Igreja e a Cultura Medieval",
              author: "Régine Pernoud",
              link: "https://www.amazon.com.br/Idade-Média-que-nunca-existiu/dp/8580331595",
            },
          ],
          tags: ["História", "Idade Média", "Cristandade", "Cultura Medieval"],
          stats: {
            readingTime: "25",
            difficulty: "Intermediário",
            lastUpdated: "2024-06-28",
            progress: 0,
          },
        },
        {
          id: 2,
          title: "O Cisma do Oriente",
          description: "A separação entre as Igrejas Católica e Ortodoxa",
          contentPath: "historia-igreja/cisma-oriente.md",
          references: [
            {
              title: "O Grande Cisma",
              author: "Timothy Ware",
              link: "https://www.amazon.com.br/Igreja-Ortodoxa-Timothy-Ware/dp/8515027011",
            },
            {
              title: "1054: O Cisma entre Oriente e Ocidente",
              author: "Yves Congar",
              link: "https://www.amazon.com.br/Depois-Nove-Séculos-Ocidente-diálogo/dp/8534923353",
            },
            {
              title: "História das Cruzadas",
              author: "Steven Runciman",
              link: "https://www.amazon.com.br/História-das-Cruzadas-Steven-Runciman/dp/8531602378",
            },
          ],
          tags: ["História", "Cisma", "Igreja Ortodoxa", "Bizâncio"],
          stats: {
            readingTime: "25",
            difficulty: "Intermediário",
            lastUpdated: "2024-06-28",
            progress: 0,
          },
        },
        {
          id: 3,
          title: "Os Concílios Ecumênicos",
          description:
            "História, função e impacto dos concílios na vida da Igreja",
          contentPath: "historia-igreja/concilios-ecumenicos.md",
          references: [
            {
              title: "História dos Concílios Ecumênicos",
              author: "Hubert Jedin",
              link: "https://www.amazon.com.br/História-dos-Concílios-Ecumênicos/dp/8534901147",
            },
            {
              title:
                "Denzinger: Compêndio dos símbolos, definições e declarações de fé e moral",
              author: "Heinrich Denzinger",
              link: "https://www.amazon.com.br/Denzinger-Compêndio-símbolos-definições-declarações/dp/8515043718",
            },
            {
              title: "Os Concílios Gerais da Igreja",
              author: "Francis Dvornik",
              link: "https://www.amazon.com.br/Os-Concílios-Gerais-Igreja-Francis-Dvornik/dp/8534901734",
            },
          ],
          tags: ["História", "Concílios", "Dogmas", "Magisterio"],
          stats: {
            readingTime: "30",
            difficulty: "Intermediário",
            lastUpdated: "2024-06-28",
            progress: 0,
          },
        },
      ],
      stats: {
        totalTopics: 3,
        readingTime: "1 hora e 20 min",
        difficulty: "Intermediário",
        lastUpdated: "2024-06-28",
      },
    },
    {
      id: "historia-igreja-4",
      title: "Era Moderna à Contemporânea (1417-presente)",
      description: "Da Reforma Protestante aos desafios contemporâneos",
      icon: "GlobeEuropeAfricaIcon",
      topics: [
        {
          id: 1,
          title: "A Reforma Protestante e Católica",
          description:
            "Origens, correntes e impacto da Reforma e a resposta católica",
          contentPath: "historia-igreja/reforma-protestante-catolica.md",
          references: [
            {
              title: "A Reforma Protestante",
              author: "Diarmaid MacCulloch",
              link: "https://www.amazon.com.br/Reforma-História-Europa-Século-XVI/dp/8501079502",
            },
            {
              title: "O Concílio de Trento",
              author: "John W. O'Malley",
              link: "https://www.amazon.com.br/Concílio-Trento-Catolicismo-moderno-início/dp/8535639837",
            },
            {
              title: "História da Contrarreforma",
              author: "Ricardo García-Villoslada",
              link: "https://www.amazon.com.br/História-Contra-Reforma-Ricardo-García-Villoslada/dp/8527602164",
            },
          ],
          tags: ["História", "Reforma", "Protestantismo", "Contrarreforma"],
          stats: {
            readingTime: "35",
            difficulty: "Intermediário",
            lastUpdated: "2024-06-28",
            progress: 0,
          },
        },
        {
          id: 2,
          title: "O Concílio Vaticano II",
          description: "A renovação da Igreja para o mundo moderno",
          contentPath: "historia-igreja/concilio-vaticano-ii.md",
          references: [
            {
              title: "Documentos do Concílio Vaticano II",
              author: "Concílio Vaticano II",
              link: "https://www.vatican.va/archive/hist_councils/ii_vatican_council/index_po.htm",
            },
            {
              title: "Breve História do Concílio Vaticano II",
              author: "John W. O'Malley",
              link: "https://www.amazon.com.br/que-aconteceu-Vaticano-II-Breve/dp/8515042835",
            },
            {
              title: "Vaticano II: Uma História Nunca Escrita",
              author: "Roberto De Mattei",
              link: "https://www.amazon.com.br/Concílio-Vaticano-II-História-Escrita/dp/9898554207",
            },
          ],
          tags: [
            "História",
            "Concílio Vaticano II",
            "Igreja Contemporânea",
            "Aggiornamento",
          ],
          stats: {
            readingTime: "30",
            difficulty: "Intermediário",
            lastUpdated: "2024-06-28",
            progress: 0,
          },
        },
        {
          id: 3,
          title: "Os Papas dos Séculos XX e XXI",
          description: "De Leão XIII ao Papa Francisco: perfis e contribuições",
          contentPath: "historia-igreja/papas-seculos-xx-xxi.md",
          references: [
            {
              title: "História dos Papas",
              author: "J.N.D. Kelly",
              link: "https://www.amazon.com.br/História-Dos-Papas-Grande-Completa/dp/8534902909",
            },
            {
              title: "Encíclicas Sociais de Leão XIII a Bento XVI",
              author: "Igreja Católica",
              link: "https://www.vatican.va/content/vatican/pt.html",
            },
            {
              title: "São João Paulo II: Uma Biografia",
              author: "George Weigel",
              link: "https://www.amazon.com.br/João-Paulo-II-Biografia-definitiva/dp/8579600731",
            },
          ],
          tags: ["História", "Papado", "Encíclicas", "Magistério"],
          stats: {
            readingTime: "35",
            difficulty: "Iniciante",
            lastUpdated: "2024-06-28",
            progress: 0,
          },
        },
      ],
      stats: {
        totalTopics: 3,
        readingTime: "1 hora e 40 min",
        difficulty: "Intermediário",
        lastUpdated: "2024-06-28",
      },
    },
  ],
  stats: {
    totalTopics: 13,
    readingTime: "5 horas e 40 min",
    difficulty: "Intermediário",
    lastUpdated: "2024-06-29",
  },
  tags: ["História", "Igreja Católica", "Concílios", "Papado", "Reforma"],
};

