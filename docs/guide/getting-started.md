# 快速开始

本节将介绍如何在项目中使用 ZXUI-CN。

## 安装

使用包管理器安装 ZXUI-CN：

```bash
# 使用 npm
npm install zxui-cn

# 使用 yarn
yarn add zxui-cn

# 使用 pnpm
pnpm add zxui-cn
```

## 完整引入

如果你对打包后的文件大小不是很在乎，可以完整引入所有组件：

```ts
// main.ts
import { createApp } from 'vue'
import ZXUI from 'zxui-cn'
import 'zxui-cn/style.css'
import App from './App.vue'

const app = createApp(App)
app.use(ZXUI)
app.mount('#app')
```

## 按需引入

如果你只希望引入部分组件，可以使用按需引入的方式：

```vue
<template>
  <zx-button type="primary">主要按钮</zx-button>
</template>

<script setup lang="ts">
import { ZButton } from 'zxui-cn'
import 'zxui-cn/style.css'
</script>
```

## TypeScript 支持

ZXUI-CN 使用 TypeScript 编写，提供完整的类型定义文件。

## 开始使用

现在你可以开始使用 ZXUI-CN 的组件了：

```vue
<template>
  <zx-button type="primary" @click="handleClick">点击我</zx-button>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const handleClick = () => {
  console.log('按钮被点击了！')
}
</script>
```

更多组件的使用方法请参考左侧的组件文档。 