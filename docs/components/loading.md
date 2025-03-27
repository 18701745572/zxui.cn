# Loading 加载

Loading 组件用于展示加载状态，支持全屏加载和局部加载。

## 基础用法

```vue
<template>
  <zx-button @click="showLoading">显示加载</zx-button>
</template>

<script setup lang="ts">
import { ZxLoading } from 'zxui-cn'

const showLoading = () => {
  const loading = ZxLoading({
    text: '加载中...'
  })
  
  // 3秒后关闭
  setTimeout(() => {
    loading.close()
  }, 3000)
}
</script>
```

## 全屏加载

设置 `fullscreen` 属性可以显示全屏加载。

```vue
<template>
  <zx-button @click="showFullscreenLoading">全屏加载</zx-button>
</template>

<script setup lang="ts">
import { ZxLoading } from 'zxui-cn'

const showFullscreenLoading = () => {
  const loading = ZxLoading({
    text: '全屏加载中...',
    fullscreen: true
  })
  
  // 3秒后关闭
  setTimeout(() => {
    loading.close()
  }, 3000)
}
</script>
```

## 自定义背景色

通过 `background` 属性可以自定义加载遮罩的背景色。

```vue
<template>
  <zx-button @click="showCustomBackground">自定义背景色</zx-button>
</template>

<script setup lang="ts">
import { ZxLoading } from 'zxui-cn'

const showCustomBackground = () => {
  const loading = ZxLoading({
    text: '加载中...',
    background: 'rgba(0, 0, 0, 0.7)'
  })
  
  // 3秒后关闭
  setTimeout(() => {
    loading.close()
  }, 3000)
}
</script>
```

## 自定义图标

通过 `icon` 属性可以自定义加载图标。

```vue
<template>
  <zx-button @click="showCustomIcon">自定义图标</zx-button>
</template>

<script setup lang="ts">
import { ZxLoading } from 'zxui-cn'

const showCustomIcon = () => {
  const loading = ZxLoading({
    text: '加载中...',
    icon: 'icon-custom-loading'
  })
  
  // 3秒后关闭
  setTimeout(() => {
    loading.close()
  }, 3000)
}
</script>
```

## 自定义文字

通过 `text` 属性可以自定义加载文字。

```vue
<template>
  <zx-button @click="showCustomText">自定义文字</zx-button>
</template>

<script setup lang="ts">
import { ZxLoading } from 'zxui-cn'

const showCustomText = () => {
  const loading = ZxLoading({
    text: '正在处理中，请稍候...'
  })
  
  // 3秒后关闭
  setTimeout(() => {
    loading.close()
  }, 3000)
}
</script>
```

## 局部加载

通过 `target` 属性可以指定加载的目标元素。

```vue
<template>
  <div class="loading-demo">
    <zx-button @click="showTargetLoading">局部加载</zx-button>
    <div ref="targetRef" class="target-box">
      这是目标区域
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ZxLoading } from 'zxui-cn'

const targetRef = ref<HTMLElement | null>(null)

const showTargetLoading = () => {
  const loading = ZxLoading({
    text: '加载中...',
    target: targetRef.value
  })
  
  // 3秒后关闭
  setTimeout(() => {
    loading.close()
  }, 3000)
}
</script>

<style scoped>
.target-box {
  width: 300px;
  height: 200px;
  border: 1px solid #dcdfe6;
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
```

## 自定义样式

通过 `customClass` 属性可以自定义加载的样式类。

```vue
<template>
  <zx-button @click="showCustomStyle">自定义样式</zx-button>
</template>

<script setup lang="ts">
import { ZxLoading } from 'zxui-cn'

const showCustomStyle = () => {
  const loading = ZxLoading({
    text: '加载中...',
    customClass: 'custom-loading'
  })
  
  // 3秒后关闭
  setTimeout(() => {
    loading.close()
  }, 3000)
}
</script>

<style>
.custom-loading {
  .zx-loading-spinner {
    border-color: #67c23a;
  }
  .zx-loading-text {
    color: #67c23a;
  }
}
</style>
```

## API

### 方法

| 方法名 | 说明 | 参数 |
|------|------|------|
| ZxLoading | 显示加载 | options |
| ZxLoading.close | 关闭加载 | - |

### 参数

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| text | 加载文字 | string | - | '加载中...' |
| fullscreen | 是否全屏显示 | boolean | - | false |
| background | 遮罩背景色 | string | - | 'rgba(0, 0, 0, 0.5)' |
| icon | 自定义图标 | string | - | - |
| target | 加载的目标元素 | HTMLElement | - | - |
| customClass | 自定义类名 | string | - | - | 