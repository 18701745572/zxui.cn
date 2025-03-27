import { App } from 'vue'
import ColorPicker from './ColorPicker.vue'

ColorPicker.install = (app: App) => {
  app.component('ZxColorPicker', ColorPicker)
}

export default ColorPicker
export { ColorPicker } 