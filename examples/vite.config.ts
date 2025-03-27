import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  root: './',
  base: '/',
  resolve: {
    alias: {
      '@': resolve(__dirname, '../src')
    }
  },
  optimizeDeps: {
    include: ['vue']
  },
  build: {
    commonjsOptions: {
      include: [/node_modules/]
    }
  },
  server: {
    port: 5173,
    open: true
  }
}) 