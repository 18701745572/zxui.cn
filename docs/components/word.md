# Word Word文件处理

Word 组件用于处理Word文件，支持文件预览、编辑、转换等功能。

## 基础用法

```vue
<template>
  <zx-word
    src="https://example.com/document.docx"
    @load="handleLoad"
  />
</template>

<script setup lang="ts">
const handleLoad = () => {
  console.log('Word加载完成')
}
</script>
```

## 文件预览

通过 `preview` 方法可以预览Word文件。

```vue
<template>
  <div>
    <zx-button @click="handlePreview">预览Word</zx-button>
    <zx-word ref="wordRef" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const wordRef = ref()

const handlePreview = () => {
  const file = new File(['word content'], 'document.docx')
  wordRef.value?.preview(file)
}
</script>
```

## 文件编辑

通过 `edit` 方法可以编辑Word文件。

```vue
<template>
  <div>
    <zx-button @click="handleEdit">编辑Word</zx-button>
    <zx-word ref="wordRef" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const wordRef = ref()

const handleEdit = () => {
  const file = new File(['word content'], 'document.docx')
  wordRef.value?.edit(file)
}
</script>
```

## 文件转换

通过 `convert` 方法可以转换Word文件格式。

```vue
<template>
  <div>
    <zx-button @click="handleConvert">转换Word</zx-button>
    <zx-word ref="wordRef" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const wordRef = ref()

const handleConvert = () => {
  const file = new File(['word content'], 'document.docx')
  wordRef.value?.convert(file, 'pdf')
}
</script>
```

## 自定义配置

通过 `config` 属性可以自定义配置。

```vue
<template>
  <zx-word
    :config="config"
    src="https://example.com/document.docx"
  />
</template>

<script setup lang="ts">
const config = {
  width: '100%',
  height: '600px',
  toolbar: true,
  download: true,
  print: true,
  spellcheck: true,
  autosave: true,
  format: 'docx'
}
</script>
```

## 事件监听

通过事件可以监听Word处理状态。

```vue
<template>
  <zx-word
    src="https://example.com/document.docx"
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
| src | Word地址 | string | - | - |
| config | 配置项 | object | - | - |
| accept | 接受的文件类型 | string | - | .doc,.docx |
| max-size | 最大文件大小(MB) | number | - | 50 |

### Events

| 事件名 | 说明 | 参数 |
|------|------|------|
| load | 加载完成时触发 | - |
| error | 加载失败时触发 | error |
| progress | 处理进度更新时触发 | progress |
| save | 保存完成时触发 | file |
| change | 内容改变时触发 | content |

### Methods

| 方法名 | 说明 | 参数 |
|------|------|------|
| preview | 预览Word文件 | file |
| edit | 编辑Word文件 | file |
| convert | 转换Word文件 | file, format |
| save | 保存Word文件 | - |
| print | 打印Word文件 | - |
| download | 下载Word文件 | - |
| getContent | 获取文档内容 | - |
| setContent | 设置文档内容 | content |
``` 