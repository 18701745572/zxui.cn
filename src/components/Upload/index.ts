import { App } from 'vue'
import Upload from './Upload.vue'

Upload.install = (app: App) => {
  app.component('ZxUpload', Upload)
}

export default Upload
export { Upload } 