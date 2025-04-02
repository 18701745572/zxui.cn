<template>
  <div class="component-demo">
    <h1>Select 选择器</h1>
    <p class="component-description">当选项过多时，使用下拉菜单展示并选择内容。</p>

    <h2>基础用法</h2>
    <div class="demo-block">
      <div class="demo-block-content">
        <zx-select v-model="basicValue" placeholder="请选择">
          <zx-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></zx-option>
        </zx-select>
        <div class="demo-text">当前选中: {{ basicValue }}</div>
      </div>
      <div class="demo-block-description">
        适用广泛的基础单选。使用 <code>v-model</code> 绑定变量，变量的值为当前被选中的 <code>zx-option</code> 的 <code>value</code> 属性值。
      </div>
    </div>

    <h2>禁用状态</h2>
    <div class="demo-block">
      <div class="demo-block-content">
        <zx-select v-model="disabledValue" disabled placeholder="禁用状态">
          <zx-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></zx-option>
        </zx-select>
      </div>
      <div class="demo-block-description">
        为 <code>zx-select</code> 设置 <code>disabled</code> 属性，则整个选择器不可用。
      </div>
    </div>

    <h2>禁用选项</h2>
    <div class="demo-block">
      <div class="demo-block-content">
        <zx-select v-model="optionDisabledValue" placeholder="禁用部分选项">
          <zx-option v-for="item in optionsWithDisabled" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled"></zx-option>
        </zx-select>
      </div>
      <div class="demo-block-description">
        在 <code>zx-option</code> 中，设定 <code>disabled</code> 属性，可以禁用该选项。
      </div>
    </div>

    <h2>可清空选项</h2>
    <div class="demo-block">
      <div class="demo-block-content">
        <zx-select v-model="clearableValue" clearable placeholder="可清空选项">
          <zx-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></zx-option>
        </zx-select>
      </div>
      <div class="demo-block-description">
        包含清空按钮，可将选择器清空为初始状态。为 <code>zx-select</code> 设置 <code>clearable</code> 属性即可启用该功能。
      </div>
    </div>

    <h2>不同尺寸</h2>
    <div class="demo-block">
      <div class="demo-block-content">
        <div class="select-size-row">
          <span class="size-label">小号</span>
          <zx-select v-model="sizeSmallValue" size="small" placeholder="请选择">
            <zx-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></zx-option>
          </zx-select>
        </div>
        <div class="select-size-row">
          <span class="size-label">默认</span>
          <zx-select v-model="sizeMediumValue" placeholder="请选择">
            <zx-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></zx-option>
          </zx-select>
        </div>
        <div class="select-size-row">
          <span class="size-label">大号</span>
          <zx-select v-model="sizeLargeValue" size="large" placeholder="请选择">
            <zx-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></zx-option>
          </zx-select>
        </div>
      </div>
      <div class="demo-block-description">
        通过 <code>size</code> 属性设置选择器大小，可选值为 <code>small</code>、<code>medium</code>（默认）和 <code>large</code>。
      </div>
    </div>

    <h2>多选模式</h2>
    <div class="demo-block">
      <div class="demo-block-content">
        <zx-select v-model="multipleValue" multiple placeholder="请选择多个选项">
          <zx-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></zx-option>
        </zx-select>
        <div class="demo-text">当前选中: {{ multipleValue }}</div>
      </div>
      <div class="demo-block-description">
        设置 <code>multiple</code> 属性即可启用多选，此时 <code>v-model</code> 的值为由所选 <code>zx-option</code> 的 <code>value</code> 组成的数组。
      </div>
    </div>

    <h2>可搜索</h2>
    <div class="demo-block">
      <div class="demo-block-content">
        <zx-select v-model="filterableValue" filterable placeholder="可搜索">
          <zx-option v-for="item in moreOptions" :key="item.value" :label="item.label" :value="item.value"></zx-option>
        </zx-select>
      </div>
      <div class="demo-block-description">
        为 <code>zx-select</code> 添加 <code>filterable</code> 属性即可启用搜索功能。默认情况下，Select 会找出所有 <code>label</code> 属性包含输入值的选项。
      </div>
    </div>

    <h2>自定义模板</h2>
    <div class="demo-block">
      <div class="demo-block-content">
        <zx-select v-model="customValue" placeholder="自定义选项内容">
          <zx-option v-for="item in customOptions" :key="item.value" :label="item.label" :value="item.value">
            <div class="custom-option">
              <span :style="{ color: item.color }">● </span>
              {{ item.label }}
            </div>
          </zx-option>
        </zx-select>
      </div>
      <div class="demo-block-description">
        可以自定义 <code>zx-option</code> 的内容，通过默认插槽可以获得更灵活的自定义效果。
      </div>
    </div>

    <h2>分组选项</h2>
    <div class="demo-block">
      <div class="demo-block-content">
        <zx-select v-model="groupValue" placeholder="分组选项">
          <zx-option-group v-for="group in groupOptions" :key="group.label" :label="group.label">
            <zx-option v-for="item in group.options" :key="item.value" :label="item.label" :value="item.value"></zx-option>
          </zx-option-group>
        </zx-select>
      </div>
      <div class="demo-block-description">
        使用 <code>zx-option-group</code> 对选项进行分组，它的 <code>label</code> 属性为分组名。
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
          <td>string / number / boolean / array</td>
          <td>—</td>
          <td>—</td>
        </tr>
        <tr>
          <td>multiple</td>
          <td>是否多选</td>
          <td>boolean</td>
          <td>true / false</td>
          <td>false</td>
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
          <td>是否可以清空选项</td>
          <td>boolean</td>
          <td>true / false</td>
          <td>false</td>
        </tr>
        <tr>
          <td>size</td>
          <td>输入框尺寸</td>
          <td>string</td>
          <td>small / medium / large</td>
          <td>medium</td>
        </tr>
        <tr>
          <td>placeholder</td>
          <td>占位文本</td>
          <td>string</td>
          <td>—</td>
          <td>请选择</td>
        </tr>
        <tr>
          <td>filterable</td>
          <td>是否可搜索</td>
          <td>boolean</td>
          <td>true / false</td>
          <td>false</td>
        </tr>
      </tbody>
    </table>

    <h3>Option 属性</h3>
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
          <td>value</td>
          <td>选项的值</td>
          <td>string / number / boolean</td>
          <td>—</td>
          <td>—</td>
        </tr>
        <tr>
          <td>label</td>
          <td>选项的标签</td>
          <td>string</td>
          <td>—</td>
          <td>—</td>
        </tr>
        <tr>
          <td>disabled</td>
          <td>是否禁用该选项</td>
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
          <td>选中值发生变化时触发</td>
          <td>当前选中值</td>
        </tr>
        <tr>
          <td>focus</td>
          <td>当选择器获得焦点时触发</td>
          <td>事件对象</td>
        </tr>
        <tr>
          <td>blur</td>
          <td>当选择器失去焦点时触发</td>
          <td>事件对象</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 基础选项数据
      options: [
        { value: 'option1', label: '选项1' },
        { value: 'option2', label: '选项2' },
        { value: 'option3', label: '选项3' },
        { value: 'option4', label: '选项4' },
        { value: 'option5', label: '选项5' }
      ],
      
      // 带禁用选项的数据
      optionsWithDisabled: [
        { value: 'option1', label: '选项1' },
        { value: 'option2', label: '选项2', disabled: true },
        { value: 'option3', label: '选项3' },
        { value: 'option4', label: '选项4', disabled: true },
        { value: 'option5', label: '选项5' }
      ],
      
      // 更多选项数据（用于搜索示例）
      moreOptions: Array.from({ length: 20 }).map((_, index) => ({
        value: `value${index + 1}`,
        label: `选项 ${index + 1}`
      })),
      
      // 自定义选项数据
      customOptions: [
        { value: 'red', label: '红色', color: '#f56c6c' },
        { value: 'blue', label: '蓝色', color: '#409eff' },
        { value: 'green', label: '绿色', color: '#67c23a' },
        { value: 'yellow', label: '黄色', color: '#e6a23c' },
        { value: 'purple', label: '紫色', color: '#9d65ef' }
      ],
      
      // 分组选项数据
      groupOptions: [
        {
          label: '热门城市',
          options: [
            { value: 'shanghai', label: '上海' },
            { value: 'beijing', label: '北京' }
          ]
        },
        {
          label: '城市名',
          options: [
            { value: 'chengdu', label: '成都' },
            { value: 'shenzhen', label: '深圳' },
            { value: 'guangzhou', label: '广州' },
            { value: 'hangzhou', label: '杭州' }
          ]
        }
      ],
      
      // 各种演示用的值
      basicValue: '',
      disabledValue: '',
      optionDisabledValue: '',
      clearableValue: '',
      sizeSmallValue: '',
      sizeMediumValue: '',
      sizeLargeValue: '',
      multipleValue: [],
      filterableValue: '',
      customValue: '',
      groupValue: ''
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

h2, h3 {
  margin: 45px 0 15px;
  font-size: 22px;
  font-weight: 500;
  color: #303133;
}

h3 {
  font-size: 18px;
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

.select-size-row {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}

.size-label {
  width: 50px;
  font-size: 14px;
  color: #606266;
  margin-right: 10px;
}

.custom-option {
  display: flex;
  align-items: center;
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