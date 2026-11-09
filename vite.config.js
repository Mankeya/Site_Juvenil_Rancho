import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

// base './' mantém o site funcionando no GitHub Pages (subdiretório) e localmente
export default defineConfig({
  base: './',
  plugins: [tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        inscricao: resolve(import.meta.dirname, 'inscricao.html'),
      },
    },
  },
})
