import { App } from 'vue'
import InputNumber from './InputNumber.vue'

export { InputNumber }

export default {
  install(app: App) {
    app.component('zx-input-number', InputNumber)
  }
} 