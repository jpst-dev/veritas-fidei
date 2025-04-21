import type { Category } from "./types";

export const filosofiaTeologia: Category = {
  id: "filosofia-teologia",
  title: "Filosofia e Teologia",
  description:
    "Explorando questões fundamentais sobre Deus, existência, conhecimento e moral",
  icon: "AcademicCapIcon",
  subcategories: [
    {
      id: "filosofia-teologia-1",
      title: "Provas da Existência de Deus",
      description:
        "Argumentos filosóficos para a existência de Deus e suas implicações",
      icon: "LightBulbIcon",
      topics: [
        {
          id: 1,
          title: "Teologia Natural e as Provas da Existência de Deus",
          description:
            "Visão geral dos principais argumentos filosóficos para a existência de Deus na tradição católica",
          contentPath: "filosofia-teologia/teologia-natural-existencia-deus.md",
          references: [
            {
              title: "Catecismo da Igreja Católica, §§ 31-35",
              author: "Igreja Católica",
              link: "https://www.vatican.va/archive/cathechism_po/index_new/p1s1c1_26-49_po.html",
            },
            {
              title: "Fides et Ratio",
              author: "São João Paulo II",
              link: "https://www.vatican.va/content/john-paul-ii/pt/encyclicals/documents/hf_jp-ii_enc_14091998_fides-et-ratio.html",
            },
            {
              title: "Suma Teológica, I, q. 2",
              author: "São Tomás de Aquino",
              link: "https://www.newadvent.org/summa/1002.htm",
            },
            {
              title: "Five Proofs of the Existence of God",
              author: "Edward Feser",
              link: "https://www.amazon.com.br/Five-Proofs-Existence-Edward-Feser/dp/1621641333",
            },
          ],
          tags: ["Filosofia", "Teologia Natural", "Metafísica", "Apologética"],
          stats: {
            readingTime: "30",
            difficulty: "Intermediário",
            lastUpdated: "2024-07-12",
            progress: 0,
          },
        },
        {
          id: 2,
          title: "O Argumento Ontológico",
          description:
            "Uma análise do argumento que deduz a existência de Deus a partir do seu conceito",
          contentPath: "filosofia-teologia/argumento-ontologico.md",
          references: [
            {
              title: "Proslogion",
              author: "Santo Anselmo",
              link: "https://www.amazon.com.br/Proslogion-Santo-Anselmo/dp/8515039337",
            },
            {
              title: "The Ontological Argument",
              author: "Alvin Plantinga",
              link: "https://www.amazon.com/Ontological-Argument-St-Anselm-Contemporary/dp/823706364X",
            },
            {
              title: "Suma Teológica I, q. 2, a. 1",
              author: "São Tomás de Aquino",
              link: "https://www.newadvent.org/summa/1002.htm#article1",
            },
          ],
          tags: ["Metafísica", "Ontologia", "Filosofia", "Apologética"],
          stats: {
            readingTime: "15",
            difficulty: "Avançado",
            lastUpdated: "2024-06-27",
            progress: 0,
          },
        },
        {
          id: 3,
          title: "O Argumento Cosmológico de Kalam",
          description:
            "Uma defesa contemporânea do argumento cosmológico baseado na impossibilidade de um regresso infinito",
          contentPath: "filosofia-teologia/argumento-cosmologico-kalam.md",
          references: [
            {
              title: "The Kalam Cosmological Argument",
              author: "William Lane Craig",
              link: "https://www.reasonablefaith.org/writings/popular-writings/existence-nature-of-god/the-kalam-cosmological-argument",
            },
            {
              title: "Filosofia da Religião",
              author: "Norman Geisler",
              link: "https://www.amazon.com.br/Filosofia-religi%C3%A3o-Norman-Geisler/dp/8527505711",
            },
            {
              title: "Reasonable Faith",
              author: "William Lane Craig",
              link: "https://www.amazon.com.br/Reasonable-Faith-Christian-Truth-Apologetics/dp/1433501155",
            },
          ],
          tags: ["Cosmologia", "Metafísica", "Apologética"],
          stats: {
            readingTime: "20",
            difficulty: "Intermediário",
            lastUpdated: "2024-06-27",
            progress: 0,
          },
        },
        {
          id: 4,
          title: "As Cinco Vias de São Tomás de Aquino",
          description:
            "Análise dos cinco caminhos propostos por São Tomás para demonstrar a existência de Deus",
          contentPath: "cinco-vias-tomas-aquino.md",
          references: [
            {
              title: "Suma Teológica I, q. 2, a. 3",
              author: "São Tomás de Aquino",
              link: "https://www.newadvent.org/summa/1002.htm#article3",
            },
            {
              title: "The Last Superstition",
              author: "Edward Feser",
              link: "https://www.amazon.com.br/Last-Superstition-Refutation-New-Atheism/dp/1587314525",
            },
            {
              title: "Aquinas: A Beginner's Guide",
              author: "Edward Feser",
              link: "https://www.amazon.com.br/Aquinas-Beginners-Guide-Edward-Feser/dp/1851686908",
            },
            {
              title: "Aquinas's Shorter Summa",
              author: "São Tomás de Aquino",
              link: "https://www.amazon.com.br/Aquinass-Shorter-Summa-Thomass-Gentiles/dp/1928832432",
            },
          ],
          tags: ["Metafísica", "Tomismo", "Teologia Natural", "Apologética"],
          stats: {
            readingTime: "30",
            difficulty: "Intermediário",
            lastUpdated: "2024-06-27",
            progress: 0,
          },
        },
        {
          id: 5,
          title: "Atributos Divinos: Onisciência, Onipotência e Onipresença",
          description:
            "Uma análise filosófica e teológica dos principais atributos de Deus segundo a Teologia Natural",
          contentPath: "filosofia-teologia/atributos-divinos.md",
          references: [
            {
              title: "Suma Teológica I, qq. 3-26",
              author: "São Tomás de Aquino",
              link: "https://www.newadvent.org/summa/1003.htm",
            },
            {
              title: "Five Proofs of the Existence of God",
              author: "Edward Feser",
              link: "https://www.amazon.com.br/Five-Proofs-Existence-Edward-Feser/dp/1621641333",
            },
            {
              title: "The Coherence of Theism",
              author: "Richard Swinburne",
              link: "https://www.amazon.com.br/Coherence-Theism-Clarendon-Library-Philosophy/dp/0199248931",
            },
            {
              title: "Catecismo da Igreja Católica, nn. 198-221",
              author: "Igreja Católica",
              link: "https://www.vatican.va/archive/cathechism_po/index_new/p1s2c1_198-421_po.html",
            },
            {
              title: "Os Atributos de Deus",
              author: "Norman Geisler",
              link: "https://www.amazon.com.br/Os-Atributos-Deus-Norman-Geisler/dp/8526304097",
            },
          ],
          tags: [
            "Teologia Natural",
            "Metafísica",
            "Atributos Divinos",
            "Filosofia",
          ],
          stats: {
            readingTime: "25",
            difficulty: "Intermediário",
            lastUpdated: "2024-06-28",
            progress: 0,
          },
        },
      ],
      stats: {
        totalTopics: 5,
        readingTime: "2 horas",
        difficulty: "Intermediário",
        lastUpdated: "2024-07-12",
      },
    },
    {
      id: "filosofia-teologia-2",
      title: "Filosofia Moral e Teodiceia",
      description: "Fundamentos racionais da moralidade e do problema do mal",
      icon: "ScaleIcon",
      topics: [
        {
          id: 1,
          title: "Lei Natural",
          description:
            "Compreendendo a lei natural como base da moral católica",
          contentPath: "filosofia-teologia/lei-natural.md",
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
          id: 2,
          title: "O Problema do Mal",
          description:
            "Como conciliar a existência de Deus com a presença do mal no mundo",
          contentPath: "filosofia-teologia/problema-mal.md",
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
        {
          id: 3,
          title: "O Argumento Moral para a Existência de Deus",
          description:
            "Como a existência de valores morais objetivos aponta para a existência de Deus",
          contentPath: "filosofia-teologia/argumento-moral.md",
          references: [
            {
              title: "Mero Cristianismo (Livro 1)",
              author: "C.S. Lewis",
              link: "https://www.amazon.com.br/Cristianismo-Puro-Simples-C-Lewis/dp/8578601165",
            },
            {
              title: "The Moral Argument",
              author: "William Lane Craig",
              link: "https://www.reasonablefaith.org/writings/popular-writings/existence-nature-of-god/the-moral-argument",
            },
            {
              title: "Steal This World?",
              author: "Peter Kreeft",
              link: "https://www.peterkreeft.com/topics/moral-argument.htm",
            },
            {
              title: "Naturalism and Self-Defeat",
              author: "Alvin Plantinga",
              link: "https://www.amazon.com/Where-Conflict-Really-Lies-Naturalism/dp/0199812098",
            },
            {
              title: "Fides et Ratio §§ 24-35",
              author: "São João Paulo II",
              link: "https://www.vatican.va/content/john-paul-ii/pt/encyclicals/documents/hf_jp-ii_enc_14091998_fides-et-ratio.html",
            },
          ],
          tags: ["Filosofia", "Moral", "Ética", "Apologética"],
          stats: {
            readingTime: "25",
            difficulty: "Intermediário",
            lastUpdated: "2024-06-27",
            progress: 0,
          },
        },
      ],
      stats: {
        totalTopics: 3,
        readingTime: "55 min",
        difficulty: "Intermediário",
        lastUpdated: "2024-06-27",
      },
    },
    {
      id: "filosofia-teologia-3",
      title: "Metafísica e Antropologia Cristã",
      description:
        "A visão católica sobre a pessoa humana e a natureza da realidade",
      icon: "UserIcon",
      topics: [
        {
          id: 1,
          title: "Hilemorfismo: Corpo e Alma na Filosofia Tomista",
          description:
            "A compreensão de matéria e forma na antropologia cristã e suas implicações contemporâneas",
          contentPath: "filosofia-teologia/hilemorfismo-corpo-alma.md",
          references: [
            {
              title: "Suma Teológica, Parte I, qq. 75-89",
              author: "São Tomás de Aquino",
              link: "https://www.newadvent.org/summa/1075.htm",
            },
            {
              title: "O Último Dualista",
              author: "Edward Feser",
              link: "https://edwardfeser.blogspot.com/2008/09/last-superstition.html",
            },
            {
              title: "Mente e Cosmos",
              author: "Thomas Nagel",
              link: "https://www.amazon.com.br/Mente-cosmos-compreensão-materialista-reducionista/dp/859324025X",
            },
            {
              title: "Fé e Razão §§ 80-83",
              author: "São João Paulo II",
              link: "https://www.vatican.va/content/john-paul-ii/pt/encyclicals/documents/hf_jp-ii_enc_14091998_fides-et-ratio.html",
            },
            {
              title: "A Pessoa Humana",
              author: "Jacques Maritain",
              link: "https://www.amazon.com.br/Pessoa-Humana-Jacques-Maritain/dp/8527901390",
            },
          ],
          tags: [
            "Metafísica",
            "Antropologia",
            "Hilemorfismo",
            "Filosofia da Mente",
          ],
          stats: {
            readingTime: "25",
            difficulty: "Avançado",
            lastUpdated: "2024-06-27",
            progress: 0,
          },
        },
        {
          id: 2,
          title: "A Consciência e a Irredutibilidade da Mente",
          description:
            "Por que a consciência humana não pode ser reduzida a processos físicos",
          contentPath:
            "filosofia-teologia/consciencia-irredutibilidade-mente.md",
          references: [
            {
              title: "A Mente e seu Lugar na Natureza",
              author: "Edward Feser",
              link: "https://edwardfeser.blogspot.com/",
            },
            {
              title: "O Mistério da Consciência",
              author: "John Searle",
              link: "https://www.amazon.com.br/mistério-da-consciência-John-Searle/dp/8527307693",
            },
            {
              title: "Gaudium et Spes §§ 14-18",
              author: "Concílio Vaticano II",
              link: "https://www.vatican.va/archive/hist_councils/ii_vatican_council/documents/vat-ii_const_19651207_gaudium-et-spes_po.html",
            },
            {
              title: "A Alma na Filosofia e Teologia",
              author: "Joseph Ratzinger",
              link: "https://www.amazon.com.br/Escatologia-Morte-Vida-Eterna-Joseph/dp/8532651968",
            },
          ],
          tags: ["Filosofia da Mente", "Consciência", "Dualismo", "Alma"],
          stats: {
            readingTime: "25",
            difficulty: "Avançado",
            lastUpdated: "2024-06-27",
            progress: 0,
          },
        },
        {
          id: 3,
          title: "Universais e o Realismo Moderado",
          description:
            "A visão tomista dos universais e sua importância para o conhecimento humano",
          contentPath: "filosofia-teologia/universais-realismo-moderado.md",
          references: [
            {
              title: "Suma Teológica, Parte I, q. 85",
              author: "São Tomás de Aquino",
              link: "https://www.newadvent.org/summa/1085.htm",
            },
            {
              title: "Realismo e Nominalismo",
              author: "Étienne Gilson",
              link: "https://www.amazon.com.br/Realismo-Tomista-Critica-Conhecimento-Etienne/dp/8589917070",
            },
            {
              title: "A Metafísica do Aquinate",
              author: "John Wippel",
              link: "https://www.amazon.com/Metaphysical-Thought-Thomas-Aquinas-Participation/dp/0813215838",
            },
            {
              title: "O Problema dos Universais",
              author: "D.M. Armstrong",
              link: "https://www.amazon.com/Universals-Introduction-D-M-Armstrong/dp/0367710072",
            },
          ],
          tags: ["Metafísica", "Epistemologia", "Universais", "Tomismo"],
          stats: {
            readingTime: "30",
            difficulty: "Avançado",
            lastUpdated: "2024-06-27",
            progress: 0,
          },
        },
      ],
      stats: {
        totalTopics: 3,
        readingTime: "1 hora e 20 min",
        difficulty: "Avançado",
        lastUpdated: "2024-06-27",
      },
    },
    {
      id: "filosofia-teologia-4",
      title: "Ciência e Fé",
      description:
        "Explorando a harmonia entre o conhecimento científico e a fé católica",
      icon: "BeakerIcon",
      topics: [
        {
          id: 1,
          title: "Criação e Evolução: Uma Perspectiva Católica",
          description:
            "Como a Igreja compreende a teoria da evolução no contexto da doutrina da criação",
          contentPath:
            "filosofia-teologia/criacao-evolucao-perspectiva-catolica.md",
          references: [
            {
              title: "Catecismo da Igreja Católica §§ 282-301",
              author: "Igreja Católica",
              link: "https://www.vatican.va/archive/cathechism_po/index_new/p1s2c1_198-421_po.html",
            },
            {
              title: "Discurso à Academia Pontifícia de Ciências (1996)",
              author: "São João Paulo II",
              link: "https://www.vatican.va/content/john-paul-ii/en/messages/pont_messages/1996/documents/hf_jp-ii_mes_19961022_evoluzione.html",
            },
            {
              title:
                "No Princípio... Uma Compreensão Católica da História da Criação e da Queda",
              author: "Papa Bento XVI (Joseph Ratzinger)",
              link: "https://www.amazon.com.br/In-Beginning-Catholic-Understanding-Creation/dp/0802841066",
            },
            {
              title: "Lumen Fidei § 34",
              author: "Papa Francisco",
              link: "https://www.vatican.va/content/francesco/pt/encyclicals/documents/papa-francesco_20130629_enciclica-lumen-fidei.html",
            },
          ],
          tags: ["Ciência", "Evolução", "Criação", "Fé e Razão"],
          stats: {
            readingTime: "25",
            difficulty: "Intermediário",
            lastUpdated: "2024-06-27",
            progress: 0,
          },
        },
        {
          id: 2,
          title: "O Big Bang e a Cosmologia Católica",
          description:
            "As implicações filosóficas e teológicas da cosmologia moderna",
          contentPath: "filosofia-teologia/big-bang-cosmologia-catolica.md",
          references: [
            {
              title: "Deus e a Nova Física",
              author: "William E. Carroll",
              link: "https://www.catholiceducation.org/en/science/faith-and-science/god-and-physics-from-hawking-to-aquinas.html",
            },
            {
              title: "O Princípio",
              author: "Robert J. Spitzer",
              link: "https://www.amazon.com/New-Proofs-Existence-God-Contributions/dp/0802863833",
            },
            {
              title: "Uma Breve História do Tempo",
              author: "Stephen Hawking",
              link: "https://www.amazon.com.br/breve-história-tempo-Stephen-Hawking/dp/8580576466",
            },
            {
              title: "Antes do Big Bang",
              author: "Papa Pio XII",
              link: "https://www.ewtn.com/catholicism/library/science-and-the-church-12855",
            },
          ],
          tags: ["Cosmologia", "Big Bang", "Origem do Universo", "Ciência"],
          stats: {
            readingTime: "25",
            difficulty: "Intermediário",
            lastUpdated: "2024-06-27",
            progress: 0,
          },
        },
      ],
      stats: {
        totalTopics: 2,
        readingTime: "50 min",
        difficulty: "Intermediário",
        lastUpdated: "2024-06-27",
      },
    },
    {
      id: "filosofia-teologia-5",
      title: "Moral",
      description:
        "Princípios éticos, virtudes e formação moral na tradição católica",
      icon: "HeartIcon",
      topics: [
        {
          id: 1,
          title: "Virtudes Cardeais e Teologais",
          description:
            "Compreensão aprofundada das virtudes fundamentais da vida cristã",
          contentPath: "filosofia-teologia/virtudes-cardeais-teologais.md",
          references: [
            {
              title: "Catecismo da Igreja Católica §§ 1803-1845",
              author: "Igreja Católica",
              link: "https://www.vatican.va/archive/cathechism_po/index_new/p3s1c1a7_1803-1845_po.html",
            },
            {
              title: "Suma Teológica, I-II, q. 55-67",
              author: "São Tomás de Aquino",
              link: "https://www.newadvent.org/summa/2055.htm",
            },
            {
              title: "As Virtudes Fundamentais",
              author: "Josef Pieper",
              link: "https://www.amazon.com.br/As-Virtudes-Fundamentais-Josef-Pieper/dp/8535633510",
            },
            {
              title: "Veritatis Splendor",
              author: "São João Paulo II",
              link: "https://www.vatican.va/content/john-paul-ii/pt/encyclicals/documents/hf_jp-ii_enc_06081993_veritatis-splendor.html",
            },
          ],
          tags: ["Moral", "Virtudes", "Teologia", "Ética"],
          stats: {
            readingTime: "25",
            difficulty: "Intermediário",
            lastUpdated: "2024-06-27",
            progress: 0,
          },
        },
        {
          id: 2,
          title: "Formação da Consciência Moral",
          description:
            "O desenvolvimento e a educação da consciência na vida cristã",
          contentPath: "filosofia-teologia/formacao-consciencia-moral.md",
          references: [
            {
              title: "Catecismo da Igreja Católica §§ 1776-1802",
              author: "Igreja Católica",
              link: "https://www.vatican.va/archive/cathechism_po/index_new/p3s1c1a6_1776-1802_po.html",
            },
            {
              title: "Gaudium et Spes § 16",
              author: "Concílio Vaticano II",
              link: "https://www.vatican.va/archive/hist_councils/ii_vatican_council/documents/vat-ii_const_19651207_gaudium-et-spes_po.html",
            },
            {
              title: "Veritatis Splendor §§ 54-64",
              author: "São João Paulo II",
              link: "https://www.vatican.va/content/john-paul-ii/pt/encyclicals/documents/hf_jp-ii_enc_06081993_veritatis-splendor.html",
            },
            {
              title: "Sobre a Consciência",
              author: "Joseph Ratzinger",
              link: "https://www.amazon.com.br/Sobre-consciência-Joseph-Ratzinger/dp/8516103900",
            },
          ],
          tags: ["Moral", "Consciência", "Ética", "Discernimento"],
          stats: {
            readingTime: "20",
            difficulty: "Intermediário",
            lastUpdated: "2024-06-27",
            progress: 0,
          },
        },
        {
          id: 3,
          title: "Moral Sexual Católica",
          description:
            "Visão integral da sexualidade humana segundo o ensinamento católico",
          contentPath: "filosofia-teologia/moral-sexual-catolica.md",
          references: [
            {
              title: "Catecismo da Igreja Católica §§ 2331-2400",
              author: "Igreja Católica",
              link: "https://www.vatican.va/archive/cathechism_po/index_new/p3s2c2a6_2331-2400_po.html",
            },
            {
              title: "Teologia do Corpo",
              author: "São João Paulo II",
              link: "https://www.amazon.com.br/Teologia-do-Corpo-Christopher-West/dp/8529502477",
            },
            {
              title: "Humanae Vitae",
              author: "Papa Paulo VI",
              link: "https://www.vatican.va/content/paul-vi/pt/encyclicals/documents/hf_p-vi_enc_25071968_humanae-vitae.html",
            },
            {
              title: "Amor e Responsabilidade",
              author: "Karol Wojtyła",
              link: "https://www.amazon.com.br/Amor-Responsabilidade-Karol-Wojtyla/dp/8535644709",
            },
          ],
          tags: ["Moral", "Sexualidade", "Ética", "Matrimônio"],
          stats: {
            readingTime: "25",
            difficulty: "Intermediário",
            lastUpdated: "2024-06-27",
            progress: 0,
          },
        },
      ],
      stats: {
        totalTopics: 3,
        readingTime: "1 hora e 10 min",
        difficulty: "Intermediário",
        lastUpdated: "2024-06-27",
      },
    },
  ],
  stats: {
    totalTopics: 16,
    readingTime: "6 horas e 5 min",
    difficulty: "Intermediário",
    lastUpdated: "2024-06-28",
  },
  tags: [
    "Filosofia",
    "Teologia",
    "Apologética",
    "Metafísica",
    "Ciência",
    "Moral",
    "Ética",
  ],
};
