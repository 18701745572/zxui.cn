import { App } from 'vue'
import Timeline from './Timeline.vue'
import TimelineItem from './TimelineItem.vue'

Timeline.install = (app: App) => {
  app.component('ZxTimeline', Timeline)
  app.component('ZxTimelineItem', TimelineItem)
}

export default Timeline
export { Timeline, TimelineItem } 