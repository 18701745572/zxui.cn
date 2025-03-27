import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import * as components from './components'

const app = createApp(App)

// 注册所有组件
Object.entries(components).forEach(([name, component]) => {
  app.component(name, component)
})

app.mount('#app')
