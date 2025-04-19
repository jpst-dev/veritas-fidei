export interface SEOConfig {
  title: string;
  description: string;
  keywords: string[];
  og: {
    title: string;
    description: string;
    type: string;
    image: string;
    url: string;
  };
  twitter: {
    card: string;
    title: string;
    description: string;
    image: string;
  };
}

export const seoConfig: SEOConfig = {
  title: "Veritas Fidei - Portal de Estudos e Discussões",
  description:
    "Explore artigos, estudos e discussões sobre a verdade da fé, filosofia, teologia e apologética católica.",
  keywords: [
    "veritas fidei",
    "verdade da fé",
    "apologética",
    "filosofia",
    "teologia",
    "fé cristã",
    "estudos bíblicos",
    "doutrina católica",
  ],
  og: {
    title: "Veritas Fidei - Portal de Estudos e Discussões",
    description:
      "Explore artigos, estudos e discussões sobre a verdade da fé, filosofia, teologia e apologética católica.",
    type: "website",
    image: "/images/og-image.jpg",
    url: "https://veritas-fidei.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Veritas Fidei - Portal de Estudos e Discussões",
    description:
      "Explore artigos, estudos e discussões sobre a verdade da fé, filosofia, teologia e apologética católica.",
    image: "/images/twitter-image.jpg",
  },
};
