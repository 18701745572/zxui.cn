import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// 获取当前文件的目录路径
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 组件示例目录
const componentsDir = path.join(__dirname, 'components');

// 需要优先增强的组件列表
const priorityComponents = [
  'Button', 'Input', 'Select', 'Switch', 'Checkbox', 'Radio', 'DatePicker',
  'TimePicker', 'Form', 'Table', 'Pagination', 'Progress', 'Tree', 'Modal',
  'Message', 'Alert', 'Tabs', 'Tag', 'Tooltip'
];

// 读取所有组件示例文件
const componentFiles = fs.readdirSync(componentsDir)
  .filter(file => file.endsWith('.vue'))
  .map(file => ({
    name: file.replace('.vue', ''),
    path: path.join(componentsDir, file),
    content: fs.readFileSync(path.join(componentsDir, file), 'utf-8')
  }));

// 根据优先级排序
componentFiles.sort((a, b) => {
  const aIndex = priorityComponents.indexOf(a.name);
  const bIndex = priorityComponents.indexOf(b.name);
  
  if (aIndex === -1 && bIndex === -1) return 0;
  if (aIndex === -1) return 1;
  if (bIndex === -1) return -1;
  return aIndex - bIndex;
});

// 检查哪些组件示例需要增强
const componentsToEnhance = componentFiles.filter(component => {
  // 简单检查示例文件是否包含丰富内容
  const hasRichExamples = component.content.split('<h2>').length > 4; // 至少有4个示例部分
  const hasScript = component.content.includes('<script>');
  
  return !hasRichExamples || !hasScript;
});

// 统计已经完善的组件
const enhancedComponents = componentFiles.filter(component => {
  const hasRichExamples = component.content.split('<h2>').length > 4;
  const hasScript = component.content.includes('<script>');
  
  return hasRichExamples && hasScript;
});

// 优先需要增强的组件
const priorityToEnhance = componentsToEnhance.filter(component => 
  priorityComponents.includes(component.name)
);

// 非优先需要增强的组件
const otherComponentsToEnhance = componentsToEnhance.filter(component => 
  !priorityComponents.includes(component.name)
);

// 输出统计信息
console.log('===== ZXUI组件示例完善进度 =====');
console.log(`已完成: ${enhancedComponents.length}/${componentFiles.length} (${(enhancedComponents.length / componentFiles.length * 100).toFixed(1)}%)`);
console.log('');

// 输出已完善的组件列表
console.log('已完善的组件示例:');
enhancedComponents.forEach(component => {
  console.log(`✓ ${component.name}`);
});
console.log('');

// 输出优先需要增强的组件
console.log('优先需要增强的组件:');
priorityToEnhance.forEach(component => {
  console.log(`* ${component.name}`);
});
console.log('');

// 输出其他需要增强的组件
console.log('其他需要增强的组件:');
otherComponentsToEnhance.forEach(component => {
  console.log(`- ${component.name}`);
});
console.log('');

// 如何增强组件示例的说明
console.log('如何增强组件示例:');
console.log('1. 为每个组件添加更多用法示例，至少包括:');
console.log('   - 基础用法');
console.log('   - 不同状态（如有）');
console.log('   - 不同尺寸（如适用）');
console.log('   - 不同类型（如适用）');
console.log('   - 特殊功能演示（如适用）');
console.log('2. 为每个示例添加详细的文字说明');
console.log('3. 为组件添加完整的属性和事件文档');
console.log('4. 添加必要的交互逻辑（通过script部分）');
console.log('5. 查看组件源码了解全部功能，确保示例全面展示组件特性');

// 实用提示
console.log('\n实用提示:');
console.log('1. 查看每个组件的源码，了解其属性、事件和插槽');
console.log('2. 确保示例覆盖组件的所有主要功能');
console.log('3. 使用v-model等Vue特性展示组件的交互性');
console.log('4. 为每个示例添加清晰的代码和解释');
console.log('5. 保持示例简洁但全面'); 