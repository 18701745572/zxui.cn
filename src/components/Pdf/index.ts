import { App } from 'vue'
import Pdf from './Pdf.vue'

export { Pdf }

export default {
  install(app: App) {
    app.component('zx-pdf', Pdf)
  }
} 