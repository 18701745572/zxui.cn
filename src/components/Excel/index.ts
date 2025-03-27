import { App } from 'vue'
import Excel from './Excel.vue'

export { Excel }

export default {
  install(app: App) {
    app.component('zx-excel', Excel)
  }
} 