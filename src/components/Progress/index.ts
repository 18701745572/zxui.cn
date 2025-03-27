import { App } from 'vue'
import Progress from './Progress.vue'

Progress.install = (app: App) => {
  app.component('ZxProgress', Progress)
}

export default Progress
export { Progress } 