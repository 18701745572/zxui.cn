# Slider 滑块

Slider 组件用于在数值范围内进行选择，支持单滑块和双滑块模式。

## 基础用法

```vue
<template>
  <zx-slider v-model="value"></zx-slider>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(0)
</script>
```

## 自定义范围

通过 `min` 和 `max` 属性可以自定义滑块的范围。

```vue
<template>
  <zx-slider v-model="value" :min="0" :max="100"></zx-slider>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(0)
</script>
```

## 双滑块模式

设置 `range` 属性可以启用双滑块模式。

```vue
<template>
  <zx-slider v-model="value" range :min="0" :max="100"></zx-slider>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref([20, 80])
</script>
```

## 禁用状态

设置 `disabled` 属性可以禁用滑块。

```vue
<template>
  <zx-slider v-model="value" disabled></zx-slider>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(50)
</script>
```

## 自定义步长

通过 `step` 属性可以设置滑块的步长。

```vue
<template>
  <zx-slider v-model="value" :step="10"></zx-slider>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(0)
</script>
```

## 显示输入框

设置 `showInput` 属性可以显示输入框。

```vue
<template>
  <zx-slider v-model="value" show-input></zx-slider>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(0)
</script>
```

## 自定义标记

通过 `marks` 属性可以自定义标记点。

```vue
<template>
  <zx-slider v-model="value" :marks="marks"></zx-slider>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(0)
const marks = {
  0: '0°C',
  20: '20°C',
  40: '40°C',
  60: '60°C',
  80: '80°C',
  100: '100°C'
}
</script>
```

## API

### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| modelValue | 绑定值 | number / array | - | 0 |
| min | 最小值 | number | - | 0 |
| max | 最大值 | number | - | 100 |
| step | 步长 | number | - | 1 |
| disabled | 是否禁用 | boolean | - | false |
| range | 是否为范围选择 | boolean | - | false |
| showInput | 是否显示输入框 | boolean | - | false |
| marks | 标记点 | object | - | - |

### Events

| 事件名 | 说明 | 参数 |
|------|------|------|
| update:modelValue | 值改变时触发 | value |
| change | 值改变时触发 | value |