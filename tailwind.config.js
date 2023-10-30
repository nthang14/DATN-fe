/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      'xs': '375px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '3xl': '1731px',
      '2xl': '1500px'
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    colors: {
      primary: "#64B334",
      "primary-01": "#F2F6F5",
      "primary-02": "#F2F9ED",
      "primary-03": "#E1F6D4",
      "primary-06": "#508F2A",
      "primary-09": "#14240A",
      error: "#B33434",
      "error-04": "#E0A0A0",
      secondary: "#071507",
      "secondary-02": "#E8F5E8",
      "secondary-09": "#071507",
      neutral: "#2A2D29",
      "neutral-03": "#ECECEC",
      "neutral-04": "#D8D8D8",
      "neutral-05": "#B5B6B3",
      "neutral-07": "#555754",
      "neutral-06": "#7F817F",
      "neutral-08": "#333433",
      "neutral-09": "#2A2D29",
      "pending-02": "#FFF9F0",
      "pending-01": "#E99414",
      "tertiary-01": "#1F6FA4",
      "tertiary-02": "#F2F8FC",
      white: "#FFFFFF",
      "secondary-01": "#236823",
      "tertiary-08": "#0C2C42"
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
  important: 'body'
};
