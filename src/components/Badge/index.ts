import { App } from 'vue'
import Badge from './Badge.vue'

Badge.install = (app: App) => {
  app.component('ZxBadge', Badge)
}

export default Badge
export { Badge } 