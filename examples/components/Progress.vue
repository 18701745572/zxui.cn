<template>
  <div class="component-demo">
    <h1>Progress 进度条</h1>
    <p class="component-description">用于展示操作进度，告知用户当前状态和预期。</p>

    <h2>基础用法</h2>
    <div class="demo-block">
      <div class="demo-block-content">
        <zx-progress :percentage="50"></zx-progress>
      </div>
      <div class="demo-block-description">
        Progress 组件的基础用法，通过 <code>percentage</code> 属性来设置当前进度，取值范围 0-100。
      </div>
    </div>

    <h2>不同状态</h2>
    <div class="demo-block">
      <div class="demo-block-content">
        <div class="progress-demo-item">
          <zx-progress :percentage="20" type="primary"></zx-progress>
        </div>
        <div class="progress-demo-item">
          <zx-progress :percentage="40" type="success"></zx-progress>
        </div>
        <div class="progress-demo-item">
          <zx-progress :percentage="60" type="warning"></zx-progress>
        </div>
        <div class="progress-demo-item">
          <zx-progress :percentage="80" type="danger"></zx-progress>
        </div>
        <div class="progress-demo-item">
          <zx-progress :percentage="100" type="info"></zx-progress>
        </div>
      </div>
      <div class="demo-block-description">
        通过 <code>type</code> 属性设置不同的状态，可选值有 <code>primary</code>、<code>success</code>、<code>warning</code>、<code>danger</code> 和 <code>info</code>。
      </div>
    </div>

    <h2>不同尺寸</h2>
    <div class="demo-block">
      <div class="demo-block-content">
        <div class="progress-demo-item">
          <span class="progress-label">小号：</span>
          <zx-progress :percentage="70" size="small"></zx-progress>
        </div>
        <div class="progress-demo-item">
          <span class="progress-label">默认：</span>
          <zx-progress :percentage="70" size="medium"></zx-progress>
        </div>
        <div class="progress-demo-item">
          <span class="progress-label">大号：</span>
          <zx-progress :percentage="70" size="large"></zx-progress>
        </div>
      </div>
      <div class="demo-block-description">
        通过 <code>size</code> 属性设置进度条的大小，可选值为 <code>small</code>、<code>medium</code>（默认）和 <code>large</code>。
      </div>
    </div>

    <h2>文字内显</h2>
    <div class="demo-block">
      <div class="demo-block-content">
        <div class="progress-demo-item">
          <zx-progress :percentage="65" text-inside></zx-progress>
        </div>
        <div class="progress-demo-item">
          <zx-progress :percentage="75" text-inside type="success"></zx-progress>
        </div>
        <div class="progress-demo-item">
          <zx-progress :percentage="85" text-inside type="warning"></zx-progress>
        </div>
      </div>
      <div class="demo-block-description">
        通过设置 <code>text-inside</code> 属性，可以将进度条的文字显示在内部。
      </div>
    </div>

    <h2>条纹效果</h2>
    <div class="demo-block">
      <div class="demo-block-content">
        <div class="progress-demo-item">
          <zx-progress :percentage="35" striped></zx-progress>
        </div>
        <div class="progress-demo-item">
          <zx-progress :percentage="45" striped type="success"></zx-progress>
        </div>
        <div class="progress-demo-item">
          <zx-progress :percentage="55" striped type="warning"></zx-progress>
        </div>
        <div class="progress-demo-item">
          <zx-progress :percentage="65" striped type="danger"></zx-progress>
        </div>
      </div>
      <div class="demo-block-description">
        通过设置 <code>striped</code> 属性，可以为进度条添加条纹效果。
      </div>
    </div>

    <h2>动画效果</h2>
    <div class="demo-block">
      <div class="demo-block-content">
        <div class="progress-demo-item">
          <zx-progress :percentage="45" striped animated></zx-progress>
        </div>
        <div class="progress-demo-item">
          <zx-progress :percentage="55" striped animated type="success"></zx-progress>
        </div>
        <div class="progress-demo-item">
          <zx-progress :percentage="65" striped animated type="warning"></zx-progress>
        </div>
        <div class="progress-demo-item">
          <zx-progress :percentage="75" striped animated type="danger"></zx-progress>
        </div>
      </div>
      <div class="demo-block-description">
        在设置 <code>striped</code> 的基础上，添加 <code>animated</code> 属性，可以为条纹添加动画效果。
      </div>
    </div>

    <h2>不显示文字</h2>
    <div class="demo-block">
      <div class="demo-block-content">
        <div class="progress-demo-item">
          <zx-progress :percentage="50" :show-text="false"></zx-progress>
        </div>
      </div>
      <div class="demo-block-description">
        通过 <code>show-text</code> 属性为 <code>false</code>，可以隐藏进度条的文字显示。
      </div>
    </div>

    <h2>自定义显示文字</h2>
    <div class="demo-block">
      <div class="demo-block-content">
        <div class="progress-demo-item">
          <zx-progress :percentage="customPercentage" :format="customFormat"></zx-progress>
        </div>
        <div class="progress-buttons">
          <zx-button size="small" @click="decrease">-</zx-button>
          <zx-button size="small" @click="increase">+</zx-button>
        </div>
      </div>
      <div class="demo-block-description">
        通过 <code>format</code> 属性，可以自定义进度条的文字显示内容。上例展示了如何通过函数格式化文本。
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
          <td>percentage</td>
          <td>百分比，必填</td>
          <td>number</td>
          <td>0-100</td>
          <td>0</td>
        </tr>
        <tr>
          <td>type</td>
          <td>进度条类型</td>
          <td>string</td>
          <td>primary / success / warning / danger / info</td>
          <td>primary</td>
        </tr>
        <tr>
          <td>size</td>
          <td>进度条尺寸</td>
          <td>string</td>
          <td>small / medium / large</td>
          <td>medium</td>
        </tr>
        <tr>
          <td>show-text</td>
          <td>是否显示进度条文字</td>
          <td>boolean</td>
          <td>true / false</td>
          <td>true</td>
        </tr>
        <tr>
          <td>text-inside</td>
          <td>文字是否显示在进度条内部</td>
          <td>boolean</td>
          <td>true / false</td>
          <td>false</td>
        </tr>
        <tr>
          <td>striped</td>
          <td>是否显示条纹</td>
          <td>boolean</td>
          <td>true / false</td>
          <td>false</td>
        </tr>
        <tr>
          <td>animated</td>
          <td>条纹是否带动画</td>
          <td>boolean</td>
          <td>true / false</td>
          <td>false</td>
        </tr>
        <tr>
          <td>format</td>
          <td>自定义文字显示的格式化函数</td>
          <td>function(percentage)</td>
          <td>—</td>
          <td>percentage => `${percentage}%`</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      customPercentage: 42,
    }
  },
  methods: {
    customFormat(percentage) {
      if (percentage < 30) {
        return '进度较低';
      } else if (percentage < 70) {
        return '进度适中';
      } else {
        return '进度良好';
      }
    },
    increase() {
      if (this.customPercentage < 100) {
        this.customPercentage += 10;
      }
    },
    decrease() {
      if (this.customPercentage > 0) {
        this.customPercentage -= 10;
      }
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

.progress-demo-item {
  margin-bottom: 15px;
  display: flex;
  align-items: center;
}

.progress-demo-item:last-child {
  margin-bottom: 0;
}

.progress-label {
  width: 60px;
  font-size: 14px;
  color: #606266;
  text-align: right;
  margin-right: 10px;
}

.progress-buttons {
  margin-top: 10px;
  display: flex;
  gap: 10px;
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