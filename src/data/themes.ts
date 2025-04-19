export interface ThemeConfig {
  light: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
    accent: string;
  };
  dark: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
    accent: string;
  };
}

export const themeConfig: ThemeConfig = {
  light: {
    primary: "#4A90E2",
    secondary: "#F5A623",
    background: "#FFFFFF",
    text: "#333333",
    accent: "#50E3C2",
  },
  dark: {
    primary: "#64B5F6",
    secondary: "#FFB74D",
    background: "#121212",
    text: "#E0E0E0",
    accent: "#4DB6AC",
  },
};
