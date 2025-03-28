<template>
  <div class="component-demo">
    <h1>Alert 警告</h1>
    <p class="component-description">用于页面中展示重要的提示信息。</p>

    <h2>基础用法</h2>
    <div class="demo-block">
      <div class="demo-block-content">
        <zx-alert title="默认提示信息" />
      </div>
      <div class="demo-block-description">
        Alert 组件提供了四种类型，默认为 <code>info</code>。
      </div>
    </div>

    <h2>不同类型</h2>
    <div class="demo-block">
      <div class="demo-block-content">
        <zx-alert title="成功提示" type="success" />
        <zx-alert title="信息提示" type="info" />
        <zx-alert title="警告提示" type="warning" />
        <zx-alert title="错误提示" type="error" />
      </div>
      <div class="demo-block-description">
        通过 <code>type</code> 属性设置不同类型，可选值有 <code>success</code>、<code>info</code>、<code>warning</code> 和 <code>error</code>。
      </div>
    </div>

    <h2>带有图标</h2>
    <div class="demo-block">
      <div class="demo-block-content">
        <zx-alert title="成功提示" type="success" show-icon />
        <zx-alert title="信息提示" type="info" show-icon />
        <zx-alert title="警告提示" type="warning" show-icon />
        <zx-alert title="错误提示" type="error" show-icon />
      </div>
      <div class="demo-block-description">
        通过 <code>show-icon</code> 属性显示图标，图标类型会根据 <code>type</code> 自动匹配。
      </div>
    </div>

    <h2>可关闭的提示</h2>
    <div class="demo-block">
      <div class="demo-block-content">
        <zx-alert title="不可关闭的提示" :closable="false" />
        <zx-alert title="自定义关闭按钮" close-text="关闭" />
      </div>
      <div class="demo-block-description">
        默认情况下 Alert 组件是可以关闭的，通过 <code>closable</code> 属性可以控制关闭按钮的显示，也可以通过 <code>close-text</code> 自定义关闭按钮的文字。
      </div>
    </div>

    <h2>带有辅助文本</h2>
    <div class="demo-block">
      <div class="demo-block-content">
        <zx-alert
          title="带有辅助文本"
          type="success"
          description="这是一条带有辅助文本的警告提示，辅助文本可以更详细地说明警告内容，也可以包含更多信息。"
        />
      </div>
      <div class="demo-block-description">
        通过 <code>description</code> 属性可以设置辅助文本，辅助文本会显示在标题下方。
      </div>
    </div>

    <h2>带有图标和辅助文本</h2>
    <div class="demo-block">
      <div class="demo-block-content">
        <zx-alert
          title="成功提示"
          type="success"
          description="这是一条成功提示的辅助文本，用于进一步说明成功信息。"
          show-icon
        />
        <zx-alert
          title="信息提示"
          type="info"
          description="这是一条信息提示的辅助文本，用于进一步说明提示信息。"
          show-icon
        />
        <zx-alert
          title="警告提示"
          type="warning"
          description="这是一条警告提示的辅助文本，用于进一步说明警告信息。"
          show-icon
        />
        <zx-alert
          title="错误提示"
          type="error"
          description="这是一条错误提示的辅助文本，用于进一步说明错误信息。"
          show-icon
        />
      </div>
      <div class="demo-block-description">
        同时使用 <code>show-icon</code> 和 <code>description</code> 属性可以展示带有图标和辅助文本的警告提示。
      </div>
    </div>

    <h2>自定义图标</h2>
    <div class="demo-block">
      <div class="demo-block-content">
        <zx-alert title="自定义图标" icon="bell" show-icon />
        <zx-alert title="自定义成功图标" type="success" icon="check-circle" show-icon />
      </div>
      <div class="demo-block-description">
        通过 <code>icon</code> 属性可以自定义图标，优先级高于 <code>show-icon</code>。
      </div>
    </div>

    <h2>居中显示</h2>
    <div class="demo-block">
      <div class="demo-block-content">
        <zx-alert
          title="居中显示的警告提示"
          type="success"
          description="这是一条居中显示的警告提示，文本居中对齐。"
          show-icon
          center
        />
      </div>
      <div class="demo-block-description">
        通过 <code>center</code> 属性可以让文字居中显示。
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
          <td>title</td>
          <td>标题</td>
          <td>string</td>
          <td>—</td>
          <td>—</td>
        </tr>
        <tr>
          <td>type</td>
          <td>类型</td>
          <td>string</td>
          <td>success / info / warning / error</td>
          <td>info</td>
        </tr>
        <tr>
          <td>description</td>
          <td>辅助文本</td>
          <td>string</td>
          <td>—</td>
          <td>—</td>
        </tr>
        <tr>
          <td>closable</td>
          <td>是否可关闭</td>
          <td>boolean</td>
          <td>true / false</td>
          <td>true</td>
        </tr>
        <tr>
          <td>close-text</td>
          <td>关闭按钮文本</td>
          <td>string</td>
          <td>—</td>
          <td>—</td>
        </tr>
        <tr>
          <td>show-icon</td>
          <td>是否显示图标</td>
          <td>boolean</td>
          <td>true / false</td>
          <td>false</td>
        </tr>
        <tr>
          <td>icon</td>
          <td>自定义图标</td>
          <td>string</td>
          <td>—</td>
          <td>—</td>
        </tr>
        <tr>
          <td>center</td>
          <td>文字是否居中</td>
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
          <td>close</td>
          <td>关闭 Alert 时触发</td>
          <td>—</td>
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

.demo-block-content .zx-alert {
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