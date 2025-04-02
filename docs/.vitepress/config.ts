import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'ZXUI CN',
  description: 'Vue 3 组件库',
  lang: 'zh-CN',
  lastUpdated: true,
  cleanUrls: true,
  ignoreDeadLinks: true,
  
  head: [
    ['meta', { charset: 'utf-8' }],
    ['meta', { 'http-equiv': 'Content-Type', content: 'text/html; charset=utf-8' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }],
    ['meta', { 'http-equiv': 'Content-Language', content: 'zh-CN' }],
    ['meta', { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge,chrome=1' }],
    ['meta', { name: 'format-detection', content: 'telephone=no' }],
    ['meta', { name: 'renderer', content: 'webkit' }],
    ['meta', { name: 'force-rendering', content: 'webkit' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', { href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700&display=swap', rel: 'stylesheet' }]
  ],
  
  markdown: {
    lineNumbers: true,
    theme: 'material-theme-palenight'
  },
  
  vite: {
    server: {
      fs: {
        strict: true
      }
    },
    optimizeDeps: {
      include: ['vue', '@vueuse/core']
    },
    esbuild: {
      charset: 'utf8'
    },
    css: {
      preprocessorOptions: {
        scss: {
          charset: false
        }
      }
    }
  },
  
  themeConfig: {
    siteTitle: 'ZXUI CN',
    logo: '/logo.png',
    nav: [
      { text: '指南', link: '/guide/' },
      { text: '组件', link: '/components/' },
      { text: '示例', link: '/examples/' },
      { text: '全览', link: '/ds/basic', target: '_self' }
    ],
    
    sidebar: {
      '/guide/': [
        {
          text: '开始',
          items: [
            { text: '介绍', link: '/guide/' },
            { text: '安装', link: '/guide/installation' },
            { text: '快速开始', link: '/guide/quickstart' }
          ]
        },
        {
          text: '进阶',
          items: [
            { text: '主题定制', link: '/guide/theme' },
            { text: '国际化', link: '/guide/i18n' },
            { text: '自定义', link: '/guide/customization' }
          ]
        }
      ],
      '/components/': [
        {
          text: '基础组件',
          items: [
            { text: 'Alert 提示', link: '/components/alert' },
            { text: 'Button 按钮', link: '/components/button' },
            { text: 'Icon 图标', link: '/components/icon' }
          ]
        },
        {
          text: '表单组件',
          items: [
            { text: 'Checkbox 复选框', link: '/components/checkbox' },
            { text: 'ColorPicker 颜色选择器', link: '/components/color-picker' },
            { text: 'DatePicker 日期选择器', link: '/components/date-picker' },
            { text: 'DateTimePicker 日期时间选择器', link: '/components/datetime-picker' },
            { text: 'Form 表单', link: '/components/form' },
            { text: 'Input 输入框', link: '/components/input' },
            { text: 'InputNumber 数字输入框', link: '/components/input-number' },
            { text: 'Radio 单选框', link: '/components/radio' },
            { text: 'Rate 评分', link: '/components/rate' },
            { text: 'Select 选择器', link: '/components/select' },
            { text: 'Slider 滑块', link: '/components/slider' },
            { text: 'Switch 开关', link: '/components/switch' }
          ]
        },
        {
          text: '数据展示',
          items: [
            { text: 'Avatar 头像', link: '/components/avatar' },
            { text: 'Badge 徽章', link: '/components/badge' },
            { text: 'Card 卡片', link: '/components/card' },
            { text: 'Carousel 轮播', link: '/components/carousel' },
            { text: 'Image 图片', link: '/components/image' },
            { text: 'Progress 进度条', link: '/components/progress' },
            { text: 'Skeleton 骨架屏', link: '/components/skeleton' },
            { text: 'Table 表格', link: '/components/table' },
            { text: 'Tag 标签', link: '/components/tag' },
            { text: 'Tree 树形控件', link: '/components/tree' }
          ]
        },
        {
          text: '反馈组件',
          items: [
            { text: 'Drawer 抽屉', link: '/components/drawer' },
            { text: 'Message 消息提示', link: '/components/message' },
            { text: 'Modal 对话框', link: '/components/modal' },
            { text: 'Notification 通知', link: '/components/notification' },
            { text: 'Popconfirm 气泡确认框', link: '/components/popconfirm' },
            { text: 'Tooltip 文字提示', link: '/components/tooltip' }
          ]
        },
        {
          text: '导航组件',
          items: [
            { text: 'Breadcrumb 面包屑', link: '/components/breadcrumb' },
            { text: 'Dropdown 下拉菜单', link: '/components/dropdown' },
            { text: 'Menu 导航菜单', link: '/components/menu' },
            { text: 'Pagination 分页', link: '/components/pagination' },
            { text: 'Steps 步骤条', link: '/components/steps' },
            { text: 'Tabs 标签页', link: '/components/tabs' }
          ]
        },
        {
          text: '其他组件',
          items: [
            { text: 'Audio 音频', link: '/components/audio' },
            { text: 'Cascader 级联选择', link: '/components/cascader' },
            { text: 'Excel 表格', link: '/components/excel' },
            { text: 'Html 预览', link: '/components/html' },
            { text: 'Json 编辑器', link: '/components/json' },
            { text: 'Markdown 编辑器', link: '/components/markdown' },
            { text: 'PDF 预览', link: '/components/pdf' },
            { text: 'PowerPoint 预览', link: '/components/powerpoint' },
            { text: 'Upload 上传', link: '/components/upload' },
            { text: 'Word 预览', link: '/components/word' }
          ]
        }
      ],
      '/examples/': [
        {
          text: '基础示例',
          items: [
            { text: '按钮示例', link: '/examples/button' },
            { text: '表单示例', link: '/examples/form' },
            { text: '表格示例', link: '/examples/table' },
            { text: '上传示例', link: '/examples/upload' }
          ]
        },
        {
          text: '进阶示例',
          items: [
            { text: '主题切换', link: '/examples/theme' },
            { text: '国际化', link: '/examples/i18n' },
            { text: '文件预览', link: '/examples/preview' },
            { text: '编辑器', link: '/examples/editor' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/your-repo/zxui-cn' }
    ],

    footer: {
      message: '基于 MIT 协议发布',
      copyright: 'Copyright © 2024 ZXUI CN'
    }
  }
}) 