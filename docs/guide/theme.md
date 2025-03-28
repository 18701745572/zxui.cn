# 主题定制

ZXUI CN 提供了一套完整的主题系统。组件库默认包含了所有必要的 CSS 变量，您无需额外配置即可使用。同时，您也可以通过覆盖这些变量来自定义主题。

## 默认主题

组件库内置了一套默认的主题变量，这些变量会在您引入样式文件时自动生效：

```ts
import 'zxui-cn/dist/style.css'
```

### 内置变量

以下是组件库内置的主题变量：

```css
:root {
  /* 品牌色 */
  --z-primary-color: #409eff;
  --z-success-color: #67c23a;
  --z-warning-color: #e6a23c;
  --z-danger-color: #f56c6c;
  --z-info-color: #909399;

  /* 主色衍生色 */
  --z-primary-color-light: #66b1ff;
  --z-success-color-light: #85ce61;
  --z-warning-color-light: #ebb563;
  --z-danger-color-light: #f78989;

  /* 文字颜色 */
  --z-text-color-primary: #303133;
  --z-text-color-regular: #606266;
  --z-text-color-secondary: #909399;
  --z-text-color-placeholder: #c0c4cc;

  /* 边框颜色 */
  --z-border-color: #dcdfe6;
  --z-border-color-light: #e4e7ed;
  --z-border-color-lighter: #ebeef5;
  --z-border-color-extra-light: #f2f6fc;

  /* 背景颜色 */
  --z-bg-color: #ffffff;
  --z-bg-color-page: #f2f3f5;

  /* 圆角 */
  --z-border-radius-base: 4px;
  --z-border-radius-small: 2px;
  --z-border-radius-round: 20px;
  --z-border-radius-circle: 100%;

  /* 字体大小 */
  --z-font-size-extra-large: 20px;
  --z-font-size-large: 18px;
  --z-font-size-medium: 16px;
  --z-font-size-base: 14px;
  --z-font-size-small: 13px;
  --z-font-size-extra-small: 12px;

  /* 间距 */
  --z-spacing-extra-large: 24px;
  --z-spacing-large: 16px;
  --z-spacing-base: 12px;
  --z-spacing-small: 8px;
  --z-spacing-extra-small: 4px;
}
```

## 自定义主题

### 方式一：覆盖 CSS 变量

最简单的自定义主题方式是直接覆盖 CSS 变量。您可以在全局样式文件中添加：

```css
:root {
  --z-primary-color: #1890ff; /* 修改主题色 */
  --z-border-radius-base: 2px; /* 修改圆角 */
  /* 覆盖其他变量... */
}
```

### 方式二：动态修改主题

您也可以通过 JavaScript 动态修改 CSS 变量：

```ts
// 修改单个变量
document.documentElement.style.setProperty('--z-primary-color', '#1890ff');

// 批量修改变量
const theme = {
  '--z-primary-color': '#1890ff',
  '--z-success-color': '#52c41a',
  '--z-warning-color': '#faad14',
  '--z-danger-color': '#f5222d'
};

Object.entries(theme).forEach(([key, value]) => {
  document.documentElement.style.setProperty(key, value);
});
```

## 暗黑模式

组件库内置了暗黑模式支持，暗黑模式下的样式变量也已经预设好，您只需要在根元素添加 `dark` 类名即可启用：

```ts
// 启用暗黑模式
document.documentElement.classList.add('dark');

// 关闭暗黑模式
document.documentElement.classList.remove('dark');
```

暗黑模式下的默认变量：

```css
:root.dark {
  /* 背景颜色 */
  --z-bg-color: #141414;
  --z-bg-color-page: #0a0a0a;

  /* 文字颜色 */
  --z-text-color-primary: #E5EAF3;
  --z-text-color-regular: #CFD3DC;
  --z-text-color-secondary: #A3A6AD;
  --z-text-color-placeholder: #8D9095;

  /* 边框颜色 */
  --z-border-color: #4C4D4F;
  --z-border-color-light: #414243;
  --z-border-color-lighter: #363637;
  --z-border-color-extra-light: #2B2B2C;
}
```

## 最佳实践

### 1. 主题切换功能

```vue
<template>
  <div class="theme-config">
    <div class="theme-mode">
      <span>主题模式：</span>
      <zx-button @click="toggleTheme">
        {{ isDark ? '切换到亮色模式' : '切换到暗黑模式' }}
      </zx-button>
    </div>
    
    <div class="theme-color">
      <span>主题色：</span>
      <input 
        type="color" 
        v-model="primaryColor"
        @change="updateThemeColor"
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isDark = ref(false)
const primaryColor = ref('#409eff')

const toggleTheme = () => {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark', isDark.value)
}

const updateThemeColor = () => {
  document.documentElement.style.setProperty('--z-primary-color', primaryColor.value)
}
</script>

<style scoped>
.theme-config {
  padding: 20px;
  border: 1px solid var(--z-border-color);
  border-radius: var(--z-border-radius-base);
}

.theme-mode,
.theme-color {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.theme-color input {
  width: 40px;
  height: 40px;
  padding: 0;
  border: 1px solid var(--z-border-color);
  border-radius: var(--z-border-radius-base);
  cursor: pointer;
}
</style>
```

### 2. 主题配置文件

推荐创建一个独立的主题配置文件来管理自定义主题：

```ts
// theme.ts
export const lightTheme = {
  '--z-primary-color': '#1890ff',
  '--z-success-color': '#52c41a',
  '--z-warning-color': '#faad14',
  '--z-danger-color': '#f5222d'
}

export const darkTheme = {
  '--z-primary-color': '#177ddc',
  '--z-success-color': '#49aa19',
  '--z-warning-color': '#d89614',
  '--z-danger-color': '#dc4446'
}

export function applyTheme(theme: Record<string, string>) {
  Object.entries(theme).forEach(([key, value]) => {
    document.documentElement.style.setProperty(key, value)
  })
}
```

使用主题配置：

```ts
import { lightTheme, darkTheme, applyTheme } from './theme'

// 应用亮色主题
applyTheme(lightTheme)

// 应用暗色主题
applyTheme(darkTheme)
```

## 组件级别的主题定制

您可以通过CSS变量为单个组件实例设置样式：

```vue
<template>
  <zx-button class="custom-button">自定义按钮</zx-button>
</template>

<style>
.custom-button {
  --z-button-height: 40px;
  --z-button-padding: 0 24px;
  --z-button-font-size: 16px;
}
</style>
```
