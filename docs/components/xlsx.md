# Xlsx Excel处理

Xlsx 组件用于处理Excel文件，支持文件读取、写入、编辑等功能。

## 基础用法

```vue
<template>
  <zx-xlsx
    @load="handleLoad"
  />
</template>

<script setup lang="ts">
const handleLoad = (data: any) => {
  console.log('Excel数据加载完成', data)
}
</script>
```

## 文件读取

通过 `read` 方法可以读取Excel文件。

```vue
<template>
  <div>
    <zx-button @click="handleRead">读取Excel</zx-button>
    <zx-xlsx ref="xlsxRef" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const xlsxRef = ref()

const handleRead = () => {
  const file = new File(['excel content'], 'data.xlsx')
  xlsxRef.value?.read(file)
}
</script>
```

## 文件写入

通过 `write` 方法可以写入Excel文件。

```vue
<template>
  <div>
    <zx-button @click="handleWrite">写入Excel</zx-button>
    <zx-xlsx ref="xlsxRef" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const xlsxRef = ref()

const handleWrite = () => {
  const data = [
    ['姓名', '年龄', '性别'],
    ['张三', 18, '男'],
    ['李四', 20, '女']
  ]
  xlsxRef.value?.write(data)
}
</script>
```

## 文件编辑

通过 `edit` 方法可以编辑Excel文件。

```vue
<template>
  <div>
    <zx-button @click="handleEdit">编辑Excel</zx-button>
    <zx-xlsx ref="xlsxRef" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const xlsxRef = ref()

const handleEdit = () => {
  const file = new File(['excel content'], 'data.xlsx')
  const data = [
    ['姓名', '年龄', '性别'],
    ['张三', 18, '男'],
    ['李四', 20, '女']
  ]
  xlsxRef.value?.edit(file, data)
}
</script>
```

## 自定义配置

通过 `config` 属性可以自定义配置。

```vue
<template>
  <zx-xlsx
    :config="config"
  />
</template>

<script setup lang="ts">
const config = {
  sheetName: 'Sheet1',
  headerStyle: {
    font: { bold: true },
    fill: { fgColor: { rgb: 'CCCCCC' } }
  },
  cellStyle: {
    font: { name: '宋体' },
    alignment: { horizontal: 'center' }
  }
}
</script>
```

## 事件监听

通过事件可以监听Excel处理状态。

```vue
<template>
  <zx-xlsx
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
| accept | 接受的文件类型 | string | - | .xlsx,.xls |
| max-size | 最大文件大小(MB) | number | - | 10 |

### Events

| 事件名 | 说明 | 参数 |
|------|------|------|
| load | 加载完成时触发 | data |
| error | 加载失败时触发 | error |
| progress | 处理进度更新时触发 | progress |
| save | 保存完成时触发 | file |

### Methods

| 方法名 | 说明 | 参数 |
|------|------|------|
| read | 读取Excel文件 | file |
| write | 写入Excel文件 | data |
| edit | 编辑Excel文件 | file, data |
| save | 保存Excel文件 | - |
| getSheetNames | 获取工作表名称列表 | - |
| getSheetData | 获取工作表数据 | sheetName |
| setSheetData | 设置工作表数据 | sheetName, data | 