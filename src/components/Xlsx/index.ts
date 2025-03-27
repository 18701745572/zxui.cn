import { App } from 'vue'
import Xlsx from './Xlsx.vue'

export { Xlsx }

export default {
  install(app: App) {
    app.component('zx-xlsx', Xlsx)
  }
} 