# DatePicker 日期选择器

DatePicker 组件用于选择日期，支持多种日期格式和选择模式。

## 基础用法

```vue
<template>
  <zx-date-picker v-model="value"></zx-date-picker>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
</script>
```

## 日期范围

设置 `type` 属性为 `daterange` 可以选择日期范围。

```vue
<template>
  <zx-date-picker
    v-model="value"
    type="daterange"
    range-separator="至"
    start-placeholder="开始日期"
    end-placeholder="结束日期"
  ></zx-date-picker>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref([])
</script>
```

## 禁用状态

设置 `disabled` 属性可以禁用日期选择器。

```vue
<template>
  <zx-date-picker v-model="value" disabled></zx-date-picker>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('2024-03-15')
</script>
```

## 可清空

设置 `clearable` 属性可以清空已选择的值。

```vue
<template>
  <zx-date-picker v-model="value" clearable></zx-date-picker>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
</script>
```

## 自定义格式

通过 `format` 属性可以自定义日期格式。

```vue
<template>
  <zx-date-picker
    v-model="value"
    format="YYYY年MM月DD日"
    value-format="YYYY-MM-DD"
  ></zx-date-picker>
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
  <zx-date-picker
    v-model="value"
    :shortcuts="shortcuts"
  ></zx-date-picker>
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
    text: '昨天',
    value: () => {
      const date = new Date()
      date.setTime(date.getTime() - 3600 * 1000 * 24)
      return date
    }
  },
  {
    text: '一周前',
    value: () => {
      const date = new Date()
      date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
      return date
    }
  }
]
</script>
```

## 禁用日期

通过 `disabledDate` 属性可以禁用指定日期。

```vue
<template>
  <zx-date-picker
    v-model="value"
    :disabledDate="disabledDate"
  ></zx-date-picker>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
const disabledDate = (time: Date) => {
  return time.getTime() > Date.now()
}
</script>
```

## API

### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| modelValue | 绑定值 | string / array | - | - |
| type | 显示类型 | string | date / daterange / month / year | date |
| disabled | 是否禁用 | boolean | - | false |
| clearable | 是否可清空 | boolean | - | true |
| placeholder | 占位文本 | string | - | - |
| format | 显示格式 | string | - | 'YYYY-MM-DD' |
| valueFormat | 值的格式 | string | - | 'YYYY-MM-DD' |
| shortcuts | 快捷选项 | array | - | - |
| disabledDate | 禁用日期 | function | - | - |
| rangeSeparator | 范围分隔符 | string | - | '-' |
| startPlaceholder | 开始日期占位文本 | string | - | - |
| endPlaceholder | 结束日期占位文本 | string | - | - |

### Events

| 事件名 | 说明 | 参数 |
|------|------|------|
| update:modelValue | 值改变时触发 | value |
| change | 值改变时触发 | value |
| blur | 失去焦点时触发 | event |
| focus | 获得焦点时触发 | event |
``` 