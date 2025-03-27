import { App } from 'vue'
import Json from './Json.vue'

export { Json }

export default {
  install(app: App) {
    app.component('zx-json', Json)
  }
} 