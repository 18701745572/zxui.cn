# 主题定制

ZXUI CN 提供了灵活的主题定制能力，你可以通过 CSS 变量、主题切换和组件样式覆盖来实现自定义主题。

## CSS 变量

ZXUI CN 使用 CSS 变量来定义主题样式，你可以通过覆盖这些变量来自定义主题：

```css
:root {
  /* 主题色 */
  --zx-primary-color: #1890ff;
  --zx-success-color: #52c41a;
  --zx-warning-color: #faad14;
  --zx-error-color: #f5222d;
  
  /* 文字颜色 */
  --zx-text-color-primary: #303133;
  --zx-text-color-regular: #606266;
  --zx-text-color-secondary: #909399;
  --zx-text-color-placeholder: #c0c4cc;
  
  /* 边框颜色 */
  --zx-border-color: #dcdfe6;
  --zx-border-color-light: #e4e7ed;
  
  /* 背景颜色 */
  --zx-bg-color: #ffffff;
  --zx-bg-color-page: #f5f5f5;
  
  /* 字体大小 */
  --zx-font-size-extra-large: 20px;
  --zx-font-size-large: 18px;
  --zx-font-size-medium: 16px;
  --zx-font-size-base: 14px;
  --zx-font-size-small: 13px;
  --zx-font-size-extra-small: 12px;
  
  /* 边框圆角 */
  --zx-border-radius-base: 4px;
  --zx-border-radius-small: 2px;
  --zx-border-radius-round: 20px;
  --zx-border-radius-circle: 100%;
  
  /* 间距 */
  --zx-spacing-extra-large: 24px;
  --zx-spacing-large: 16px;
  --zx-spacing-medium: 12px;
  --zx-spacing-base: 8px;
  --zx-spacing-small: 4px;
}
```

## 主题切换

### 明暗主题

ZXUI CN 支持明暗主题切换，你可以通过添加 `dark` 类名来启用暗色主题：

```ts
// 启用暗色主题
document.documentElement.classList.add('dark')

// 禁用暗色主题
document.documentElement.classList.remove('dark')
```

暗色主题的 CSS 变量定义：

```css
.dark {
  --zx-bg-color: #1a1a1a;
  --zx-bg-color-page: #141414;
  --zx-text-color-primary: #ffffff;
  --zx-text-color-regular: #e5e5e5;
  --zx-text-color-secondary: #a3a3a3;
  --zx-border-color: #4c4c4c;
  --zx-border-color-light: #363636;
}
```

### 动态主题

你可以通过动态修改 CSS 变量来实现主题切换：

```ts
// 修改主题色
document.documentElement.style.setProperty('--zx-primary-color', '#f5222d')

// 批量修改主题变量
const theme = {
  '--zx-primary-color': '#f5222d',
  '--zx-success-color': '#52c41a',
  '--zx-warning-color': '#faad14',
  '--zx-error-color': '#ff4d4f'
}

Object.entries(theme).forEach(([key, value]) => {
  document.documentElement.style.setProperty(key, value)
})
```

## 组件样式自定义

### 全局样式覆盖

你可以在全局样式文件中覆盖组件的默认样式：

```css
/* 修改所有按钮的圆角 */
.z-button {
  border-radius: 8px;
}

/* 修改主要按钮的背景色 */
.z-button--primary {
  background-color: #722ed1;
}
```

### 局部样式覆盖

使用 `scoped` 和 `:deep()` 选择器来修改特定组件的样式：

```vue
<template>
  <div class="custom-form">
    <zx-form>
      <zx-form-item>
        <zx-input />
      </z-form-item>
    </z-form>
  </div>
</template>

<style scoped>
.custom-form :deep(.z-input) {
  /* 自定义输入框样式 */
  border-radius: 8px;
}

.custom-form :deep(.z-input:focus) {
  /* 自定义输入框聚焦状态 */
  border-color: #722ed1;
  box-shadow: 0 0 0 2px rgba(114, 46, 209, 0.2);
}
</style>
```

### 组件属性定制

许多组件提供了样式相关的属性，你可以通过这些属性来自定义组件的外观：

```vue
<template>
  <!-- 自定义按钮样式 -->
  <zx-button
    :style="{ 
      '--zx-button-font-weight': 600,
      '--zx-button-border-radius': '8px'
    }"
    type="primary"
  >
    自定义按钮
  </zx-button>
  
  <!-- 自定义输入框样式 -->
  <zx-input
    :style="{
      '--zx-input-border-radius': '8px',
      '--zx-input-focus-border-color': '#722ed1'
    }"
    placeholder="自定义输入框"
  />
</template>
```

## 最佳实践

1. 使用 CSS 变量进行主题定制，避免直接覆盖组件样式
2. 创建统一的主题配置文件，集中管理主题变量
3. 使用 CSS 预处理器（如 SCSS）来管理样式
4. 遵循组件设计规范，保持视觉一致性

示例主题配置文件：

```ts
// theme.ts
export const lightTheme = {
  '--zx-primary-color': '#1890ff',
  '--zx-success-color': '#52c41a',
  '--zx-warning-color': '#faad14',
  '--zx-error-color': '#f5222d',
  // ... 其他变量
}

export const darkTheme = {
  '--zx-primary-color': '#177ddc',
  '--zx-success-color': '#49aa19',
  '--zx-warning-color': '#d89614',
  '--zx-error-color': '#dc4446',
  // ... 其他变量
}

export function applyTheme(theme: Record<string, string>) {
  Object.entries(theme).forEach(([key, value]) => {
    document.documentElement.style.setProperty(key, value)
  })
}
```

使用主题：

```ts
import { lightTheme, darkTheme, applyTheme } from './theme'

// 应用亮色主题
applyTheme(lightTheme)

// 应用暗色主题
applyTheme(darkTheme)
``` 