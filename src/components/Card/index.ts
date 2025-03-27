import { App } from 'vue'
import Card from './Card.vue'

Card.install = (app: App) => {
  app.component('ZxCard', Card)
}

export default Card
export { Card } 