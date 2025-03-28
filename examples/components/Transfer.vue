<template>
  <div class="component-demo">
    <h1>Transfer 穿梭框</h1>
    <p class="component-description">双栏穿梭选择框，将元素从一栏移动到另一栏。</p>

    <h2>基础用法</h2>
    <div class="demo-block">
      <div class="demo-block-content">
        <zx-transfer
          v-model:value="selectedKeys"
          :data="transferData"
        ></zx-transfer>
      </div>
      <div class="demo-block-description">
        Transfer 穿梭框的基础用法示例。通过 data 属性传入数据源，通过 v-model:value 绑定选中项。
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
          <td>数据源</td>
          <td>Array</td>
          <td>-</td>
          <td>[]</td>
        </tr>
        <tr>
          <td>value / v-model:value</td>
          <td>选中项的值</td>
          <td>Array</td>
          <td>-</td>
          <td>[]</td>
        </tr>
        <tr>
          <td>filterable</td>
          <td>是否可搜索</td>
          <td>boolean</td>
          <td>-</td>
          <td>false</td>
        </tr>
        <tr>
          <td>size</td>
          <td>尺寸</td>
          <td>string</td>
          <td>small/medium/large</td>
          <td>medium</td>
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
          <td>change</td>
          <td>值变化时触发</td>
          <td>(value: array, direction: string)</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const transferData = [
  { key: '1', label: '选项1' },
  { key: '2', label: '选项2' },
  { key: '3', label: '选项3' },
  { key: '4', label: '选项4' },
  { key: '5', label: '选项5' }
]

const selectedKeys = ref<(string | number)[]>([])
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