<template>
  <div class="component-demo">
    <h1>Table 表格</h1>
    <p class="component-description">用于展示多条结构类似的数据，可对数据进行排序、筛选、对比或其他自定义操作。</p>

    <h2>基础用法</h2>
    <div class="demo-block">
      <div class="demo-block-content">
        <zx-table
          :data="tableData"
          :columns="tableColumns"
        ></zx-table>
      </div>
      <div class="demo-block-description">
        Table 表格的基础用法示例。通过 data 属性传入数据源，通过 columns 属性定义表格列。
      </div>
    </div>

    <h2>属性</h2>
    <table class="props-table">
      <thead>
        <tr>
          <th>属性名</th>
          <th>说明</th>
          <th>类型</th>
          <th>可选值</th>
          <th>默认值</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>data</td>
          <td>显示的数据</td>
          <td>array</td>
          <td>-</td>
          <td>[]</td>
        </tr>
        <tr>
          <td>columns</td>
          <td>表格列的配置描述</td>
          <td>array</td>
          <td>-</td>
          <td>[]</td>
        </tr>
        <tr>
          <td>stripe</td>
          <td>是否为斑马纹表格</td>
          <td>boolean</td>
          <td>-</td>
          <td>false</td>
        </tr>
        <tr>
          <td>border</td>
          <td>是否带有边框</td>
          <td>boolean</td>
          <td>-</td>
          <td>false</td>
        </tr>
      </tbody>
    </table>

    <h2>事件</h2>
    <table class="props-table">
      <thead>
        <tr>
          <th>事件名</th>
          <th>说明</th>
          <th>回调参数</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>row-click</td>
          <td>当某一行被点击时触发</td>
          <td>row, column, event</td>
        </tr>
        <tr>
          <td>sort-change</td>
          <td>当表格的排序条件发生变化时触发</td>
          <td>{ column, prop, order }</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
interface TableColumn {
  prop: string
  label: string
  width?: number
  sortable?: boolean
}

interface TableData {
  id: number
  name: string
  age: number
  address: string
}

const tableColumns: TableColumn[] = [
  { prop: 'id', label: 'ID', width: 80 },
  { prop: 'name', label: '姓名', width: 120 },
  { prop: 'age', label: '年龄', width: 100, sortable: true },
  { prop: 'address', label: '地址' }
]

const tableData: TableData[] = [
  { id: 1, name: '张三', age: 25, address: '北京市朝阳区' },
  { id: 2, name: '李四', age: 30, address: '上海市浦东新区' },
  { id: 3, name: '王五', age: 28, address: '广州市天河区' },
  { id: 4, name: '赵六', age: 32, address: '深圳市南山区' }
]
</script>

<style scoped>
.component-demo {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
}

.component-description {
  margin-bottom: 30px;
  font-size: 16px;
  color: #606266;
}

h1 {
  margin-bottom: 20px;
  font-size: 28px;
  font-weight: 500;
  color: #303133;
}

h2 {
  margin: 45px 0 15px;
  font-size: 22px;
  font-weight: 500;
  color: #303133;
}

.demo-block {
  margin-bottom: 30px;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  transition: .2s;
}

.demo-block-content {
  padding: 24px;
  border-bottom: 1px solid #e4e7ed;
}

.demo-block-description {
  padding: 18px 24px;
  background-color: #fafafa;
  font-size: 14px;
  line-height: 1.5;
  color: #606266;
}

code {
  background-color: #f0f2f5;
  padding: 2px 4px;
  border-radius: 3px;
  font-family: 'Courier New', monospace;
  font-size: 12px;
  color: #e6a23c;
}

.props-table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  font-size: 14px;
}

.props-table th,
.props-table td {
  text-align: left;
  padding: 12px 15px;
  border-bottom: 1px solid #ebeef5;
}

.props-table th {
  background-color: #fafafa;
  color: #303133;
  font-weight: 500;
}

.props-table td {
  color: #606266;
}
</style>