import { App } from 'vue'
import Xml from './Xml.vue'

export { Xml }

export default {
  install(app: App) {
    app.component('zx-xml', Xml)
  }
} 