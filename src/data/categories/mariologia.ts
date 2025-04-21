import type { Category } from "./types";

export const mariologia: Category = {
  id: "mariologia",
  title: "Mariologia",
  description: "Doutrinas e verdades sobre a Virgem Maria, Mãe de Deus",
  icon: "HeartIcon",
  stats: {
    totalTopics: 5,
    readingTime: "2.5 horas",
    difficulty: "Intermediário",
    lastUpdated: "2024-05-15",
  },
  tags: ["Maria", "Mariologia", "Dogmas Marianos", "Devoção Mariana"],
  subcategories: [
    {
      id: "mariologia-1",
      title: "Dogmas Marianos",
      description: "Os quatro dogmas marianos definidos pela Igreja",
      icon: "HeartIcon",
      stats: {
        totalTopics: 4,
        readingTime: "1.5 horas",
        difficulty: "Intermediário",
        lastUpdated: "2024-05-15",
      },
      topics: [
        {
          id: 1,
          title: "A Imaculada Conceição de Maria",
          description:
            "Explicação do dogma da Imaculada Conceição e sua base bíblica, patrística e teológica",
          contentPath: "imaculada-conceicao-de-maria.md",
          references: [
            {
              title: "Catecismo da Igreja Católica §§ 487-493",
              author: "Igreja Católica",
              link: "https://www.vatican.va/archive/cathechism_po/index_new/prima-pagina-cic_po.html",
            },
            {
              title: "Ineffabilis Deus",
              author: "Papa Pio IX",
              link: "https://www.montfort.org.br/bra/documentos/decretos/ineffabilis/",
            },
            {
              title: "Redemptoris Mater",
              author: "São João Paulo II",
              link: "https://www.vatican.va/content/john-paul-ii/pt/encyclicals/documents/hf_jp-ii_enc_25031987_redemptoris-mater.html",
            },
            {
              title: "Tratado da Verdadeira Devoção à Santíssima Virgem",
              author: "São Luís Maria Grignion de Montfort",
              link: "https://www.montfort.org.br/bra/cadernos/maria/devocao/",
            },
            {
              title: "Lumen Gentium, Capítulo VIII",
              author: "Concílio Vaticano II",
              link: "https://www.vatican.va/archive/hist_councils/ii_vatican_council/documents/vat-ii_const_19641121_lumen-gentium_po.html",
            },
          ],
          tags: [
            "Maria",
            "Imaculada Conceição",
            "Dogmas Marianos",
            "Graça",
            "Redenção",
          ],
          stats: {
            readingTime: "25",
            difficulty: "Intermediário",
            lastUpdated: "2024-05-15",
            progress: 0,
          },
        },
      ],
    },
    {
      id: "mariologia-2",
      title: "Títulos de Maria",
      description: "Os principais títulos e invocações marianas",
      icon: "SparklesIcon",
      stats: {
        totalTopics: 1,
        readingTime: "1 hora",
        difficulty: "Iniciante",
        lastUpdated: "2024-05-15",
      },
      topics: [],
    },
  ],
};
