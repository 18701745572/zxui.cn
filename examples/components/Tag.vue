<template>
  <div class="component-demo">
    <h1>Tag 标签</h1>
    <p class="component-description">用于标记和选择。</p>

    <h2>基础用法</h2>
    <div class="demo-block">
      <div class="demo-block-content">
        <zx-tag>默认标签</zx-tag>
        <zx-tag type="primary">主要标签</zx-tag>
        <zx-tag type="success">成功标签</zx-tag>
        <zx-tag type="warning">警告标签</zx-tag>
        <zx-tag type="danger">危险标签</zx-tag>
        <zx-tag type="info">信息标签</zx-tag>
      </div>
      <div class="demo-block-description">
        使用 <code>type</code> 属性可以定义不同类型的标签，有 <code>default</code>、<code>primary</code>、<code>success</code>、<code>warning</code>、<code>danger</code> 和 <code>info</code> 六种类型。
      </div>
    </div>

    <h2>浅色主题</h2>
    <div class="demo-block">
      <div class="demo-block-content">
        <zx-tag light>默认标签</zx-tag>
        <zx-tag type="primary" light>主要标签</zx-tag>
        <zx-tag type="success" light>成功标签</zx-tag>
        <zx-tag type="warning" light>警告标签</zx-tag>
        <zx-tag type="danger" light>危险标签</zx-tag>
        <zx-tag type="info" light>信息标签</zx-tag>
      </div>
      <div class="demo-block-description">
        设置 <code>light</code> 属性可以使标签拥有浅色背景。
      </div>
    </div>

    <h2>不同尺寸</h2>
    <div class="demo-block">
      <div class="demo-block-content">
        <div class="tag-size-demo">
          <div class="tag-demo-item">
            <span class="tag-label">小号：</span>
            <zx-tag size="small">小号标签</zx-tag>
          </div>
          <div class="tag-demo-item">
            <span class="tag-label">默认：</span>
            <zx-tag>默认标签</zx-tag>
          </div>
          <div class="tag-demo-item">
            <span class="tag-label">大号：</span>
            <zx-tag size="large">大号标签</zx-tag>
          </div>
        </div>
      </div>
      <div class="demo-block-description">
        通过 <code>size</code> 属性调整标签大小，提供 <code>small</code>、<code>medium</code>（默认）和 <code>large</code> 三种尺寸。
      </div>
    </div>

    <h2>圆角标签</h2>
    <div class="demo-block">
      <div class="demo-block-content">
        <zx-tag round>默认标签</zx-tag>
        <zx-tag type="primary" round>主要标签</zx-tag>
        <zx-tag type="success" round>成功标签</zx-tag>
        <zx-tag type="warning" round>警告标签</zx-tag>
        <zx-tag type="danger" round>危险标签</zx-tag>
      </div>
      <div class="demo-block-description">
        通过 <code>round</code> 属性为标签添加圆角效果。
      </div>
    </div>

    <h2>可关闭标签</h2>
    <div class="demo-block">
      <div class="demo-block-content">
        <div class="closable-tags">
          <zx-tag 
            v-for="(tag, index) in tags" 
            :key="index" 
            :type="tag.type" 
            closable
            @close="handleClose(index)"
          >
            {{ tag.name }}
          </zx-tag>
        </div>
        <div class="tag-buttons" style="margin-top: 10px;">
          <zx-button size="small" @click="addTag">添加标签</zx-button>
          <zx-button size="small" @click="resetTags" style="margin-left: 10px;">重置</zx-button>
        </div>
      </div>
      <div class="demo-block-description">
        设置 <code>closable</code> 属性可以定义一个标签是否可移除。通过监听 <code>close</code> 事件可以处理关闭按钮的点击事件。
      </div>
    </div>

    <h2>动态编辑标签</h2>
    <div class="demo-block">
      <div class="demo-block-content">
        <div class="dynamic-tags">
          <zx-tag 
            v-for="(tag, index) in dynamicTags" 
            :key="index" 
            :type="tagTypes[index % tagTypes.length]" 
            closable
            @close="removeDynamicTag(index)"
          >
            {{ tag }}
          </zx-tag>
          <div class="input-new-tag" v-if="inputVisible">
            <input 
              ref="tagInput"
              v-model="inputValue"
              class="tag-input"
              @keyup.enter="handleInputConfirm"
              @blur="handleInputConfirm"
            />
          </div>
          <zx-button v-else size="small" @click="showInput">+ 新标签</zx-button>
        </div>
      </div>
      <div class="demo-block-description">
        动态编辑标签可以通过点击标签关闭按钮删除标签，或者通过输入框添加新标签。
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
          <td>标签类型</td>
          <td>string</td>
          <td>default / primary / success / warning / danger / info</td>
          <td>default</td>
        </tr>
        <tr>
          <td>size</td>
          <td>标签尺寸</td>
          <td>string</td>
          <td>small / medium / large</td>
          <td>medium</td>
        </tr>
        <tr>
          <td>light</td>
          <td>是否使用浅色背景</td>
          <td>boolean</td>
          <td>true / false</td>
          <td>false</td>
        </tr>
        <tr>
          <td>round</td>
          <td>是否圆角</td>
          <td>boolean</td>
          <td>true / false</td>
          <td>false</td>
        </tr>
        <tr>
          <td>closable</td>
          <td>是否可关闭</td>
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
          <td>关闭标签时触发</td>
          <td>-</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tags: [
        { name: '标签一', type: 'primary' },
        { name: '标签二', type: 'success' },
        { name: '标签三', type: 'warning' },
        { name: '标签四', type: 'danger' }
      ],
      defaultTags: [
        { name: '标签一', type: 'primary' },
        { name: '标签二', type: 'success' },
        { name: '标签三', type: 'warning' },
        { name: '标签四', type: 'danger' }
      ],
      dynamicTags: ['标签一', '标签二', '标签三'],
      inputVisible: false,
      inputValue: '',
      tagTypes: ['primary', 'success', 'warning', 'danger', 'info'],
      tagCount: 4
    }
  },
  methods: {
    handleClose(index) {
      this.tags.splice(index, 1);
    },
    addTag() {
      const types = ['primary', 'success', 'warning', 'danger', 'info'];
      const randomType = types[Math.floor(Math.random() * types.length)];
      this.tags.push({
        name: `标签${++this.tagCount}`,
        type: randomType
      });
    },
    resetTags() {
      this.tags = [...this.defaultTags];
      this.tagCount = 4;
    },
    removeDynamicTag(index) {
      this.dynamicTags.splice(index, 1);
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.tagInput.focus();
      });
    },
    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = '';
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

.demo-block-content .zx-tag {
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

.tag-size-demo {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.tag-demo-item {
  display: flex;
  align-items: center;
}

.tag-label {
  width: 50px;
  font-size: 14px;
  color: #606266;
  margin-right: 10px;
}

.dynamic-tags {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
}

.tag-input {
  width: 90px;
  height: 32px;
  padding: 0 8px;
  font-size: 14px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  outline: none;
}

.tag-input:focus {
  border-color: #409eff;
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