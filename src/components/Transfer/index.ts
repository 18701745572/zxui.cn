import { App } from 'vue'
import Transfer from './Transfer.vue'

Transfer.install = (app: App) => {
  app.component('ZxTransfer', Transfer)
}

export default Transfer
export { Transfer } 