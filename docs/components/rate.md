# Rate 评分

Rate 组件用于评分功能，支持自定义图标、颜色和大小。

## 基础用法

```vue
<template>
  <zx-rate v-model="value"></zx-rate>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(0)
</script>
```

## 自定义最大值

通过 `max` 属性可以自定义评分的最大值。

```vue
<template>
  <zx-rate v-model="value" :max="10"></zx-rate>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(0)
</script>
```

## 禁用状态

设置 `disabled` 属性可以禁用评分。

```vue
<template>
  <zx-rate v-model="value" disabled></zx-rate>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(3)
</script>
```

## 允许半选

设置 `allowHalf` 属性可以允许半选。

```vue
<template>
  <zx-rate v-model="value" allow-half></zx-rate>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(2.5)
</script>
```

## 自定义颜色

通过 `colors` 属性可以自定义评分的颜色。

```vue
<template>
  <zx-rate v-model="value" :colors="colors"></zx-rate>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(0)
const colors = ['#F56C6C', '#E6A23C', '#67C23A']
</script>
```

## 自定义图标

通过 `icon` 插槽可以自定义评分图标。

```vue
<template>
  <zx-rate v-model="value">
    <template #icon>
      <i class="icon-star"></i>
    </template>
  </zx-rate>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(0)
</script>
```

## 显示文本

设置 `showText` 属性可以显示评分文本。

```vue
<template>
  <zx-rate v-model="value" show-text></zx-rate>
  <div class="rate-text">{{ value }}分</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(0)
</script>

<style scoped>
.rate-text {
  margin-top: 10px;
  color: #606266;
}
</style>
```

## API

### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| modelValue | 绑定值 | number | - | 0 |
| max | 最大值 | number | - | 5 |
| disabled | 是否禁用 | boolean | - | false |
| allowHalf | 是否允许半选 | boolean | - | false |
| colors | 颜色数组 | array | - | ['#F56C6C', '#E6A23C', '#67C23A'] |
| showText | 是否显示文本 | boolean | - | false |

### Events

| 事件名 | 说明 | 参数 |
|------|------|------|
| update:modelValue | 值改变时触发 | value |
| change | 值改变时触发 | value |

### Slots

| 名称 | 说明 |
|------|------|
| icon | 自定义图标 |
``` 