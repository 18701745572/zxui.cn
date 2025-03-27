# Upload 上传

Upload 组件用于文件上传，支持拖拽上传、多文件上传、文件预览等功能。

## 基础用法

```vue
<template>
  <zx-upload
    action="https://example.com/upload"
    :on-success="handleSuccess"
    :on-error="handleError"
  >
    <zx-button>点击上传</zx-button>
  </zx-upload>
</template>

<script setup lang="ts">
const handleSuccess = (response: any) => {
  console.log('上传成功', response)
}

const handleError = (error: any) => {
  console.log('上传失败', error)
}
</script>
```

## 拖拽上传

通过 `drag` 属性可以设置拖拽上传。

```vue
<template>
  <zx-upload
    action="https://example.com/upload"
    drag
    :on-success="handleSuccess"
  >
    <zx-icon name="upload" />
    <div class="upload-text">
      将文件拖到此处，或<em>点击上传</em>
    </div>
  </zx-upload>
</template>

<script setup lang="ts">
const handleSuccess = (response: any) => {
  console.log('上传成功', response)
}
</script>

<style scoped>
.upload-text {
  color: #606266;
  font-size: 14px;
  text-align: center;
  margin-top: 10px;
}

.upload-text em {
  color: #409eff;
  font-style: normal;
}
</style>
```

## 多文件上传

通过 `multiple` 属性可以设置多文件上传。

```vue
<template>
  <zx-upload
    action="https://example.com/upload"
    multiple
    :on-success="handleSuccess"
  >
    <zx-button>多文件上传</zx-button>
  </zx-upload>
</template>

<script setup lang="ts">
const handleSuccess = (response: any) => {
  console.log('上传成功', response)
}
</script>
```

## 文件预览

通过 `on-preview` 事件可以预览文件。

```vue
<template>
  <zx-upload
    action="https://example.com/upload"
    :on-preview="handlePreview"
  >
    <zx-button>点击上传</zx-button>
  </zx-upload>
</template>

<script setup lang="ts">
const handlePreview = (file: any) => {
  console.log('预览文件', file)
}
</script>
```

## 文件限制

通过 `before-upload` 事件可以限制文件类型和大小。

```vue
<template>
  <zx-upload
    action="https://example.com/upload"
    :before-upload="beforeUpload"
  >
    <zx-button>点击上传</zx-button>
    <template #tip>
      <div class="upload-tip">
        只能上传jpg/png文件，且不超过500kb
      </div>
    </template>
  </zx-upload>
</template>

<script setup lang="ts">
const beforeUpload = (file: File) => {
  const isImage = file.type === 'image/jpeg' || file.type === 'image/png'
  const isLt500K = file.size / 1024 < 500

  if (!isImage) {
    console.error('只能上传jpg/png文件!')
    return false
  }
  if (!isLt500K) {
    console.error('文件大小不能超过500kb!')
    return false
  }
  return true
}
</script>

<style scoped>
.upload-tip {
  color: #909399;
  font-size: 12px;
  margin-top: 7px;
}
</style>
```

## 自定义上传

通过 `http-request` 属性可以自定义上传请求。

```vue
<template>
  <zx-upload
    :http-request="customUpload"
  >
    <zx-button>自定义上传</zx-button>
  </zx-upload>
</template>

<script setup lang="ts">
const customUpload = (options: any) => {
  const { file, onSuccess, onError } = options
  const formData = new FormData()
  formData.append('file', file)

  fetch('https://example.com/upload', {
    method: 'POST',
    body: formData
  })
    .then(response => response.json())
    .then(data => onSuccess(data))
    .catch(error => onError(error))
}
</script>
```

## 文件列表

通过 `file-list` 属性可以设置文件列表。

```vue
<template>
  <zx-upload
    action="https://example.com/upload"
    :file-list="fileList"
  >
    <zx-button>点击上传</zx-button>
  </zx-upload>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const fileList = ref([
  {
    name: 'food.jpeg',
    url: 'https://example.com/food.jpeg'
  },
  {
    name: 'food2.jpeg',
    url: 'https://example.com/food2.jpeg'
  }
])
</script>
```

## API

### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| action | 必选参数，上传的地址 | string | - | - |
| headers | 设置上传的请求头部 | object | - | {} |
| multiple | 是否支持多选文件 | boolean | - | false |
| data | 上传时附带的额外参数 | object | - | {} |
| name | 上传的文件字段名 | string | - | file |
| drag | 是否启用拖拽上传 | boolean | - | false |
| accept | 接受上传的文件类型 | string | - | - |
| show-file-list | 是否显示已上传文件列表 | boolean | - | true |
| file-list | 已上传的文件列表 | array | - | [] |
| list-type | 文件列表的类型 | string | text/picture/picture-card | text |
| auto-upload | 是否自动上传文件 | boolean | - | true |
| http-request | 自定义上传请求 | function | - | - |

### Events

| 事件名 | 说明 | 参数 |
|------|------|------|
| on-preview | 点击文件列表中已上传的文件时的钩子 | file |
| on-remove | 文件列表移除文件时的钩子 | file, fileList |
| on-success | 文件上传成功时的钩子 | response, file, fileList |
| on-error | 文件上传失败时的钩子 | error, file, fileList |
| on-progress | 文件上传时的钩子 | event, file, fileList |
| on-change | 文件状态改变时的钩子，上传中、成功、失败都会调用这个函数 | file, fileList |
| before-upload | 上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传 | file |

### Slots

| 插槽名 | 说明 | 参数 |
|------|------|------|
| default | 触发上传组件的元素 | - |
| tip | 提示说明文字 | - | 