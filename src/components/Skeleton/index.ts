import { App } from 'vue'
import Skeleton from './Skeleton.vue'

Skeleton.install = (app: App) => {
  app.component('ZxSkeleton', Skeleton)
}

export default Skeleton
export { Skeleton } 