import { App } from 'vue'
import Webview from './Webview.vue'

export { Webview }

export default {
  install(app: App) {
    app.component('zx-webview', Webview)
  }
} 