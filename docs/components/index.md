# 组件总览

ZXUI CN 提供了丰富的 Vue 3 组件，帮助你快速构建企业级应用。

## 基础组件

### Button 按钮
常用的操作按钮，支持多种类型、尺寸和状态。
```vue
<z-button type="primary">主要按钮</z-button>
```
[查看详情](./button)

### Icon 图标
语义化的矢量图形，支持多种主题和自定义。
```vue
<z-icon name="search" />
```
[查看详情](./icon)

### Link 链接
文字超链接，支持不同状态和下划线。
```vue
<z-link href="https://example.com">链接文本</z-link>
```
[查看详情](./link)

## 表单组件

### Input 输入框
基础表单组件，支持文本输入和密码输入。
```vue
<z-input v-model="value" placeholder="请输入" />
```
[查看详情](./input)

### Select 选择器
下拉选择器，支持单选和多选。
```vue
<z-select v-model="value" :options="options" />
```
[查看详情](./select)

### Radio 单选框
单选框组件，支持按钮和边框样式。
```vue
<z-radio v-model="value" label="1">选项一</z-radio>
```
[查看详情](./radio)

### Checkbox 复选框
多选框组件，支持按钮和边框样式。
```vue
<z-checkbox v-model="value" label="1">选项一</z-checkbox>
```
[查看详情](./checkbox)

### Form 表单
表单容器，提供表单验证和提交功能。
```vue
<z-form :model="form" :rules="rules">
  <z-form-item label="用户名" prop="username">
    <z-input v-model="form.username" />
  </z-form-item>
</z-form>
```
[查看详情](./form)

## 数据展示

### Table 表格
展示行列数据，支持排序、筛选和分页。
```vue
<z-table :data="tableData" :columns="columns" />
```
[查看详情](./table)

### Tag 标签
小型标记，用于标记和分类。
```vue
<z-tag>标签</z-tag>
```
[查看详情](./tag)

### Badge 徽章
图标右上角的圆形标记，用于显示数量。
```vue
<z-badge :value="12">
  <z-button>消息</z-button>
</z-badge>
```
[查看详情](./badge)

## 导航组件

### Menu 导航菜单
网站导航菜单，支持横向和纵向两种模式。
```vue
<z-menu mode="horizontal" :default-active="activeIndex">
  <z-menu-item index="1">首页</z-menu-item>
</z-menu>
```
[查看详情](./menu)

### Tabs 标签页
选项卡切换组件，支持自定义标签页内容。
```vue
<z-tabs v-model="activeTab">
  <z-tab-pane label="标签1" name="1">内容1</z-tab-pane>
</z-tabs>
```
[查看详情](./tabs)

### Breadcrumb 面包屑
显示当前页面在系统层级结构中的位置。
```vue
<z-breadcrumb>
  <z-breadcrumb-item>首页</z-breadcrumb-item>
</z-breadcrumb>
```
[查看详情](./breadcrumb)

## 反馈组件

### Modal 对话框
模态对话框，用于重要信息的确认和输入。
```vue
<z-modal v-model="visible" title="提示">
  对话框内容
</z-modal>
```
[查看详情](./modal)

### Message 消息提示
全局展示操作反馈信息。
```vue
<z-button @click="$message.success('操作成功')">
  显示消息
</z-button>
```
[查看详情](./message)

### Notification 通知
全局展示通知提醒信息。
```vue
<z-button @click="$notification.info('通知内容')">
  显示通知
</z-button>
```
[查看详情](./notification)

## 其他组件

### Divider 分割线
区隔内容的分割线，支持虚线和文字。
```vue
<z-divider>文字</z-divider>
```
[查看详情](./divider)

### Progress 进度条
展示操作的当前进度。
```vue
<z-progress :percentage="50" />
```
[查看详情](./progress)

### Empty 空状态
空状态时的占位提示。
```vue
<z-empty description="暂无数据" />
```
[查看详情](./empty)

## 使用指南

1. 安装组件库
```bash
pnpm add zxui-cn
```

2. 全局注册
```ts
import { createApp } from 'vue'
import ZXUI from 'zxui-cn'
import 'zxui-cn/dist/style.css'

const app = createApp(App)
app.use(ZXUI)
```

3. 按需引入
```ts
import { Button, Input } from 'zxui-cn'
import 'zxui-cn/dist/style.css'

const app = createApp(App)
app.use(Button).use(Input)
```

更多使用方法请参考[快速开始](../guide/quickstart)和[主题定制](../guide/customization)。 