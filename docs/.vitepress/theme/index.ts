import DefaultTheme from 'vitepress/theme'
import ZXUI from '../../../src/index'
import '../../../src/styles/index.scss'
import './custom.css'

if (typeof window !== 'undefined') {
  const meta = document.createElement('meta')
  meta.httpEquiv = 'Content-Type'
  meta.content = 'text/html; charset=utf-8'
  document.head.appendChild(meta)
}

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.use(ZXUI)
  }
} 