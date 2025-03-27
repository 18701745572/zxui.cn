# Webview 网页视图

Webview 组件用于在应用中嵌入网页，支持网页加载、导航控制、通信等功能。

## 基础用法

```vue
<template>
  <zx-webview
    src="https://example.com"
    @load="handleLoad"
  />
</template>

<script setup lang="ts">
const handleLoad = () => {
  console.log('网页加载完成')
}
</script>
```

## 网页导航

通过 `go` 和 `back` 方法可以控制网页导航。

```vue
<template>
  <div>
    <zx-button @click="handleBack">后退</zx-button>
    <zx-button @click="handleForward">前进</zx-button>
    <zx-webview ref="webviewRef" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const webviewRef = ref()

const handleBack = () => {
  webviewRef.value?.back()
}

const handleForward = () => {
  webviewRef.value?.forward()
}
</script>
```

## 网页刷新

通过 `reload` 方法可以刷新网页。

```vue
<template>
  <div>
    <zx-button @click="handleReload">刷新</zx-button>
    <zx-webview ref="webviewRef" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const webviewRef = ref()

const handleReload = () => {
  webviewRef.value?.reload()
}
</script>
```

## 网页通信

通过 `postMessage` 方法可以与网页进行通信。

```vue
<template>
  <zx-webview
    ref="webviewRef"
    @message="handleMessage"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const webviewRef = ref()

const handleMessage = (event: MessageEvent) => {
  console.log('收到消息:', event.data)
}

// 发送消息到网页
const sendMessage = () => {
  webviewRef.value?.postMessage({
    type: 'hello',
    data: 'world'
  })
}
</script>
```

## 自定义配置

通过 `config` 属性可以自定义配置。

```vue
<template>
  <zx-webview
    :config="config"
    src="https://example.com"
  />
</template>

<script setup lang="ts">
const config = {
  width: '100%',
  height: '600px',
  allowFullscreen: true,
  allowDownload: true,
  allowPrint: true,
  allowZoom: true,
  userAgent: 'custom user agent'
}
</script>
```

## 事件监听

通过事件可以监听网页状态。

```vue
<template>
  <zx-webview
    src="https://example.com"
    @load="handleLoad"
    @error="handleError"
    @progress="handleProgress"
  />
</template>

<script setup lang="ts">
const handleLoad = () => {
  console.log('加载成功')
}

const handleError = (error: any) => {
  console.log('加载失败', error)
}

const handleProgress = (progress: number) => {
  console.log('加载进度:', progress)
}
</script>
```

## API

### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| src | 网页地址 | string | - | - |
| config | 配置项 | object | - | - |
| allowFullscreen | 是否允许全屏 | boolean | - | true |
| allowDownload | 是否允许下载 | boolean | - | true |
| allowPrint | 是否允许打印 | boolean | - | true |
| allowZoom | 是否允许缩放 | boolean | - | true |
| userAgent | 自定义UserAgent | string | - | - |

### Events

| 事件名 | 说明 | 参数 |
|------|------|------|
| load | 加载完成时触发 | - |
| error | 加载失败时触发 | error |
| progress | 加载进度更新时触发 | progress |
| message | 收到消息时触发 | event |
| navigation | 导航状态改变时触发 | canGoBack, canGoForward |

### Methods

| 方法名 | 说明 | 参数 |
|------|------|------|
| go | 导航到指定地址 | url |
| back | 后退 | - |
| forward | 前进 | - |
| reload | 刷新 | - |
| stop | 停止加载 | - |
| postMessage | 发送消息 | message |
| executeScript | 执行脚本 | script | 