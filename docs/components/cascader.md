# Cascader 级联选择器

Cascader 组件用于选择多级数据，常用于省市区、组织架构等场景。

## 基础用法

```vue
<template>
  <zx-cascader v-model="value" :options="options"></zx-cascader>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref([])
const options = [
  {
    value: 'zhejiang',
    label: '浙江',
    children: [
      {
        value: 'hangzhou',
        label: '杭州',
        children: [
          { value: 'xihu', label: '西湖' },
          { value: 'xiacheng', label: '下城' }
        ]
      }
    ]
  }
]
</script>
```

## 禁用状态

设置 `disabled` 属性可以禁用级联选择器。

```vue
<template>
  <zx-cascader v-model="value" :options="options" disabled></zx-cascader>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(['zhejiang', 'hangzhou', 'xihu'])
const options = [
  {
    value: 'zhejiang',
    label: '浙江',
    children: [
      {
        value: 'hangzhou',
        label: '杭州',
        children: [
          { value: 'xihu', label: '西湖' },
          { value: 'xiacheng', label: '下城' }
        ]
      }
    ]
  }
]
</script>
```

## 可清空

设置 `clearable` 属性可以清空已选择的值。

```vue
<template>
  <zx-cascader v-model="value" :options="options" clearable></zx-cascader>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref([])
const options = [
  {
    value: 'zhejiang',
    label: '浙江',
    children: [
      {
        value: 'hangzhou',
        label: '杭州',
        children: [
          { value: 'xihu', label: '西湖' },
          { value: 'xiacheng', label: '下城' }
        ]
      }
    ]
  }
]
</script>
```

## 自定义选项

通过 `props` 属性可以自定义选项的字段名。

```vue
<template>
  <zx-cascader
    v-model="value"
    :options="options"
    :props="props"
  ></zx-cascader>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref([])
const options = [
  {
    id: 'zhejiang',
    name: '浙江',
    items: [
      {
        id: 'hangzhou',
        name: '杭州',
        items: [
          { id: 'xihu', name: '西湖' },
          { id: 'xiacheng', name: '下城' }
        ]
      }
    ]
  }
]
const props = {
  value: 'id',
  label: 'name',
  children: 'items'
}
</script>
```

## 动态加载

通过 `lazy` 和 `lazyLoad` 属性可以实现动态加载选项。

```vue
<template>
  <zx-cascader
    v-model="value"
    :options="options"
    lazy
    :lazyLoad="lazyLoad"
  ></zx-cascader>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref([])
const options = [
  {
    value: 'zhejiang',
    label: '浙江',
    leaf: false
  }
]

const lazyLoad = (node: any, resolve: Function) => {
  const { level } = node
  setTimeout(() => {
    const nodes = Array.from({ length: level + 1 })
      .map((_, index) => ({
        value: `${level}-${index}`,
        label: `选项${level}-${index}`,
        leaf: level >= 2
      }))
    resolve(nodes)
  }, 500)
}
</script>
```

## 自定义样式

通过 `scopedSlots` 可以自定义选项的样式。

```vue
<template>
  <zx-cascader
    v-model="value"
    :options="options"
    :scopedSlots="scopedSlots"
  ></zx-cascader>
</template>

<script setup lang="ts">
import { ref, h } from 'vue'

const value = ref([])
const options = [
  {
    value: 'zhejiang',
    label: '浙江',
    children: [
      {
        value: 'hangzhou',
        label: '杭州',
        children: [
          { value: 'xihu', label: '西湖' },
          { value: 'xiacheng', label: '下城' }
        ]
      }
    ]
  }
]

const scopedSlots = {
  default: ({ node, data }: any) => {
    return h('span', [
      h('span', data.label),
      h('span', { style: { color: '#999', marginLeft: '8px' } }, `(${data.value})`)
    ])
  }
}
</script>
```

## API

### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| modelValue | 绑定值 | array | - | [] |
| options | 可选项数据源 | array | - | [] |
| disabled | 是否禁用 | boolean | - | false |
| clearable | 是否支持清空选项 | boolean | - | false |
| placeholder | 输入框占位文本 | string | - | '请选择' |
| props | 配置选项 | object | - | - |
| lazy | 是否动态加载子节点 | boolean | - | false |
| lazyLoad | 加载动态数据的方法 | function | - | - |
| scopedSlots | 自定义选项的插槽 | object | - | - |

### Events

| 事件名 | 说明 | 参数 |
|------|------|------|
| update:modelValue | 值改变时触发 | value |
| change | 值改变时触发 | value |
| expand-change | 展开节点时触发 | expandedNodes | 