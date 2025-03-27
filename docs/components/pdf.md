# Pdf PDF文件处理

Pdf 组件用于处理PDF文件，支持文件预览、编辑、转换等功能。

## 基础用法

```vue
<template>
  <zx-pdf
    src="https://example.com/document.pdf"
    @load="handleLoad"
  />
</template>

<script setup lang="ts">
const handleLoad = () => {
  console.log('PDF加载完成')
}
</script>
```

## 文件预览

通过 `preview` 方法可以预览PDF文件。

```vue
<template>
  <div>
    <zx-button @click="handlePreview">预览PDF</zx-button>
    <zx-pdf ref="pdfRef" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const pdfRef = ref()

const handlePreview = () => {
  const file = new File(['pdf content'], 'document.pdf')
  pdfRef.value?.preview(file)
}
</script>
```

## 文件编辑

通过 `edit` 方法可以编辑PDF文件。

```vue
<template>
  <div>
    <zx-button @click="handleEdit">编辑PDF</zx-button>
    <zx-pdf ref="pdfRef" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const pdfRef = ref()

const handleEdit = () => {
  const file = new File(['pdf content'], 'document.pdf')
  pdfRef.value?.edit(file)
}
</script>
```

## 文件转换

通过 `convert` 方法可以转换PDF文件格式。

```vue
<template>
  <div>
    <zx-button @click="handleConvert">转换PDF</zx-button>
    <zx-pdf ref="pdfRef" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const pdfRef = ref()

const handleConvert = () => {
  const file = new File(['pdf content'], 'document.pdf')
  pdfRef.value?.convert(file, 'docx')
}
</script>
```

## 自定义配置

通过 `config` 属性可以自定义配置。

```vue
<template>
  <zx-pdf
    :config="config"
    src="https://example.com/document.pdf"
  />
</template>

<script setup lang="ts">
const config = {
  width: '100%',
  height: '600px',
  page: 1,
  zoom: 1.0,
  rotation: 0,
  password: '123456',
  toolbar: true,
  download: true,
  print: true
}
</script>
```

## 事件监听

通过事件可以监听PDF处理状态。

```vue
<template>
  <zx-pdf
    src="https://example.com/document.pdf"
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
  console.log('处理进度:', progress)
}
</script>
```

## API

### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| src | PDF地址 | string | - | - |
| config | 配置项 | object | - | - |
| accept | 接受的文件类型 | string | - | .pdf |
| max-size | 最大文件大小(MB) | number | - | 50 |

### Events

| 事件名 | 说明 | 参数 |
|------|------|------|
| load | 加载完成时触发 | - |
| error | 加载失败时触发 | error |
| progress | 处理进度更新时触发 | progress |
| page-change | 页码改变时触发 | page |
| zoom-change | 缩放比例改变时触发 | zoom |

### Methods

| 方法名 | 说明 | 参数 |
|------|------|------|
| preview | 预览PDF文件 | file |
| edit | 编辑PDF文件 | file |
| convert | 转换PDF文件 | file, format |
| rotate | 旋转PDF | angle |
| zoom | 缩放PDF | scale |
| print | 打印PDF | - |
| download | 下载PDF | - |
| getPageCount | 获取总页数 | - |
| goToPage | 跳转到指定页 | page |
```