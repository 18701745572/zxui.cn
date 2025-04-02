<template>
  <div class="component-demo">
    <h1>Tooltip 文字提示</h1>
    <p class="component-description">简单的文字提示气泡框。</p>

    <h2>基础用法</h2>
    <div class="demo-block">
      <div class="demo-block-content">
        <div class="tooltip-demo">
          <zx-tooltip content="这是一个提示文字">
            <zx-button>鼠标悬停</zx-button>
          </zx-tooltip>
        </div>
      </div>
      <div class="demo-block-description">
        使用 <code>content</code> 属性来设置提示内容。Tooltip 会在鼠标悬停在触发元素上时显示。
      </div>
    </div>

    <h2>不同位置</h2>
    <div class="demo-block">
      <div class="demo-block-content">
        <div class="tooltip-placement-demo">
          <div class="top-row">
            <zx-tooltip content="Top Left 提示" placement="top-start">
              <zx-button>上左</zx-button>
            </zx-tooltip>
            <zx-tooltip content="Top 提示" placement="top">
              <zx-button>上边</zx-button>
            </zx-tooltip>
            <zx-tooltip content="Top Right 提示" placement="top-end">
              <zx-button>上右</zx-button>
            </zx-tooltip>
          </div>
          <div class="left-right-row">
            <div class="left-col">
              <zx-tooltip content="Left Top 提示" placement="left-start">
                <zx-button>左上</zx-button>
              </zx-tooltip>
              <zx-tooltip content="Left 提示" placement="left">
                <zx-button>左边</zx-button>
              </zx-tooltip>
              <zx-tooltip content="Left Bottom 提示" placement="left-end">
                <zx-button>左下</zx-button>
              </zx-tooltip>
            </div>
            <div class="right-col">
              <zx-tooltip content="Right Top 提示" placement="right-start">
                <zx-button>右上</zx-button>
              </zx-tooltip>
              <zx-tooltip content="Right 提示" placement="right">
                <zx-button>右边</zx-button>
              </zx-tooltip>
              <zx-tooltip content="Right Bottom 提示" placement="right-end">
                <zx-button>右下</zx-button>
              </zx-tooltip>
            </div>
          </div>
          <div class="bottom-row">
            <zx-tooltip content="Bottom Left 提示" placement="bottom-start">
              <zx-button>下左</zx-button>
            </zx-tooltip>
            <zx-tooltip content="Bottom 提示" placement="bottom">
              <zx-button>下边</zx-button>
            </zx-tooltip>
            <zx-tooltip content="Bottom Right 提示" placement="bottom-end">
              <zx-button>下右</zx-button>
            </zx-tooltip>
          </div>
        </div>
      </div>
      <div class="demo-block-description">
        通过 <code>placement</code> 属性设置提示显示的位置。有十二个方向可供选择：<code>top</code>、<code>top-start</code>、<code>top-end</code>、<code>bottom</code>、<code>bottom-start</code>、<code>bottom-end</code>、<code>left</code>、<code>left-start</code>、<code>left-end</code>、<code>right</code>、<code>right-start</code>、<code>right-end</code>。
      </div>
    </div>

    <h2>主题</h2>
    <div class="demo-block">
      <div class="demo-block-content">
        <zx-tooltip content="Dark 主题" effect="dark">
          <zx-button>Dark</zx-button>
        </zx-tooltip>
        <zx-tooltip content="Light 主题" effect="light" style="margin-left: 20px;">
          <zx-button>Light</zx-button>
        </zx-tooltip>
      </div>
      <div class="demo-block-description">
        Tooltip 提供了两种主题：<code>dark</code>（默认）和 <code>light</code>。通过 <code>effect</code> 属性设置。
      </div>
    </div>

    <h2>显示延时</h2>
    <div class="demo-block">
      <div class="demo-block-content">
        <zx-tooltip content="无延时" :enter-delay="0" :leave-delay="0">
          <zx-button>无延时</zx-button>
        </zx-tooltip>
        <zx-tooltip content="显示延时500ms" :enter-delay="500" :leave-delay="0" style="margin-left: 20px;">
          <zx-button>显示延时</zx-button>
        </zx-tooltip>
        <zx-tooltip content="隐藏延时500ms" :enter-delay="0" :leave-delay="500" style="margin-left: 20px;">
          <zx-button>隐藏延时</zx-button>
        </zx-tooltip>
        <zx-tooltip content="显示和隐藏都有延时" :enter-delay="500" :leave-delay="500" style="margin-left: 20px;">
          <zx-button>双向延时</zx-button>
        </zx-tooltip>
      </div>
      <div class="demo-block-description">
        通过 <code>enterDelay</code> 和 <code>leaveDelay</code> 属性可以设置提示显示和隐藏的延时。
      </div>
    </div>

    <h2>禁用状态</h2>
    <div class="demo-block">
      <div class="demo-block-content">
        <zx-tooltip content="这个提示不会显示" :disabled="true">
          <zx-button>禁用Tooltip</zx-button>
        </zx-tooltip>
        <zx-tooltip content="点击切换禁用状态" :disabled="tooltipDisabled" style="margin-left: 20px;">
          <zx-button @click="toggleTooltipDisabled">{{ tooltipDisabled ? '启用' : '禁用' }}</zx-button>
        </zx-tooltip>
      </div>
      <div class="demo-block-description">
        通过 <code>disabled</code> 属性可以禁用提示的显示。
      </div>
    </div>

    <h2>自定义内容</h2>
    <div class="demo-block">
      <div class="demo-block-content">
        <zx-tooltip>
          <template #content>
            <div>
              <p style="margin: 0; font-weight: bold;">自定义内容</p>
              <p style="margin: 5px 0 0;">可以使用HTML和样式</p>
              <div style="display: flex; align-items: center; margin-top: 5px;">
                <span style="display: inline-block; width: 10px; height: 10px; background-color: #f56c6c; border-radius: 50%; margin-right: 5px;"></span>
                <span>危险操作</span>
              </div>
            </div>
          </template>
          <zx-button>复杂提示</zx-button>
        </zx-tooltip>
      </div>
      <div class="demo-block-description">
        可以使用具名插槽 <code>content</code> 自定义提示内容，可以包含HTML和样式。
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
          <td>content</td>
          <td>显示的内容</td>
          <td>string</td>
          <td>—</td>
          <td>—</td>
        </tr>
        <tr>
          <td>placement</td>
          <td>提示的位置</td>
          <td>string</td>
          <td>top/top-start/top-end/bottom/bottom-start/bottom-end/left/left-start/left-end/right/right-start/right-end</td>
          <td>top</td>
        </tr>
        <tr>
          <td>enterDelay</td>
          <td>显示延迟，单位毫秒</td>
          <td>number</td>
          <td>—</td>
          <td>0</td>
        </tr>
        <tr>
          <td>leaveDelay</td>
          <td>隐藏延迟，单位毫秒</td>
          <td>number</td>
          <td>—</td>
          <td>0</td>
        </tr>
        <tr>
          <td>disabled</td>
          <td>是否禁用提示</td>
          <td>boolean</td>
          <td>true / false</td>
          <td>false</td>
        </tr>
        <tr>
          <td>effect</td>
          <td>提示主题</td>
          <td>string</td>
          <td>dark / light</td>
          <td>dark</td>
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
          <td>show</td>
          <td>提示显示时触发</td>
          <td>—</td>
        </tr>
        <tr>
          <td>hide</td>
          <td>提示隐藏时触发</td>
          <td>—</td>
        </tr>
      </tbody>
    </table>

    <h2>插槽</h2>
    <table class="props-table">
      <thead>
        <tr>
          <th>插槽名</th>
          <th>说明</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>default</td>
          <td>触发Tooltip显示的元素</td>
        </tr>
        <tr>
          <td>content</td>
          <td>自定义Tooltip内容</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tooltipDisabled: false
    }
  },
  methods: {
    toggleTooltipDisabled() {
      this.tooltipDisabled = !this.tooltipDisabled;
    }
  }
}
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

.tooltip-placement-demo {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}

.top-row, .bottom-row {
  display: flex;
  justify-content: space-around;
  margin: 20px 0;
}

.left-right-row {
  display: flex;
  justify-content: space-between;
  margin: 60px 0;
}

.left-col, .right-col {
  display: flex;
  flex-direction: column;
  gap: 20px;
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