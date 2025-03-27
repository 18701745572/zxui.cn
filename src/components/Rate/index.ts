import { App } from 'vue'
import Rate from './Rate.vue'

Rate.install = (app: App) => {
  app.component('ZxRate', Rate)
}

export default Rate 