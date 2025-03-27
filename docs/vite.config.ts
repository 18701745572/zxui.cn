import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  server: {
    fs: {
      strict: true
    }
  },
  resolve: {
    alias: {
      '@': '/src',
      '/images': resolve(__dirname, 'public/images')
    }
  },
  optimizeDeps: {
    include: ['vue', '@vueuse/core']
  },
  css: {
    preprocessorOptions: {
      scss: {
        charset: false
      }
    }
  }
}) 