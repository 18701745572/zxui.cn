# 主题切换

主题切换功能允许用户根据自己的偏好选择不同的视觉主题。ZXUI CN 提供了灵活的主题切换机制，支持亮色、暗色和自定义主题。

## 基础主题切换

最简单的主题切换示例，在亮色和暗色主题之间切换。

```vue
<template>
  <div class="basic-theme-demo">
    <div class="theme-switch">
      <zx-button-group>
        <zx-button 
          :type="currentTheme === 'light' ? 'primary' : 'default'"
          @click="setTheme('light')"
        >
          亮色主题
        </zx-button>
        <zx-button 
          :type="currentTheme === 'dark' ? 'primary' : 'default'"
          @click="setTheme('dark')"
        >
          暗色主题
        </zx-button>
      </zx-button-group>
    </div>
    
    <div class="theme-preview">
      <zx-card title="主题预览" class="preview-card">
        <zx-space direction="vertical" size="large">
          <div class="preview-item">
            <p>按钮组件:</p>
            <zx-space>
              <zx-button>默认按钮</zx-button>
              <zx-button type="primary">主要按钮</zx-button>
              <zx-button type="success">成功按钮</zx-button>
              <zx-button type="warning">警告按钮</zx-button>
              <zx-button type="danger">危险按钮</zx-button>
            </zx-space>
          </div>
          
          <div class="preview-item">
            <p>输入组件:</p>
            <zx-input placeholder="请输入内容" style="width: 220px;" />
          </div>
          
          <div class="preview-item">
            <p>开关组件:</p>
            <zx-switch v-model="switchValue" />
          </div>
          
          <div class="preview-item">
            <p>标签组件:</p>
            <zx-space>
              <zx-tag>默认标签</zx-tag>
              <zx-tag type="success">成功标签</zx-tag>
              <zx-tag type="warning">警告标签</zx-tag>
              <zx-tag type="danger">危险标签</zx-tag>
              <zx-tag type="info">信息标签</zx-tag>
            </zx-space>
          </div>
        </zx-space>
      </zx-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const currentTheme = ref('light')
const switchValue = ref(false)

const setTheme = (theme: string) => {
  currentTheme.value = theme
  document.documentElement.setAttribute('data-theme', theme)
}
</script>

<style lang="scss" scoped>
.basic-theme-demo {
  .theme-switch {
    margin-bottom: 20px;
  }
  
  .preview-card {
    margin-bottom: 30px;
  }
  
  .preview-item {
    p {
      margin-bottom: 10px;
      font-weight: bold;
    }
  }
}
</style>
```

## 自定义主题

展示如何创建和切换自定义主题的示例。

```vue
<template>
  <div class="custom-theme-demo">
    <div class="theme-selector">
      <div class="theme-options">
        <zx-card title="选择主题">
          <div class="theme-list">
            <div 
              v-for="theme in themes" 
              :key="theme.name"
              class="theme-item"
              :class="{ active: currentTheme === theme.name }"
              @click="setTheme(theme.name)"
            >
              <div class="theme-colors">
                <div 
                  class="color-block primary" 
                  :style="{ backgroundColor: theme.colors.primary }"
                ></div>
                <div 
                  class="color-block success" 
                  :style="{ backgroundColor: theme.colors.success }"
                ></div>
                <div 
                  class="color-block warning" 
                  :style="{ backgroundColor: theme.colors.warning }"
                ></div>
                <div 
                  class="color-block danger" 
                  :style="{ backgroundColor: theme.colors.danger }"
                ></div>
              </div>
              <div class="theme-name">{{ theme.label }}</div>
            </div>
          </div>
        </zx-card>
      </div>
      
      <div class="theme-customizer">
        <zx-card title="自定义主题">
          <zx-form label-width="120px">
            <zx-form-item label="主要颜色">
              <zx-color-picker v-model="customColors.primary" />
            </zx-form-item>
            <zx-form-item label="成功颜色">
              <zx-color-picker v-model="customColors.success" />
            </zx-form-item>
            <zx-form-item label="警告颜色">
              <zx-color-picker v-model="customColors.warning" />
            </zx-form-item>
            <zx-form-item label="危险颜色">
              <zx-color-picker v-model="customColors.danger" />
            </zx-form-item>
            <zx-form-item label="信息颜色">
              <zx-color-picker v-model="customColors.info" />
            </zx-form-item>
            <zx-form-item label="文字颜色">
              <zx-color-picker v-model="customColors.text" />
            </zx-form-item>
            <zx-form-item label="背景颜色">
              <zx-color-picker v-model="customColors.background" />
            </zx-form-item>
            <zx-form-item>
              <zx-button type="primary" @click="applyCustomTheme">应用自定义主题</zx-button>
              <zx-button @click="resetCustomTheme">重置</zx-button>
            </zx-form-item>
          </zx-form>
        </zx-card>
      </div>
    </div>
    
    <div class="theme-preview">
      <zx-card title="主题效果预览">
        <zx-tabs v-model="activeTab">
          <zx-tab-pane label="组件预览" name="components">
            <div class="preview-section">
              <h3>按钮</h3>
              <zx-space>
                <zx-button>默认按钮</zx-button>
                <zx-button type="primary">主要按钮</zx-button>
                <zx-button type="success">成功按钮</zx-button>
                <zx-button type="warning">警告按钮</zx-button>
                <zx-button type="danger">危险按钮</zx-button>
                <zx-button type="info">信息按钮</zx-button>
              </zx-space>
            </div>
            
            <div class="preview-section">
              <h3>表单组件</h3>
              <zx-space direction="vertical" size="large">
                <zx-input placeholder="请输入内容" style="width: 220px;" />
                <zx-select style="width: 220px;" placeholder="请选择">
                  <zx-option value="option1" label="选项1" />
                  <zx-option value="option2" label="选项2" />
                  <zx-option value="option3" label="选项3" />
                </zx-select>
                <div>
                  <zx-radio-group v-model="radioValue">
                    <zx-radio label="1">选项1</zx-radio>
                    <zx-radio label="2">选项2</zx-radio>
                    <zx-radio label="3">选项3</zx-radio>
                  </zx-radio-group>
                </div>
                <div>
                  <zx-checkbox-group v-model="checkboxValue">
                    <zx-checkbox label="1">选项1</zx-checkbox>
                    <zx-checkbox label="2">选项2</zx-checkbox>
                    <zx-checkbox label="3">选项3</zx-checkbox>
                  </zx-checkbox-group>
                </div>
                <div>
                  <zx-switch v-model="switchValue" />
                </div>
              </zx-space>
            </div>
            
            <div class="preview-section">
              <h3>数据展示</h3>
              <zx-space direction="vertical" size="large">
                <div>
                  <zx-tag>默认标签</zx-tag>
                  <zx-tag type="success">成功标签</zx-tag>
                  <zx-tag type="warning">警告标签</zx-tag>
                  <zx-tag type="danger">危险标签</zx-tag>
                  <zx-tag type="info">信息标签</zx-tag>
                </div>
                <zx-alert title="这是一条成功提示" type="success" />
                <zx-progress :percentage="70" />
              </zx-space>
            </div>
          </zx-tab-pane>
          
          <zx-tab-pane label="模拟页面" name="page">
            <div class="mock-page">
              <div class="mock-header">
                <div class="logo">ZXUI CN</div>
                <div class="nav">
                  <zx-menu mode="horizontal" :default-active="activeMenu">
                    <zx-menu-item index="1">首页</zx-menu-item>
                    <zx-menu-item index="2">产品</zx-menu-item>
                    <zx-menu-item index="3">服务</zx-menu-item>
                    <zx-menu-item index="4">关于我们</zx-menu-item>
                  </zx-menu>
                </div>
                <div class="user">
                  <zx-button type="text" icon="user">用户中心</zx-button>
                </div>
              </div>
              
              <div class="mock-content">
                <div class="mock-sidebar">
                  <zx-menu
                    default-active="1"
                    style="height: 100%"
                  >
                    <zx-menu-item index="1">仪表盘</zx-menu-item>
                    <zx-menu-item index="2">用户管理</zx-menu-item>
                    <zx-menu-item index="3">内容管理</zx-menu-item>
                    <zx-menu-item index="4">系统设置</zx-menu-item>
                  </zx-menu>
                </div>
                
                <div class="mock-main">
                  <zx-card title="用户列表">
                    <zx-table :data="userData">
                      <zx-table-column prop="id" label="ID" width="80" />
                      <zx-table-column prop="name" label="用户名" width="120" />
                      <zx-table-column prop="role" label="角色" width="120" />
                      <zx-table-column prop="status" label="状态" width="120">
                        <template #default="scope">
                          <zx-tag :type="scope.row.status === 'active' ? 'success' : 'danger'">
                            {{ scope.row.status === 'active' ? '正常' : '禁用' }}
                          </zx-tag>
                        </template>
                      </zx-table-column>
                      <zx-table-column label="操作" width="180">
                        <template #default>
                          <zx-button type="primary" size="small">编辑</zx-button>
                          <zx-button type="danger" size="small">删除</zx-button>
                        </template>
                      </zx-table-column>
                    </zx-table>
                  </zx-card>
                </div>
              </div>
            </div>
          </zx-tab-pane>
        </zx-tabs>
      </zx-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue'

const activeTab = ref('components')
const activeMenu = ref('1')
const radioValue = ref('1')
const checkboxValue = ref(['1'])
const switchValue = ref(true)

const currentTheme = ref('default')

const themes = [
  {
    name: 'default',
    label: '默认主题',
    colors: {
      primary: '#409EFF',
      success: '#67C23A',
      warning: '#E6A23C',
      danger: '#F56C6C',
      info: '#909399',
      text: '#303133',
      background: '#FFFFFF'
    }
  },
  {
    name: 'dark',
    label: '暗黑主题',
    colors: {
      primary: '#409EFF',
      success: '#67C23A',
      warning: '#E6A23C',
      danger: '#F56C6C',
      info: '#909399',
      text: '#E5EAF3',
      background: '#1D1E1F'
    }
  },
  {
    name: 'green',
    label: '绿色主题',
    colors: {
      primary: '#34B5A4',
      success: '#23A984',
      warning: '#F0B775',
      danger: '#F76D57',
      info: '#85909A',
      text: '#2C3E50',
      background: '#FFFFFF'
    }
  },
  {
    name: 'purple',
    label: '紫色主题',
    colors: {
      primary: '#8E66CA',
      success: '#67C23A',
      warning: '#E6A23C',
      danger: '#F56C6C',
      info: '#909399',
      text: '#303133',
      background: '#FFFFFF'
    }
  },
  {
    name: 'custom',
    label: '自定义主题',
    colors: {
      primary: '#409EFF',
      success: '#67C23A',
      warning: '#E6A23C',
      danger: '#F56C6C',
      info: '#909399',
      text: '#303133',
      background: '#FFFFFF'
    }
  }
]

const customColors = reactive({
  primary: '#409EFF',
  success: '#67C23A',
  warning: '#E6A23C',
  danger: '#F56C6C',
  info: '#909399',
  text: '#303133',
  background: '#FFFFFF'
})

// 模拟用户数据
const userData = [
  { id: 1, name: '张三', role: '管理员', status: 'active' },
  { id: 2, name: '李四', role: '普通用户', status: 'active' },
  { id: 3, name: '王五', role: '编辑', status: 'inactive' },
  { id: 4, name: '赵六', role: '普通用户', status: 'active' }
]

const setTheme = (themeName: string) => {
  currentTheme.value = themeName
  
  if (themeName === 'custom') {
    applyThemeColors(customColors)
  } else {
    const theme = themes.find(t => t.name === themeName)
    if (theme) {
      applyThemeColors(theme.colors)
    }
  }
}

const applyThemeColors = (colors: any) => {
  const root = document.documentElement
  
  root.style.setProperty('--zx-primary-color', colors.primary)
  root.style.setProperty('--zx-success-color', colors.success)
  root.style.setProperty('--zx-warning-color', colors.warning)
  root.style.setProperty('--zx-danger-color', colors.danger)
  root.style.setProperty('--zx-info-color', colors.info)
  root.style.setProperty('--zx-text-color', colors.text)
  root.style.setProperty('--zx-bg-color', colors.background)
  
  if (colors.background === '#1D1E1F' || colors.text === '#E5EAF3') {
    document.body.classList.add('dark-theme')
  } else {
    document.body.classList.remove('dark-theme')
  }
}

const applyCustomTheme = () => {
  // 更新自定义主题的颜色
  const customTheme = themes.find(t => t.name === 'custom')
  if (customTheme) {
    customTheme.colors = { ...customColors }
  }
  
  setTheme('custom')
}

const resetCustomTheme = () => {
  // 重置自定义主题为默认颜色
  const defaultTheme = themes.find(t => t.name === 'default')
  if (defaultTheme) {
    Object.assign(customColors, defaultTheme.colors)
  }
}

// 初始化应用默认主题
setTheme('default')
</script>

<style lang="scss" scoped>
.custom-theme-demo {
  .theme-selector {
    display: flex;
    gap: 20px;
    margin-bottom: 30px;
    
    .theme-options {
      flex: 1;
    }
    
    .theme-customizer {
      flex: 2;
    }
    
    .theme-list {
      display: flex;
      flex-wrap: wrap;
      gap: 15px;
      
      .theme-item {
        width: 120px;
        cursor: pointer;
        padding: 10px;
        border: 2px solid transparent;
        border-radius: var(--zx-border-radius-base);
        transition: all 0.3s;
        
        &.active {
          border-color: var(--zx-primary-color);
        }
        
        &:hover {
          box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        }
        
        .theme-colors {
          display: flex;
          margin-bottom: 8px;
          
          .color-block {
            width: 25%;
            height: 20px;
            
            &.primary {
              border-top-left-radius: 4px;
              border-bottom-left-radius: 4px;
            }
            
            &.danger {
              border-top-right-radius: 4px;
              border-bottom-right-radius: 4px;
            }
          }
        }
        
        .theme-name {
          text-align: center;
          font-size: 14px;
        }
      }
    }
  }
  
  .theme-preview {
    .preview-section {
      margin-bottom: 20px;
      
      h3 {
        margin-bottom: 15px;
        font-weight: bold;
      }
    }
    
    .mock-page {
      border: 1px solid var(--zx-border-color-light);
      border-radius: var(--zx-border-radius-base);
      overflow: hidden;
      height: 500px;
      
      .mock-header {
        display: flex;
        align-items: center;
        height: 60px;
        padding: 0 20px;
        border-bottom: 1px solid var(--zx-border-color-light);
        background-color: var(--zx-bg-color);
        
        .logo {
          font-size: 20px;
          font-weight: bold;
          color: var(--zx-primary-color);
          margin-right: 50px;
        }
        
        .nav {
          flex: 1;
        }
        
        .user {
          margin-left: 20px;
        }
      }
      
      .mock-content {
        display: flex;
        height: calc(100% - 60px);
        
        .mock-sidebar {
          width: 200px;
          height: 100%;
          border-right: 1px solid var(--zx-border-color-light);
          background-color: var(--zx-bg-color);
          overflow-y: auto;
        }
        
        .mock-main {
          flex: 1;
          padding: 20px;
          overflow-y: auto;
          background-color: #F5F7FA;
        }
      }
    }
  }
}

:deep(.dark-theme) {
  .mock-main {
    background-color: #18191A !important;
  }
}
</style> 