<template>
  <div class="component-demo">
    <h1>Button 按钮</h1>
    <p class="component-description">按钮用于触发一个操作或事件，如提交表单、打开对话框等。</p>

    <h2>基础用法</h2>
    <div class="demo-block">
      <div class="demo-block-content">
        <zx-button>默认按钮</zx-button>
        <zx-button type="primary">主要按钮</zx-button>
        <zx-button type="success">成功按钮</zx-button>
        <zx-button type="warning">警告按钮</zx-button>
        <zx-button type="danger">危险按钮</zx-button>
      </div>
      <div class="demo-block-description">
        使用 <code>type</code> 属性可以设置不同类型的按钮，包括：默认、主要、成功、警告和危险。
      </div>
    </div>

    <h2>禁用状态</h2>
    <div class="demo-block">
      <div class="demo-block-content">
        <zx-button disabled>默认按钮</zx-button>
        <zx-button type="primary" disabled>主要按钮</zx-button>
        <zx-button type="success" disabled>成功按钮</zx-button>
        <zx-button type="warning" disabled>警告按钮</zx-button>
        <zx-button type="danger" disabled>危险按钮</zx-button>
      </div>
      <div class="demo-block-description">
        使用 <code>disabled</code> 属性可以禁用按钮，禁用状态下按钮不可点击。
      </div>
    </div>

    <h2>不同尺寸</h2>
    <div class="demo-block">
      <div class="demo-block-content">
        <zx-button size="small">小型按钮</zx-button>
        <zx-button>默认按钮</zx-button>
        <zx-button size="large">大型按钮</zx-button>
      </div>
      <div class="demo-block-description">
        使用 <code>size</code> 属性设置按钮大小，可选值为 <code>small</code>、<code>default</code> 和 <code>large</code>，默认为 <code>default</code>。
      </div>
    </div>

    <h2>圆角按钮</h2>
    <div class="demo-block">
      <div class="demo-block-content">
        <zx-button round>圆角按钮</zx-button>
        <zx-button type="primary" round>主要按钮</zx-button>
        <zx-button type="success" round>成功按钮</zx-button>
        <zx-button type="warning" round>警告按钮</zx-button>
        <zx-button type="danger" round>危险按钮</zx-button>
      </div>
      <div class="demo-block-description">
        使用 <code>round</code> 属性设置圆角按钮。
      </div>
    </div>

    <h2>图标按钮</h2>
    <div class="demo-block">
      <div class="demo-block-content">
        <zx-button icon="edit">编辑</zx-button>
        <zx-button icon="delete" type="danger">删除</zx-button>
        <zx-button icon="search" type="primary">搜索</zx-button>
        <zx-button icon="check" type="success">确认</zx-button>
      </div>
      <div class="demo-block-description">
        使用 <code>icon</code> 属性设置按钮图标。
      </div>
    </div>

    <h2>加载状态</h2>
    <div class="demo-block">
      <div class="demo-block-content">
        <zx-button loading>加载中</zx-button>
        <zx-button type="primary" loading>加载中</zx-button>
        <zx-button type="success" loading>加载中</zx-button>
      </div>
      <div class="demo-block-description">
        使用 <code>loading</code> 属性设置按钮加载状态。
      </div>
    </div>

    <h2>按钮组</h2>
    <div class="demo-block">
      <div class="demo-block-content">
        <zx-button-group>
          <zx-button type="primary" icon="left">上一页</zx-button>
          <zx-button type="primary">中间</zx-button>
          <zx-button type="primary" icon="right">下一页</zx-button>
        </zx-button-group>
      </div>
      <div class="demo-block-description">
        使用 <code>zx-button-group</code> 组件可以创建按钮组，将多个按钮放在一起组成按钮组。
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
          <td>type</td>
          <td>按钮类型</td>
          <td>string</td>
          <td>default / primary / success / warning / danger</td>
          <td>default</td>
        </tr>
        <tr>
          <td>size</td>
          <td>按钮尺寸</td>
          <td>string</td>
          <td>small / default / large</td>
          <td>default</td>
        </tr>
        <tr>
          <td>disabled</td>
          <td>是否禁用</td>
          <td>boolean</td>
          <td>true / false</td>
          <td>false</td>
        </tr>
        <tr>
          <td>round</td>
          <td>是否为圆角按钮</td>
          <td>boolean</td>
          <td>true / false</td>
          <td>false</td>
        </tr>
        <tr>
          <td>icon</td>
          <td>图标类名</td>
          <td>string</td>
          <td>—</td>
          <td>—</td>
        </tr>
        <tr>
          <td>loading</td>
          <td>是否显示加载状态</td>
          <td>boolean</td>
          <td>true / false</td>
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
          <td>click</td>
          <td>点击按钮时触发</td>
          <td>event: MouseEvent</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

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

.demo-block-content .zx-button {
  margin-right: 10px;
  margin-bottom: 10px;
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