import { App } from 'vue'
import Txt from './Txt.vue'

export { Txt }

export default {
  install(app: App) {
    app.component('zx-txt', Txt)
  }
} 