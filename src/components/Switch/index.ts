import { App } from 'vue'
import Switch from './Switch.vue'

Switch.install = (app: App) => {
  app.component('ZxSwitch', Switch)
}

export default Switch
export { Switch } 