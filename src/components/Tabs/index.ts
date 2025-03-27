import { App } from 'vue'
import Tabs from './Tabs.vue'
import TabPane from './TabPane.vue'

Tabs.install = (app: App) => {
  app.component('ZxTabs', Tabs)
  app.component('ZxTabPane', TabPane)
}

export default Tabs
export { Tabs, TabPane } 