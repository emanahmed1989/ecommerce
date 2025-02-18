/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html',
    './src/**/*.{jsx,js,ts,tsx}'


  ],
  theme: {
    extend: {
      colors:{
        active:"#0aad0a",
        main:"#0aad0a"
      }
    },
  },
  darkMode:"selector",
  plugins: [],
}

