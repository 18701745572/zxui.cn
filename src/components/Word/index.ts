import { App } from 'vue'
import Word from './Word.vue'

export { Word }

export default {
  install(app: App) {
    app.component('zx-word', Word)
  }
} 