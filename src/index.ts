import type { App } from 'vue'
import * as components from './components'

// 导入基础样式
import './styles/index.scss'

const installComponents = (app: App) => {
  Object.entries(components).forEach(([name, component]) => {
    if (component.install) {
      app.use(component)
    } else if (component.name) {
      app.component(component.name, component)
    }
  })
}

export default {
  install: (app: App) => {
    installComponents(app)
  }
}

export * from './components'