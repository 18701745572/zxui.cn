# ColorPicker 颜色选择器

ColorPicker 组件用于颜色选择，支持多种颜色格式、预设颜色、透明度等功能。

## 基础用法

```vue
<template>
  <zx-color-picker v-model="color"></zx-color-picker>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const color = ref('#409eff')
</script>
```

## 不同颜色格式

支持 `hex`、`rgb`、`hsl`、`hsv` 等颜色格式。

```vue
<template>
  <zx-color-picker
    v-model="color"
    color-format="rgb"
    show-alpha
  ></zx-color-picker>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const color = ref('rgb(64, 158, 255)')
</script>
```

## 预设颜色

通过 `predefine` 属性可以设置预设颜色。

```vue
<template>
  <zx-color-picker
    v-model="color"
    :predefine="predefineColors"
  ></zx-color-picker>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const color = ref('#409eff')
const predefineColors = [
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585'
]
</script>
```

## 禁用状态

通过 `disabled` 属性可以禁用颜色选择器。

```vue
<template>
  <zx-color-picker
    v-model="color"
    disabled
  ></zx-color-picker>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const color = ref('#409eff')
</script>
```

## 透明度

设置 `show-alpha` 属性可以启用透明度选择。

```vue
<template>
  <zx-color-picker
    v-model="color"
    show-alpha
  ></zx-color-picker>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const color = ref('rgba(64, 158, 255, 0.5)')
</script>
```

## 自定义触发器

通过 `trigger` 插槽可以自定义触发器。

```vue
<template>
  <zx-color-picker v-model="color">
    <template #trigger>
      <zx-button>选择颜色</zx-button>
    </template>
  </zx-color-picker>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const color = ref('#409eff')
</script>
```

## 禁用透明度

设置 `show-alpha` 为 `false` 可以禁用透明度选择。

```vue
<template>
  <zx-color-picker
    v-model="color"
    :show-alpha="false"
  ></zx-color-picker>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const color = ref('#409eff')
</script>
```

## API

### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| modelValue | 绑定值 | string | - | - |
| disabled | 是否禁用 | boolean | - | false |
| size | 尺寸 | string | large / default / small | default |
| show-alpha | 是否支持透明度选择 | boolean | - | false |
| color-format | 写入 v-model 的颜色的格式 | string | hex / rgb / hsl / hsv | hex |
| popper-class | 自定义浮层类名 | string | - | - |
| predefine | 预定义颜色 | array | - | - |
| validate-event | 输入时是否触发表单的校验 | boolean | - | true |

### Events

| 事件名 | 说明 | 参数 |
|------|------|------|
| change | 当输入值改变时触发 | (color: string) |
| active-change | 面板中当前显示的颜色发生改变时触发 | (color: string) |

### Slots

| 插槽名 | 说明 | 参数 |
|------|------|------|
| default | 默认插槽，用于自定义触发器 | - |
``` 