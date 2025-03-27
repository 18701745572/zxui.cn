import { App } from 'vue'
import Markdown from './Markdown.vue'

export { Markdown }

export default {
  install(app: App) {
    app.component('zx-markdown', Markdown)
  }
} 