import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#17211b",
        leaf: "#167a58",
        mint: "#e9f7ef",
        sun: "#f7c948",
        coral: "#f46f5b",
      },
      boxShadow: {
        soft: "0 14px 36px rgba(23, 33, 27, 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
