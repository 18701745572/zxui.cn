import { App } from 'vue'
import Drawer from './Drawer.vue'

Drawer.install = (app: App) => {
  app.component('ZxDrawer', Drawer)
}

export default Drawer
export { Drawer } 