import { App } from 'vue'
import Select from './Select.vue'
import Option from './Option.vue'

Select.install = (app: App) => {
  app.component('ZxSelect', Select)
  app.component('ZxOption', Option)
}

export default Select
export { Select, Option } 