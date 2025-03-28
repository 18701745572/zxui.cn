import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// 获取当前文件的目录路径
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 组件列表，根据src/components目录下的组件名称生成
const components = [
  { name: 'Alert', title: 'Alert 警告', description: '用于页面中展示重要的提示信息。' },
  { name: 'Avatar', title: 'Avatar 头像', description: '用来代表用户或事物，支持图片、图标或字符展示。' },
  { name: 'Audio', title: 'Audio 音频', description: '用于音频文件的播放和控制。' },
  { name: 'Badge', title: 'Badge 徽章', description: '出现在按钮、图标右上角的数字或状态标记。' },
  { name: 'Button', title: 'Button 按钮', description: '按钮用于触发一个操作或事件，如提交表单、打开对话框等。' },
  { name: 'Card', title: 'Card 卡片', description: '将信息聚合在卡片容器中展示。' },
  { name: 'Cascader', title: 'Cascader 级联选择器', description: '当一个数据集合有清晰的层级结构时，可通过级联选择器逐级查看并选择。' },
  { name: 'Checkbox', title: 'Checkbox 复选框', description: '在一组备选项中进行多选。' },
  { name: 'ColorPicker', title: 'ColorPicker 颜色选择器', description: '用于颜色选择，支持多种格式。' },
  { name: 'Csv', title: 'CSV 预览', description: '用于预览CSV格式的表格数据。' },
  { name: 'DatePicker', title: 'DatePicker 日期选择器', description: '用于选择或输入日期。' },
  { name: 'DateTimePicker', title: 'DateTimePicker 日期时间选择器', description: '在同一个选择器里选择日期和时间。' },
  { name: 'Drawer', title: 'Drawer 抽屉', description: '从屏幕边缘滑出的浮层面板。' },
  { name: 'Excel', title: 'Excel 预览', description: '用于预览Excel格式的电子表格。' },
  { name: 'Form', title: 'Form 表单', description: '用于创建收集用户输入的表单。' },
  { name: 'Html', title: 'HTML 预览', description: '用于预览HTML格式的内容。' },
  { name: 'Image', title: 'Image 图片', description: '图片容器，在保留原生img的特性下，支持懒加载，自定义占位、加载失败等。' },
  { name: 'Input', title: 'Input 输入框', description: '通过鼠标或键盘输入字符的基础表单组件。' },
  { name: 'InputNumber', title: 'InputNumber 数字输入框', description: '仅允许输入标准的数字值，可定义范围。' },
  { name: 'Json', title: 'JSON 预览', description: '用于预览和格式化JSON数据。' },
  { name: 'Markdown', title: 'Markdown 预览', description: '用于预览Markdown格式的文本。' },
  { name: 'Message', title: 'Message 消息提示', description: '常用于主动操作后的反馈提示。' },
  { name: 'Modal', title: 'Modal 对话框', description: '在当前页面打开一个对话框，承载相关操作。' },
  { name: 'Pdf', title: 'PDF 预览', description: '用于预览PDF文档。' },
  { name: 'PowerPoint', title: 'PowerPoint 预览', description: '用于预览PowerPoint演示文稿。' },
  { name: 'Progress', title: 'Progress 进度条', description: '用于展示操作进度，告知用户当前状态和预期。' },
  { name: 'Radio', title: 'Radio 单选框', description: '在一组备选项中进行单选。' },
  { name: 'Rate', title: 'Rate 评分', description: '评分组件，对事物进行评级操作。' },
  { name: 'Select', title: 'Select 选择器', description: '当选项过多时，使用下拉菜单展示并选择内容。' },
  { name: 'Skeleton', title: 'Skeleton 骨架屏', description: '在需要等待加载内容的位置提供一个占位图形组合。' },
  { name: 'Slider', title: 'Slider 滑块', description: '通过拖动滑块在一个固定区间内进行选择。' },
  { name: 'Steps', title: 'Steps 步骤条', description: '引导用户按照流程完成任务的分步导航条。' },
  { name: 'Switch', title: 'Switch 开关', description: '表示两种相互对立的状态间的切换，多用于触发「开/关」。' },
  { name: 'Table', title: 'Table 表格', description: '用于展示多条结构类似的数据，可对数据进行排序、筛选、对比或其他自定义操作。' },
  { name: 'Tabs', title: 'Tabs 标签页', description: '分隔内容上有关联但属于不同类别的数据集合。' },
  { name: 'Tag', title: 'Tag 标签', description: '用于标记和选择。' },
  { name: 'TimePicker', title: 'TimePicker 时间选择器', description: '用于选择或输入时间。' },
  { name: 'Timeline', title: 'Timeline 时间线', description: '可视化地呈现时间流信息。' },
  { name: 'Tooltip', title: 'Tooltip 文字提示', description: '简单的文字提示气泡框。' },
  { name: 'Transfer', title: 'Transfer 穿梭框', description: '双栏穿梭选择框，将元素从一栏移动到另一栏。' },
  { name: 'Tree', title: 'Tree 树形控件', description: '用清晰的层级结构展示信息，可展开或折叠。' },
  { name: 'Txt', title: 'TXT 预览', description: '用于预览纯文本格式的内容。' },
  { name: 'Upload', title: 'Upload 上传', description: '通过点击或者拖拽上传文件。' },
  { name: 'Video', title: 'Video 视频', description: '用于视频文件的播放和控制。' },
  { name: 'Webview', title: 'Webview 网页', description: '用于在应用内嵌入网页内容。' },
  { name: 'Word', title: 'Word 预览', description: '用于预览Word文档。' },
  { name: 'Xml', title: 'XML 预览', description: '用于预览和格式化XML数据。' },
  { name: 'Xlsx', title: 'XLSX 预览', description: '用于预览XLSX格式的电子表格。' },
  { name: 'Yaml', title: 'YAML 预览', description: '用于预览和格式化YAML数据。' }
];

// 示例模板
const getComponentTemplate = (component) => `<template>
  <div class="component-demo">
    <h1>${component.title}</h1>
    <p class="component-description">${component.description}</p>

    <h2>基础用法</h2>
    <div class="demo-block">
      <div class="demo-block-content">
        <zx-${component.name.toLowerCase()}></zx-${component.name.toLowerCase()}>
      </div>
      <div class="demo-block-description">
        ${component.title}的基础用法示例。
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
          <td>value / v-model</td>
          <td>绑定值</td>
          <td>-</td>
          <td>-</td>
          <td>-</td>
        </tr>
        <!-- 添加更多属性 -->
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
          <td>值变化时触发</td>
          <td>新值</td>
        </tr>
        <!-- 添加更多事件 -->
      </tbody>
    </table>
  </div>
</template>

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
</style>`;

// 确保目录存在
const componentsDir = path.join(__dirname, 'components');
if (!fs.existsSync(componentsDir)) {
  fs.mkdirSync(componentsDir);
}

// 生成示例文件
components.forEach(component => {
  // 跳过已创建的示例文件
  const filePath = path.join(componentsDir, `${component.name}.vue`);
  if (fs.existsSync(filePath)) {
    console.log(`${component.name}.vue already exists. Skipping...`);
    return;
  }
  
  // 创建示例文件
  const content = getComponentTemplate(component);
  fs.writeFileSync(filePath, content);
  console.log(`Created ${filePath}`);
});

console.log('All component example files have been generated!'); 