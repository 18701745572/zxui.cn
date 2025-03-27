import { createApp } from 'vue'
import App from './App.vue'
import ZXUI from '../src'
import './styles/index.scss'

const app = createApp(App)
app.use(ZXUI)
app.mount('#app') 