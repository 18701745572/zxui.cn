import type { App } from 'vue'
import Button from './Button.vue'

export { Button }
export default {
  install(app: App) {
    app.component('ZxButton', Button)
  }
} 