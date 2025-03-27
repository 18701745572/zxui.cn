import { App } from 'vue'
import Avatar from './Avatar.vue'

export { Avatar }

export default {
  install(app: App) {
    app.component('zx-avatar', Avatar)
  }
} 