import { App } from 'vue'
import DateTimePicker from './DateTimePicker.vue'

DateTimePicker.install = (app: App) => {
  app.component('ZxDateTimePicker', DateTimePicker)
}

export default DateTimePicker 