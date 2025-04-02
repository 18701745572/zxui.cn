import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [vue()],
  root: './',
  base: '/ds/',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('.', import.meta.url)),
      'vue': 'vue/dist/vue.esm-bundler.js'
    }
  },
  optimizeDeps: {
    include: ['vue']
  },
  build: {
    outDir: 'dist/ds',
    emptyOutDir: true,
    sourcemap: true,
    commonjsOptions: {
      include: [/node_modules/]
    }
  },
  server: {
    port: 5173,
    open: true
  }
}) 