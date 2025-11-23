module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "white",
          dark: "#111827",
        },
        foreground: {
          DEFAULT: "black",
          dark: "#f9fafb",
        },
      },
    },
  },
  plugins: [],
};
