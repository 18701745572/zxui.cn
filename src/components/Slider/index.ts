import { App } from 'vue'
import Slider from './Slider.vue'

Slider.install = (app: App) => {
  app.component('ZxSlider', Slider)
}

export default Slider 