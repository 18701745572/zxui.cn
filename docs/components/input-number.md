# InputNumber 数字输入框

InputNumber 组件用于数字输入，支持最大值、最小值、步进、精度、禁用状态等功能。

## 基础用法

```vue
<template>
  <zx-input-number v-model="num" :min="0" :max="100" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const num = ref(0)
</script>
```

## 禁用状态

通过 `disabled` 属性可以禁用数字输入框。

```vue
<template>
  <zx-input-number v-model="num" :min="0" :max="100" disabled />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const num = ref(0)
</script>
```

## 步进

通过 `step` 属性可以设置步进值。

```vue
<template>
  <zx-input-number v-model="num" :min="0" :max="100" :step="10" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const num = ref(0)
</script>
```

## 精度

通过 `precision` 属性可以设置数值精度。

```vue
<template>
  <zx-input-number
    v-model="num"
    :min="0"
    :max="100"
    :precision="2"
    :step="0.1"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const num = ref(0)
</script>
```

## 不同尺寸

通过 `size` 属性可以设置数字输入框的尺寸。

```vue
<template>
  <div class="input-number-demo">
    <zx-input-number v-model="num1" :min="0" :max="100" size="large" />
    <zx-input-number v-model="num2" :min="0" :max="100" size="default" />
    <zx-input-number v-model="num3" :min="0" :max="100" size="small" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const num1 = ref(0)
const num2 = ref(0)
const num3 = ref(0)
</script>

<style scoped>
.input-number-demo {
  display: flex;
  gap: 10px;
}
</style>
```

## 控制按钮位置

通过 `controls-position` 属性可以设置控制按钮的位置。

```vue
<template>
  <div class="input-number-demo">
    <zx-input-number
      v-model="num1"
      :min="0"
      :max="100"
      controls-position="right"
    />
    <zx-input-number
      v-model="num2"
      :min="0"
      :max="100"
      controls-position="left"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const num1 = ref(0)
const num2 = ref(0)
</script>

<style scoped>
.input-number-demo {
  display: flex;
  gap: 10px;
}
</style>
```

## 禁用输入

通过 `disabled-input` 属性可以禁用输入框，只能通过控制按钮改变值。

```vue
<template>
  <zx-input-number
    v-model="num"
    :min="0"
    :max="100"
    :step="10"
    disabled-input
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const num = ref(0)
</script>
```

## 自定义按钮

通过 `decrease-button` 和 `increase-button` 插槽可以自定义增减按钮。

```vue
<template>
  <zx-input-number v-model="num" :min="0" :max="100">
    <template #decrease-button>
      <zx-icon name="minus" />
    </template>
    <template #increase-button>
      <zx-icon name="plus" />
    </template>
  </zx-input-number>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const num = ref(0)
</script>
```

## API

### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| modelValue | 绑定值 | number | - | - |
| min | 最小值 | number | - | -Infinity |
| max | 最大值 | number | - | Infinity |
| step | 步进值 | number | - | 1 |
| precision | 数值精度 | number | - | 0 |
| size | 尺寸 | string | large / default / small | default |
| disabled | 是否禁用 | boolean | - | false |
| disabled-input | 是否禁用输入框 | boolean | - | false |
| controls-position | 控制按钮位置 | string | right / left | right |
| placeholder | 占位文本 | string | - | - |
| name | 原生属性 | string | - | - |
| label | 输入框关联的label文字 | string | - | - |
| tabindex | 输入框的 tabindex | number | - | - |
| validate-event | 输入时是否触发表单的校验 | boolean | - | true |

### Events

| 事件名 | 说明 | 参数 |
|------|------|------|
| update:modelValue | 输入框值变化时触发 | value: number |
| change | 输入框值变化时触发 | value: number |
| focus | 输入框获得焦点时触发 | event: Event |
| blur | 输入框失去焦点时触发 | event: Event |

### Slots

| 插槽名 | 说明 | 参数 |
|------|------|------|
| decrease-button | 减少按钮的内容 | - |
| increase-button | 增加按钮的内容 | - |
``` 