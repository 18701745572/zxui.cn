# Tooltip 文字提示

Tooltip 组件用于显示文字提示，支持多种触发方式、不同位置、自定义内容等功能。

## 基础用法

```vue
<template>
  <zx-tooltip content="这是一段提示文字">
    <zx-button>悬停显示</zx-button>
  </zx-tooltip>
</template>
```

## 不同位置

通过 `placement` 属性可以设置提示框的位置。

```vue
<template>
  <div class="tooltip-demo">
    <zx-tooltip content="上边" placement="top">
      <zx-button>上边</zx-button>
    </zx-tooltip>
    <zx-tooltip content="右边" placement="right">
      <zx-button>右边</zx-button>
    </zx-tooltip>
    <zx-tooltip content="下边" placement="bottom">
      <zx-button>下边</zx-button>
    </zx-tooltip>
    <zx-tooltip content="左边" placement="left">
      <zx-button>左边</zx-button>
    </zx-tooltip>
  </div>
</template>

<style scoped>
.tooltip-demo {
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: center;
  height: 200px;
}
</style>
```

## 不同触发方式

通过 `trigger` 属性可以设置提示框的触发方式。

```vue
<template>
  <div class="tooltip-demo">
    <zx-tooltip content="点击显示" trigger="click">
      <zx-button>点击</zx-button>
    </zx-tooltip>
    <zx-tooltip content="悬停显示" trigger="hover">
      <zx-button>悬停</zx-button>
    </zx-tooltip>
    <zx-tooltip content="聚焦显示" trigger="focus">
      <zx-button>聚焦</zx-button>
    </zx-tooltip>
  </div>
</template>

<style scoped>
.tooltip-demo {
  display: flex;
  gap: 20px;
}
</style>
```

## 自定义内容

通过默认插槽可以自定义提示框的内容。

```vue
<template>
  <zx-tooltip>
    <template #content>
      <div>
        <h4>标题</h4>
        <p>这是一段自定义内容</p>
      </div>
    </template>
    <zx-button>自定义内容</zx-button>
  </zx-tooltip>
</template>
```

## 禁用状态

通过 `disabled` 属性可以禁用提示框。

```vue
<template>
  <zx-tooltip content="禁用状态" disabled>
    <zx-button>禁用</zx-button>
  </zx-tooltip>
</template>
```

## 手动控制

通过 `v-model` 可以手动控制提示框的显示和隐藏。

```vue
<template>
  <zx-tooltip content="手动控制" v-model="visible">
    <zx-button @click="visible = !visible">
      {{ visible ? '点击关闭' : '点击显示' }}
    </zx-button>
  </zx-tooltip>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)
</script>
```

## 延迟显示

通过 `enter-delay` 和 `leave-delay` 属性可以设置提示框的延迟显示和隐藏时间。

```vue
<template>
  <zx-tooltip content="延迟显示" :enter-delay="1000" :leave-delay="1000">
    <zx-button>延迟显示</zx-button>
  </zx-tooltip>
</template>
```

## 不同主题

通过 `effect` 属性可以设置提示框的主题。

```vue
<template>
  <div class="tooltip-demo">
    <zx-tooltip content="浅色主题" effect="light">
      <zx-button>浅色</zx-button>
    </zx-tooltip>
    <zx-tooltip content="深色主题" effect="dark">
      <zx-button>深色</zx-button>
    </zx-tooltip>
  </div>
</template>

<style scoped>
.tooltip-demo {
  display: flex;
  gap: 20px;
}
</style>
```

## API

### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| content | 显示的内容 | string | - | - |
| placement | 提示框出现的位置 | string | top / top-start / top-end / bottom / bottom-start / bottom-end / left / left-start / left-end / right / right-start / right-end | top |
| trigger | 触发方式 | string | hover / click / focus / manual | hover |
| disabled | 是否禁用 | boolean | - | false |
| enter-delay | 延迟显示时间，单位毫秒 | number | - | 0 |
| leave-delay | 延迟隐藏时间，单位毫秒 | number | - | 0 |
| effect | 主题 | string | dark / light | dark |
| popper-class | 为 popper 添加类名 | string | - | - |
| popper-append-to-body | 是否将弹出框插入至 body 元素 | boolean | - | true |
| teleported | 是否将弹出框插入至 body 元素 | boolean | - | true |

### Events

| 事件名 | 说明 | 参数 |
|------|------|------|
| update:modelValue | 显示状态发生变化时触发 | value: boolean |
| show | 显示时触发 | - |
| hide | 隐藏时触发 | - |

### Slots

| 插槽名 | 说明 | 参数 |
|------|------|------|
| content | 自定义提示框的内容 | - |
| default | 默认插槽内容 | - |
``` 