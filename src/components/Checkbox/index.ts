import { App } from 'vue'
import Checkbox from './Checkbox.vue'
import CheckboxGroup from './CheckboxGroup.vue'

Checkbox.install = (app: App) => {
  app.component('ZxCheckbox', Checkbox)
  app.component('ZxCheckboxGroup', CheckboxGroup)
}

export default Checkbox
export { Checkbox, CheckboxGroup } 