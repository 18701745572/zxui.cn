# ZXUI-CN

一个基于 Vue 3 的现代化 UI 组件库。

## 特性

- 🚀 基于 Vue 3 和 TypeScript 开发
- 📦 开箱即用的高质量组件
- 🎨 可定制的主题
- 📝 详细的文档和示例

## 安装

```bash
npm install zxui-cn
# 或
yarn add zxui-cn
# 或
pnpm add zxui-cn
```

## 使用

```vue
import { createApp } from 'vue'
import ZXUI from 'zxui-cn'
import 'zxui-cn/style.css'

const app = createApp(App)
app.use(ZXUI)
app.mount('#app')
```

## 文档

访问我们的[在线文档](https://zxui.cn)了解更多信息。

## 开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建组件库
npm run build

# 运行测试
npm run test

# 启动文档开发服务器
npm run docs:dev
```

## License

[MIT](./LICENSE)
