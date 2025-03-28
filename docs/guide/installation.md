# 安装

## 环境要求

- Node.js >= 16
- Vue >= 3.3

## 使用包管理器

### pnpm（推荐）

```bash
# 安装
pnpm add zxui-cn

# 安装开发依赖（如果需要 TypeScript 支持）
pnpm add @types/node typescript -D
```

### npm

```bash
# 安装
npm install zxui-cn

# 安装开发依赖（如果需要 TypeScript 支持）
npm install @types/node typescript -D
```

### yarn

```bash
# 安装
yarn add zxui-cn

# 安装开发依赖（如果需要 TypeScript 支持）
yarn add @types/node typescript -D
```

## 完整引入

```ts
// main.ts
import { createApp } from 'vue'
import ZXUI from 'zxui-cn'
import 'zxui-cn/dist/style.css'
import App from './App.vue'

const app = createApp(App)
app.use(ZXUI)
app.mount('#app')
```

## 按需引入（推荐）

使用 `unplugin-vue-components` 实现自动按需引入：

1. 安装插件：

```bash
pnpm add -D unplugin-vue-components
```

2. 配置 Vite：

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import Components from 'unplugin-vue-components/vite'
import { ZXUIResolver } from 'zxui-cn/resolver'

export default defineConfig({
  plugins: [
    Components({
      resolvers: [ZXUIResolver()]
    })
  ]
})
```

3. 直接在模板中使用组件：

```vue
<template>
  <zx-button type="primary">按钮</zx-button>
</template>
```

## CDN 引入

```html
<head>
  <!-- 引入样式 -->
  <link rel="stylesheet" href="//unpkg.com/zxui-cn/dist/style.css">
</head>
<body>
  <div id="app">
    <zx-button type="primary">按钮</zx-button>
  </div>
  <!-- 引入 Vue 3 -->
  <script src="//unpkg.com/vue@3"></script>
  <!-- 引入组件库 -->
  <script src="//unpkg.com/zxui-cn"></script>
  <script>
    const app = Vue.createApp({})
    app.use(ZXUI)
    app.mount('#app')
  </script>
</body>
```

## TypeScript 支持

1. 确保 `tsconfig.json` 包含以下配置：

```json
{
  "compilerOptions": {
    "types": ["zxui-cn/types"]
  }
}
```

2. 如果使用 Volar，在 `tsconfig.json` 中添加：

```json
{
  "vueCompilerOptions": {
    "target": 3.3
  }
}
```

## 验证安装

创建一个 Vue 组件来验证安装是否成功：

```vue
<template>
  <div>
    <zx-button type="primary">主要按钮</zx-button>
    <zx-button type="success">成功按钮</zx-button>
    <zx-button type="warning">警告按钮</zx-button>
    <zx-button type="danger">危险按钮</zx-button>
  </div>
</template>

<script setup lang="ts">
// 使用自动按需引入时，无需手动导入组件
</script>
```

## 常见问题

### 样式丢失

确保已经正确导入了样式文件：

```ts
// main.ts
import 'zxui-cn/dist/style.css'
```

### 类型报错

如果遇到类型报错，检查：

1. 是否安装了 TypeScript 相关依赖
2. `tsconfig.json` 是否正确配置
3. IDE 是否安装了 Volar 插件（如果使用 VS Code）

### 按需引入失效

1. 检查 Vite 配置是否正确
2. 确保组件名称使用正确（以 `zx-` 开头）
3. 尝试清除缓存并重新运行开发服务器：

```bash
# 清除依赖缓存
pnpm clear

# 重新安装依赖
pnpm install

# 启动开发服务器
pnpm dev
``` 