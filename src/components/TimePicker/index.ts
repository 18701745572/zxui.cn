import { App } from 'vue'
import TimePicker from './TimePicker.vue'

TimePicker.install = (app: App) => {
  app.component('ZxTimePicker', TimePicker)
}

export default TimePicker 