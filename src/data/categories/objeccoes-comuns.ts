import type { Category } from "./types";

export const objeccoesComuns: Category = {
  id: "objeccoes-comuns",
  title: "Objeções Comuns",
  description:
    "Respostas fundamentadas às objeções mais frequentes à fé católica",
  icon: "ScaleIcon",
  stats: {
    totalTopics: 16,
    readingTime: "4 horas e 30 min",
    difficulty: "Intermediário",
    lastUpdated: "2024-06-25",
  },
  tags: ["Apologética", "Objeções", "Defesa da Fé"],
  subcategories: [
    {
      id: "objeccoes-biblia",
      title: "Objeções Bíblicas",
      description: "Respostas a objeções baseadas na interpretação da Bíblia",
      icon: "BookOpenIcon",
      stats: {
        totalTopics: 2,
        readingTime: "18 min",
        difficulty: "Iniciante",
        lastUpdated: "2024-04-17",
      },
      topics: [
        {
          id: 1,
          title: "Sola Scriptura",
          description: "Resposta à doutrina protestante da Sola Scriptura",
          contentPath: "sola-scriptura.md",
          references: [
            {
              title: "Catecismo da Igreja Católica §§ 80–97",
              author: "Igreja Católica",
              link: "https://www.vatican.va/archive/catechism_po/p1s1c2a2_po.htm",
            },
            {
              title: "Dei Verbum §§ 7–10",
              author: "Concílio Vaticano II",
              link: "https://www.vatican.va/archive/hist_councils/ii_vatican_council/documents/vat-ii_const_19651118_dei-verbum_po.html",
            },
            {
              title: "Sessão IV – Decreto sobre a Sagrada Escritura (1546)",
              author: "Concílio de Trento",
              link: "https://www.documentacatholicaomnia.eu/03d/1545-1563,_Concilium_Tridentinum,_Decretum_De_Sacra_Scriptura,_LT.pdf",
            },
            {
              title: "Sobre o Espírito Santo, cap. 27",
              author: "São Basílio Magno",
              link: "https://www.newadvent.org/fathers/3203.htm",
            },
            {
              title: "A Bíblia é um Livro Católico",
              author: "Scott Hahn",
              link: "https://www.cléofas.com.br/a-biblia-e-um-livro-catolico-scott-hahn/",
            },
            {
              title: "2 Tessalonicenses 2,15",
              author: "São Paulo",
              link: "https://www.bibliacatolica.com.br/biblia-ave-maria/ii-tessalonicenses/2/",
            },
            {
              title: "1 Timóteo 3,15",
              author: "São Paulo",
              link: "https://www.bibliacatolica.com.br/biblia-ave-maria/i-timoteo/3/",
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
          title: "Interpretação Privada",
          description:
            "Resposta à ideia de que cada um pode interpretar a Bíblia por si mesmo",
          contentPath: "interpretacao-privada.md",
          references: [
            {
              title: "Catecismo da Igreja Católica §§ 81–95",
              author: "Igreja Católica",
              link: "https://www.vatican.va/archive/catechism_po/p1s1c2a2_po.htm",
            },
            {
              title:
                "Dei Verbum (Constituição Dogmática sobre a Revelação Divina)",
              author: "Concílio Vaticano II",
              link: "https://www.vatican.va/archive/hist_councils/ii_vatican_council/documents/vat-ii_const_19651118_dei-verbum_po.html",
            },
            {
              title: "A Doutrina Cristã",
              author: "Santo Agostinho",
              link: "https://www.augustinus.it/latino/dottrina_cristiana/index2.htm",
            },
            {
              title: "A Bíblia é um Livro Católico",
              author: "Scott Hahn",
              link: "https://www.cléofas.com.br/a-biblia-e-um-livro-catolico-scott-hahn/",
            },
            {
              title: "Verbum Domini",
              author: "Papa Bento XVI",
              link: "https://www.vatican.va/content/benedict-xvi/pt/apost_exhortations/documents/hf_ben-xvi_exh_20100930_verbum-domini.html",
            },
            {
              title: "2 Pedro 1,20",
              author: "São Pedro",
              link: "https://www.bibliacatolica.com.br/biblia-ave-maria/ii-pedro/1/",
            },
            {
              title: "Atos 8,30-31",
              author: "São Lucas",
              link: "https://www.bibliacatolica.com.br/biblia-ave-maria/atos/8/",
            },
          ],
          tags: ["Bíblia", "Interpretação", "Magistério"],
          stats: {
            readingTime: "12 min",
            difficulty: "Iniciante",
            lastUpdated: "2024-04-17",
            progress: 0,
          },
        },
      ],
    },
    {
      id: "objeccoes-maria",
      title: "Objeções Marianas",
      description: "Respostas a objeções sobre a devoção a Maria",
      icon: "HeartIcon",
      stats: {
        totalTopics: 2,
        readingTime: "25 min",
        difficulty: "Iniciante",
        lastUpdated: "2024-04-17",
      },
      topics: [
        {
          id: 3,
          title: "Introdução à Intercessão dos Santos",
          description:
            "Entenda o fundamento bíblico e doutrinário desta prática da fé católica",
          contentPath: "intercessao-dos-santos.md",
          references: [
            {
              title: "Lucas 20:38",
              author: "São Lucas",
              link: "https://www.bibliaonline.com.br/acf/lc/20/38",
            },
            {
              title: "Apocalipse 5:8",
              author: "São João",
              link: "https://www.bibliaonline.com.br/acf/ap/5/8",
            },
          ],
          tags: ["Maria", "Santos", "Intercessão"],
          stats: {
            readingTime: "10 min",
            difficulty: "Iniciante",
            lastUpdated: "2024-04-17",
            progress: 0,
          },
        },
        {
          id: 4,
          title: "Intercessão dos Santos – Estudo Avançado",
          description:
            "Aprofundamento patrístico, teológico e magisterial sobre a intercessão dos santos",
          contentPath: "intercessao-dos-santos-uma-defesa-aprofundada.md",
          references: [
            {
              title: "Catecismo da Igreja Católica §§ 956–957",
              author: "Igreja Católica",
              link: "https://www.vatican.va/archive/catechism_po/p123a9p5.htm",
            },
            {
              title: "Lumen Gentium §§ 49–51, 60–62",
              author: "Concílio Vaticano II",
              link: "https://www.vatican.va/archive/hist_councils/ii_vatican_council/documents/vat-ii_const_19641121_lumen-gentium_po.html",
            },
            {
              title: "Tratado da Verdadeira Devoção à Santíssima Virgem",
              author: "São Luís Maria Grignion de Montfort",
              link: "https://www.acidigital.com/arquivos/devocao.pdf",
            },
            {
              title: "Sermões sobre os Mártires",
              author: "Santo Agostinho",
              link: "https://www.augustinus.it/portugues/index.htm",
            },
            {
              title: "Redemptoris Mater",
              author: "São João Paulo II",
              link: "https://www.vatican.va/content/john-paul-ii/pt/encyclicals/documents/hf_jp-ii_enc_25031987_redemptoris-mater.html",
            },
            {
              title: "Apocalipse 5,8",
              author: "São João Evangelista",
              link: "https://www.bibliacatolica.com.br/biblia-ave-maria/apocalipse/5/",
            },
            {
              title: "2 Macabeus 15,14",
              author: "Autor Sagrado",
              link: "https://www.bibliacatolica.com.br/biblia-ave-maria/ii-macabeus/15/",
            },
          ],
          tags: ["Santos", "Intercessão", "Apologética"],
          stats: {
            readingTime: "15 min",
            difficulty: "Intermediário",
            lastUpdated: "2024-04-17",
            progress: 0,
          },
        },
      ],
    },
    {
      id: "objeccoes-historicas",
      title: "Objeções Históricas",
      description: "Respostas a equívocos históricos sobre a Igreja Católica",
      icon: "ClockIcon",
      stats: {
        totalTopics: 2,
        readingTime: "30 min",
        difficulty: "Intermediário",
        lastUpdated: "2024-06-25",
      },
      topics: [
        {
          id: 5,
          title: "A Igreja Inventou a Bíblia para Controlar as Pessoas",
          description:
            "Resposta à afirmação que a Igreja Católica inventou ou manipulou as Escrituras para fins de controle",
          contentPath: "igreja-inventou-biblia-para-controlar.md",
          references: [
            {
              title: "Dei Verbum §§ 11-13",
              author: "Concílio Vaticano II",
              link: "https://www.vatican.va/archive/hist_councils/ii_vatican_council/documents/vat-ii_const_19651118_dei-verbum_po.html",
            },
            {
              title: "O Cânon das Escrituras",
              author: "F.F. Bruce",
              link: "https://www.amazon.com.br/Canon-Scripture-F-Bruce/dp/083081258X",
            },
            {
              title: "Como a Igreja Católica Construiu a Civilização Ocidental",
              author: "Thomas E. Woods Jr.",
              link: "https://www.amazon.com.br/Como-Igreja-Cat%C3%B3lica-Construiu-Civiliza%C3%A7%C3%A3o/dp/9723013282",
            },
            {
              title: "Jesus e as Raízes Judaicas da Eucaristia",
              author: "Brant Pitre",
              link: "https://www.amazon.com.br/Jesus-Ra%C3%ADzes-Judaicas-Eucaristia-Pitre/dp/8572222148",
            },
            {
              title: "Catecismo da Igreja Católica §§ 105-108",
              author: "Igreja Católica",
              link: "https://www.vatican.va/archive/cathechism_po/index_new/prima-pagina-cic_po.html",
            },
            {
              title: "Jesus de Nazaré (trilogia)",
              author: "Joseph Ratzinger (Papa Bento XVI)",
              link: "https://www.amazon.com.br/Jesus-Nazar%C3%A9-Primeira-Parte-Batismo/dp/8535621148",
            },
          ],
          tags: ["História", "Bíblia", "Cânon", "Apologética"],
          stats: {
            readingTime: "15 min",
            difficulty: "Intermediário",
            lastUpdated: "2024-06-25",
            progress: 0,
          },
        },
        {
          id: 2,
          title: "A Igreja e a Inquisição",
          description:
            "Análise histórica da Inquisição e resposta equilibrada às acusações comuns contra a Igreja",
          contentPath: "igreja-e-inquisicao.md",
          references: [
            {
              title: "A Inquisição: Mito e História",
              author: "Rodney Stark",
              link: "https://www.amazon.com.br/Inquisição-Mito-História-Rodney-Stark/dp/0691165084",
            },
            {
              title: "A Inquisição Espanhola",
              author: "Henry Kamen",
              link: "https://www.amazon.com.br/Spanish-Inquisition-Historical-Revision/dp/0300180519",
            },
            {
              title: "Catecismo da Igreja Católica § 2298",
              author: "Igreja Católica",
              link: "https://www.vatican.va/archive/cathechism_po/index_new/p3s2cap2_2196-2557_po.html",
            },
            {
              title: "Tertio Millennio Adveniente §§ 33-35",
              author: "São João Paulo II",
              link: "https://www.vatican.va/content/john-paul-ii/pt/apost_letters/1994/documents/hf_jp-ii_apl_19941110_tertio-millennio-adveniente.html",
            },
            {
              title: "Memória e Reconciliação: A Igreja e as Faltas do Passado",
              author: "Comissão Teológica Internacional",
              link: "https://www.vatican.va/roman_curia/congregations/cfaith/cti_documents/rc_con_cfaith_doc_20000307_memory-reconc-itc_po.html",
            },
          ],
          tags: ["História", "Inquisição", "Idade Média", "Apologética"],
          stats: {
            readingTime: "15 min",
            difficulty: "Intermediário",
            lastUpdated: "2024-06-25",
            progress: 0,
          },
        },
      ],
    },
    {
      id: "objeccoes-sacramentos",
      title: "Objeções aos Sacramentos",
      description:
        "Respostas a objeções sobre os sacramentos e sacramentais da Igreja",
      icon: "BeakerIcon",
      stats: {
        totalTopics: 2,
        readingTime: "30 min",
        difficulty: "Intermediário",
        lastUpdated: "2024-06-25",
      },
      topics: [
        {
          id: 1,
          title: "A Eucaristia é Apenas um Símbolo?",
          description:
            "Resposta à objeção de que a Eucaristia é apenas um memorial simbólico",
          contentPath: "eucaristia-apenas-simbolo.md",
          references: [
            {
              title: "Catecismo da Igreja Católica §§ 1322-1419",
              author: "Igreja Católica",
              link: "https://www.vatican.va/archive/cathechism_po/index_new/p2s2cap1_1210-1419_po.html",
            },
            {
              title: "Ecclesia de Eucharistia",
              author: "São João Paulo II",
              link: "https://www.vatican.va/content/john-paul-ii/pt/encyclicals/documents/hf_jp-ii_enc_20030417_eccl-de-euch.html",
            },
            {
              title: "Sacrosanctum Concilium §§ 47-58",
              author: "Concílio Vaticano II",
              link: "https://www.vatican.va/archive/hist_councils/ii_vatican_council/documents/vat-ii_const_19631204_sacrosanctum-concilium_po.html",
            },
            {
              title: "João 6,51-58",
              author: "São João Evangelista",
              link: "https://www.bibliacatolica.com.br/biblia-ave-maria/sao-joao/6/",
            },
            {
              title: "1 Coríntios 10,16-17; 11,23-29",
              author: "São Paulo",
              link: "https://www.bibliacatolica.com.br/biblia-ave-maria/i-corintios/11/",
            },
            {
              title: "O Cordeiro Supper: O Significado da Missa Católica",
              author: "Scott Hahn",
              link: "https://www.amazon.com.br/Cordeiro-Supper-Scott-Hahn/dp/8560895906",
            },
          ],
          tags: ["Eucaristia", "Sacramentos", "Presença Real", "Missa"],
          stats: {
            readingTime: "15 min",
            difficulty: "Intermediário",
            lastUpdated: "2024-06-25",
            progress: 0,
          },
        },
        {
          id: 2,
          title: "Por Que Confessar a um Padre?",
          description:
            "Resposta à objeção de que a confissão sacramental é desnecessária pois podemos nos confessar diretamente a Deus",
          contentPath: "confissao-a-um-padre.md",
          references: [
            {
              title: "Catecismo da Igreja Católica §§ 1422-1498",
              author: "Igreja Católica",
              link: "https://www.vatican.va/archive/cathechism_po/index_new/p2s2cap2_1420-1532_po.html",
            },
            {
              title: "João 20,21-23",
              author: "São João Evangelista",
              link: "https://www.bibliacatolica.com.br/biblia-ave-maria/sao-joao/20/",
            },
            {
              title: "Tiago 5,14-16",
              author: "São Tiago",
              link: "https://www.bibliacatolica.com.br/biblia-ave-maria/sao-tiago/5/",
            },
            {
              title: "Misericordia Dei",
              author: "São João Paulo II",
              link: "https://www.vatican.va/content/john-paul-ii/pt/motu_proprio/documents/hf_jp-ii_motu-proprio_20020502_misericordia-dei.html",
            },
            {
              title: "O Nome de Deus é Misericórdia",
              author: "Papa Francisco",
              link: "https://www.amazon.com.br/nome-Deus-%C3%A9-miseric%C3%B3rdia/dp/8542207998",
            },
            {
              title: "Reconciliatio et Paenitentia",
              author: "São João Paulo II",
              link: "https://www.vatican.va/content/john-paul-ii/pt/apost_exhortations/documents/hf_jp-ii_exh_02121984_reconciliatio-et-paenitentia.html",
            },
          ],
          tags: ["Confissão", "Reconciliação", "Sacramentos", "Penitência"],
          stats: {
            readingTime: "15 min",
            difficulty: "Iniciante",
            lastUpdated: "2024-06-25",
            progress: 0,
          },
        },
      ],
    },
    {
      id: "objeccoes-magisterio",
      title: "Objeções ao Magistério",
      description:
        "Respostas a objeções sobre o Magistério e a autoridade da Igreja",
      icon: "AcademicCapIcon",
      stats: {
        totalTopics: 1,
        readingTime: "15 min",
        difficulty: "Intermediário",
        lastUpdated: "2024-06-25",
      },
      topics: [
        {
          id: 1,
          title: "A Infalibilidade Papal é Bíblica?",
          description:
            "Resposta à objeção de que a infalibilidade papal não tem fundamento bíblico e é uma inovação recente",
          contentPath: "infalibilidade-papal-biblica.md",
          references: [
            {
              title: "Catecismo da Igreja Católica §§ 888-892",
              author: "Igreja Católica",
              link: "https://www.vatican.va/archive/cathechism_po/index_new/p1s2cap3_748-975_po.html",
            },
            {
              title: "Pastor Aeternus",
              author: "Concílio Vaticano I",
              link: "https://www.vatican.va/content/pius-ix/la/documents/constitutio-dogmatica-pastor-aeternus-18-iulii-1870.html",
            },
            {
              title: "Lumen Gentium §§ 22-25",
              author: "Concílio Vaticano II",
              link: "https://www.vatican.va/archive/hist_councils/ii_vatican_council/documents/vat-ii_const_19641121_lumen-gentium_po.html",
            },
            {
              title: "Mateus 16,18-19",
              author: "São Mateus",
              link: "https://www.bibliacatolica.com.br/biblia-ave-maria/sao-mateus/16/",
            },
            {
              title: "Lucas 22,31-32",
              author: "São Lucas",
              link: "https://www.bibliacatolica.com.br/biblia-ave-maria/sao-lucas/22/",
            },
            {
              title: "João 21,15-17",
              author: "São João",
              link: "https://www.bibliacatolica.com.br/biblia-ave-maria/sao-joao/21/",
            },
            {
              title: "Upon This Rock",
              author: "Steve Ray",
              link: "https://www.amazon.com.br/Upon-This-Rock-Peter-Origins/dp/0898707234",
            },
          ],
          tags: ["Papa", "Infalibilidade", "Magistério", "Primado de Pedro"],
          stats: {
            readingTime: "15 min",
            difficulty: "Intermediário",
            lastUpdated: "2024-06-25",
            progress: 0,
          },
        },
      ],
    },
    {
      id: "objeccoes-contemporaneas",
      title: "Objeções Contemporâneas",
      description:
        "Respostas a objeções modernas sobre questões sociais e culturais",
      icon: "GlobeAltIcon",
      stats: {
        totalTopics: 1,
        readingTime: "15 min",
        difficulty: "Intermediário",
        lastUpdated: "2024-06-25",
      },
      topics: [
        {
          id: 1,
          title: "A Igreja e as Pessoas LGBT",
          description:
            "Resposta equilibrada à objeção de que a Igreja é hostil às pessoas LGBT",
          contentPath: "igreja-e-pessoas-lgbt.md",
          references: [
            {
              title: "Catecismo da Igreja Católica §§ 2357-2359",
              author: "Igreja Católica",
              link: "https://www.vatican.va/archive/cathechism_po/index_new/p3s2cap2_2196-2557_po.html",
            },
            {
              title: "Amoris Laetitia §§ 250-251",
              author: "Papa Francisco",
              link: "https://www.vatican.va/content/francesco/pt/apost_exhortations/documents/papa-francesco_esortazione-ap_20160319_amoris-laetitia.html",
            },
            {
              title:
                "Carta aos Bispos sobre o Atendimento Pastoral das Pessoas Homossexuais",
              author: "Congregação para a Doutrina da Fé",
              link: "https://www.vatican.va/roman_curia/congregations/cfaith/documents/rc_con_cfaith_doc_19861001_homosexual-persons_po.html",
            },
            {
              title: "Gaudium et Spes § 27",
              author: "Concílio Vaticano II",
              link: "https://www.vatican.va/archive/hist_councils/ii_vatican_council/documents/vat-ii_const_19651207_gaudium-et-spes_po.html",
            },
            {
              title: "Fiducia Supplicans",
              author: "Dicastério para a Doutrina da Fé",
              link: "https://www.vatican.va/roman_curia/congregations/cfaith/documents/rc_con_cfaith_doc_20231218_fiducia-supplicans_po.html",
            },
          ],
          tags: ["LGBT", "Sexualidade", "Moral", "Dignidade Humana"],
          stats: {
            readingTime: "15 min",
            difficulty: "Intermediário",
            lastUpdated: "2024-06-25",
            progress: 0,
          },
        },
      ],
    },
  ],
};
