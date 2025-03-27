# Image 图片处理

Image 组件用于处理图片，支持图片预览、裁剪、压缩等功能。

## 基础用法

```vue
<template>
  <zx-image
    src="https://example.com/image.jpg"
    @load="handleLoad"
  />
</template>

<script setup lang="ts">
const handleLoad = () => {
  console.log('图片加载完成')
}
</script>
```

## 图片预览

通过 `preview` 方法可以预览图片。

```vue
<template>
  <div>
    <zx-button @click="handlePreview">预览图片</zx-button>
    <zx-image ref="imageRef" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const imageRef = ref()

const handlePreview = () => {
  const file = new File(['image content'], 'image.jpg')
  imageRef.value?.preview(file)
}
</script>
```

## 图片裁剪

通过 `crop` 方法可以裁剪图片。

```vue
<template>
  <div>
    <zx-button @click="handleCrop">裁剪图片</zx-button>
    <zx-image ref="imageRef" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const imageRef = ref()

const handleCrop = () => {
  const file = new File(['image content'], 'image.jpg')
  imageRef.value?.crop(file)
}
</script>
```

## 图片压缩

通过 `compress` 方法可以压缩图片。

```vue
<template>
  <div>
    <zx-button @click="handleCompress">压缩图片</zx-button>
    <zx-image ref="imageRef" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const imageRef = ref()

const handleCompress = () => {
  const file = new File(['image content'], 'image.jpg')
  imageRef.value?.compress(file)
}
</script>
```

## 自定义配置

通过 `config` 属性可以自定义配置。

```vue
<template>
  <zx-image
    :config="config"
    src="https://example.com/image.jpg"
  />
</template>

<script setup lang="ts">
const config = {
  width: 800,
  height: 600,
  quality: 0.8,
  format: 'jpeg',
  fit: 'cover'
}
</script>
```

## 事件监听

通过事件可以监听图片处理状态。

```vue
<template>
  <zx-image
    src="https://example.com/image.jpg"
    @load="handleLoad"
    @error="handleError"
    @crop="handleCrop"
  />
</template>

<script setup lang="ts">
const handleLoad = () => {
  console.log('加载成功')
}

const handleError = (error: any) => {
  console.log('加载失败', error)
}

const handleCrop = (file: File) => {
  console.log('裁剪成功', file)
}
</script>
```

## API

### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| src | 图片地址 | string | - | - |
| config | 配置项 | object | - | - |
| accept | 接受的文件类型 | string | - | .jpg,.jpeg,.png,.gif |
| max-size | 最大文件大小(MB) | number | - | 10 |

### Events

| 事件名 | 说明 | 参数 |
|------|------|------|
| load | 加载完成时触发 | - |
| error | 加载失败时触发 | error |
| crop | 裁剪完成时触发 | file |
| compress | 压缩完成时触发 | file |

### Methods

| 方法名 | 说明 | 参数 |
|------|------|------|
| preview | 预览图片 | file |
| crop | 裁剪图片 | file |
| compress | 压缩图片 | file |
| rotate | 旋转图片 | angle |
| flip | 翻转图片 | direction | 