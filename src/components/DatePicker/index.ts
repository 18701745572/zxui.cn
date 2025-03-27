import { App } from 'vue'
import DatePicker from './DatePicker.vue'

DatePicker.install = (app: App) => {
  app.component('ZxDatePicker', DatePicker)
}

export default DatePicker
export { DatePicker } 