# Calendar 日历

Calendar 组件用于显示日历，支持日期选择、范围选择、自定义内容等功能。

## 基础用法

```vue
<template>
  <zx-calendar v-model="date"></zx-calendar>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const date = ref(new Date())
</script>
```

## 日期范围选择

设置 `range` 属性可以启用日期范围选择。

```vue
<template>
  <zx-calendar
    v-model="dateRange"
    range
    :on-select="handleSelect"
  ></zx-calendar>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const dateRange = ref<[Date, Date] | null>(null)

const handleSelect = (dates: [Date, Date]) => {
  console.log('选择的日期范围:', dates)
}
</script>
```

## 自定义日期单元格

通过 `render-cell` 插槽可以自定义日期单元格的内容。

```vue
<template>
  <zx-calendar v-model="date">
    <template #render-cell="{ date, data }">
      <div class="calendar-cell">
        <span>{{ data.day }}</span>
        <span v-if="isHoliday(date)" class="holiday">休</span>
      </div>
    </template>
  </zx-calendar>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const date = ref(new Date())

const isHoliday = (date: Date) => {
  const day = date.getDay()
  return day === 0 || day === 6
}
</script>

<style scoped>
.calendar-cell {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.holiday {
  color: #f56c6c;
  font-size: 12px;
}
</style>
```

## 禁用日期

通过 `disabled-date` 属性可以禁用特定日期。

```vue
<template>
  <zx-calendar
    v-model="date"
    :disabled-date="disabledDate"
  ></zx-calendar>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const date = ref(new Date())

const disabledDate = (date: Date) => {
  const today = new Date()
  return date.getTime() < today.getTime()
}
</script>
```

## 自定义头部

通过 `header` 插槽可以自定义日历头部。

```vue
<template>
  <zx-calendar v-model="date">
    <template #header="{ currentDate, prevMonth, nextMonth }">
      <div class="calendar-header">
        <zx-button @click="prevMonth">上个月</zx-button>
        <span>{{ formatDate(currentDate) }}</span>
        <zx-button @click="nextMonth">下个月</zx-button>
      </div>
    </template>
  </zx-calendar>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const date = ref(new Date())

const formatDate = (date: Date) => {
  return `${date.getFullYear()}年${date.getMonth() + 1}月`
}
</script>

<style scoped>
.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}
</style>
```

## 自定义日期格式

通过 `format` 属性可以自定义日期格式。

```vue
<template>
  <zx-calendar
    v-model="date"
    format="YYYY-MM-DD"
  ></zx-calendar>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const date = ref(new Date())
</script>
```

## 显示周几

设置 `show-week` 属性可以显示周几。

```vue
<template>
  <zx-calendar
    v-model="date"
    show-week
  ></zx-calendar>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const date = ref(new Date())
</script>
```

## API

### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| modelValue | 绑定值 | Date / [Date, Date] | - | - |
| range | 是否启用日期范围选择 | boolean | - | false |
| disabled-date | 设置禁用状态，参数为当前日期，要求返回 Boolean | Function | - | - |
| first-day-of-week | 周起始日 | number | 1 / 2 / 3 / 4 / 5 / 6 / 7 | 1 |
| format | 日期格式 | string | - | 'YYYY-MM-DD' |
| show-week | 是否显示周几 | boolean | - | false |
| cell-class-name | 自定义单元格的 className | Function | - | - |
| cell-style | 自定义单元格的 style | Function | - | - |

### Events

| 事件名 | 说明 | 参数 |
|------|------|------|
| select | 点击日期时触发 | (date: Date) |
| change | 日期改变时触发 | (date: Date) |
| prev-month | 切换到上个月时触发 | (date: Date) |
| next-month | 切换到下个月时触发 | (date: Date) |

### Slots

| 插槽名 | 说明 | 参数 |
|------|------|------|
| header | 自定义头部内容 | { currentDate, prevMonth, nextMonth } |
| render-cell | 自定义日期单元格内容 | { date, data } | 