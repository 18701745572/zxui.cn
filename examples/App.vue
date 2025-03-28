<template>
  <div class="example-container">
    <div class="example-sidebar">
      <h2>ZXUI 组件</h2>
      <nav>
        <router-link to="/basic">基础示例</router-link>
        <router-link to="/theme">主题配置</router-link>
        <h3>基础组件</h3>
        <router-link to="/button">Button 按钮</router-link>
        <router-link to="/input">Input 输入框</router-link>
        <router-link to="/input-number">InputNumber 数字输入框</router-link>
        <router-link to="/select">Select 选择器</router-link>
        <router-link to="/radio">Radio 单选框</router-link>
        <router-link to="/checkbox">Checkbox 复选框</router-link>
        <router-link to="/switch">Switch 开关</router-link>
        <router-link to="/slider">Slider 滑块</router-link>
        <router-link to="/time-picker">TimePicker 时间选择器</router-link>
        <router-link to="/date-picker">DatePicker 日期选择器</router-link>
        <router-link to="/date-time-picker">DateTimePicker 日期时间选择器</router-link>
        <router-link to="/upload">Upload 上传</router-link>
        <router-link to="/rate">Rate 评分</router-link>
        <router-link to="/color-picker">ColorPicker 颜色选择器</router-link>
        <router-link to="/transfer">Transfer 穿梭框</router-link>
        <router-link to="/form">Form 表单</router-link>
        
        <h3>数据展示</h3>
        <router-link to="/table">Table 表格</router-link>
        <router-link to="/tag">Tag 标签</router-link>
        <router-link to="/progress">Progress 进度条</router-link>
        <router-link to="/tree">Tree 树形控件</router-link>
        <router-link to="/badge">Badge 徽章</router-link>
        <router-link to="/avatar">Avatar 头像</router-link>
        <router-link to="/skeleton">Skeleton 骨架屏</router-link>
        <router-link to="/image">Image 图片</router-link>
        <router-link to="/card">Card 卡片</router-link>
        <router-link to="/timeline">Timeline 时间线</router-link>
        
        <h3>反馈组件</h3>
        <router-link to="/alert">Alert 警告</router-link>
        <router-link to="/modal">Modal 对话框</router-link>
        <router-link to="/message">Message 消息提示</router-link>
        <router-link to="/drawer">Drawer 抽屉</router-link>
        <router-link to="/tooltip">Tooltip 文字提示</router-link>
        <router-link to="/steps">Steps 步骤条</router-link>
        
        <h3>文件预览</h3>
        <router-link to="/pdf">PDF 预览</router-link>
        <router-link to="/word">Word 预览</router-link>
        <router-link to="/excel">Excel 预览</router-link>
        <router-link to="/xlsx">XLSX 预览</router-link>
        <router-link to="/csv">CSV 预览</router-link>
        <router-link to="/power-point">PowerPoint 预览</router-link>
        <router-link to="/txt">TXT 预览</router-link>
        <router-link to="/markdown">Markdown 预览</router-link>
        <router-link to="/json">JSON 预览</router-link>
        <router-link to="/xml">XML 预览</router-link>
        <router-link to="/yaml">YAML 预览</router-link>
        <router-link to="/html">HTML 预览</router-link>
        
        <h3>媒体组件</h3>
        <router-link to="/audio">Audio 音频</router-link>
        <router-link to="/video">Video 视频</router-link>
        <router-link to="/webview">Webview 网页</router-link>
      </nav>
    </div>
    <div class="example-content">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
// 导入Vue Router
import { RouterLink, RouterView } from 'vue-router'
</script>

<style lang="scss">
.example-container {
  display: flex;
  min-height: 100vh;

  .example-sidebar {
    width: 250px;
    padding: 20px;
    background-color: #f5f7fa;
    border-right: 1px solid #e4e7ed;
    overflow-y: auto;
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;

    h2 {
      margin-bottom: 20px;
      color: #303133;
      font-size: 20px;
    }
    
    h3 {
      margin: 20px 0 10px;
      color: #606266;
      font-size: 16px;
      font-weight: 600;
    }

    nav {
      display: flex;
      flex-direction: column;
      
      a {
        padding: 8px 0;
        color: #606266;
        text-decoration: none;
        font-size: 14px;
        transition: all 0.3s;
        
        &:hover {
          color: #409eff;
        }
        
        &.router-link-active {
          color: #409eff;
          font-weight: 500;
        }
      }
    }
  }

  .example-content {
    flex: 1;
    padding: 20px;
    margin-left: 250px;
  }
}
</style> 