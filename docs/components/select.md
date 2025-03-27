# Select 选择器

当选项过多时，使用下拉菜单展示并选择内容。

## 基础用法

适用广泛的基础单选。

```vue
<template>
  <zx-select v-model="value" placeholder="请选择">
    <zx-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </zx-select>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
const options = [
  {
    value: '选项1',
    label: '黄金糕'
  },
  {
    value: '选项2',
    label: '双皮奶'
  },
  {
    value: '选项3',
    label: '蚵仔煎'
  },
  {
    value: '选项4',
    label: '龙须面'
  },
  {
    value: '选项5',
    label: '北京烤鸭'
  }
]
</script>
```

## 有禁用选项

在 `zx-option` 中，设定 `disabled` 值为 true，即可禁用该选项。

```vue
<template>
  <zx-select v-model="value" placeholder="请选择">
    <zx-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
      :disabled="item.disabled"
    />
  </zx-select>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
const options = [
  {
    value: '选项1',
    label: '黄金糕'
  },
  {
    value: '选项2',
    label: '双皮奶',
    disabled: true
  },
  {
    value: '选项3',
    label: '蚵仔煎'
  },
  {
    value: '选项4',
    label: '龙须面'
  }
]
</script>
```

## 禁用状态

为 `zx-select` 设置 `disabled` 属性，则整个选择器不可用。

```vue
<template>
  <zx-select v-model="value" disabled placeholder="请选择">
    <zx-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </zx-select>
</template>
```

## 可清空单选

包含清空按钮，可将选择器清空为初始状态。

```vue
<template>
  <zx-select v-model="value" clearable placeholder="请选择">
    <zx-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </zx-select>
</template>
```

## 多选

适用性较广的基础多选，用 Tag 展示已选项。

```vue
<template>
  <zx-select v-model="value" multiple placeholder="请选择">
    <zx-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </zx-select>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref([])
</script>
```

## 自定义模板

可以自定义备选项的显示内容。

```vue
<template>
  <zx-select v-model="value" placeholder="请选择">
    <zx-option
      v-for="item in cities"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    >
      <span style="float: left">{{ item.label }}</span>
      <span style="float: right; color: #8492a6; font-size: 13px">
        {{ item.value }}
      </span>
    </zx-option>
  </zx-select>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
const cities = [
  {
    value: 'Beijing',
    label: '北京'
  },
  {
    value: 'Shanghai',
    label: '上海'
  },
  {
    value: 'Guangzhou',
    label: '广州'
  },
  {
    value: 'Shenzhen',
    label: '深圳'
  }
]
</script>
```

## API

### Select 属性

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| v-model   | 绑定值        | string / number / boolean / object / array | — | — |
| multiple  | 是否多选      | boolean   | —                               | false   |
| disabled  | 是否禁用      | boolean   | —                               | false   |
| clearable | 是否可以清空选项 | boolean   | —                            | false   |
| placeholder| 占位符       | string    | —                               | 请选择   |
| size      | 输入框尺寸     | string    | large/small                     | —      |
| filterable| 是否可搜索     | boolean   | —                              | false   |

### Select 事件

| 事件名称 | 说明 | 回调参数 |
|---------|---------|---------|
| change | 选中值发生变化时触发 | 目前的选中值 |
| clear | 可清空的单选模式下用户点击清空按钮时触发 | — |
| blur | 当 input 失去焦点时触发 | (event: Event) |
| focus | 当 input 获得焦点时触发 | (event: Event) |

### Select 插槽

| 插槽名 | 说明 |
|---------|---------|
| — | Option 组件列表 |
| prefix | Select 组件头部内容 |
| empty | 无选项时的列表 |

### Option 属性

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| value     | 选项的值      | string/number/boolean/object | —            | —      |
| label     | 选项的标签     | string/number   | —                        | —      |
| disabled  | 是否禁用      | boolean   | —                               | false   |

### Option 插槽

| 插槽名 | 说明 |
|---------|---------|
| — | 默认插槽，Option 的内容 | 