import { App } from 'vue'
import Audio from './Audio.vue'

export { Audio }

export default {
  install(app: App) {
    app.component('ZxAudio', Audio)
  }
} 