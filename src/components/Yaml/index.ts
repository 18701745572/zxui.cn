import { App } from 'vue'
import Yaml from './Yaml.vue'

export { Yaml }

export default {
  install(app: App) {
    app.component('zx-yaml', Yaml)
  }
} 