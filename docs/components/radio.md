# Radio 单选框

在一组备选项中进行单选。

## 基础用法

由于选项默认可见，不宜过多，若选项过多，建议使用 Select 选择器。

```vue
<template>
  <zx-radio v-model="radio" label="1">选项一</zx-radio>
  <zx-radio v-model="radio" label="2">选项二</zx-radio>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const radio = ref('1')
</script>
```

## 禁用状态

单选框不可用的状态。

```vue
<template>
  <zx-radio v-model="radio" disabled label="禁用">禁用</zx-radio>
  <zx-radio v-model="radio" disabled label="选中且禁用">选中且禁用</zx-radio>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const radio = ref('选中且禁用')
</script>
```

## 单选框组

适用于在多个互斥的选项中选择的场景。

```vue
<template>
  <zx-radio-group v-model="radio">
    <zx-radio label="1">选项一</zx-radio>
    <zx-radio label="2">选项二</zx-radio>
    <zx-radio label="3">选项三</zx-radio>
  </zx-radio-group>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const radio = ref('1')
</script>
```

## 按钮样式

按钮样式的单选组合。

```vue
<template>
  <zx-radio-group v-model="radio1">
    <zx-radio-button label="上海">上海</zx-radio-button>
    <zx-radio-button label="北京">北京</zx-radio-button>
    <zx-radio-button label="广州">广州</zx-radio-button>
    <zx-radio-button label="深圳">深圳</zx-radio-button>
  </zx-radio-group>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const radio1 = ref('上海')
</script>
```

## 带有边框

```vue
<template>
  <zx-radio-group v-model="radio">
    <zx-radio label="1" border>选项一</zx-radio>
    <zx-radio label="2" border>选项二</zx-radio>
  </zx-radio-group>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const radio = ref('1')
</script>
```

## 不同尺寸

Radio 和 Radio-button 组件提供了不同的尺寸。

```vue
<template>
  <zx-radio-group v-model="radio1" size="large">
    <zx-radio-button label="上海">上海</zx-radio-button>
    <zx-radio-button label="北京">北京</zx-radio-button>
  </zx-radio-group>
  <zx-radio-group v-model="radio2" size="small">
    <zx-radio-button label="上海">上海</zx-radio-button>
    <zx-radio-button label="北京">北京</zx-radio-button>
  </zx-radio-group>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const radio1 = ref('上海')
const radio2 = ref('上海')
</script>
```

## API

### Radio 属性

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| v-model   | 绑定值   | string / number / boolean  | —   | —   |
| label     | Radio 的 value  | string / number / boolean    | —   | —   |
| disabled  | 是否禁用    | boolean   | —   | false   |
| border    | 是否显示边框  | boolean   | —   | false   |
| size      | Radio 的尺寸  | string    | large / default / small  | default |
| name      | 原生 name 属性 | string    | —  | —   |

### Radio 事件

| 事件名称 | 说明 | 回调参数 |
|---------|---------|---------|
| change  | 绑定值变化时触发的事件 | 选中的 Radio label 值 |

### Radio-group 属性

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| v-model   | 绑定值   | string / number / boolean  | —   | —   |
| size      | 单选框组尺寸 | string    | large / default / small  | default |
| disabled  | 是否禁用    | boolean   | —   | false   |
| text-color  | 按钮形式的 Radio 激活时的文本颜色 | string   | —   | #ffffff   |
| fill  | 按钮形式的 Radio 激活时的填充色和边框色 | string   | —   | #409EFF   |

### Radio-group 事件

| 事件名称 | 说明 | 回调参数 |
|---------|---------|---------|
| change  | 绑定值变化时触发的事件 | 选中的 Radio label 值 |

### Radio-button 属性

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| label     | Radio 的 value  | string / number    | —   | —   |
| disabled  | 是否禁用    | boolean   | —   | false   |
| name      | 原生 name 属性 | string    | —  | —   | 