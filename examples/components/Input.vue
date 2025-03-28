<template>
  <div class="component-demo">
    <h1>Input 输入框</h1>
    <p class="component-description">通过鼠标或键盘输入字符的基础表单组件。</p>

    <h2>基础用法</h2>
    <div class="demo-block">
      <div class="demo-block-content">
        <zx-input v-model="input1" placeholder="请输入内容" />
      </div>
      <div class="demo-block-description">
        使用 <code>v-model</code> 实现双向绑定。
      </div>
    </div>

    <h2>禁用状态</h2>
    <div class="demo-block">
      <div class="demo-block-content">
        <zx-input v-model="input2" disabled placeholder="禁用状态" />
      </div>
      <div class="demo-block-description">
        使用 <code>disabled</code> 属性禁用输入框。
      </div>
    </div>

    <h2>可清空</h2>
    <div class="demo-block">
      <div class="demo-block-content">
        <zx-input v-model="input3" clearable placeholder="请输入内容" />
      </div>
      <div class="demo-block-description">
        使用 <code>clearable</code> 属性可以给输入框添加清空按钮。
      </div>
    </div>

    <h2>密码输入框</h2>
    <div class="demo-block">
      <div class="demo-block-content">
        <zx-input v-model="input4" type="password" placeholder="请输入密码" show-password />
      </div>
      <div class="demo-block-description">
        使用 <code>type="password"</code> 和 <code>show-password</code> 属性即可得到一个可切换显示隐藏的密码框。
      </div>
    </div>

    <h2>带图标</h2>
    <div class="demo-block">
      <div class="demo-block-content">
        <zx-input v-model="input5" prefix-icon="search" placeholder="搜索" />
        <zx-input v-model="input6" suffix-icon="calendar" placeholder="选择日期" />
      </div>
      <div class="demo-block-description">
        使用 <code>prefix-icon</code> 和 <code>suffix-icon</code> 属性可以在输入框前后添加图标。
      </div>
    </div>

    <h2>文本域</h2>
    <div class="demo-block">
      <div class="demo-block-content">
        <zx-input v-model="input7" type="textarea" rows="4" placeholder="请输入多行文本" />
      </div>
      <div class="demo-block-description">
        使用 <code>type="textarea"</code> 属性可以使输入框变为文本域，用于输入多行文本。通过 <code>rows</code> 属性可以设置文本域的行数。
      </div>
    </div>

    <h2>不同尺寸</h2>
    <div class="demo-block">
      <div class="demo-block-content">
        <div class="demo-input-size">
          <zx-input v-model="input8" size="small" placeholder="小型输入框" />
        </div>
        <div class="demo-input-size">
          <zx-input v-model="input9" placeholder="默认输入框" />
        </div>
        <div class="demo-input-size">
          <zx-input v-model="input10" size="large" placeholder="大型输入框" />
        </div>
      </div>
      <div class="demo-block-description">
        使用 <code>size</code> 属性设置输入框大小，可选值为 <code>small</code>、<code>default</code> 和 <code>large</code>，默认为 <code>default</code>。
      </div>
    </div>

    <h2>自动补全</h2>
    <div class="demo-block">
      <div class="demo-block-content">
        <zx-input
          v-model="input11"
          placeholder="请输入内容"
          autocomplete
          :options="options"
        />
      </div>
      <div class="demo-block-description">
        使用 <code>autocomplete</code> 属性和 <code>options</code> 属性实现自动补全功能。
      </div>
    </div>

    <h2>字数统计</h2>
    <div class="demo-block">
      <div class="demo-block-content">
        <zx-input v-model="input12" maxlength="20" show-word-limit placeholder="请输入内容" />
        <zx-input v-model="input13" type="textarea" maxlength="100" show-word-limit rows="4" placeholder="请输入内容" />
      </div>
      <div class="demo-block-description">
        使用 <code>maxlength</code> 和 <code>show-word-limit</code> 属性可以设置字数限制并展示字数统计。
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
          <td>输入框类型</td>
          <td>string</td>
          <td>text / textarea / password</td>
          <td>text</td>
        </tr>
        <tr>
          <td>value / v-model</td>
          <td>绑定值</td>
          <td>string / number</td>
          <td>—</td>
          <td>—</td>
        </tr>
        <tr>
          <td>placeholder</td>
          <td>输入框占位文本</td>
          <td>string</td>
          <td>—</td>
          <td>—</td>
        </tr>
        <tr>
          <td>disabled</td>
          <td>是否禁用</td>
          <td>boolean</td>
          <td>true / false</td>
          <td>false</td>
        </tr>
        <tr>
          <td>clearable</td>
          <td>是否可清空</td>
          <td>boolean</td>
          <td>true / false</td>
          <td>false</td>
        </tr>
        <tr>
          <td>show-password</td>
          <td>是否显示切换密码图标</td>
          <td>boolean</td>
          <td>true / false</td>
          <td>false</td>
        </tr>
        <tr>
          <td>prefix-icon</td>
          <td>输入框头部图标</td>
          <td>string</td>
          <td>—</td>
          <td>—</td>
        </tr>
        <tr>
          <td>suffix-icon</td>
          <td>输入框尾部图标</td>
          <td>string</td>
          <td>—</td>
          <td>—</td>
        </tr>
        <tr>
          <td>rows</td>
          <td>文本域行数</td>
          <td>number</td>
          <td>—</td>
          <td>2</td>
        </tr>
        <tr>
          <td>size</td>
          <td>输入框尺寸</td>
          <td>string</td>
          <td>small / default / large</td>
          <td>default</td>
        </tr>
        <tr>
          <td>maxlength</td>
          <td>最大输入长度</td>
          <td>number</td>
          <td>—</td>
          <td>—</td>
        </tr>
        <tr>
          <td>show-word-limit</td>
          <td>是否显示字数统计</td>
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
          <td>input</td>
          <td>在输入值发生变化时触发</td>
          <td>(value: string | number)</td>
        </tr>
        <tr>
          <td>change</td>
          <td>仅在输入框失去焦点或按下回车时触发</td>
          <td>(value: string | number)</td>
        </tr>
        <tr>
          <td>blur</td>
          <td>在输入框失去焦点时触发</td>
          <td>(event: Event)</td>
        </tr>
        <tr>
          <td>focus</td>
          <td>在输入框获得焦点时触发</td>
          <td>(event: Event)</td>
        </tr>
        <tr>
          <td>clear</td>
          <td>在点击清除按钮时触发</td>
          <td>—</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const input1 = ref('')
const input2 = ref('禁用示例')
const input3 = ref('')
const input4 = ref('')
const input5 = ref('')
const input6 = ref('')
const input7 = ref('')
const input8 = ref('')
const input9 = ref('')
const input10 = ref('')
const input11 = ref('')
const input12 = ref('')
const input13 = ref('')

const options = ref([
  { value: '选项1', label: '选项1' },
  { value: '选项2', label: '选项2' },
  { value: '选项3', label: '选项3' },
  { value: '选项4', label: '选项4' },
  { value: '选项5', label: '选项5' }
])
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

.demo-block-content .zx-input {
  width: 240px;
  margin-right: 10px;
  margin-bottom: 10px;
}

.demo-block-content .zx-input[type="textarea"] {
  width: 414px;
}

.demo-block-description {
  padding: 18px 24px;
  background-color: #fafafa;
  font-size: 14px;
  line-height: 1.5;
  color: #606266;
}

.demo-input-size {
  margin-bottom: 15px;
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