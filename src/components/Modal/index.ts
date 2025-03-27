import type { App } from 'vue'
import Modal from './Modal.vue'

export { Modal }
export default {
  install(app: App) {
    app.component('ZxModal', Modal)
  }
} 