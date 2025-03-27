import { App } from 'vue'
import Tooltip from './Tooltip.vue'

export { Tooltip }

export default {
  install(app: App) {
    app.component('zx-tooltip', Tooltip)
  }
} 