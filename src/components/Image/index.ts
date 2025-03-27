import { App } from 'vue'
import Image from './Image.vue'

export { Image }

export default {
  install(app: App) {
    app.component('zx-image', Image)
  }
} 