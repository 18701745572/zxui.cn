# 基础示例

<template>
  <div class="basic-demo">
    <section class="demo-section">
      <h2>按钮 Button</h2>
      
      <div class="demo-block">
        <h3>基础用法</h3>
        <div class="demo-row">
          <zx-button>默认按钮</zx-button>
          <zx-button type="primary">主要按钮</zx-button>
          <zx-button type="success">成功按钮</zx-button>
          <zx-button type="warning">警告按钮</zx-button>
          <zx-button type="danger">危险按钮</zx-button>
        </div>
      </div>

      <div class="demo-block">
        <h3>禁用状态</h3>
        <div class="demo-row">
          <zx-button disabled>默认按钮</zx-button>
          <zx-button type="primary" disabled>主要按钮</zx-button>
          <zx-button type="success" disabled>成功按钮</zx-button>
          <zx-button type="warning" disabled>警告按钮</zx-button>
          <zx-button type="danger" disabled>危险按钮</zx-button>
        </div>
      </div>

      <div class="demo-block">
        <h3>不同尺寸</h3>
        <div class="demo-row">
          <zx-button size="small">小型按钮</zx-button>
          <zx-button>默认按钮</zx-button>
          <zx-button size="large">大型按钮</zx-button>
        </div>
      </div>
    </section>

    <section class="demo-section">
      <h2>输入框 Input</h2>
      
      <div class="demo-block">
        <h3>基础用法</h3>
        <div class="demo-row">
          <zx-input v-model="input1" placeholder="请输入内容" />
        </div>
      </div>

      <div class="demo-block">
        <h3>禁用状态</h3>
        <div class="demo-row">
          <zx-input v-model="input2" disabled placeholder="禁用状态" />
        </div>
      </div>

      <div class="demo-block">
        <h3>可清空</h3>
        <div class="demo-row">
          <zx-input v-model="input3" clearable placeholder="请输入内容" />
        </div>
      </div>

      <div class="demo-block">
        <h3>带图标</h3>
        <div class="demo-row">
          <zx-input v-model="input4" prefix-icon="search" placeholder="搜索" />
          <zx-input v-model="input5" suffix-icon="calendar" placeholder="选择日期" />
        </div>
      </div>

      <div class="demo-block">
        <h3>不同尺寸</h3>
        <div class="demo-row">
          <zx-input size="small" placeholder="小型输入框" />
          <zx-input placeholder="默认输入框" />
          <zx-input size="large" placeholder="大型输入框" />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const input1 = ref('')
const input2 = ref('禁用示例')
const input3 = ref('')
const input4 = ref('')
const input5 = ref('')
</script>

<style scoped>
.basic-demo {
  max-width: 1200px;
  margin: 0 auto;
}

.demo-section {
  margin-bottom: 3rem;
}

.demo-section h2 {
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--z-border-color);
  color: var(--z-text-color-primary);
}

.demo-block {
  margin-bottom: 2rem;
}

.demo-block h3 {
  margin-bottom: 1rem;
  color: var(--z-text-color-regular);
  font-size: var(--z-font-size-base);
}

.demo-row {
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;
}

.demo-row .z-input {
  width: 240px;
}
</style> 