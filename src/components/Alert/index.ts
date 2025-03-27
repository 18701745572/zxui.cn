import { App } from 'vue'
import Alert from './Alert.vue'

Alert.install = (app: App) => {
  app.component('ZxAlert', Alert)
}

export default Alert
export { Alert } 