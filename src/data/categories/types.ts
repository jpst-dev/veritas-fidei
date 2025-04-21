export interface Reference {
  title: string;
  author: string;
  link: string;
}

export interface Stats {
  totalTopics?: number;
  readingTime: string;
  difficulty: "Iniciante" | "Intermediário" | "Avançado";
  lastUpdated: string;
  progress?: number;
}

export interface Topic {
  id: number;
  title: string;
  description: string;
  content?: string;
  contentPath?: string;
  references: Reference[];
  tags: string[];
  stats: Stats;
}

export interface Subcategory {
  id: string;
  title: string;
  description: string;
  icon: string;
  stats: Stats;
  topics: Topic[];
}

export interface Category {
  id: string;
  title: string;
  description: string;
  icon: string;
  stats: Stats;
  tags: string[];
  subcategories: Subcategory[];
}
