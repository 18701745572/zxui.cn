# Table 表格

Table 组件用于展示多条结构类似的数据，支持排序、筛选、分页、自定义列等功能。

## 基础用法

```vue
<template>
  <zx-table :data="tableData">
    <zx-table-column prop="date" label="日期" />
    <zx-table-column prop="name" label="姓名" />
    <zx-table-column prop="address" label="地址" />
  </zx-table>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const tableData = ref([
  {
    date: '2024-03-15',
    name: '张三',
    address: '北京市朝阳区'
  },
  {
    date: '2024-03-16',
    name: '李四',
    address: '上海市浦东新区'
  }
])
</script>
```

## 带斑马纹表格

通过 `stripe` 属性可以创建带斑马纹的表格。

```vue
<template>
  <zx-table :data="tableData" stripe>
    <zx-table-column prop="date" label="日期" />
    <zx-table-column prop="name" label="姓名" />
    <zx-table-column prop="address" label="地址" />
  </zx-table>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const tableData = ref([
  {
    date: '2024-03-15',
    name: '张三',
    address: '北京市朝阳区'
  },
  {
    date: '2024-03-16',
    name: '李四',
    address: '上海市浦东新区'
  }
])
</script>
```

## 带边框表格

通过 `border` 属性可以创建带边框的表格。

```vue
<template>
  <zx-table :data="tableData" border>
    <zx-table-column prop="date" label="日期" />
    <zx-table-column prop="name" label="姓名" />
    <zx-table-column prop="address" label="地址" />
  </zx-table>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const tableData = ref([
  {
    date: '2024-03-15',
    name: '张三',
    address: '北京市朝阳区'
  },
  {
    date: '2024-03-16',
    name: '李四',
    address: '上海市浦东新区'
  }
])
</script>
```

## 可排序表格

通过 `sortable` 属性可以设置列可排序。

```vue
<template>
  <zx-table :data="tableData">
    <zx-table-column prop="date" label="日期" sortable />
    <zx-table-column prop="name" label="姓名" sortable />
    <zx-table-column prop="address" label="地址" />
  </zx-table>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const tableData = ref([
  {
    date: '2024-03-15',
    name: '张三',
    address: '北京市朝阳区'
  },
  {
    date: '2024-03-16',
    name: '李四',
    address: '上海市浦东新区'
  }
])
</script>
```

## 可筛选表格

通过 `filters` 和 `filter-method` 属性可以设置列可筛选。

```vue
<template>
  <zx-table :data="tableData">
    <zx-table-column prop="date" label="日期" />
    <zx-table-column
      prop="name"
      label="姓名"
      :filters="[
        { text: '张三', value: '张三' },
        { text: '李四', value: '李四' }
      ]"
      :filter-method="filterHandler"
    />
    <zx-table-column prop="address" label="地址" />
  </zx-table>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const tableData = ref([
  {
    date: '2024-03-15',
    name: '张三',
    address: '北京市朝阳区'
  },
  {
    date: '2024-03-16',
    name: '李四',
    address: '上海市浦东新区'
  }
])

const filterHandler = (value: string, row: any) => {
  return row.name === value
}
</script>
```

## 自定义列模板

通过默认插槽可以自定义列的内容。

```vue
<template>
  <zx-table :data="tableData">
    <zx-table-column prop="date" label="日期" />
    <zx-table-column prop="name" label="姓名" />
    <zx-table-column label="操作">
      <template #default="scope">
        <zx-button size="small" @click="handleEdit(scope.row)">编辑</zx-button>
        <zx-button
          size="small"
          type="danger"
          @click="handleDelete(scope.row)"
        >删除</zx-button>
      </template>
    </zx-table-column>
  </zx-table>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const tableData = ref([
  {
    date: '2024-03-15',
    name: '张三',
    address: '北京市朝阳区'
  },
  {
    date: '2024-03-16',
    name: '李四',
    address: '上海市浦东新区'
  }
])

const handleEdit = (row: any) => {
  console.log('编辑', row)
}

const handleDelete = (row: any) => {
  console.log('删除', row)
}
</script>
```

## 多选表格

通过 `type="selection"` 可以设置多选列。

```vue
<template>
  <zx-table :data="tableData" @selection-change="handleSelectionChange">
    <zx-table-column type="selection" width="55" />
    <zx-table-column prop="date" label="日期" />
    <zx-table-column prop="name" label="姓名" />
    <zx-table-column prop="address" label="地址" />
  </zx-table>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const tableData = ref([
  {
    date: '2024-03-15',
    name: '张三',
    address: '北京市朝阳区'
  },
  {
    date: '2024-03-16',
    name: '李四',
    address: '上海市浦东新区'
  }
])

const handleSelectionChange = (selection: any[]) => {
  console.log('选中的行', selection)
}
</script>
```

## 展开行

通过 `type="expand"` 可以设置展开列。

```vue
<template>
  <zx-table :data="tableData">
    <zx-table-column type="expand">
      <template #default="props">
        <p>姓名: {{ props.row.name }}</p>
        <p>地址: {{ props.row.address }}</p>
      </template>
    </zx-table-column>
    <zx-table-column prop="date" label="日期" />
    <zx-table-column prop="name" label="姓名" />
    <zx-table-column prop="address" label="地址" />
  </zx-table>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const tableData = ref([
  {
    date: '2024-03-15',
    name: '张三',
    address: '北京市朝阳区'
  },
  {
    date: '2024-03-16',
    name: '李四',
    address: '上海市浦东新区'
  }
])
</script>
```

## 固定表头

通过 `height` 属性可以固定表头。

```vue
<template>
  <zx-table :data="tableData" height="250">
    <zx-table-column prop="date" label="日期" />
    <zx-table-column prop="name" label="姓名" />
    <zx-table-column prop="address" label="地址" />
  </zx-table>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const tableData = ref([
  {
    date: '2024-03-15',
    name: '张三',
    address: '北京市朝阳区'
  },
  {
    date: '2024-03-16',
    name: '李四',
    address: '上海市浦东新区'
  }
])
</script>
```

## 固定列

通过 `fixed` 属性可以固定列。

```vue
<template>
  <zx-table :data="tableData" border>
    <zx-table-column prop="date" label="日期" fixed />
    <zx-table-column prop="name" label="姓名" />
    <zx-table-column prop="address" label="地址" />
    <zx-table-column prop="zip" label="邮编" fixed="right" />
  </zx-table>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const tableData = ref([
  {
    date: '2024-03-15',
    name: '张三',
    address: '北京市朝阳区',
    zip: '100000'
  },
  {
    date: '2024-03-16',
    name: '李四',
    address: '上海市浦东新区',
    zip: '200000'
  }
])
</script>
```

## API

### Table Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| data | 显示的数据 | array | - | [] |
| height | Table 的高度，默认为自动高度 | string / number | - | - |
| max-height | Table 的最大高度 | string / number | - | - |
| stripe | 是否显示斑马纹 | boolean | - | false |
| border | 是否带有边框 | boolean | - | false |
| size | Table 的尺寸 | string | large / default / small | - |
| fit | 列的宽度是否自撑开 | boolean | - | true |
| show-header | 是否显示表头 | boolean | - | true |
| highlight-current-row | 是否要高亮当前行 | boolean | - | false |
| current-row-key | 当前行的 key，用于设置行是否选中 | string / number | - | - |
| empty-text | 空数据文本 | string | - | 暂无数据 |
| row-class-name | 行的 className 的回调方法 | function | - | - |
| row-style | 行的 style 的回调方法 | function | - | - |
| cell-class-name | 单元格的 className 的回调方法 | function | - | - |
| cell-style | 单元格的 style 的回调方法 | function | - | - |
| header-row-class-name | 表头行的 className 的回调方法 | function | - | - |
| header-row-style | 表头行的 style 的回调方法 | function | - | - |
| header-cell-class-name | 表头单元格的 className 的回调方法 | function | - | - |
| header-cell-style | 表头单元格的 style 的回调方法 | function | - | - |

### Table Events

| 事件名 | 说明 | 参数 |
|------|------|------|
| select | 当用户手动勾选数据行的 Checkbox 时触发的事件 | selection, row |
| select-all | 当用户手动勾选全选 Checkbox 时触发的事件 | selection |
| selection-change | 当选择项发生变化时会触发该事件 | selection |
| cell-click | 当某个单元格被点击时会触发该事件 | row, column, cell, event |
| row-click | 当某一行被点击时会触发该事件 | row, column, event |
| row-dblclick | 当某一行被双击时会触发该事件 | row, column, event |
| sort-change | 当表格的排序条件发生变化的时候会触发该事件 | { column, prop, order } |
| filter-change | 当表格的筛选条件发生变化的时候会触发该事件 | filters |
| current-change | 当表格的当前行发生变化的时候会触发该事件 | currentRow, oldCurrentRow |
| header-click | 当表格的表头被点击时会触发该事件 | column, event |
| expand-change | 当用户对某一行展开或者关闭的时候会触发该事件 | expandedRows |

### Table Methods

| 方法名 | 说明 | 参数 |
|------|------|------|
| clearSelection | 用于多选表格，清空用户的选择 | - |
| toggleRowSelection | 用于多选表格，切换某一行的选中状态 | row, selected |
| toggleAllSelection | 用于多选表格，切换全选和半选状态 | - |
| toggleRowExpansion | 用于可展开表格，切换某一行的展开状态 | row, expanded |
| setCurrentRow | 用于单选表格，设定某一行为选中行 | row |
| clearSort | 用于清空排序条件 | - |
| clearFilter | 用于清空过滤条件 | columnKey |
| doLayout | 对 Table 进行重新布局 | - |
| sort | 手动对 Table 进行排序 | prop, order |

### TableColumn Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| type | 对应列的类型 | string | selection / index / expand | - |
| index | 如果设置了 type=index，可以通过传递 index 属性来自定义索引 | number / function | - | - |
| label | 显示的标题 | string | - | - |
| prop | 对应列内容的字段名 | string | - | - |
| width | 对应列的宽度 | string / number | - | - |
| min-width | 对应列的最小宽度 | string / number | - | - |
| fixed | 列是否固定在左侧或者右侧 | boolean / string | true / left / right | - |
| sortable | 对应列是否可以排序 | boolean / string | true / false / 'custom' | false |
| sort-method | 对数据进行排序的时候使用的方法 | function | - | - |
| sort-by | 指定数据按照哪个属性进行排序 | string / array / function | - | - |
| resizable | 对应列是否可以通过拖动改变宽度 | boolean | - | false |
| formatter | 用来格式化内容 | function | - | - |
| show-overflow-tooltip | 当内容过长被隐藏时显示 tooltip | boolean | - | false |
| align | 对齐方式 | string | left / center / right | left |
| header-align | 表头对齐方式 | string | left / center / right | - |
| class-name | 列的 className | string | - | - |
| label-class-name | 当前列标题的自定义类名 | string | - | - |
| reserve-selection | 仅对 type=selection 的列有效，类型为 Boolean，为 true 则会在数据更新之后保留之前的选择的数据 | boolean | - | false |
| filters | 数据过滤的选项 | array[{ text, value }] | - | - |
| filter-placement | 过滤弹出框的定位 | string | top / top-start / top-end / bottom / bottom-start / bottom-end / left / left-start / left-end / right / right-start / right-end | - |
| filter-multiple | 数据过滤的选项是否多选 | boolean | - | true |
| filter-method | 数据过滤使用的方法 | function | - | - |
| filtered-value | 选中的数据过滤项 | array | - | - | 