export interface SiteConfig {
  title: string;
  description: string;
  author: string;
  keywords: string[];
  social: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    youtube?: string;
  };
  contact: {
    email: string;
    address: string;
  };
  features: {
    comments: boolean;
    ratings: boolean;
    bookmarks: boolean;
    search: boolean;
  };
  theme: {
    primary: string;
    secondary: string;
    accent: string;
    dark: boolean;
  };
}

export const siteConfig: SiteConfig = {
  title: "Veritas Fidei",
  description: "Portal de estudos e discussões sobre a verdade da fé",
  author: "Equipe Veritas Fidei",
  keywords: [
    "apologética",
    "católica",
    "filosofia",
    "teologia",
    "fé",
    "igreja",
  ],
  social: {
    facebook: "https://facebook.com/apologetica-catolica",
    twitter: "https://twitter.com/apologetica-catolica",
    youtube: "https://youtube.com/apologetica-catolica",
  },
  contact: {
    email: "contato@apologetica-catolica.com",
    address: "São Paulo, SP - Brasil",
  },
  features: {
    comments: true,
    ratings: true,
    bookmarks: true,
    search: true,
  },
  theme: {
    primary: "#1E40AF",
    secondary: "#1E3A8A",
    accent: "#3B82F6",
    dark: true,
  },
};
