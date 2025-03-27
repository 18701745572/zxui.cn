import { App } from 'vue'
import Form from './Form.vue'
import FormItem from './FormItem.vue'

Form.install = (app: App) => {
  app.component('ZxForm', Form)
  app.component('ZxFormItem', FormItem)
}

export default Form
export { FormItem } 