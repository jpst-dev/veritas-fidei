export interface Tag {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}

export interface TaggedItem {
  categoryId: string;
  subcategoryId?: string;
  tags: string[];
}

export const tags: Tag[] = [
  {
    id: "biblia",
    name: "Bíblia",
    description: "Tópicos relacionados à Sagrada Escritura",
    icon: "BookOpenIcon",
    color: "blue",
  },
  {
    id: "tradicao",
    name: "Tradição",
    description: "Tópicos relacionados à Sagrada Tradição",
    icon: "AcademicCapIcon",
    color: "purple",
  },
  {
    id: "magisterio",
    name: "Magistério",
    description: "Tópicos relacionados ao Magistério da Igreja",
    icon: "ScaleIcon",
    color: "green",
  },
  {
    id: "historia",
    name: "História",
    description: "Tópicos históricos da Igreja",
    icon: "ClockIcon",
    color: "amber",
  },
  {
    id: "doutrina",
    name: "Doutrina",
    description: "Tópicos doutrinários",
    icon: "AcademicCapIcon",
    color: "red",
  },
  {
    id: "moral",
    name: "Moral",
    description: "Tópicos de moral católica",
    icon: "ScaleIcon",
    color: "indigo",
  },
  {
    id: "liturgia",
    name: "Liturgia",
    description: "Tópicos litúrgicos",
    icon: "GiftIcon",
    color: "emerald",
  },
  {
    id: "sacramentos",
    name: "Sacramentos",
    description: "Tópicos sobre os sacramentos",
    icon: "GiftIcon",
    color: "cyan",
  },
];

export const taggedItems: TaggedItem[] = [
  // Escritura vs Tradição
  {
    categoryId: "escritura-tradicao",
    tags: ["biblia", "tradicao", "magisterio", "doutrina"],
  },
  {
    categoryId: "escritura-tradicao",
    subcategoryId: "sola-scriptura",
    tags: ["biblia", "tradicao", "doutrina"],
  },
  {
    categoryId: "escritura-tradicao",
    subcategoryId: "interpretacao-biblica",
    tags: ["biblia", "magisterio", "doutrina"],
  },
  {
    categoryId: "escritura-tradicao",
    subcategoryId: "desenvolvimento-doutrinal",
    tags: ["tradicao", "historia", "doutrina"],
  },

  // Papado e Sucessão Apostólica
  {
    categoryId: "papado",
    tags: ["historia", "doutrina", "magisterio"],
  },
  {
    categoryId: "papado",
    subcategoryId: "primado-pedro",
    tags: ["biblia", "historia", "doutrina"],
  },
  {
    categoryId: "papado",
    subcategoryId: "infalibilidade",
    tags: ["doutrina", "magisterio"],
  },
  {
    categoryId: "papado",
    subcategoryId: "historia-papado",
    tags: ["historia", "doutrina"],
  },

  // Maria e os Santos
  {
    categoryId: "maria-santos",
    tags: ["doutrina", "biblia", "tradicao"],
  },
  {
    categoryId: "maria-santos",
    subcategoryId: "imaculada",
    tags: ["doutrina", "biblia", "tradicao"],
  },
  {
    categoryId: "maria-santos",
    subcategoryId: "assuncao",
    tags: ["doutrina", "tradicao"],
  },
  {
    categoryId: "maria-santos",
    subcategoryId: "intercessao",
    tags: ["doutrina", "biblia", "moral"],
  },

  // Eucaristia e Sacramentos
  {
    categoryId: "eucaristia",
    tags: ["sacramentos", "liturgia", "doutrina"],
  },
  {
    categoryId: "eucaristia",
    subcategoryId: "presenca-real",
    tags: ["sacramentos", "doutrina", "biblia"],
  },
  {
    categoryId: "eucaristia",
    subcategoryId: "transubstanciacao",
    tags: ["sacramentos", "doutrina"],
  },
  {
    categoryId: "eucaristia",
    subcategoryId: "sacrificio-missa",
    tags: ["sacramentos", "liturgia", "doutrina"],
  },
];
