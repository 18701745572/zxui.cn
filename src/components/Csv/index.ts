import { App } from 'vue'
import Csv from './Csv.vue'

export { Csv }

export default {
  install(app: App) {
    app.component('zx-csv', Csv)
  }
} 