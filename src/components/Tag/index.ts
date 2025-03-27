import { App } from 'vue'
import Tag from './Tag.vue'

Tag.install = (app: App) => {
  app.component('ZxTag', Tag)
}

export default Tag
export { Tag } 