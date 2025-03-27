# Zip 压缩文件处理

Zip 组件用于处理压缩文件，支持文件压缩、解压、预览等功能。

## 基础用法

```vue
<template>
  <zx-zip
    @load="handleLoad"
  />
</template>

<script setup lang="ts">
const handleLoad = (data: any) => {
  console.log('压缩文件加载完成', data)
}
</script>
```

## 文件压缩

通过 `compress` 方法可以压缩文件。

```vue
<template>
  <div>
    <zx-button @click="handleCompress">压缩文件</zx-button>
    <zx-zip ref="zipRef" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const zipRef = ref()

const handleCompress = () => {
  const files = [
    new File(['file1 content'], 'file1.txt'),
    new File(['file2 content'], 'file2.txt')
  ]
  zipRef.value?.compress(files)
}
</script>
```

## 文件解压

通过 `decompress` 方法可以解压文件。

```vue
<template>
  <div>
    <zx-button @click="handleDecompress">解压文件</zx-button>
    <zx-zip ref="zipRef" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const zipRef = ref()

const handleDecompress = () => {
  const file = new File(['zip content'], 'archive.zip')
  zipRef.value?.decompress(file)
}
</script>
```

## 文件预览

通过 `preview` 方法可以预览压缩文件内容。

```vue
<template>
  <div>
    <zx-button @click="handlePreview">预览文件</zx-button>
    <zx-zip ref="zipRef" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const zipRef = ref()

const handlePreview = () => {
  const file = new File(['zip content'], 'archive.zip')
  zipRef.value?.preview(file)
}
</script>
```

## 自定义配置

通过 `config` 属性可以自定义配置。

```vue
<template>
  <zx-zip
    :config="config"
  />
</template>

<script setup lang="ts">
const config = {
  compressionLevel: 9,
  password: '123456',
  encoding: 'utf-8',
  maxSize: 100,
  exclude: ['.git', 'node_modules']
}
</script>
```

## 事件监听

通过事件可以监听压缩文件处理状态。

```vue
<template>
  <zx-zip
    @load="handleLoad"
    @error="handleError"
    @progress="handleProgress"
  />
</template>

<script setup lang="ts">
const handleLoad = (data: any) => {
  console.log('加载成功', data)
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
| config | 配置项 | object | - | - |
| accept | 接受的文件类型 | string | - | .zip |
| max-size | 最大文件大小(MB) | number | - | 100 |

### Events

| 事件名 | 说明 | 参数 |
|------|------|------|
| load | 加载完成时触发 | data |
| error | 加载失败时触发 | error |
| progress | 处理进度更新时触发 | progress |
| complete | 处理完成时触发 | file |

### Methods

| 方法名 | 说明 | 参数 |
|------|------|------|
| compress | 压缩文件 | files |
| decompress | 解压文件 | file |
| preview | 预览文件 | file |
| addFile | 添加文件 | file |
| removeFile | 移除文件 | filename |
| getFiles | 获取文件列表 | - |
| setPassword | 设置密码 | password |
``` 