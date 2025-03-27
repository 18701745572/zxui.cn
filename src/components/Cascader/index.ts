import { App } from 'vue'
import Cascader from './Cascader.vue'

Cascader.install = (app: App) => {
  app.component('ZxCascader', Cascader)
}

export default Cascader 