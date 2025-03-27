# Tree 树形控件

Tree 组件用于展示树形结构的数据，支持多选、可拖拽、自定义节点内容等功能。

## 基础用法

```vue
<template>
  <zx-tree :data="treeData" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const treeData = ref([
  {
    label: '一级 1',
    children: [
      {
        label: '二级 1-1',
        children: [
          { label: '三级 1-1-1' }
        ]
      }
    ]
  },
  {
    label: '一级 2',
    children: [
      {
        label: '二级 2-1',
        children: [
          { label: '三级 2-1-1' }
        ]
      },
      { label: '二级 2-2' }
    ]
  }
])
</script>
```

## 可选择

通过 `show-checkbox` 属性可以设置节点可多选。

```vue
<template>
  <zx-tree
    :data="treeData"
    show-checkbox
    @check="handleCheck"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const treeData = ref([
  {
    label: '一级 1',
    children: [
      {
        label: '二级 1-1',
        children: [
          { label: '三级 1-1-1' }
        ]
      }
    ]
  }
])

const handleCheck = (data: any) => {
  console.log('选中的节点', data)
}
</script>
```

## 禁用状态

通过 `disabled` 属性可以禁用节点。

```vue
<template>
  <zx-tree :data="treeData" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const treeData = ref([
  {
    label: '一级 1',
    disabled: true,
    children: [
      {
        label: '二级 1-1',
        children: [
          { label: '三级 1-1-1' }
        ]
      }
    ]
  }
])
</script>
```

## 可拖拽

通过 `draggable` 属性可以设置节点可拖拽。

```vue
<template>
  <zx-tree
    :data="treeData"
    draggable
    @node-drag-start="handleDragStart"
    @node-drag-end="handleDragEnd"
    @node-drop="handleDrop"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const treeData = ref([
  {
    label: '一级 1',
    children: [
      {
        label: '二级 1-1',
        children: [
          { label: '三级 1-1-1' }
        ]
      }
    ]
  }
])

const handleDragStart = (node: any) => {
  console.log('开始拖拽', node)
}

const handleDragEnd = (node: any) => {
  console.log('结束拖拽', node)
}

const handleDrop = (draggingNode: any, dropNode: any) => {
  console.log('放置节点', draggingNode, dropNode)
}
</script>
```

## 自定义节点内容

通过 `zx-tree-node` 的默认插槽可以自定义节点内容。

```vue
<template>
  <zx-tree :data="treeData">
    <template #default="{ node, data }">
      <span class="custom-tree-node">
        <span>{{ node.label }}</span>
        <span>
          <zx-button
            type="text"
            size="small"
            @click="() => append(data)"
          >
            添加
          </zx-button>
          <zx-button
            type="text"
            size="small"
            @click="() => remove(node, data)"
          >
            删除
          </zx-button>
        </span>
      </span>
    </template>
  </zx-tree>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const treeData = ref([
  {
    label: '一级 1',
    children: [
      {
        label: '二级 1-1',
        children: [
          { label: '三级 1-1-1' }
        ]
      }
    ]
  }
])

const append = (data: any) => {
  const newChild = { label: '新节点' }
  if (!data.children) {
    data.children = []
  }
  data.children.push(newChild)
}

const remove = (node: any, data: any) => {
  const parent = node.parent
  const children = parent.data.children || parent.data
  const index = children.findIndex((d: any) => d.data.id === data.id)
  children.splice(index, 1)
}
</script>

<style scoped>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>
```

## 懒加载

通过 `lazy` 和 `load` 属性可以设置节点懒加载。

```vue
<template>
  <zx-tree
    :data="treeData"
    lazy
    :load="loadNode"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const treeData = ref([
  {
    label: '一级 1',
    children: []
  }
])

const loadNode = (node: any, resolve: Function) => {
  if (node.level === 0) {
    return resolve([
      { label: '二级 1-1' },
      { label: '二级 1-2' }
    ])
  }
  if (node.level === 1) {
    return resolve([
      { label: '三级 1-1-1' },
      { label: '三级 1-1-2' }
    ])
  }
  resolve([])
}
</script>
```

## 默认展开

通过 `default-expand-all` 属性可以设置默认展开所有节点。

```vue
<template>
  <zx-tree
    :data="treeData"
    default-expand-all
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const treeData = ref([
  {
    label: '一级 1',
    children: [
      {
        label: '二级 1-1',
        children: [
          { label: '三级 1-1-1' }
        ]
      }
    ]
  }
])
</script>
```

## API

### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| data | 展示数据 | array | - | [] |
| empty-text | 内容为空的时候展示的文本 | string | - | 暂无数据 |
| node-key | 每个树节点用来作为唯一标识的属性 | string | - | id |
| props | 配置选项，具体看下表 | object | - | - |
| render-after-expand | 是否在第一次展开某个树节点后才渲染其子节点 | boolean | - | true |
| show-checkbox | 节点是否可被选择 | boolean | - | false |
| default-expand-all | 是否默认展开所有节点 | boolean | - | false |
| expand-on-click-node | 是否在点击节点的时候展开或者收缩节点 | boolean | - | true |
| check-on-click-node | 是否在点击节点的时候选中节点 | boolean | - | false |
| check-descendants | 在显示复选框的情况下，是否严格的遵循父子不互相关联的做法 | boolean | - | false |
| check-strictly | 在显示复选框的情况下，是否严格的遵循父子不互相关联的做法 | boolean | - | false |
| default-expanded-keys | 默认展开的节点的 key 的数组 | array | - | - |
| show-line | 是否显示连接线 | boolean | - | false |
| draggable | 是否开启拖拽节点功能 | boolean | - | false |
| allow-drop | 判断节点能否被拖放 | function | - | - |
| allow-drag | 判断节点能否被拖拽 | function | - | - |

### Props 配置项

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| children | 指定子树为节点对象的某个属性值 | string | - | children |
| label | 指定节点标签为节点对象的某个属性值 | string | - | label |
| disabled | 指定节点选择框是否禁用为节点对象的某个属性值 | string | - | disabled |
| isLeaf | 指定节点是否为叶子节点，仅在指定了 lazy 属性的情况下生效 | string | - | isLeaf |

### Events

| 事件名 | 说明 | 参数 |
|------|------|------|
| node-click | 节点被点击时的回调 | 共三个参数，依次为：传递给 data 属性的数组中该节点所对应的对象、节点对应的 Node、节点组件本身 |
| node-contextmenu | 当某一节点被鼠标右键点击时会触发该事件 | 共四个参数，依次为：event、传递给 data 属性的数组中该节点所对应的对象、节点对应的 Node、节点组件本身 |
| check-change | 节点选中状态发生变化时的回调 | 共三个参数，依次为：传递给 data 属性的数组中该节点所对应的对象、节点本身是否被选中、节点的子树中是否有被选中的节点 |
| check | 当复选框被点击的时候触发 | 共两个参数，依次为：传递给 data 属性的数组中该节点所对应的对象、树目前的选中状态对象 |
| current-change | 当前选中节点变化时触发的事件 | 共两个参数，依次为：当前节点的数据，当前节点的 Node 对象 |
| node-expand | 节点被展开时触发的事件 | 共三个参数，依次为：传递给 data 属性的数组中该节点所对应的对象、节点对应的 Node、节点组件本身 |
| node-collapse | 节点被关闭时触发的事件 | 共三个参数，依次为：传递给 data 属性的数组中该节点所对应的对象、节点对应的 Node、节点组件本身 |
| node-drag-start | 节点开始拖拽时触发的事件 | 共两个参数，依次为：被拖拽节点对应的 Node、event |
| node-drag-enter | 拖拽进入其他节点时触发的事件 | 共三个参数，依次为：被拖拽节点对应的 Node、所进入节点对应的 Node、event |
| node-drag-leave | 拖拽离开某个节点时触发的事件 | 共三个参数，依次为：被拖拽节点对应的 Node、所离开节点对应的 Node、event |
| node-drag-over | 拖拽悬浮在其他节点上时触发的事件 | 共三个参数，依次为：被拖拽节点对应的 Node、当前进入节点对应的 Node、event |
| node-drag-end | 拖拽结束时触发的事件 | 共四个参数，依次为：被拖拽节点对应的 Node、最终被拖拽到的节点，可能为空、被拖拽节点的放置位置（top、bottom、inner）、event |
| node-drop | 拖拽结束后触发的事件 | 共四个参数，依次为：被拖拽节点对应的 Node、最终被拖拽到的节点，可能为空、被拖拽节点的放置位置（top、bottom、inner）、event |

### Methods

| 方法名 | 说明 | 参数 |
|------|------|------|
| filter | 对树节点进行筛选操作 | 接收一个参数，类型为 string 或者 function，string 表示过滤关键字，function 表示过滤方法 |
| updateKeyChildren | 通过 keys 设置节点子元素，使用此方法必须设置 node-key | (key, data) 接收两个参数，1. 要取得子节点的 key 值 2. 子节点数据 |
| getCheckedNodes | 若节点可被选择（即 show-checkbox 为 true），则返回目前被选中的节点所组成的数组 | (leafOnly, includeHalfChecked) 接收两个 boolean 类型的参数，1. 是否只是叶子节点，默认值为 false 2. 是否包含半选节点，默认值为 false |
| setCheckedNodes | 设置目前勾选的节点，使用此方法必须设置 node-key | (nodes) 接收勾选节点数据的数组 |
| getCheckedKeys | 若节点可被选择（即 show-checkbox 为 true），则返回目前被选中的节点的 key 所组成的数组 | (leafOnly) 接收一个 boolean 类型的参数，若为 true 则仅返回被选中的叶子节点的 keys，默认值为 false |
| setCheckedKeys | 通过 keys 设置目前勾选的节点，使用此方法必须设置 node-key | (keys, leafOnly) 接收两个参数，1. 要选中的节点的 key 的数组 2. 布尔值，若为 true 则仅设置叶子节点的选中状态，默认值为 false |
| setChecked | 通过 key / data 设置节点是否选中，使用此方法必须设置 node-key | (key/data, checked, deep) 接收三个参数，1. 要设置的节点的 key 或者 data 2. 布尔值，节点是否选中 3. 布尔值，是否设置子节点，默认为 false |
| getHalfCheckedNodes | 若节点可被选择，则返回目前半选中的节点所组成的数组 | - |
| getHalfCheckedKeys | 若节点可被选择，则返回目前半选中的节点的 key 所组成的数组 | - |
| getCurrentKey | 获取当前被选中节点的 key，使用此方法必须设置 node-key | - |
| getCurrentNode | 获取当前被选中节点的 data，若没有节点被选中则返回 null | - |
| setCurrentKey | 通过 key 设置某个节点的当前选中状态，使用此方法必须设置 node-key | (key) 要选中的节点的 key 值 |
| setCurrentNode | 通过 node 设置某个节点的当前选中状态，使用此方法必须设置 node-key | (node) 要选中的节点 |
| getNode | 根据 data 或者 key 拿到 Tree 组件中的 node | (data) 要得到 node 的 key 或者 data |
| remove | 删除 Tree 中的一个节点，使用此方法必须设置 node-key | (data) 要删除的节点的 data 或者 node |
| append | 为 Tree 中的一个节点追加一个子节点 | (data, parentNode) 接收两个参数，1. 要追加的子节点的 data 2. 子节点的 parent 的 data、key 或者 node |
| insertBefore | 为 Tree 的一个节点的前面增加一个节点 | (data, refNode) 接收两个参数，1. 要增加的节点的 data 2. 增加在该节点的前面，此节点的 data、key 或者 node |
| insertAfter | 为 Tree 的一个节点的后面增加一个节点 | (data, refNode) 接收两个参数，1. 要增加的节点的 data 2. 增加在该节点的后面，此节点的 data、key 或者 node |

### Slots

| 插槽名 | 说明 | 参数 |
|------|------|------|
| default | 自定义节点内容 | { node, data } | 