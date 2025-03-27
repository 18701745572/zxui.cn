# Message 消息提示

Message 组件用于展示全局消息提示，支持多种类型和自定义配置。

## 基础用法

```vue
<template>
  <zx-button @click="showMessage">显示消息</zx-button>
</template>

<script setup lang="ts">
import { ZxMessage } from 'zxui-cn'

const showMessage = () => {
  ZxMessage('这是一条消息提示')
}
</script>
```

## 不同类型

支持 `success`、`warning`、`info`、`error` 四种类型。

```vue
<template>
  <div class="message-demo">
    <zx-button @click="showSuccess">成功</zx-button>
    <zx-button @click="showWarning">警告</zx-button>
    <zx-button @click="showInfo">信息</zx-button>
    <zx-button @click="showError">错误</zx-button>
  </div>
</template>

<script setup lang="ts">
import { ZxMessage } from 'zxui-cn'

const showSuccess = () => {
  ZxMessage.success('这是一条成功消息')
}

const showWarning = () => {
  ZxMessage.warning('这是一条警告消息')
}

const showInfo = () => {
  ZxMessage.info('这是一条信息消息')
}

const showError = () => {
  ZxMessage.error('这是一条错误消息')
}
</script>

<style scoped>
.message-demo {
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
import { ZxMessage } from 'zxui-cn'

const showCustomIcon = () => {
  ZxMessage({
    message: '这是一条自定义图标消息',
    icon: 'icon-custom'
  })
}
</script>
```

## 自定义位置

通过 `position` 属性可以自定义消息显示的位置。

```vue
<template>
  <div class="position-demo">
    <zx-button @click="showTop">顶部</zx-button>
    <zx-button @click="showCenter">中间</zx-button>
    <zx-button @click="showBottom">底部</zx-button>
  </div>
</template>

<script setup lang="ts">
import { ZxMessage } from 'zxui-cn'

const showTop = () => {
  ZxMessage({
    message: '顶部消息',
    position: 'top'
  })
}

const showCenter = () => {
  ZxMessage({
    message: '中间消息',
    position: 'center'
  })
}

const showBottom = () => {
  ZxMessage({
    message: '底部消息',
    position: 'bottom'
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

## 自定义持续时间

通过 `duration` 属性可以自定义消息显示的持续时间。

```vue
<template>
  <zx-button @click="showLongMessage">显示长时间消息</zx-button>
</template>

<script setup lang="ts">
import { ZxMessage } from 'zxui-cn'

const showLongMessage = () => {
  ZxMessage({
    message: '这是一条长时间显示的消息',
    duration: 5000
  })
}
</script>
```

## 可关闭

设置 `showClose` 属性可以显示关闭按钮。

```vue
<template>
  <zx-button @click="showCloseableMessage">可关闭消息</zx-button>
</template>

<script setup lang="ts">
import { ZxMessage } from 'zxui-cn'

const showCloseableMessage = () => {
  ZxMessage({
    message: '这是一条可关闭的消息',
    showClose: true
  })
}
</script>
```

## 自定义样式

通过 `customClass` 属性可以自定义消息的样式类。

```vue
<template>
  <zx-button @click="showCustomStyle">自定义样式</zx-button>
</template>

<script setup lang="ts">
import { ZxMessage } from 'zxui-cn'

const showCustomStyle = () => {
  ZxMessage({
    message: '这是一条自定义样式的消息',
    customClass: 'custom-message'
  })
}
</script>

<style>
.custom-message {
  background-color: #f0f9eb;
  border-color: #e1f3d8;
  color: #67c23a;
}
</style>
```

## API

### 方法

| 方法名 | 说明 | 参数 |
|------|------|------|
| ZxMessage | 显示消息提示 | options / message |
| ZxMessage.success | 显示成功消息 | options / message |
| ZxMessage.warning | 显示警告消息 | options / message |
| ZxMessage.info | 显示信息消息 | options / message |
| ZxMessage.error | 显示错误消息 | options / message |

### 参数

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| message | 消息文字 | string | - | - |
| type | 消息类型 | string | success / warning / info / error | info |
| icon | 自定义图标 | string | - | - |
| position | 消息位置 | string | top / center / bottom | top |
| duration | 显示时间 | number | - | 3000 |
| showClose | 是否显示关闭按钮 | boolean | - | false |
| customClass | 自定义类名 | string | - | - | 