# Checkbox 复选框

一组备选项中进行多选。

## 基础用法

单独使用可以表示两种状态之间的切换。

```vue
<template>
  <zx-checkbox v-model="checked">备选项</zx-checkbox>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const checked = ref(true)
</script>
```

## 禁用状态

多选框不可用状态。

```vue
<template>
  <zx-checkbox v-model="checked1" disabled>禁用</zx-checkbox>
  <zx-checkbox v-model="checked2" disabled>选中且禁用</zx-checkbox>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const checked1 = ref(false)
const checked2 = ref(true)
</script>
```

## 多选框组

适用于多个勾选框绑定到同一个数组的情景，通过是否勾选来表示这一组选项中选中的项。

```vue
<template>
  <zx-checkbox-group v-model="checkList">
    <zx-checkbox label="复选框 A" />
    <zx-checkbox label="复选框 B" />
    <zx-checkbox label="复选框 C" />
    <zx-checkbox label="禁用" disabled />
    <zx-checkbox label="选中且禁用" disabled />
  </zx-checkbox-group>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const checkList = ref(['选中且禁用', '复选框 A'])
</script>
```

## 中间状态

`indeterminate` 属性用以表示 checkbox 的不确定状态，一般用于实现全选的效果。

```vue
<template>
  <zx-checkbox
    v-model="checkAll"
    :indeterminate="isIndeterminate"
    @change="handleCheckAllChange"
  >全选</zx-checkbox>
  <zx-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
    <zx-checkbox v-for="city in cities" :key="city" :label="city">
      {{ city }}
    </zx-checkbox>
  </zx-checkbox-group>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const checkAll = ref(false)
const isIndeterminate = ref(true)
const checkedCities = ref(['上海', '北京'])
const cities = ['上海', '北京', '广州', '深圳']

const handleCheckAllChange = (val: boolean) => {
  checkedCities.value = val ? cities : []
  isIndeterminate.value = false
}

const handleCheckedCitiesChange = (value: string[]) => {
  const checkedCount = value.length
  checkAll.value = checkedCount === cities.length
  isIndeterminate.value = checkedCount > 0 && checkedCount < cities.length
}
</script>
```

## 可选项目数量的限制

使用 `min` 和 `max` 属性能够限制可以被勾选的项目的数量。

```vue
<template>
  <zx-checkbox-group 
    v-model="checkedCities"
    :min="1"
    :max="2"
  >
    <zx-checkbox v-for="city in cities" :key="city" :label="city">
      {{ city }}
    </zx-checkbox>
  </zx-checkbox-group>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const cities = ['上海', '北京', '广州', '深圳']
const checkedCities = ref(['上海', '北京'])
</script>
```

## 按钮样式

按钮样式的多选组合。

```vue
<template>
  <zx-checkbox-group v-model="checkboxGroup1">
    <zx-checkbox-button v-for="city in cities" :key="city" :label="city">
      {{ city }}
    </zx-checkbox-button>
  </zx-checkbox-group>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const cities = ['上海', '北京', '广州', '深圳']
const checkboxGroup1 = ref(['上海'])
</script>
```

## 带有边框

```vue
<template>
  <zx-checkbox v-model="checked1" label="备选项1" border />
  <zx-checkbox v-model="checked2" label="备选项2" border />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const checked1 = ref(true)
const checked2 = ref(false)
</script>
```

## API

### Checkbox 属性

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| v-model   | 绑定值   | boolean   | —   | —   |
| label     | 选中状态的值（只有在checkbox-group时有效） | string / number / boolean  | —   | —   |
| true-label | 选中时的值   | string / number    | —   | —   |
| false-label | 没有选中时的值   | string / number    | —   | —   |
| disabled  | 是否禁用    | boolean   | —   | false   |
| border    | 是否显示边框  | boolean   | —   | false   |
| size      | Checkbox 的尺寸  | string    | large / default / small  | default |
| name      | 原生 name 属性 | string    | —   | —   |
| checked   | 当前是否勾选    | boolean   | —   | false   |
| indeterminate | 设置 indeterminate 状态，只负责样式控制    | boolean   | —   | false   |

### Checkbox 事件

| 事件名称 | 说明    | 回调参数      |
|---------- |-------- |---------- |
| change  | 当绑定值变化时触发的事件 | 更新后的值 |

### Checkbox-group 属性

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| v-model   | 绑定值   | array    | —   | —   |
| size      | 多选框组尺寸   | string  | large / default / small  | default |
| disabled  | 是否禁用    | boolean   | —   | false   |
| min       | 可被勾选的 checkbox 的最小数量   | number    | —   | —   |
| max       | 可被勾选的 checkbox 的最大数量   | number    | —   | —   |
| text-color  | 按钮形式的 Checkbox 激活时的文本颜色   | string   | —   | #ffffff   |
| fill  | 按钮形式的 Checkbox 激活时的填充色和边框色   | string   | —   | #409EFF   |

### Checkbox-group 事件

| 事件名称 | 说明    | 回调参数      |
|---------- |-------- |---------- |
| change  | 当绑定值变化时触发的事件 | 更新后的值 |

### Checkbox-button 属性

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| label     | 选中状态的值   | string / number  | —   | —   |
| true-label | 选中时的值   | string / number    | —   | —   |
| false-label | 没有选中时的值   | string / number    | —   | —   |
| disabled  | 是否禁用    | boolean   | —   | false   |
| name      | 原生 name 属性 | string    | —   | —   |
| checked   | 当前是否勾选    | boolean   | —   | false   | 