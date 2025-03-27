# Tag 标签

Tag 组件用于标记和选择，支持多种类型、可关闭、不同尺寸等功能。

## 基础用法

```vue
<template>
  <zx-tag>标签一</zx-tag>
  <zx-tag type="success">标签二</zx-tag>
  <zx-tag type="info">标签三</zx-tag>
  <zx-tag type="warning">标签四</zx-tag>
  <zx-tag type="danger">标签五</zx-tag>
</template>
```

## 不同类型

支持 `success`、`warning`、`info`、`error` 四种类型。

```vue
<template>
  <div class="tag-demo">
    <zx-tag type="success">成功</zx-tag>
    <zx-tag type="warning">警告</zx-tag>
    <zx-tag type="info">信息</zx-tag>
    <zx-tag type="error">错误</zx-tag>
  </div>
</template>

<style scoped>
.tag-demo {
  display: flex;
  gap: 10px;
}
</style>
```

## 可移除标签

通过 `closable` 属性可以设置标签可移除。

```vue
<template>
  <zx-tag
    v-for="tag in tags"
    :key="tag.name"
    closable
    :type="tag.type"
    @close="handleClose(tag)"
  >
    {{ tag.name }}
  </zx-tag>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const tags = ref([
  { name: '标签一', type: '' },
  { name: '标签二', type: 'success' },
  { name: '标签三', type: 'info' },
  { name: '标签四', type: 'warning' },
  { name: '标签五', type: 'danger' }
])

const handleClose = (tag: any) => {
  tags.value.splice(tags.value.indexOf(tag), 1)
}
</script>
```

## 不同尺寸

通过 `size` 属性可以设置标签的尺寸。

```vue
<template>
  <div class="tag-demo">
    <zx-tag size="large">大型标签</zx-tag>
    <zx-tag>默认标签</zx-tag>
    <zx-tag size="small">小型标签</zx-tag>
  </div>
</template>

<style scoped>
.tag-demo {
  display: flex;
  gap: 10px;
  align-items: center;
}
</style>
```

## 可编辑标签

通过 `editable` 属性可以设置标签可编辑。

```vue
<template>
  <zx-tag
    v-for="tag in tags"
    :key="tag.name"
    closable
    :type="tag.type"
    :editable="true"
    @close="handleClose(tag)"
    @edit="handleEdit(tag)"
  >
    {{ tag.name }}
  </zx-tag>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const tags = ref([
  { name: '标签一', type: '' },
  { name: '标签二', type: 'success' }
])

const handleClose = (tag: any) => {
  tags.value.splice(tags.value.indexOf(tag), 1)
}

const handleEdit = (tag: any) => {
  console.log('编辑标签', tag)
}
</script>
```

## 动态编辑标签

通过 `v-model` 可以实现动态编辑标签。

```vue
<template>
  <zx-tag
    v-for="tag in tags"
    :key="tag.name"
    closable
    :type="tag.type"
    :editable="true"
    v-model="tag.name"
    @close="handleClose(tag)"
  >
    {{ tag.name }}
  </zx-tag>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const tags = ref([
  { name: '标签一', type: '' },
  { name: '标签二', type: 'success' }
])

const handleClose = (tag: any) => {
  tags.value.splice(tags.value.indexOf(tag), 1)
}
</script>
```

## 自定义颜色

通过 `color` 属性可以自定义标签的颜色。

```vue
<template>
  <zx-tag color="#f56c6c">自定义颜色</zx-tag>
  <zx-tag color="#e6a23c">自定义颜色</zx-tag>
  <zx-tag color="#67c23a">自定义颜色</zx-tag>
  <zx-tag color="#909399">自定义颜色</zx-tag>
</template>
```

## 带边框

通过 `effect` 属性可以设置标签的边框样式。

```vue
<template>
  <div class="tag-demo">
    <zx-tag effect="dark">深色标签</zx-tag>
    <zx-tag effect="light">浅色标签</zx-tag>
    <zx-tag effect="plain">朴素标签</zx-tag>
  </div>
</template>

<style scoped>
.tag-demo {
  display: flex;
  gap: 10px;
}
</style>
```

## 圆角标签

设置 `round` 属性可以显示圆角标签。

```vue
<template>
  <zx-tag round>圆角标签</zx-tag>
</template>
```

## API

### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| type | 类型 | string | success / info / warning / danger | - |
| closable | 是否可关闭 | boolean | - | false |
| disable-transitions | 是否禁用渐变动画 | boolean | - | false |
| hit | 是否带有边框描边 | boolean | - | false |
| color | 背景色 | string | - | - |
| effect | 主题 | string | dark / light / plain | light |
| size | 尺寸 | string | large / default / small | default |
| round | 是否圆角 | boolean | - | false |

### Events

| 事件名 | 说明 | 参数 |
|------|------|------|
| close | 关闭 Tag 时触发的事件 | - |
| click | 点击 Tag 时触发的事件 | - |
| edit | 点击编辑按钮时触发的事件 | - |

### Slots

| 插槽名 | 说明 | 参数 |
|------|------|------|
| default | 默认插槽内容 | - | 