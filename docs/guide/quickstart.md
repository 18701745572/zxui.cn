# 快速开始

本节将介绍如何在项目中使用 ZXUI CN。

## 创建项目

推荐使用 Vite 创建 Vue 3 项目：

```bash
# npm
npm create vite@latest my-vue-app -- --template vue-ts

# yarn
yarn create vite my-vue-app --template vue-ts

# pnpm
pnpm create vite my-vue-app -- --template vue-ts
```

## 安装依赖

进入项目目录，安装依赖：

```bash
cd my-vue-app
pnpm install
pnpm add zxui-cn
pnpm add -D unplugin-vue-components
```

## 配置项目

1. 配置 Vite（按需引入）：

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { ZXUIResolver } from 'zxui-cn/resolver'

export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [ZXUIResolver()]
    })
  ]
})
```

2. 配置 TypeScript：

```json
// tsconfig.json
{
  "compilerOptions": {
    "types": ["zxui-cn/types"]
  }
}
```

## 基础示例

1. 修改 `src/App.vue`：

```vue
<template>
  <zx-space>
    <zx-button>默认按钮</zx-button>
    <zx-button type="primary">主要按钮</zx-button>
    <zx-button type="success">成功按钮</zx-button>
    <zx-button type="warning">警告按钮</zx-button>
    <zx-button type="danger">危险按钮</zx-button>
  </zx-space>

  <zx-space direction="vertical">
    <zx-input v-model="input" placeholder="请输入内容" />
    <zx-input
      v-model="password"
      type="password"
      placeholder="请输入密码"
      show-password
    />
  </zx-space>

  <zx-form :model="form" :rules="rules" ref="formRef">
    <zx-form-item prop="name" label="姓名">
      <zx-input v-model="form.name" placeholder="请输入姓名" />
    </zx-form-item>
    <zx-form-item prop="email" label="邮箱">
      <zx-input v-model="form.email" placeholder="请输入邮箱" />
    </zx-form-item>
    <zx-form-item>
      <zx-button type="primary" @click="handleSubmit">提交</zx-button>
      <zx-button @click="handleReset">重置</zx-button>
    </zx-form-item>
  </zx-form>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 输入框示例数据
const input = ref('')
const password = ref('')

// 表单示例数据
const formRef = ref()
const form = ref({
  name: '',
  email: ''
})

const rules = {
  name: [
    { required: true, message: '请输入姓名', trigger: 'blur' },
    { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
  ]
}

const handleSubmit = async () => {
  if (!formRef.value) return
  try {
    await formRef.value.validate()
    console.log('表单验证通过', form.value)
  } catch (error) {
    console.error('表单验证失败', error)
  }
}

const handleReset = () => {
  if (!formRef.value) return
  formRef.value.resetFields()
}
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.demo-section {
  margin-bottom: 40px;
}

h1 {
  text-align: center;
  margin-bottom: 40px;
}

h2 {
  margin-bottom: 20px;
}
</style>
```

2. 修改 `src/style.css`：

```css
:root {
  --zx-primary-color: #1890ff;
  --zx-success-color: #52c41a;
  --zx-warning-color: #faad14;
  --zx-error-color: #f5222d;
}

body {
  margin: 0;
  min-height: 100vh;
  background-color: #f5f5f5;
}

#app {
  padding: 20px;
}
```

## 启动项目

```bash
pnpm dev
```

访问 `http://localhost:5173` 查看效果。

## 下一步

- 查看[组件文档](/components/button)了解更多组件的使用方法
- 了解[主题定制](/guide/theme)来自定义组件样式
- 探索[示例](/examples/form)获取更多使用灵感

## 贡献代码

如果你发现了 bug 或者有新的想法，欢迎：

1. [提交 Issue](https://github.com/your-repo/zxui-cn/issues/new)
2. [提交 Pull Request](https://github.com/your-repo/zxui-cn/pulls)

详细信息请参考[贡献指南](/guide/contributing)。

## 安装

使用包管理器安装：

```bash
# 使用 npm
npm install zxui-cn

# 使用 yarn
yarn add zxui-cn

# 使用 pnpm
pnpm add zxui-cn
```

## 使用

### 完整引入

```ts
// main.ts
import { createApp } from 'vue'
import ZXUI from 'zxui-cn'
import 'zxui-cn/dist/style.css'  // 引入样式文件，包含了默认主题
import App from './App.vue'

const app = createApp(App)
app.use(ZXUI)
app.mount('#app')
```

### 按需引入

使用 `unplugin-vue-components` 实现自动导入：

```bash
npm install -D unplugin-vue-components
```

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

> 注意：使用自动导入时，仍然需要手动引入样式文件：
> ```ts
> import 'zxui-cn/dist/style.css'
> ```

## 基本使用

组件库内置了一套默认的主题变量，您无需额外配置即可使用：

```vue
<template>
  <zx-button type="primary">主要按钮</zx-button>
  <zx-button type="success">成功按钮</zx-button>
  <zx-input v-model="input" placeholder="请输入" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const input = ref('')
</script>
```

### 主题定制

组件库默认包含了所有必要的 CSS 变量，您可以通过覆盖这些变量来自定义主题：

```css
/* 在您的全局样式文件中 */
:root {
  --z-primary-color: #1890ff; /* 修改主题色 */
  --z-border-radius-base: 2px; /* 修改圆角 */
}
```

### 暗黑模式

组件库内置了暗黑模式支持，只需要在根元素添加 `dark` 类名即可启用：

```ts
// 启用暗黑模式
document.documentElement.classList.add('dark')

// 关闭暗黑模式
document.documentElement.classList.remove('dark')
```

示例：

```vue
<template>
  <div class="theme-switch">
    <zx-button @click="toggleTheme">
      切换主题
    </zx-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isDark = ref(false)

const toggleTheme = () => {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark', isDark.value)
}
</script>
```

更多主题定制选项，请参考[主题定制](/guide/theme)章节。

## TypeScript 支持

组件库提供了完整的 TypeScript 类型定义，确保在 `tsconfig.json` 中包含以下配置：

```json
{
  "compilerOptions": {
    "types": ["zxui-cn/types"]
  }
}
```