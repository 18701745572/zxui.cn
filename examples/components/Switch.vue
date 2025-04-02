<template>
  <div class="component-demo">
    <h1>Switch 开关</h1>
    <p class="component-description">表示两种相互对立的状态间的切换，多用于触发「开/关」。</p>

    <h2>基础用法</h2>
    <div class="demo-block">
      <div class="demo-block-content">
        <zx-switch v-model="basicSwitch"></zx-switch>
        <div class="demo-text">当前状态: {{ basicSwitch ? '开启' : '关闭' }}</div>
      </div>
      <div class="demo-block-description">
        使用 <code>v-model</code> 绑定一个 <code>Boolean</code> 类型的变量。
      </div>
    </div>

    <h2>不同尺寸</h2>
    <div class="demo-block">
      <div class="demo-block-content">
        <div class="switch-size-demo">
          <div class="switch-item">
            <span class="label">小号：</span>
            <zx-switch v-model="sizeSmall" size="small"></zx-switch>
          </div>
          <div class="switch-item">
            <span class="label">默认：</span>
            <zx-switch v-model="sizeMedium"></zx-switch>
          </div>
          <div class="switch-item">
            <span class="label">大号：</span>
            <zx-switch v-model="sizeLarge" size="large"></zx-switch>
          </div>
        </div>
      </div>
      <div class="demo-block-description">
        使用 <code>size</code> 属性来设置开关的大小，可选值为 <code>small</code>、<code>medium</code>（默认）和 <code>large</code>。
      </div>
    </div>

    <h2>禁用状态</h2>
    <div class="demo-block">
      <div class="demo-block-content">
        <zx-switch v-model="disabledOn" disabled></zx-switch>
        <zx-switch v-model="disabledOff" disabled style="margin-left: 20px;"></zx-switch>
        <div class="demo-buttons" style="margin-top: 10px;">
          <zx-button size="small" @click="disabledOn = !disabledOn">切换第一个的值</zx-button>
          <zx-button size="small" @click="disabledOff = !disabledOff" style="margin-left: 10px;">切换第二个的值</zx-button>
        </div>
      </div>
      <div class="demo-block-description">
        通过设置 <code>disabled</code> 属性为 <code>true</code> 来禁用开关。禁用状态下开关不可点击，但可以通过代码切换其状态。
      </div>
    </div>

    <h2>带有文字描述</h2>
    <div class="demo-block">
      <div class="demo-block-content">
        <zx-switch v-model="textSwitch">
          {{ textSwitch ? '开启' : '关闭' }}
        </zx-switch>
      </div>
      <div class="demo-block-description">
        使用插槽可以在开关旁边添加文字描述，通过开关状态动态改变文字。
      </div>
    </div>

    <h2>监听状态变化</h2>
    <div class="demo-block">
      <div class="demo-block-content">
        <zx-switch v-model="eventSwitch" @change="handleSwitchChange"></zx-switch>
        <div class="demo-text">状态变化记录: {{ changeLog }}</div>
      </div>
      <div class="demo-block-description">
        通过 <code>change</code> 事件可以实时监听开关状态的变化，回调函数返回开关的新状态值。
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
          <td>v-model / modelValue</td>
          <td>绑定值</td>
          <td>boolean</td>
          <td>true / false</td>
          <td>false</td>
        </tr>
        <tr>
          <td>size</td>
          <td>开关尺寸</td>
          <td>string</td>
          <td>small / medium / large</td>
          <td>medium</td>
        </tr>
        <tr>
          <td>disabled</td>
          <td>是否禁用</td>
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
          <td>change</td>
          <td>值变化时触发</td>
          <td>新值 (boolean)</td>
        </tr>
        <tr>
          <td>update:modelValue</td>
          <td>更新v-model绑定值时触发</td>
          <td>新值 (boolean)</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      basicSwitch: false,
      sizeSmall: true,
      sizeMedium: true,
      sizeLarge: true,
      disabledOn: true,
      disabledOff: false,
      textSwitch: false,
      eventSwitch: false,
      changeLog: ''
    }
  },
  methods: {
    handleSwitchChange(value) {
      this.changeLog = `开关状态在 ${new Date().toLocaleTimeString()} 变更为: ${value ? '开启' : '关闭'}`
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

.demo-text {
  margin-top: 10px;
  font-size: 14px;
  color: #606266;
}

.switch-size-demo {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.switch-item {
  display: flex;
  align-items: center;
}

.switch-item .label {
  width: 50px;
  font-size: 14px;
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