# TimePicker 时间选择器

TimePicker 组件用于选择时间，支持多种格式、禁用状态、时间范围选择等功能。

## 基础用法

```vue
<template>
  <zx-time-picker v-model="value" placeholder="选择时间" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
</script>
```

## 禁用状态

通过 `disabled` 属性可以禁用时间选择器。

```vue
<template>
  <zx-time-picker v-model="value" disabled placeholder="选择时间" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
</script>
```

## 时间范围选择

通过 `is-range` 属性可以设置时间范围选择。

```vue
<template>
  <zx-time-picker
    v-model="value"
    is-range
    range-separator="至"
    start-placeholder="开始时间"
    end-placeholder="结束时间"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref([])
</script>
```

## 不同尺寸

通过 `size` 属性可以设置时间选择器的尺寸。

```vue
<template>
  <div class="time-picker-demo">
    <zx-time-picker v-model="value1" size="large" placeholder="选择时间" />
    <zx-time-picker v-model="value2" placeholder="选择时间" />
    <zx-time-picker v-model="value3" size="small" placeholder="选择时间" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value1 = ref('')
const value2 = ref('')
const value3 = ref('')
</script>

<style scoped>
.time-picker-demo {
  display: flex;
  gap: 20px;
  align-items: center;
}
</style>
```

## 时间格式

通过 `format` 属性可以设置时间的显示格式。

```vue
<template>
  <zx-time-picker
    v-model="value"
    format="HH:mm"
    placeholder="选择时间"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
</script>
```

## 时间步长

通过 `step` 属性可以设置时间选择器的步长。

```vue
<template>
  <zx-time-picker
    v-model="value"
    :step="1800"
    placeholder="选择时间"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
</script>
```

## 禁用时间

通过 `disabled-hours`、`disabled-minutes` 和 `disabled-seconds` 属性可以禁用特定时间。

```vue
<template>
  <zx-time-picker
    v-model="value"
    :disabled-hours="disabledHours"
    :disabled-minutes="disabledMinutes"
    placeholder="选择时间"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')

const disabledHours = () => {
  return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
}

const disabledMinutes = (hour: number) => {
  if (hour === 12) {
    return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59]
  }
  return []
}
</script>
```

## 自定义时间选项

通过 `hour-options`、`minute-options` 和 `second-options` 属性可以自定义时间选项。

```vue
<template>
  <zx-time-picker
    v-model="value"
    :hour-options="hourOptions"
    :minute-options="minuteOptions"
    placeholder="选择时间"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')

const hourOptions = [
  { value: 9, label: '09:00' },
  { value: 10, label: '10:00' },
  { value: 11, label: '11:00' },
  { value: 12, label: '12:00' }
]

const minuteOptions = [
  { value: 0, label: '00' },
  { value: 30, label: '30' }
]
</script>
```

## API

### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| modelValue | 绑定值 | string / Date | - | - |
| disabled | 是否禁用 | boolean | - | false |
| size | 输入框尺寸 | string | large / default / small | default |
| placeholder | 占位符 | string | - | 请选择时间 |
| format | 显示在输入框中的格式 | string | - | HH:mm:ss |
| value-format | 绑定值的格式 | string | - | HH:mm:ss |
| is-range | 是否为时间范围选择 | boolean | - | false |
| range-separator | 选择范围时的分隔符 | string | - | - |
| start-placeholder | 范围选择时开始日期的占位内容 | string | - | 开始时间 |
| end-placeholder | 范围选择时结束日期的占位内容 | string | - | 结束时间 |
| step | 时间选择器的步长 | number | - | 60 |
| disabled-hours | 禁用小时 | function | - | - |
| disabled-minutes | 禁用分钟 | function | - | - |
| disabled-seconds | 禁用秒数 | function | - | - |
| hour-options | 小时选项 | array | - | - |
| minute-options | 分钟选项 | array | - | - |
| second-options | 秒数选项 | array | - | - |

### Events

| 事件名 | 说明 | 参数 |
|------|------|------|
| update:modelValue | 值更新时触发 | value: string / Date |
| change | 值发生变化时触发 | value: string / Date |
| blur | 失去焦点时触发 | event: Event |
| focus | 获得焦点时触发 | event: Event | 