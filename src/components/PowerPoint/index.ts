import { App } from 'vue'
import PowerPoint from './PowerPoint.vue'

export { PowerPoint }

export default {
  install(app: App) {
    app.component('zx-powerpoint', PowerPoint)
  }
} 