# Notification 通知

Notification 组件用于展示全局通知，支持多种类型和自定义配置。

## 基础用法

```vue
<template>
  <zx-button @click="showNotification">显示通知</zx-button>
</template>

<script setup lang="ts">
import { ZxNotification } from 'zxui-cn'

const showNotification = () => {
  ZxNotification({
    title: '标题',
    message: '这是一条通知'
  })
}
</script>
```

## 不同类型

支持 `success`、`warning`、`info`、`error` 四种类型。

```vue
<template>
  <div class="notification-demo">
    <zx-button @click="showSuccess">成功</zx-button>
    <zx-button @click="showWarning">警告</zx-button>
    <zx-button @click="showInfo">信息</zx-button>
    <zx-button @click="showError">错误</zx-button>
  </div>
</template>

<script setup lang="ts">
import { ZxNotification } from 'zxui-cn'

const showSuccess = () => {
  ZxNotification.success({
    title: '成功',
    message: '这是一条成功通知'
  })
}

const showWarning = () => {
  ZxNotification.warning({
    title: '警告',
    message: '这是一条警告通知'
  })
}

const showInfo = () => {
  ZxNotification.info({
    title: '信息',
    message: '这是一条信息通知'
  })
}

const showError = () => {
  ZxNotification.error({
    title: '错误',
    message: '这是一条错误通知'
  })
}
</script>

<style scoped>
.notification-demo {
  display: flex;
  gap: 10px;
}
</style>
```

## 自定义位置

通过 `position` 属性可以自定义通知显示的位置。

```vue
<template>
  <div class="position-demo">
    <zx-button @click="showTopRight">右上角</zx-button>
    <zx-button @click="showTopLeft">左上角</zx-button>
    <zx-button @click="showBottomRight">右下角</zx-button>
    <zx-button @click="showBottomLeft">左下角</zx-button>
  </div>
</template>

<script setup lang="ts">
import { ZxNotification } from 'zxui-cn'

const showTopRight = () => {
  ZxNotification({
    title: '右上角',
    message: '这是一条右上角通知',
    position: 'top-right'
  })
}

const showTopLeft = () => {
  ZxNotification({
    title: '左上角',
    message: '这是一条左上角通知',
    position: 'top-left'
  })
}

const showBottomRight = () => {
  ZxNotification({
    title: '右下角',
    message: '这是一条右下角通知',
    position: 'bottom-right'
  })
}

const showBottomLeft = () => {
  ZxNotification({
    title: '左下角',
    message: '这是一条左下角通知',
    position: 'bottom-left'
  })
}
</script>

<style scoped>
.position-demo {
  display: flex;
  gap: 10px;
}
</style>
```

## 自定义图标

通过 `icon` 属性可以自定义图标。

```vue
<template>
  <zx-button @click="showCustomIcon">自定义图标</zx-button>
</template>

<script setup lang="ts">
import { ZxNotification } from 'zxui-cn'

const showCustomIcon = () => {
  ZxNotification({
    title: '自定义图标',
    message: '这是一条自定义图标通知',
    icon: 'icon-custom'
  })
}
</script>
```

## 自定义持续时间

通过 `duration` 属性可以自定义通知显示的持续时间。

```vue
<template>
  <zx-button @click="showLongNotification">显示长时间通知</zx-button>
</template>

<script setup lang="ts">
import { ZxNotification } from 'zxui-cn'

const showLongNotification = () => {
  ZxNotification({
    title: '长时间通知',
    message: '这是一条长时间显示的通知',
    duration: 5000
  })
}
</script>
```

## 可关闭

设置 `showClose` 属性可以显示关闭按钮。

```vue
<template>
  <zx-button @click="showCloseableNotification">可关闭通知</zx-button>
</template>

<script setup lang="ts">
import { ZxNotification } from 'zxui-cn'

const showCloseableNotification = () => {
  ZxNotification({
    title: '可关闭通知',
    message: '这是一条可关闭的通知',
    showClose: true
  })
}
</script>
```

## 自定义样式

通过 `customClass` 属性可以自定义通知的样式类。

```vue
<template>
  <zx-button @click="showCustomStyle">自定义样式</zx-button>
</template>

<script setup lang="ts">
import { ZxNotification } from 'zxui-cn'

const showCustomStyle = () => {
  ZxNotification({
    title: '自定义样式',
    message: '这是一条自定义样式的通知',
    customClass: 'custom-notification'
  })
}
</script>

<style>
.custom-notification {
  background-color: #f0f9eb;
  border-color: #e1f3d8;
  color: #67c23a;
}
</style>
```

## 自定义内容

通过 `content` 插槽可以自定义通知的内容。

```vue
<template>
  <zx-button @click="showCustomContent">自定义内容</zx-button>
</template>

<script setup lang="ts">
import { ZxNotification } from 'zxui-cn'

const showCustomContent = () => {
  ZxNotification({
    title: '自定义内容',
    content: h('div', { class: 'custom-content' }, [
      h('p', '这是一段自定义内容'),
      h('zx-button', { size: 'small' }, '操作按钮')
    ])
  })
}
</script>

<style scoped>
.custom-content {
  padding: 10px 0;
}
</style>
```

## API

### 方法

| 方法名 | 说明 | 参数 |
|------|------|------|
| ZxNotification | 显示通知 | options |
| ZxNotification.success | 显示成功通知 | options |
| ZxNotification.warning | 显示警告通知 | options |
| ZxNotification.info | 显示信息通知 | options |
| ZxNotification.error | 显示错误通知 | options |

### 参数

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| title | 标题 | string | - | - |
| message | 通知内容 | string | - | - |
| type | 通知类型 | string | success / warning / info / error | info |
| icon | 自定义图标 | string | - | - |
| position | 通知位置 | string | top-right / top-left / bottom-right / bottom-left | top-right |
| duration | 显示时间 | number | - | 4500 |
| showClose | 是否显示关闭按钮 | boolean | - | true |
| customClass | 自定义类名 | string | - | - |
| content | 自定义内容 | VNode | - | - | 