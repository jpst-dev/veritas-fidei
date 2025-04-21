/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          50: "rgb(var(--color-primary-50) / <alpha-value>)",
          100: "rgb(var(--color-primary-100) / <alpha-value>)",
          200: "rgb(var(--color-primary-200) / <alpha-value>)",
          300: "rgb(var(--color-primary-300) / <alpha-value>)",
          400: "rgb(var(--color-primary-400) / <alpha-value>)",
          500: "rgb(var(--color-primary-500) / <alpha-value>)",
          600: "rgb(var(--color-primary-600) / <alpha-value>)",
          700: "rgb(var(--color-primary-700) / <alpha-value>)",
          800: "rgb(var(--color-primary-800) / <alpha-value>)",
          900: "rgb(var(--color-primary-900) / <alpha-value>)",
        },
      },
      fontFamily: {
        sans: ["Inter var", "sans-serif"],
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      typography: {
        primary: {
          css: {
            "--tw-prose-body": "rgb(var(--color-primary-700) / 1)",
            "--tw-prose-headings": "rgb(var(--color-primary-900) / 1)",
            "--tw-prose-lead": "rgb(var(--color-primary-600) / 1)",
            "--tw-prose-links": "rgb(var(--color-primary-600) / 1)",
            "--tw-prose-bold": "rgb(var(--color-primary-900) / 1)",
            "--tw-prose-counters": "rgb(var(--color-primary-500) / 1)",
            "--tw-prose-bullets": "rgb(var(--color-primary-400) / 1)",
            "--tw-prose-hr": "rgb(var(--color-primary-200) / 1)",
            "--tw-prose-quotes": "rgb(var(--color-primary-900) / 1)",
            "--tw-prose-quote-borders": "rgb(var(--color-primary-300) / 1)",
            "--tw-prose-captions": "rgb(var(--color-primary-500) / 1)",
            "--tw-prose-code": "rgb(var(--color-primary-900) / 1)",
            "--tw-prose-pre-code": "rgb(var(--color-primary-100) / 1)",
            "--tw-prose-pre-bg": "rgb(var(--color-primary-900) / 1)",
            "--tw-prose-th-borders": "rgb(var(--color-primary-300) / 1)",
            "--tw-prose-td-borders": "rgb(var(--color-primary-200) / 1)",
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
