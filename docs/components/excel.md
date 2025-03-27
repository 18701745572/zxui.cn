# Excel Excel文件处理

Excel 组件用于处理Excel文件，支持文件预览、编辑、转换等功能。

## 基础用法

```vue
<template>
  <zx-excel
    src="https://example.com/data.xlsx"
    @load="handleLoad"
  />
</template>

<script setup lang="ts">
const handleLoad = () => {
  console.log('Excel加载完成')
}
</script>
```

## 文件预览

通过 `preview` 方法可以预览Excel文件。

```vue
<template>
  <div>
    <zx-button @click="handlePreview">预览Excel</zx-button>
    <zx-excel ref="excelRef" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const excelRef = ref()

const handlePreview = () => {
  const file = new File(['excel content'], 'data.xlsx')
  excelRef.value?.preview(file)
}
</script>
```

## 文件编辑

通过 `edit` 方法可以编辑Excel文件。

```vue
<template>
  <div>
    <zx-button @click="handleEdit">编辑Excel</zx-button>
    <zx-excel ref="excelRef" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const excelRef = ref()

const handleEdit = () => {
  const file = new File(['excel content'], 'data.xlsx')
  excelRef.value?.edit(file)
}
</script>
```

## 文件转换

通过 `convert` 方法可以转换Excel文件格式。

```vue
<template>
  <div>
    <zx-button @click="handleConvert">转换Excel</zx-button>
    <zx-excel ref="excelRef" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const excelRef = ref()

const handleConvert = () => {
  const file = new File(['excel content'], 'data.xlsx')
  excelRef.value?.convert(file, 'csv')
}
</script>
```

## 自定义配置

通过 `config` 属性可以自定义配置。

```vue
<template>
  <zx-excel
    :config="config"
    src="https://example.com/data.xlsx"
  />
</template>

<script setup lang="ts">
const config = {
  width: '100%',
  height: '600px',
  toolbar: true,
  download: true,
  print: true,
  formula: true,
  autosave: true,
  format: 'xlsx',
  sheet: 'Sheet1'
}
</script>
```

## 事件监听

通过事件可以监听Excel处理状态。

```vue
<template>
  <zx-excel
    src="https://example.com/data.xlsx"
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
| src | Excel地址 | string | - | - |
| config | 配置项 | object | - | - |
| accept | 接受的文件类型 | string | - | .xlsx,.xls |
| max-size | 最大文件大小(MB) | number | - | 50 |

### Events

| 事件名 | 说明 | 参数 |
|------|------|------|
| load | 加载完成时触发 | - |
| error | 加载失败时触发 | error |
| progress | 处理进度更新时触发 | progress |
| save | 保存完成时触发 | file |
| change | 内容改变时触发 | data |
| sheet-change | 工作表改变时触发 | sheet |

### Methods

| 方法名 | 说明 | 参数 |
|------|------|------|
| preview | 预览Excel文件 | file |
| edit | 编辑Excel文件 | file |
| convert | 转换Excel文件 | file, format |
| save | 保存Excel文件 | - |
| print | 打印Excel文件 | - |
| download | 下载Excel文件 | - |
| getData | 获取表格数据 | sheet |
| setData | 设置表格数据 | sheet, data |
| getSheetNames | 获取工作表名称列表 | - |
| addSheet | 添加工作表 | name |
| removeSheet | 删除工作表 | name |
``` 