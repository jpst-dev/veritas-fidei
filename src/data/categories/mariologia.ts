import type { Category } from "./types";

export const mariologia: Category = {
  id: "mariologia",
  title: "Mariologia",
  description: "Doutrinas e verdades sobre a Virgem Maria, Mãe de Deus",
  icon: "HeartIcon",
  stats: {
    totalTopics: 9,
    readingTime: "4 horas",
    difficulty: "Intermediário",
    lastUpdated: "2024-06-27",
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
        readingTime: "2 horas",
        difficulty: "Intermediário",
        lastUpdated: "2024-06-27",
      },
      topics: [
        {
          id: 1,
          title: "A Imaculada Conceição de Maria",
          description:
            "Explicação do dogma da Imaculada Conceição e sua base bíblica, patrística e teológica",
          contentPath: "mariologia/imaculada-conceicao-de-maria.md",
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
        {
          id: 2,
          title: "Maria, Mãe de Deus (Theotokos)",
          description:
            "O dogma da Maternidade Divina de Maria definido no Concílio de Éfeso (431)",
          contentPath: "mariologia/maria-mae-de-deus.md",
          references: [
            {
              title: "Catecismo da Igreja Católica §§ 495-501",
              author: "Igreja Católica",
              link: "https://www.vatican.va/archive/cathechism_po/index_new/p1s2c2a3_484-511_po.html",
            },
            {
              title: "Concílio de Éfeso (431)",
              author: "Igreja Católica",
              link: "https://www.newadvent.org/fathers/3810.htm",
            },
            {
              title: "Lumen Gentium §§ 52-54",
              author: "Concílio Vaticano II",
              link: "https://www.vatican.va/archive/hist_councils/ii_vatican_council/documents/vat-ii_const_19641121_lumen-gentium_po.html",
            },
            {
              title: "A Maternidade Divina de Maria",
              author: "São Cirilo de Alexandria",
              link: "https://www.ecclesia.com.br/biblioteca/pais_da_igreja/igreja_antiga_cirilo_alexandria.html",
            },
          ],
          tags: [
            "Maria",
            "Theotokos",
            "Mãe de Deus",
            "Cristologia",
            "Concílio de Éfeso",
          ],
          stats: {
            readingTime: "25",
            difficulty: "Intermediário",
            lastUpdated: "2024-06-27",
            progress: 0,
          },
        },
        {
          id: 3,
          title: "A Virgindade Perpétua de Maria",
          description:
            "Explicação do dogma da virgindade perpétua de Maria: antes, durante e após o nascimento de Jesus",
          contentPath: "mariologia/virgindade-perpetua-de-maria.md",
          references: [
            {
              title: "Catecismo da Igreja Católica §§ 496-507",
              author: "Igreja Católica",
              link: "https://www.vatican.va/archive/cathechism_po/index_new/p1s2c2a3_484-511_po.html",
            },
            {
              title: "A Virgindade Perpétua de Maria",
              author: "São Jerônimo",
              link: "https://www.newadvent.org/fathers/3007.htm",
            },
            {
              title: "Mystici Corporis Christi",
              author: "Papa Pio XII",
              link: "https://www.vatican.va/content/pius-xii/pt/encyclicals/documents/hf_p-xii_enc_29061943_mystici-corporis-christi.html",
            },
            {
              title: "Os Irmãos de Jesus na Tradição Católica",
              author: "Scott Hahn",
              link: "https://www.scotthahn.com/",
            },
          ],
          tags: ["Maria", "Virgindade Perpétua", "Dogmas Marianos"],
          stats: {
            readingTime: "25",
            difficulty: "Intermediário",
            lastUpdated: "2024-06-27",
            progress: 0,
          },
        },
        {
          id: 4,
          title: "A Assunção de Maria",
          description:
            "O dogma da Assunção de Maria ao Céu em corpo e alma, definido por Pio XII em 1950",
          contentPath: "mariologia/assuncao-de-maria.md",
          references: [
            {
              title: "Catecismo da Igreja Católica §§ 966-975",
              author: "Igreja Católica",
              link: "https://www.vatican.va/archive/cathechism_po/index_new/p123a9p6_963-975_po.html",
            },
            {
              title: "Munificentissimus Deus",
              author: "Papa Pio XII",
              link: "https://www.vatican.va/content/pius-xii/pt/apost_constitutions/documents/hf_p-xii_apc_19501101_munificentissimus-deus.html",
            },
            {
              title: "Dormição da Virgem Maria",
              author: "Tradição Ortodoxa",
              link: "https://www.orthodoxpath.org/",
            },
            {
              title: "A Assunção de Maria na Teologia Contemporânea",
              author: "Karl Rahner",
              link: "https://www.ignatiusinsight.com/",
            },
          ],
          tags: ["Maria", "Assunção", "Dogmas Marianos", "Escatologia"],
          stats: {
            readingTime: "25",
            difficulty: "Intermediário",
            lastUpdated: "2024-06-27",
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
        totalTopics: 3,
        readingTime: "1.5 horas",
        difficulty: "Iniciante",
        lastUpdated: "2024-06-27",
      },
      topics: [
        {
          id: 1,
          title: "Maria como Nova Eva",
          description:
            "A tipologia mariana como Nova Eva na tradição patrística e teológica",
          contentPath: "mariologia/maria-nova-eva.md",
          references: [
            {
              title: "Catecismo da Igreja Católica § 411",
              author: "Igreja Católica",
              link: "https://www.vatican.va/archive/cathechism_po/index_new/p1s2c1p7_385-409_po.html",
            },
            {
              title: "Contra as Heresias",
              author: "Santo Ireneu de Lyon",
              link: "https://www.newadvent.org/fathers/0103.htm",
            },
            {
              title: "Redemptoris Mater §§ 10-11",
              author: "São João Paulo II",
              link: "https://www.vatican.va/content/john-paul-ii/pt/encyclicals/documents/hf_jp-ii_enc_25031987_redemptoris-mater.html",
            },
            {
              title: "Lumen Gentium § 56",
              author: "Concílio Vaticano II",
              link: "https://www.vatican.va/archive/hist_councils/ii_vatican_council/documents/vat-ii_const_19641121_lumen-gentium_po.html",
            },
          ],
          tags: ["Maria", "Nova Eva", "Tipologia", "Patrística", "Redenção"],
          stats: {
            readingTime: "30",
            difficulty: "Intermediário",
            lastUpdated: "2024-06-27",
            progress: 0,
          },
        },
        {
          id: 2,
          title: "Maria como Rainha do Céu",
          description:
            "O título de Rainha atribuído a Maria e sua coroação no Céu",
          contentPath: "mariologia/maria-rainha-ceu.md",
          references: [
            {
              title: "Catecismo da Igreja Católica § 966",
              author: "Igreja Católica",
              link: "https://www.vatican.va/archive/cathechism_po/index_new/p123a9p6_963-975_po.html",
            },
            {
              title: "Ad Caeli Reginam",
              author: "Papa Pio XII",
              link: "https://www.vatican.va/content/pius-xii/pt/encyclicals/documents/hf_p-xii_enc_11101954_ad-caeli-reginam.html",
            },
            {
              title: "Apocalipse 12",
              author: "São João Apóstolo",
              link: "https://www.bibliacatolica.com.br/biblia-ave-maria/apocalipse/12/",
            },
            {
              title: "A Realeza de Maria na Tradição",
              author: "Fulton Sheen",
              link: "https://www.amazon.com.br/Mundo-Primeira-Vez-Fulton-Sheen/dp/8593709036",
            },
          ],
          tags: ["Maria", "Rainha do Céu", "Coroação", "Realeza"],
          stats: {
            readingTime: "25",
            difficulty: "Iniciante",
            lastUpdated: "2024-06-27",
            progress: 0,
          },
        },
        {
          id: 3,
          title: "Maria como Medianeira de Todas as Graças",
          description:
            "O papel de Maria na mediação e distribuição das graças de Cristo",
          contentPath: "mariologia/maria-medianeira-gracas.md",
          references: [
            {
              title: "Catecismo da Igreja Católica §§ 967-970",
              author: "Igreja Católica",
              link: "https://www.vatican.va/archive/cathechism_po/index_new/p123a9p6_963-975_po.html",
            },
            {
              title: "Lumen Gentium § 62",
              author: "Concílio Vaticano II",
              link: "https://www.vatican.va/archive/hist_councils/ii_vatican_council/documents/vat-ii_const_19641121_lumen-gentium_po.html",
            },
            {
              title: "Redemptoris Mater §§ 38-41",
              author: "São João Paulo II",
              link: "https://www.vatican.va/content/john-paul-ii/pt/encyclicals/documents/hf_jp-ii_enc_25031987_redemptoris-mater.html",
            },
            {
              title: "Tratado da Verdadeira Devoção à Santíssima Virgem",
              author: "São Luís Maria Grignion de Montfort",
              link: "https://www.montfort.org.br/bra/cadernos/maria/devocao/",
            },
          ],
          tags: ["Maria", "Medianeira", "Graças", "Intercessão"],
          stats: {
            readingTime: "30",
            difficulty: "Intermediário",
            lastUpdated: "2024-06-27",
            progress: 0,
          },
        },
      ],
    },
    {
      id: "mariologia-3",
      title: "Devoção Mariana",
      description:
        "Práticas devocionais marianas e sua importância na espiritualidade católica",
      icon: "HeartIcon",
      stats: {
        totalTopics: 2,
        readingTime: "1 hora",
        difficulty: "Iniciante",
        lastUpdated: "2024-06-27",
      },
      topics: [
        {
          id: 1,
          title: "O Santo Rosário",
          description:
            "História, significado e modo de rezar o Rosário como meio privilegiado de contemplação cristã",
          contentPath: "mariologia/santo-rosario.md",
          references: [
            {
              title: "Rosarium Virginis Mariae",
              author: "São João Paulo II",
              link: "https://www.vatican.va/content/john-paul-ii/pt/apost_letters/2002/documents/hf_jp-ii_apl_20021016_rosarium-virginis-mariae.html",
            },
            {
              title: "Marialis Cultus",
              author: "Papa Paulo VI",
              link: "https://www.vatican.va/content/paul-vi/pt/apost_exhortations/documents/hf_p-vi_exh_19740202_marialis-cultus.html",
            },
            {
              title: "O Segredo do Rosário",
              author: "São Luís Maria Grignion de Montfort",
              link: "https://www.montfort.org.br/bra/cadernos/maria/rosario/",
            },
            {
              title: "História do Rosário",
              author: "ACN - Ajuda à Igreja que Sofre",
              link: "https://www.acn.org.br/",
            },
          ],
          tags: ["Maria", "Rosário", "Devoção", "Oração"],
          stats: {
            readingTime: "25",
            difficulty: "Iniciante",
            lastUpdated: "2024-06-27",
            progress: 0,
          },
        },
        {
          id: 2,
          title: "Aparições Marianas Aprovadas pela Igreja",
          description:
            "As principais aparições de Nossa Senhora reconhecidas oficialmente pela Igreja",
          contentPath: "mariologia/aparicoes-marianas.md",
          references: [
            {
              title:
                "Normas para proceder no discernimento de presumíveis aparições e revelações",
              author: "Congregação para a Doutrina da Fé",
              link: "https://www.vatican.va/roman_curia/congregations/cfaith/documents/rc_con_cfaith_doc_19780225_norme-apparizioni_po.html",
            },
            {
              title: "Nossa Senhora de Lourdes",
              author: "Santuário de Lourdes",
              link: "https://www.lourdes-france.org/",
            },
            {
              title: "Nossa Senhora de Fátima",
              author: "Santuário de Fátima",
              link: "https://www.fatima.pt/",
            },
            {
              title: "Nossa Senhora de Guadalupe",
              author: "Santuário de Guadalupe",
              link: "https://virgendeguadalupe.org.mx/",
            },
          ],
          tags: ["Maria", "Aparições", "Fátima", "Lourdes", "Guadalupe"],
          stats: {
            readingTime: "30",
            difficulty: "Iniciante",
            lastUpdated: "2024-06-27",
            progress: 0,
          },
        },
      ],
    },
  ],
};
