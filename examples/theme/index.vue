<template>
  <div class="theme-demo">
    <section class="demo-section">
      <h2>主题定制示例</h2>
      
      <div class="demo-block">
        <h3>预设主题</h3>
        <div class="theme-selector">
          <div
            v-for="theme in themes"
            :key="theme.name"
            class="theme-item"
            :class="{ active: currentTheme === theme.name }"
            @click="applyTheme(theme)"
          >
            <div class="theme-colors">
              <div
                v-for="color in theme.colors"
                :key="color"
                class="color-block"
                :style="{ backgroundColor: color }"
              ></div>
            </div>
            <span class="theme-name">{{ theme.label }}</span>
          </div>
        </div>

        <h3>自定义主题</h3>
        <div class="theme-customizer">
          <div class="color-picker">
            <span>主题色：</span>
            <input
              type="color"
              v-model="primaryColor"
              @change="updatePrimaryColor"
            >
          </div>
          <div class="radius-picker">
            <span>圆角：</span>
            <input
              type="range"
              v-model="borderRadius"
              min="0"
              max="20"
              @input="updateBorderRadius"
            >
            <span>{{ borderRadius }}px</span>
          </div>
        </div>

        <h3>暗黑模式</h3>
        <div class="dark-mode-switch">
          <zx-button @click="toggleDarkMode">
            {{ isDark ? '切换到亮色模式' : '切换到暗黑模式' }}
          </zx-button>
        </div>

        <div class="preview-area">
          <h4>预览效果</h4>
          <div class="demo-row">
            <zx-button type="primary">主要按钮</zx-button>
            <zx-button type="success">成功按钮</zx-button>
            <zx-button type="warning">警告按钮</zx-button>
            <zx-button type="danger">危险按钮</zx-button>
          </div>

          <div class="demo-row">
            <zx-input v-model="input1" placeholder="基础输入框" />
            <zx-input v-model="input2" clearable placeholder="可清空输入框" />
          </div>

          <div class="demo-row">
            <div class="demo-card">
              <h5>卡片标题</h5>
              <p>这是一个演示卡片，用于展示主题效果。</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const themes = [
  {
    name: 'default',
    label: '默认主题',
    colors: ['#409eff', '#67c23a', '#e6a23c', '#f56c6c']
  },
  {
    name: 'purple',
    label: '紫色主题',
    colors: ['#8b5cf6', '#34d399', '#fbbf24', '#f87171']
  },
  {
    name: 'ocean',
    label: '海洋主题',
    colors: ['#0ea5e9', '#10b981', '#f59e0b', '#ef4444']
  }
]

const currentTheme = ref('default')
const isDark = ref(false)
const primaryColor = ref('#409eff')
const borderRadius = ref(4)
const input1 = ref('')
const input2 = ref('')

const applyTheme = (theme: typeof themes[0]) => {
  currentTheme.value = theme.name
  document.documentElement.style.setProperty('--z-primary-color', theme.colors[0])
  document.documentElement.style.setProperty('--z-success-color', theme.colors[1])
  document.documentElement.style.setProperty('--z-warning-color', theme.colors[2])
  document.documentElement.style.setProperty('--z-danger-color', theme.colors[3])
}

const updatePrimaryColor = () => {
  document.documentElement.style.setProperty('--z-primary-color', primaryColor.value)
  currentTheme.value = 'custom'
}

const updateBorderRadius = () => {
  document.documentElement.style.setProperty('--z-border-radius-base', `${borderRadius.value}px`)
}

const toggleDarkMode = () => {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark', isDark.value)
}
</script>

<style lang="scss" scoped>
.theme-demo {
  padding: 2rem;
}

.demo-section {
  max-width: 1200px;
  margin: 0 auto;

  h2 {
    margin-bottom: 1.5rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid var(--z-border-color);
    color: var(--z-text-color-primary);
  }

  h3 {
    margin: 2rem 0 1rem;
    color: var(--z-text-color-regular);
    font-size: var(--z-font-size-large);
  }

  h4 {
    margin: 1rem 0;
    color: var(--z-text-color-regular);
    font-size: var(--z-font-size-base);
  }
}

.theme-selector {
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
}

.theme-item {
  cursor: pointer;
  padding: 1rem;
  border-radius: var(--z-border-radius-base);
  border: 1px solid var(--z-border-color);
  transition: all 0.3s;

  &:hover,
  &.active {
    border-color: var(--z-primary-color);
  }
}

.theme-colors {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.color-block {
  width: 24px;
  height: 24px;
  border-radius: 4px;
}

.theme-name {
  font-size: var(--z-font-size-small);
  color: var(--z-text-color-regular);
}

.theme-customizer {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 1.5rem;
  border: 1px solid var(--z-border-color);
  border-radius: var(--z-border-radius-base);
  background-color: var(--z-bg-color);
}

.color-picker,
.radius-picker {
  display: flex;
  align-items: center;
  gap: 1rem;

  span {
    color: var(--z-text-color-regular);
    min-width: 60px;
  }

  input[type="color"] {
    width: 40px;
    height: 40px;
    padding: 0;
    border: 1px solid var(--z-border-color);
    border-radius: var(--z-border-radius-base);
    cursor: pointer;
  }

  input[type="range"] {
    flex: 1;
    max-width: 200px;
  }
}

.dark-mode-switch {
  margin-bottom: 2rem;
}

.preview-area {
  padding: 2rem;
  border-radius: var(--z-border-radius-base);
  background-color: var(--z-bg-color);
  border: 1px solid var(--z-border-color);
}

.demo-row {
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-bottom: 1rem;

  &:last-child {
    margin-bottom: 0;
  }

  .z-input {
    width: 240px;
  }
}

.demo-card {
  padding: 1rem;
  border-radius: var(--z-border-radius-base);
  border: 1px solid var(--z-border-color);
  background-color: var(--z-bg-color);

  h5 {
    margin-bottom: 0.5rem;
    color: var(--z-text-color-primary);
    font-size: var(--z-font-size-base);
  }

  p {
    color: var(--z-text-color-regular);
    font-size: var(--z-font-size-small);
  }
}
</style> 