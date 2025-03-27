import { App } from 'vue'
import Steps from './Steps.vue'
import Step from './Step.vue'

Steps.install = (app: App) => {
  app.component('ZxSteps', Steps)
  app.component('ZxStep', Step)
}

export default Steps
export { Step } 