import type { Category } from "./types";

export const objeccoesComuns: Category = {
  id: "objeccoes-comuns",
  title: "Objeções Comuns",
  description:
    "Respostas fundamentadas às objeções mais frequentes à fé católica",
  icon: "ScaleIcon",
  stats: {
    totalTopics: 29,
    readingTime: "7 horas e 45 min",
    difficulty: "Intermediário",
    lastUpdated: "2024-06-27",
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
          contentPath: "objeccoes-comuns/sola-scriptura.md",
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
          contentPath: "objeccoes-comuns/interpretacao-privada.md",
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
        totalTopics: 3,
        readingTime: "40 min",
        difficulty: "Iniciante",
        lastUpdated: "2024-06-26",
      },
      topics: [
        {
          id: 3,
          title: "Introdução à Intercessão dos Santos",
          description:
            "Entenda o fundamento bíblico e doutrinário desta prática da fé católica",
          contentPath: "objeccoes-comuns/intercessao-dos-santos.md",
          references: [
            {
              title: "Lucas 20,38",
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
          contentPath: "objeccoes-comuns/intercessao-dos-santos-uma-defesa-aprofundada.md",
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
        {
          id: 5,
          title: "A Veneração a Maria é Idolatria?",
          description:
            "Resposta à objeção de que católicos cometem idolatria ao venerar a Mãe de Jesus",
          contentPath: "objeccoes-comuns/veneracao-maria-idolatria.md",
          references: [
            {
              title: "Catecismo da Igreja Católica §§ 487-511, 963-975",
              author: "Igreja Católica",
              link: "https://www.vatican.va/archive/cathechism_po/index_new/p1s2c3art3_422-682_po.html",
            },
            {
              title: "Lumen Gentium, Cap. VIII",
              author: "Concílio Vaticano II",
              link: "https://www.vatican.va/archive/hist_councils/ii_vatican_council/documents/vat-ii_const_19641121_lumen-gentium_po.html",
            },
            {
              title: "Tratado da Verdadeira Devoção à Santíssima Virgem",
              author: "São Luís Maria Grignion de Montfort",
              link: "https://www.acidigital.com/arquivos/devocao.pdf",
            },
            {
              title: "Redemptoris Mater",
              author: "São João Paulo II",
              link: "https://www.vatican.va/content/john-paul-ii/pt/encyclicals/documents/hf_jp-ii_enc_25031987_redemptoris-mater.html",
            },
            {
              title: "Lucas 1,28.42-43.48",
              author: "São Lucas",
              link: "https://www.bibliacatolica.com.br/biblia-ave-maria/sao-lucas/1/",
            },
            {
              title: "João 19,26-27",
              author: "São João",
              link: "https://www.bibliacatolica.com.br/biblia-ave-maria/sao-joao/19/",
            },
          ],
          tags: ["Maria", "Veneração", "Dulia", "Idolatria"],
          stats: {
            readingTime: "15 min",
            difficulty: "Iniciante",
            lastUpdated: "2024-06-26",
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
          contentPath: "objeccoes-comuns/igreja-inventou-biblia-para-controlar.md",
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
          contentPath: "objeccoes-comuns/igreja-e-inquisicao.md",
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
        totalTopics: 3,
        readingTime: "45 min",
        difficulty: "Intermediário",
        lastUpdated: "2024-06-26",
      },
      topics: [
        {
          id: 1,
          title: "A Eucaristia é Apenas um Símbolo?",
          description:
            "Resposta à objeção de que a Eucaristia é apenas um memorial simbólico",
          contentPath: "objeccoes-comuns/eucaristia-apenas-simbolo.md",
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
          contentPath: "objeccoes-comuns/confissao-a-um-padre.md",
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
        {
          id: 3,
          title: "O Batismo Infantil Tem Fundamento Bíblico?",
          description:
            "Resposta à objeção de que o batismo de crianças não possui base nas Escrituras",
          contentPath: "objeccoes-comuns/batismo-infantil-biblico.md",
          references: [
            {
              title: "Catecismo da Igreja Católica §§ 1213-1284",
              author: "Igreja Católica",
              link: "https://www.vatican.va/archive/cathechism_po/index_new/p2s2cap1_1210-1419_po.html",
            },
            {
              title: "Instrução sobre o Batismo das Crianças",
              author: "Congregação para a Doutrina da Fé",
              link: "https://www.vatican.va/roman_curia/congregations/cfaith/documents/rc_con_cfaith_doc_19801020_pastoralis_actio_po.html",
            },
            {
              title: "Atos 2,38-39",
              author: "São Lucas",
              link: "https://www.bibliacatolica.com.br/biblia-ave-maria/atos/2/",
            },
            {
              title: "Atos 16,15.33",
              author: "São Lucas",
              link: "https://www.bibliacatolica.com.br/biblia-ave-maria/atos/16/",
            },
            {
              title: "Colossenses 2,11-12",
              author: "São Paulo",
              link: "https://www.bibliacatolica.com.br/biblia-ave-maria/colossenses/2/",
            },
            {
              title: "1 Coríntios 1,16",
              author: "São Paulo",
              link: "https://www.bibliacatolica.com.br/biblia-ave-maria/i-corintios/1/",
            },
            {
              title: "Marcos 10,13-16",
              author: "São Marcos",
              link: "https://www.bibliacatolica.com.br/biblia-ave-maria/sao-marcos/10/",
            },
          ],
          tags: ["Batismo", "Sacramentos", "Iniciação", "Crianças"],
          stats: {
            readingTime: "15 min",
            difficulty: "Intermediário",
            lastUpdated: "2024-06-26",
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
        totalTopics: 2,
        readingTime: "30 min",
        difficulty: "Intermediário",
        lastUpdated: "2024-06-26",
      },
      topics: [
        {
          id: 1,
          title: "A Infalibilidade Papal é Bíblica?",
          description:
            "Resposta à objeção de que a infalibilidade papal não tem fundamento bíblico e é uma inovação recente",
          contentPath: "objeccoes-comuns/infalibilidade-papal-biblica.md",
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
        {
          id: 2,
          title: "Por Que a Igreja Não Permite Mulheres Sacerdotes?",
          description:
            "Resposta à objeção de que a exclusão de mulheres do sacerdócio é discriminatória e ultrapassada",
          contentPath: "objeccoes-comuns/igreja-mulheres-sacerdotes.md",
          references: [
            {
              title: "Catecismo da Igreja Católica §§ 1577-1580",
              author: "Igreja Católica",
              link: "https://www.vatican.va/archive/cathechism_po/index_new/p2s3cap3_1533-1666_po.html",
            },
            {
              title: "Ordinatio Sacerdotalis",
              author: "São João Paulo II",
              link: "https://www.vatican.va/content/john-paul-ii/pt/apost_letters/1994/documents/hf_jp-ii_apl_19940522_ordinatio-sacerdotalis.html",
            },
            {
              title: "Inter Insigniores",
              author: "Congregação para a Doutrina da Fé",
              link: "https://www.vatican.va/roman_curia/congregations/cfaith/documents/rc_con_cfaith_doc_19761015_inter-insigniores_po.html",
            },
            {
              title: "Mulieris Dignitatem",
              author: "São João Paulo II",
              link: "https://www.vatican.va/content/john-paul-ii/pt/apost_letters/1988/documents/hf_jp-ii_apl_19880815_mulieris-dignitatem.html",
            },
            {
              title: "Lucas 8,1-3",
              author: "São Lucas",
              link: "https://www.bibliacatolica.com.br/biblia-ave-maria/sao-lucas/8/",
            },
            {
              title: "Efésios 5,25-32",
              author: "São Paulo",
              link: "https://www.bibliacatolica.com.br/biblia-ave-maria/efesios/5/",
            },
          ],
          tags: ["Sacerdócio", "Mulheres", "Magistério", "Sacramentos"],
          stats: {
            readingTime: "15 min",
            difficulty: "Intermediário",
            lastUpdated: "2024-06-26",
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
        totalTopics: 2,
        readingTime: "30 min",
        difficulty: "Intermediário",
        lastUpdated: "2024-06-26",
      },
      topics: [
        {
          id: 1,
          title: "A Igreja e as Pessoas LGBT",
          description:
            "Resposta equilibrada à objeção de que a Igreja é hostil às pessoas LGBT",
          contentPath: "objeccoes-comuns/igreja-e-pessoas-lgbt.md",
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
        {
          id: 2,
          title:
            "Por Que a Igreja Católica é Contra a Contracepção Artificial?",
          description:
            "Resposta à objeção de que a posição da Igreja sobre métodos contraceptivos é ultrapassada e prejudicial",
          contentPath: "objeccoes-comuns/anticoncepcionais-artificiais.md",
          references: [
            {
              title: "Catecismo da Igreja Católica §§ 2366-2372",
              author: "Igreja Católica",
              link: "https://www.vatican.va/archive/cathechism_po/index_new/p3s2cap2_2196-2557_po.html",
            },
            {
              title: "Humanae Vitae",
              author: "Papa Paulo VI",
              link: "https://www.vatican.va/content/paul-vi/pt/encyclicals/documents/hf_p-vi_enc_25071968_humanae-vitae.html",
            },
            {
              title: "Evangelium Vitae §§ 11-14",
              author: "São João Paulo II",
              link: "https://www.vatican.va/content/john-paul-ii/pt/encyclicals/documents/hf_jp-ii_enc_25031995_evangelium-vitae.html",
            },
            {
              title: "Familiaris Consortio §§ 28-35",
              author: "São João Paulo II",
              link: "https://www.vatican.va/content/john-paul-ii/pt/apost_exhortations/documents/hf_jp-ii_exh_19811122_familiaris-consortio.html",
            },
            {
              title: "Gênesis 1,28; 38,8-10",
              author: "Moisés",
              link: "https://www.bibliacatolica.com.br/biblia-ave-maria/genesis/1/",
            },
            {
              title: "Teologia do Corpo",
              author: "São João Paulo II",
              link: "https://www.amazon.com.br/Teologia-do-Corpo-Papa-Paulo/dp/8563160435",
            },
          ],
          tags: [
            "Sexualidade",
            "Moral",
            "Matrimônio",
            "Família",
            "Contracepção",
          ],
          stats: {
            readingTime: "15 min",
            difficulty: "Intermediário",
            lastUpdated: "2024-06-26",
            progress: 0,
          },
        },
      ],
    },
    {
      id: "objeccoes-doutrinarias",
      title: "Objeções Doutrinárias",
      description:
        "Respostas a objeções sobre doutrinas específicas da fé católica",
      icon: "BookmarkIcon",
      stats: {
        totalTopics: 3,
        readingTime: "45 min",
        difficulty: "Intermediário",
        lastUpdated: "2024-06-27",
      },
      topics: [
        {
          id: 1,
          title: "O Purgatório é uma Invenção da Igreja?",
          description:
            "Resposta à objeção de que o purgatório foi inventado pela Igreja e não possui base bíblica",
          contentPath: "objeccoes-comuns/purgatorio-invencao-igreja.md",
          references: [
            {
              title: "Catecismo da Igreja Católica §§ 1030-1032",
              author: "Igreja Católica",
              link: "https://www.vatican.va/archive/cathechism_po/index_new/p123a12_1033-1065_po.html",
            },
            {
              title: "2 Macabeus 12,39-46",
              author: "Autor Sagrado",
              link: "https://www.bibliacatolica.com.br/biblia-ave-maria/ii-macabeus/12/",
            },
            {
              title: "Mateus 12,32",
              author: "São Mateus",
              link: "https://www.bibliacatolica.com.br/biblia-ave-maria/sao-mateus/12/",
            },
            {
              title: "1 Coríntios 3,12-15",
              author: "São Paulo",
              link: "https://www.bibliacatolica.com.br/biblia-ave-maria/i-corintios/3/",
            },
            {
              title: "Spe Salvi §§ 45-48",
              author: "Papa Bento XVI",
              link: "https://www.vatican.va/content/benedict-xvi/pt/encyclicals/documents/hf_ben-xvi_enc_20071130_spe-salvi.html",
            },
          ],
          tags: ["Purgatório", "Escatologia", "Vida Eterna", "Salvação"],
          stats: {
            readingTime: "15 min",
            difficulty: "Intermediário",
            lastUpdated: "2024-06-27",
            progress: 0,
          },
        },
        {
          id: 2,
          title: "A Igreja Acrescentou Doutrinas Não Bíblicas à Fé?",
          description:
            "Resposta à acusação de que a Igreja Católica adicionou ensinamentos contrários à Bíblia",
          contentPath: "objeccoes-comuns/igreja-doutrinas-nao-biblicas.md",
          references: [
            {
              title: "Catecismo da Igreja Católica §§ 74-100",
              author: "Igreja Católica",
              link: "https://www.vatican.va/archive/cathechism_po/index_new/p1s1c2_74-100_po.html",
            },
            {
              title: "Dei Verbum §§ 7-10",
              author: "Concílio Vaticano II",
              link: "https://www.vatican.va/archive/hist_councils/ii_vatican_council/documents/vat-ii_const_19651118_dei-verbum_po.html",
            },
            {
              title: "O Desenvolvimento da Doutrina Cristã",
              author: "Beato John Henry Newman",
              link: "https://www.amazon.com.br/Desenvolvimento-Doutrina-Cristã-John-Newman/dp/8534932107",
            },
            {
              title: "João 16,12-15",
              author: "São João",
              link: "https://www.bibliacatolica.com.br/biblia-ave-maria/sao-joao/16/",
            },
            {
              title: "Sessão IV – Decreto sobre a Sagrada Escritura (1546)",
              author: "Concílio de Trento",
              link: "https://www.documentacatholicaomnia.eu/03d/1545-1563,_Concilium_Tridentinum,_Decretum_De_Sacra_Scriptura,_LT.pdf",
            },
          ],
          tags: [
            "Doutrina",
            "Tradição",
            "Desenvolvimento Doutrinário",
            "Magistério",
          ],
          stats: {
            readingTime: "15 min",
            difficulty: "Intermediário",
            lastUpdated: "2024-06-27",
            progress: 0,
          },
        },
        {
          id: 3,
          title: "A Tradição Invalida a Bíblia?",
          description:
            "Resposta à objeção de que a Tradição católica compete com ou contradiz as Escrituras",
          contentPath: "objeccoes-comuns/tradicao-invalida-biblia.md",
          references: [
            {
              title: "Catecismo da Igreja Católica §§ 80-83",
              author: "Igreja Católica",
              link: "https://www.vatican.va/archive/cathechism_po/index_new/p1s1c2_74-100_po.html",
            },
            {
              title: "Dei Verbum §§ 9-10",
              author: "Concílio Vaticano II",
              link: "https://www.vatican.va/archive/hist_councils/ii_vatican_council/documents/vat-ii_const_19651118_dei-verbum_po.html",
            },
            {
              title: "2 Tessalonicenses 2,15",
              author: "São Paulo",
              link: "https://www.bibliacatolica.com.br/biblia-ave-maria/ii-tessalonicenses/2/",
            },
            {
              title: "2 Timóteo 2,2",
              author: "São Paulo",
              link: "https://www.bibliacatolica.com.br/biblia-ave-maria/ii-timoteo/2/",
            },
            {
              title: "By What Authority?",
              author: "Mark Shea",
              link: "https://www.amazon.com.br/What-Authority-Scripture-Tradition-Magisterium/dp/1592767052",
            },
          ],
          tags: ["Tradição", "Escritura", "Magistério", "Revelação"],
          stats: {
            readingTime: "15 min",
            difficulty: "Intermediário",
            lastUpdated: "2024-06-27",
            progress: 0,
          },
        },
      ],
    },
    {
      id: "objeccoes-culturais",
      title: "Objeções Culturais",
      description:
        "Respostas a objeções sobre a relação da Igreja com culturas e tradições",
      icon: "GlobeAltIcon",
      stats: {
        totalTopics: 3,
        readingTime: "45 min",
        difficulty: "Intermediário",
        lastUpdated: "2024-06-27",
      },
      topics: [
        {
          id: 1,
          title: "O Catolicismo é Paganismo Disfarçado?",
          description:
            "Resposta à acusação de que a Igreja Católica incorporou práticas pagãs em seu culto e doutrinas",
          contentPath: "objeccoes-comuns/catolicismo-paganismo-disfarcado.md",
          references: [
            {
              title: "Catecismo da Igreja Católica §§ 1667-1679",
              author: "Igreja Católica",
              link: "https://www.vatican.va/archive/cathechism_po/index_new/p2s2cap4_1667-1690_po.html",
            },
            {
              title: "Lumen Gentium §§ 16-17",
              author: "Concílio Vaticano II",
              link: "https://www.vatican.va/archive/hist_councils/ii_vatican_council/documents/vat-ii_const_19641121_lumen-gentium_po.html",
            },
            {
              title: "Nostra Aetate § 2",
              author: "Concílio Vaticano II",
              link: "https://www.vatican.va/archive/hist_councils/ii_vatican_council/documents/vat-ii_decl_19651028_nostra-aetate_po.html",
            },
            {
              title: "O Espírito do Catolicismo",
              author: "Karl Adam",
              link: "https://www.amazon.com.br/Espírito-Catolicismo-Karl-Adam/dp/8527610892",
            },
            {
              title: "A Cidade de Deus",
              author: "Santo Agostinho",
              link: "https://www.amazon.com.br/cidade-Deus-contra-pagãos/dp/8532658393",
            },
          ],
          tags: ["Paganismo", "Inculturação", "Sincretismo", "Liturgia"],
          stats: {
            readingTime: "15 min",
            difficulty: "Intermediário",
            lastUpdated: "2024-06-27",
            progress: 0,
          },
        },
        {
          id: 2,
          title: "O Culto aos Santos Vem do Politeísmo?",
          description:
            "Resposta à objeção de que a veneração dos santos é uma forma de politeísmo herdada de religiões pagãs",
          contentPath: "objeccoes-comuns/culto-santos-politeismo.md",
          references: [
            {
              title: "Catecismo da Igreja Católica §§ 946-962, 2132",
              author: "Igreja Católica",
              link: "https://www.vatican.va/archive/cathechism_po/index_new/p1s2cap3_748-975_po.html",
            },
            {
              title: "Lumen Gentium §§ 49-51",
              author: "Concílio Vaticano II",
              link: "https://www.vatican.va/archive/hist_councils/ii_vatican_council/documents/vat-ii_const_19641121_lumen-gentium_po.html",
            },
            {
              title: "Ap 5,8; 8,3-4",
              author: "São João",
              link: "https://www.bibliacatolica.com.br/biblia-ave-maria/apocalipse/5/",
            },
            {
              title: "Hb 12,1-2",
              author: "Autor da Carta aos Hebreus",
              link: "https://www.bibliacatolica.com.br/biblia-ave-maria/hebreus/12/",
            },
            {
              title: "A Nuvem de Testemunhas",
              author: "Stephen Finlan",
              link: "https://www.amazon.com.br/Cloud-Witnesses-Theology-Hebrews-Ancient/dp/1589830989",
            },
          ],
          tags: ["Santos", "Dulia", "Politeísmo", "Intercessão"],
          stats: {
            readingTime: "15 min",
            difficulty: "Intermediário",
            lastUpdated: "2024-06-27",
            progress: 0,
          },
        },
        {
          id: 3,
          title: "A Igreja Ficou Rica Explorando os Pobres?",
          description:
            "Resposta à acusação de que a Igreja Católica acumulou riquezas através da exploração dos fiéis",
          contentPath: "objeccoes-comuns/igreja-rica-explorando-pobres.md",
          references: [
            {
              title: "Catecismo da Igreja Católica §§ 2401-2463",
              author: "Igreja Católica",
              link: "https://www.vatican.va/archive/cathechism_po/index_new/p3s2cap2_2196-2557_po.html",
            },
            {
              title: "Laudato Si' §§ 50-51, 123",
              author: "Papa Francisco",
              link: "https://www.vatican.va/content/francesco/pt/encyclicals/documents/papa-francesco_20150524_enciclica-laudato-si.html",
            },
            {
              title: "Centesimus Annus §§ 30-43",
              author: "São João Paulo II",
              link: "https://www.vatican.va/content/john-paul-ii/pt/encyclicals/documents/hf_jp-ii_enc_01051991_centesimus-annus.html",
            },
            {
              title: "Como a Igreja Católica Construiu a Civilização Ocidental",
              author: "Thomas E. Woods Jr.",
              link: "https://www.amazon.com.br/Como-Igreja-Cat%C3%B3lica-Construiu-Civiliza%C3%A7%C3%A3o/dp/9723013282",
            },
            {
              title: "A Caridade Cristã na História da Igreja",
              author: "Francisco Javier Fernández Chento",
              link: "https://www.amazon.com.br/caridade-crist%C3%A3-hist%C3%B3ria-Igreja/dp/8534938024",
            },
          ],
          tags: ["Riqueza", "Pobreza", "Doutrina Social", "História da Igreja"],
          stats: {
            readingTime: "15 min",
            difficulty: "Intermediário",
            lastUpdated: "2024-06-27",
            progress: 0,
          },
        },
      ],
    },
    {
      id: "objeccoes-praticas",
      title: "Objeções Práticas",
      description:
        "Respostas a objeções sobre aspectos práticos da vida e culto católicos",
      icon: "UserGroupIcon",
      stats: {
        totalTopics: 3,
        readingTime: "45 min",
        difficulty: "Intermediário",
        lastUpdated: "2024-06-27",
      },
      topics: [
        {
          id: 1,
          title: "Padres Deveriam Poder Casar?",
          description:
            "Resposta à objeção de que o celibato sacerdotal é não bíblico e prejudicial à Igreja",
          contentPath: "objeccoes-comuns/padres-deveriam-casar.md",
          references: [
            {
              title: "Catecismo da Igreja Católica §§ 1579-1580, 1599",
              author: "Igreja Católica",
              link: "https://www.vatican.va/archive/cathechism_po/index_new/p2s2cap3_1533-1666_po.html",
            },
            {
              title: "Presbyterorum Ordinis § 16",
              author: "Concílio Vaticano II",
              link: "https://www.vatican.va/archive/hist_councils/ii_vatican_council/documents/vat-ii_decree_19651207_presbyterorum-ordinis_po.html",
            },
            {
              title: "Sacerdotalis Caelibatus",
              author: "Papa Paulo VI",
              link: "https://www.vatican.va/content/paul-vi/it/encyclicals/documents/hf_p-vi_enc_24061967_sacerdotalis.html",
            },
            {
              title: "Pastores Dabo Vobis §§ 29, 50",
              author: "São João Paulo II",
              link: "https://www.vatican.va/content/john-paul-ii/pt/apost_exhortations/documents/hf_jp-ii_exh_25031992_pastores-dabo-vobis.html",
            },
            {
              title: "1 Coríntios 7,32-35",
              author: "São Paulo",
              link: "https://www.bibliacatolica.com.br/biblia-ave-maria/i-corintios/7/",
            },
            {
              title: "Mateus 19,12",
              author: "São Mateus",
              link: "https://www.bibliacatolica.com.br/biblia-ave-maria/sao-mateus/19/",
            },
          ],
          tags: ["Celibato", "Sacerdócio", "Vocação", "Disciplina"],
          stats: {
            readingTime: "15 min",
            difficulty: "Intermediário",
            lastUpdated: "2024-06-27",
            progress: 0,
          },
        },
        {
          id: 2,
          title: "A Missa é Apenas um Ritual Repetitivo?",
          description:
            "Resposta à crítica de que a missa católica é um ritual cerimonial vazio de significado",
          contentPath: "objeccoes-comuns/missa-ritual-repetitivo.md",
          references: [
            {
              title: "Catecismo da Igreja Católica §§ 1066-1112, 1345-1355",
              author: "Igreja Católica",
              link: "https://www.vatican.va/archive/cathechism_po/index_new/p2s1_1066-1209_po.html",
            },
            {
              title: "Sacrosanctum Concilium §§ 5-13, 47-58",
              author: "Concílio Vaticano II",
              link: "https://www.vatican.va/archive/hist_councils/ii_vatican_council/documents/vat-ii_const_19631204_sacrosanctum-concilium_po.html",
            },
            {
              title: "Ecclesia de Eucharistia §§ 11-20",
              author: "São João Paulo II",
              link: "https://www.vatican.va/content/john-paul-ii/pt/encyclicals/documents/hf_jp-ii_enc_20030417_eccl-de-euch.html",
            },
            {
              title: "A Missa e a Cruz",
              author: "Scott Hahn",
              link: "https://www.amazon.com.br/Missa-Cruz-Scott-Hahn/dp/8589820289",
            },
            {
              title: "Carta aos Esmirnianos 7",
              author: "Santo Inácio de Antioquia",
              link: "https://www.newadvent.org/fathers/0109.htm",
            },
            {
              title: "1 Coríntios 11,23-29",
              author: "São Paulo",
              link: "https://www.bibliacatolica.com.br/biblia-ave-maria/i-corintios/11/",
            },
          ],
          tags: ["Missa", "Liturgia", "Eucaristia", "Adoração"],
          stats: {
            readingTime: "15 min",
            difficulty: "Intermediário",
            lastUpdated: "2024-06-27",
            progress: 0,
          },
        },
        {
          id: 3,
          title: "A Igreja Mudou Muito – Ela Não é Mais a Mesma?",
          description:
            "Resposta à objeção de que mudanças na Igreja ao longo dos séculos comprometem sua identidade e autenticidade",
          contentPath: "igreja-mudou-muito.md",
          references: [
            {
              title: "Catecismo da Igreja Católica §§ 770-780, 857-865",
              author: "Igreja Católica",
              link: "https://www.vatican.va/archive/cathechism_po/index_new/p1s2cap3_748-975_po.html",
            },
            {
              title: "Lumen Gentium §§ 1-8",
              author: "Concílio Vaticano II",
              link: "https://www.vatican.va/archive/hist_councils/ii_vatican_council/documents/vat-ii_const_19641121_lumen-gentium_po.html",
            },
            {
              title: "Dei Verbum § 8",
              author: "Concílio Vaticano II",
              link: "https://www.vatican.va/archive/hist_councils/ii_vatican_council/documents/vat-ii_const_19651118_dei-verbum_po.html",
            },
            {
              title: "O Desenvolvimento da Doutrina Cristã",
              author: "Beato John Henry Newman",
              link: "https://www.amazon.com.br/Desenvolvimento-Doutrina-Cristã-John-Newman/dp/8534932107",
            },
            {
              title: "Mateus 16,18",
              author: "São Mateus",
              link: "https://www.bibliacatolica.com.br/biblia-ave-maria/sao-mateus/16/",
            },
            {
              title: "João 16,12-15",
              author: "São João",
              link: "https://www.bibliacatolica.com.br/biblia-ave-maria/sao-joao/16/",
            },
          ],
          tags: [
            "Tradição",
            "Desenvolvimento",
            "História da Igreja",
            "Continuidade",
          ],
          stats: {
            readingTime: "15 min",
            difficulty: "Intermediário",
            lastUpdated: "2024-06-27",
            progress: 0,
          },
        },
      ],
    },
  ],
};

