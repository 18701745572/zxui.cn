import { App } from 'vue'
import Radio from './Radio.vue'
import RadioGroup from './RadioGroup.vue'

Radio.install = (app: App) => {
  app.component('ZxRadio', Radio)
  app.component('ZxRadioGroup', RadioGroup)
}

export default Radio
export { Radio, RadioGroup } 