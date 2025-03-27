import { App } from 'vue'
import Video from './Video.vue'

export { Video }

export default {
  install(app: App) {
    app.component('zx-video', Video)
  }
} 