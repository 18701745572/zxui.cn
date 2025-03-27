# DateTimePicker 日期时间选择器

DateTimePicker 组件用于选择日期和时间，支持多种日期时间格式和选择模式。

## 基础用法

```vue
<template>
  <zx-datetime-picker v-model="value"></zx-datetime-picker>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
</script>
```

## 日期时间范围

设置 `type` 属性为 `datetimerange` 可以选择日期时间范围。

```vue
<template>
  <zx-datetime-picker
    v-model="value"
    type="datetimerange"
    range-separator="至"
    start-placeholder="开始日期时间"
    end-placeholder="结束日期时间"
  ></zx-datetime-picker>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref([])
</script>
```

## 禁用状态

设置 `disabled` 属性可以禁用日期时间选择器。

```vue
<template>
  <zx-datetime-picker v-model="value" disabled></zx-datetime-picker>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('2024-03-15 12:00:00')
</script>
```

## 可清空

设置 `clearable` 属性可以清空已选择的值。

```vue
<template>
  <zx-datetime-picker v-model="value" clearable></zx-datetime-picker>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
</script>
```

## 自定义格式

通过 `format` 属性可以自定义日期时间格式。

```vue
<template>
  <zx-datetime-picker
    v-model="value"
    format="YYYY年MM月DD日 HH时mm分ss秒"
    value-format="YYYY-MM-DD HH:mm:ss"
  ></zx-datetime-picker>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
</script>
```

## 快捷选项

通过 `shortcuts` 属性可以设置快捷选项。

```vue
<template>
  <zx-datetime-picker
    v-model="value"
    :shortcuts="shortcuts"
  ></zx-datetime-picker>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
const shortcuts = [
  {
    text: '今天',
    value: new Date()
  },
  {
    text: '明天',
    value: () => {
      const date = new Date()
      date.setTime(date.getTime() + 3600 * 1000 * 24)
      return date
    }
  },
  {
    text: '一周后',
    value: () => {
      const date = new Date()
      date.setTime(date.getTime() + 3600 * 1000 * 24 * 7)
      return date
    }
  }
]
</script>
```

## 禁用日期时间

通过 `disabledDate` 和 `disabledTime` 属性可以禁用指定的日期和时间。

```vue
<template>
  <zx-datetime-picker
    v-model="value"
    :disabledDate="disabledDate"
    :disabledTime="disabledTime"
  ></zx-datetime-picker>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
const disabledDate = (time: Date) => {
  return time.getTime() > Date.now()
}
const disabledTime = (date: Date) => {
  return {
    hours: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
    minutes: [0, 15, 30, 45],
    seconds: [0, 15, 30, 45]
  }
}
</script>
```

## 默认时间

通过 `defaultTime` 属性可以设置默认时间。

```vue
<template>
  <zx-datetime-picker
    v-model="value"
    :defaultTime="defaultTime"
  ></zx-datetime-picker>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
const defaultTime = [
  new Date(2000, 1, 1, 9, 0, 0),
  new Date(2000, 1, 1, 18, 0, 0)
]
</script>
```

## API

### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| modelValue | 绑定值 | string / array | - | - |
| type | 显示类型 | string | datetime / datetimerange | datetime |
| disabled | 是否禁用 | boolean | - | false |
| clearable | 是否可清空 | boolean | - | true |
| placeholder | 占位文本 | string | - | - |
| format | 显示格式 | string | - | 'YYYY-MM-DD HH:mm:ss' |
| valueFormat | 值的格式 | string | - | 'YYYY-MM-DD HH:mm:ss' |
| shortcuts | 快捷选项 | array | - | - |
| disabledDate | 禁用日期 | function | - | - |
| disabledTime | 禁用时间 | function | - | - |
| defaultTime | 默认时间 | array | - | - |
| rangeSeparator | 范围分隔符 | string | - | '-' |
| startPlaceholder | 开始日期时间占位文本 | string | - | - |
| endPlaceholder | 结束日期时间占位文本 | string | - | - |

### Events

| 事件名 | 说明 | 参数 |
|------|------|------|
| update:modelValue | 值改变时触发 | value |
| change | 值改变时触发 | value |
| blur | 失去焦点时触发 | event |
| focus | 获得焦点时触发 | event |