import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { cpSync, existsSync } from 'node:fs'

// base './' mantém o site funcionando no GitHub Pages (subdiretório) e localmente
export default defineConfig({
  base: './',
  plugins: [
    tailwindcss(),
    {
      name: 'copy-optional-video',
      closeBundle() {
        const videoDirectory = resolve(import.meta.dirname, 'assets/video')
        if (existsSync(videoDirectory)) {
          cpSync(videoDirectory, resolve(import.meta.dirname, 'dist/assets/video'), {
            recursive: true,
            filter: (source) => !source.endsWith('.gitkeep'),
          })
        }
      },
    },
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        inscricao: resolve(import.meta.dirname, 'inscricao.html'),
      },
    },
  },
})
