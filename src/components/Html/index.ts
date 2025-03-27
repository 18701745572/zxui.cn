import { App } from 'vue'
import Html from './Html.vue'

export { Html }

export default {
  install(app: App) {
    app.component('zx-html', Html)
  }
} 