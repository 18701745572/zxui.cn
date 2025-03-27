# Switch 开关

表示两种相互对立的状态间的切换，多用于触发「开/关」。

## 基础用法

绑定 `v-model` 到一个 `Boolean` 类型的变量。

```vue
<template>
  <zx-switch v-model="value" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(false)
</script>
```

## 禁用状态

设置 `disabled` 属性，接受一个 `boolean`，设置 `true` 即可禁用。

```vue
<template>
  <zx-switch v-model="value1" disabled />
  <zx-switch v-model="value2" disabled />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value1 = ref(false)
const value2 = ref(true)
</script>
```

## 文字描述

使用 `active-text` 属性与 `inactive-text` 属性来设置开关的文字描述。

```vue
<template>
  <zx-switch
    v-model="value1"
    active-text="开启"
    inactive-text="关闭"
  />
  <zx-switch
    v-model="value2"
    active-text="打开"
    inactive-text="关闭"
    inline-prompt
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value1 = ref(true)
const value2 = ref(true)
</script>
```

## 自定义颜色

使用 `active-color` 属性与 `inactive-color` 属性来设置开关的背景色。

```vue
<template>
  <zx-switch
    v-model="value"
    active-color="#13ce66"
    inactive-color="#ff4949"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(true)
</script>
```

## 自定义开关值

使用 `active-value` 和 `inactive-value` 属性，接受 `Boolean`、`String` 或 `Number` 类型的值。

```vue
<template>
  <zx-switch
    v-model="value"
    active-value="100"
    inactive-value="0"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('100')
</script>
```

## 不同尺寸

使用 `size` 属性改变开关的大小。

```vue
<template>
  <zx-switch v-model="value1" size="large" />
  <zx-switch v-model="value2" />
  <zx-switch v-model="value3" size="small" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value1 = ref(true)
const value2 = ref(true)
const value3 = ref(true)
</script>
```

## API

### 属性

| 参数           | 说明                     | 类型                      | 可选值                 | 默认值  |
|---------------|--------------------------|--------------------------|----------------------|---------|
| v-model      | 绑定值                    | boolean / string / number | —                    | —       |
| disabled     | 是否禁用                  | boolean                  | —                    | false   |
| size         | 开关的尺寸                | string                   | large / default / small | default |
| width        | 开关的宽度                | number                   | —                    | 40      |
| active-text  | 打开时的文字描述          | string                   | —                    | —       |
| inactive-text| 关闭时的文字描述          | string                   | —                    | —       |
| active-value | 打开时的值                | boolean / string / number | —                    | true    |
| inactive-value| 关闭时的值               | boolean / string / number | —                    | false   |
| active-color | 打开时的背景色            | string                   | —                    | #409EFF |
| inactive-color| 关闭时的背景色           | string                   | —                    | #C0CCDA |
| name         | switch 对应的 name 属性   | string                   | —                    | —       |
| inline-prompt| 文字是否显示在开关内      | boolean                  | —                    | false   |

### 事件

| 事件名称 | 说明                     | 回调参数                   |
|---------|-------------------------|---------------------------|
| change  | switch 状态发生变化时触发 | value: boolean / string / number |
| click   | 点击 switch 时触发       | event: Event              |

### 方法

| 方法名  | 说明               | 参数 |
|--------|-------------------|------|
| focus  | 使 Switch 获取焦点 | —    | 