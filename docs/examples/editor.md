# 编辑器

编辑器（Editor）是用于内容创作和编辑的高级组件。ZXUI CN 提供了多种类型的编辑器，包括富文本编辑器、Markdown 编辑器和代码编辑器等，满足不同场景的编辑需求。

## 富文本编辑器

基础的富文本编辑器，支持文本格式化、插入图片和表格等功能。

```vue
<template>
  <div class="rich-text-editor-demo">
    <zx-card title="富文本编辑器">
      <zx-rich-text-editor
        v-model="content"
        :toolbar="toolbar"
        :height="400"
        placeholder="请输入内容..."
        @change="handleChange"
      />
      
      <div class="editor-actions">
        <zx-button type="primary" @click="saveContent">保存</zx-button>
        <zx-button @click="resetContent">重置</zx-button>
      </div>
      
      <div class="preview-section" v-if="showPreview">
        <h3>预览内容</h3>
        <div class="preview-content" v-html="content"></div>
      </div>
    </zx-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const content = ref('<h2>富文本编辑器示例</h2><p>这是一个使用 ZXUI CN 提供的富文本编辑器组件的示例。您可以尝试编辑此内容，使用工具栏中的各种功能来格式化文本、插入图片和表格等。</p>')
const showPreview = ref(false)

// 定义工具栏按钮
const toolbar = [
  ['bold', 'italic', 'underline', 'strike'],
  ['blockquote', 'code-block'],
  [{ 'header': 1 }, { 'header': 2 }],
  [{ 'list': 'ordered' }, { 'list': 'bullet' }],
  [{ 'script': 'sub' }, { 'script': 'super' }],
  [{ 'indent': '-1' }, { 'indent': '+1' }],
  [{ 'direction': 'rtl' }],
  [{ 'size': ['small', false, 'large', 'huge'] }],
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  [{ 'color': [] }, { 'background': [] }],
  [{ 'font': [] }],
  [{ 'align': [] }],
  ['clean'],
  ['link', 'image', 'video']
]

const handleChange = (val: string) => {
  content.value = val
  showPreview.value = true
}

const saveContent = () => {
  console.log('保存内容:', content.value)
  // 这里可以实现保存逻辑，例如发送到服务器
}

const resetContent = () => {
  content.value = '<h2>富文本编辑器示例</h2><p>这是一个使用 ZXUI CN 提供的富文本编辑器组件的示例。您可以尝试编辑此内容，使用工具栏中的各种功能来格式化文本、插入图片和表格等。</p>'
  showPreview.value = false
}
</script>

<style lang="scss" scoped>
.rich-text-editor-demo {
  .editor-actions {
    margin-top: 20px;
    text-align: right;
    
    .zx-button {
      margin-left: 10px;
    }
  }
  
  .preview-section {
    margin-top: 30px;
    border-top: 1px solid var(--zx-border-color-light);
    padding-top: 20px;
    
    h3 {
      margin-bottom: 15px;
    }
    
    .preview-content {
      padding: 15px;
      border: 1px solid var(--zx-border-color-light);
      border-radius: var(--zx-border-radius-base);
      background-color: var(--zx-background-color-white);
    }
  }
}
</style>
```

## Markdown 编辑器

支持 Markdown 语法的编辑器，带有实时预览功能。

```vue
<template>
  <div class="markdown-editor-demo">
    <zx-card title="Markdown 编辑器">
      <div class="editor-tabs">
        <zx-radio-group v-model="mode" size="small">
          <zx-radio-button label="edit">编辑</zx-radio-button>
          <zx-radio-button label="split">分屏</zx-radio-button>
          <zx-radio-button label="preview">预览</zx-radio-button>
        </zx-radio-group>
      </div>
      
      <div class="editor-container" :class="mode">
        <div class="editor-section" v-show="mode !== 'preview'">
          <zx-markdown-editor
            v-model="markdownContent"
            :toolbar="markdownToolbar"
            :height="400"
            @change="handleMarkdownChange"
          />
        </div>
        
        <div class="preview-section" v-show="mode !== 'edit'">
          <div class="markdown-preview" v-html="markdownHtml"></div>
        </div>
      </div>
      
      <div class="editor-actions">
        <zx-button type="primary" @click="saveMarkdown">保存</zx-button>
        <zx-button @click="resetMarkdown">重置</zx-button>
        <zx-button type="text" @click="copyMarkdown">复制 Markdown</zx-button>
      </div>
    </zx-card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { marked } from 'marked'

const mode = ref('split')
const markdownContent = ref(`# Markdown 编辑器示例

这是一个使用 **ZXUI CN** 提供的 Markdown 编辑器组件的示例。

## 功能特点

- 支持标准 Markdown 语法
- 实时预览
- 分屏编辑模式
- 工具栏快捷操作

## 代码示例

\`\`\`javascript
function hello() {
  console.log('Hello, Markdown!');
}
\`\`\`

## 表格示例

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model | 绑定值 | string | '' |
| height | 编辑器高度 | number | 300 |
| toolbar | 工具栏配置 | array | [] |

> 这是一个引用示例

![图片示例](https://example.com/image.jpg)
`)

// 转换 Markdown 为 HTML
const markdownHtml = computed(() => {
  try {
    return marked(markdownContent.value)
  } catch (e) {
    return '<p>预览出错</p>'
  }
})

// Markdown 工具栏配置
const markdownToolbar = [
  'bold', 'italic', 'heading', '|',
  'quote', 'code', 'link', 'image', '|',
  'unordered-list', 'ordered-list', 'table', '|',
  'preview', 'side-by-side', 'fullscreen', '|',
  'guide'
]

const handleMarkdownChange = (val: string) => {
  markdownContent.value = val
}

const saveMarkdown = () => {
  console.log('保存 Markdown:', markdownContent.value)
  // 这里可以实现保存逻辑，例如发送到服务器
}

const resetMarkdown = () => {
  markdownContent.value = `# Markdown 编辑器示例

这是一个使用 **ZXUI CN** 提供的 Markdown 编辑器组件的示例。

## 功能特点

- 支持标准 Markdown 语法
- 实时预览
- 分屏编辑模式
- 工具栏快捷操作

## 代码示例

\`\`\`javascript
function hello() {
  console.log('Hello, Markdown!');
}
\`\`\`

## 表格示例

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model | 绑定值 | string | '' |
| height | 编辑器高度 | number | 300 |
| toolbar | 工具栏配置 | array | [] |

> 这是一个引用示例

![图片示例](https://example.com/image.jpg)
`
}

const copyMarkdown = () => {
  navigator.clipboard.writeText(markdownContent.value)
    .then(() => {
      // 复制成功提示
      console.log('Markdown 内容已复制到剪贴板')
    })
    .catch(err => {
      console.error('复制失败:', err)
    })
}
</script>

<style lang="scss" scoped>
.markdown-editor-demo {
  .editor-tabs {
    margin-bottom: 15px;
    text-align: right;
  }
  
  .editor-container {
    display: flex;
    border: 1px solid var(--zx-border-color-light);
    border-radius: var(--zx-border-radius-base);
    overflow: hidden;
    
    &.edit {
      .editor-section {
        width: 100%;
      }
    }
    
    &.split {
      .editor-section,
      .preview-section {
        width: 50%;
      }
      
      .preview-section {
        border-left: 1px solid var(--zx-border-color-light);
      }
    }
    
    &.preview {
      .preview-section {
        width: 100%;
      }
    }
    
    .editor-section,
    .preview-section {
      height: 400px;
      overflow: auto;
    }
    
    .preview-section {
      background-color: var(--zx-background-color-white);
      padding: 15px;
    }
  }
  
  .editor-actions {
    margin-top: 20px;
    text-align: right;
    
    .zx-button {
      margin-left: 10px;
    }
  }
  
  :deep(.markdown-preview) {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
    
    h1, h2, h3, h4, h5, h6 {
      margin-top: 24px;
      margin-bottom: 16px;
      font-weight: 600;
      line-height: 1.25;
    }
    
    h1 {
      padding-bottom: 0.3em;
      font-size: 2em;
      border-bottom: 1px solid #eaecef;
    }
    
    h2 {
      padding-bottom: 0.3em;
      font-size: 1.5em;
      border-bottom: 1px solid #eaecef;
    }
    
    p, blockquote, ul, ol, table {
      margin-bottom: 16px;
    }
    
    code {
      padding: 0.2em 0.4em;
      margin: 0;
      font-size: 85%;
      background-color: rgba(27, 31, 35, 0.05);
      border-radius: 3px;
    }
    
    pre {
      padding: 16px;
      overflow: auto;
      font-size: 85%;
      line-height: 1.45;
      background-color: #f6f8fa;
      border-radius: 3px;
      
      code {
        background-color: transparent;
        padding: 0;
      }
    }
    
    blockquote {
      padding: 0 1em;
      color: #6a737d;
      border-left: 0.25em solid #dfe2e5;
    }
    
    table {
      display: block;
      width: 100%;
      overflow: auto;
      border-spacing: 0;
      border-collapse: collapse;
      
      tr {
        background-color: #fff;
        border-top: 1px solid #c6cbd1;
      }
      
      th, td {
        padding: 6px 13px;
        border: 1px solid #dfe2e5;
      }
      
      th {
        font-weight: 600;
      }
      
      tr:nth-child(2n) {
        background-color: #f6f8fa;
      }
    }
  }
}
</style>
```

## 代码编辑器

支持语法高亮和代码补全的代码编辑器。

```vue
<template>
  <div class="code-editor-demo">
    <zx-card title="代码编辑器">
      <div class="editor-header">
        <zx-select v-model="language" style="width: 120px;" @change="changeLanguage">
          <zx-option label="JavaScript" value="javascript" />
          <zx-option label="HTML" value="html" />
          <zx-option label="CSS" value="css" />
          <zx-option label="TypeScript" value="typescript" />
          <zx-option label="JSON" value="json" />
          <zx-option label="Vue" value="vue" />
        </zx-select>
        
        <div class="editor-options">
          <zx-checkbox v-model="options.lineNumbers">显示行号</zx-checkbox>
          <zx-checkbox v-model="options.foldGutter">代码折叠</zx-checkbox>
          <zx-checkbox v-model="options.autoCloseBrackets">自动闭合括号</zx-checkbox>
        </div>
      </div>
      
      <div class="editor-container">
        <zx-code-editor
          v-model="code"
          :language="language"
          :options="options"
          :height="400"
          @change="handleCodeChange"
        />
      </div>
      
      <div class="editor-actions">
        <zx-button-group>
          <zx-button @click="formatCode">格式化</zx-button>
          <zx-button @click="copyCode">复制</zx-button>
          <zx-button @click="downloadCode">下载</zx-button>
        </zx-button-group>
        
        <zx-button type="primary" @click="runCode" v-if="language === 'javascript'">
          运行代码
        </zx-button>
      </div>
      
      <div class="output-container" v-if="showOutput">
        <h3>输出结果</h3>
        <div class="output-content">
          <pre>{{ output }}</pre>
        </div>
      </div>
    </zx-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

const language = ref('javascript')
const code = ref(`// JavaScript 示例代码
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// 计算斐波那契数列的前10个数
const fibSequence = [];
for (let i = 0; i < 10; i++) {
  fibSequence.push(fibonacci(i));
}

console.log("斐波那契数列:", fibSequence);
`)

const options = reactive({
  lineNumbers: true,
  foldGutter: true,
  autoCloseBrackets: true,
  theme: 'default',
  tabSize: 2,
  styleActiveLine: true,
  matchBrackets: true
})

const output = ref('')
const showOutput = ref(false)

// 语言示例代码
const samples = {
  javascript: `// JavaScript 示例代码
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// 计算斐波那契数列的前10个数
const fibSequence = [];
for (let i = 0; i < 10; i++) {
  fibSequence.push(fibonacci(i));
}

console.log("斐波那契数列:", fibSequence);`,

  html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>HTML 示例</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 20px;
    }
    .container {
      max-width: 800px;
      margin: 0 auto;
    }
    .header {
      background-color: #f0f0f0;
      padding: 10px;
      border-radius: 5px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>HTML 示例页面</h1>
      <p>这是一个简单的 HTML 示例页面</p>
    </div>
    <main>
      <p>使用 ZXUI CN 的代码编辑器编辑 HTML 代码</p>
    </main>
  </div>
</body>
</html>`,

  css: `/* CSS 示例代码 */
body {
  font-family: 'Helvetica Neue', Arial, sans-serif;
  line-height: 1.6;
  color: #333;
  margin: 0;
  padding: 20px;
  background-color: #f8f9fa;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
}

.header {
  text-align: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
}

.header h1 {
  margin: 0;
  color: #2c3e50;
  font-size: 32px;
}

.button {
  display: inline-block;
  background-color: #3498db;
  color: white;
  padding: 10px 20px;
  border-radius: 4px;
  text-decoration: none;
  transition: background-color 0.3s;
}

.button:hover {
  background-color: #2980b9;
}`,

  typescript: `// TypeScript 示例代码
interface Person {
  name: string;
  age: number;
  email?: string;
  greet(): void;
}

class Employee implements Person {
  name: string;
  age: number;
  email?: string;
  department: string;
  
  constructor(name: string, age: number, department: string, email?: string) {
    this.name = name;
    this.age = age;
    this.department = department;
    this.email = email;
  }
  
  greet(): void {
    console.log(\`Hello, my name is \${this.name}. I work in the \${this.department} department.\`);
  }
}

const john: Employee = new Employee('John Doe', 30, 'Engineering', 'john@example.com');
john.greet();`,

  json: `{
  "name": "zxui-cn",
  "version": "1.0.0",
  "description": "A Vue 3 UI Component Library",
  "main": "lib/index.js",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "test": "jest"
  },
  "keywords": [
    "vue",
    "ui",
    "components"
  ],
  "author": "ZXUI Team",
  "license": "MIT",
  "dependencies": {
    "vue": "^3.2.0"
  },
  "devDependencies": {
    "vite": "^2.5.0",
    "typescript": "^4.3.5",
    "sass": "^1.32.0"
  }
}`,

  vue: `<template>
  <div class="greeting-card">
    <h1>{{ greeting }}</h1>
    <p>{{ message }}</p>
    <button @click="updateMessage">更新消息</button>
    <p v-if="showInfo">组件点击次数: {{ clickCount }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// Props
defineProps({
  greeting: {
    type: String,
    default: 'Hello'
  }
});

// State
const message = ref('Welcome to ZXUI CN!');
const clickCount = ref(0);
const showInfo = ref(false);

// Methods
const updateMessage = () => {
  clickCount.value++;
  message.value = \`感谢使用 ZXUI CN! (点击次数: \${clickCount.value})\`;
  showInfo.value = true;
};
</script>

<style scoped>
.greeting-card {
  padding: 20px;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  margin: 0 auto;
  text-align: center;
}

h1 {
  color: #3f51b5;
  margin-bottom: 10px;
}

button {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #45a049;
}
</style>`
}

const changeLanguage = (val: string) => {
  code.value = samples[val]
  showOutput.value = false
}

const handleCodeChange = (val: string) => {
  code.value = val
}

const formatCode = () => {
  // 这里可以实现代码格式化逻辑
  console.log('格式化代码')
}

const copyCode = () => {
  navigator.clipboard.writeText(code.value)
    .then(() => {
      console.log('代码已复制到剪贴板')
    })
    .catch(err => {
      console.error('复制失败:', err)
    })
}

const downloadCode = () => {
  const blob = new Blob([code.value], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  
  let extension = 'txt'
  switch (language.value) {
    case 'javascript': extension = 'js'; break
    case 'html': extension = 'html'; break
    case 'css': extension = 'css'; break
    case 'typescript': extension = 'ts'; break
    case 'json': extension = 'json'; break
    case 'vue': extension = 'vue'; break
  }
  
  a.href = url
  a.download = `code-example.${extension}`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

const runCode = () => {
  if (language.value !== 'javascript') return
  
  output.value = ''
  showOutput.value = true
  
  try {
    // 保存原始的 console.log
    const originalConsoleLog = console.log
    const logs: string[] = []
    
    // 替换 console.log 函数以捕获输出
    console.log = (...args) => {
      logs.push(
        args.map(arg => 
          typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
        ).join(' ')
      )
      originalConsoleLog(...args)
    }
    
    // 执行代码
    new Function(code.value)()
    
    // 恢复原始的 console.log
    console.log = originalConsoleLog
    
    // 设置输出
    output.value = logs.join('\n')
  } catch (error) {
    output.value = `运行错误: ${error.message}`
  }
}
</script>

<style lang="scss" scoped>
.code-editor-demo {
  .editor-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
    
    .editor-options {
      display: flex;
      gap: 15px;
    }
  }
  
  .editor-container {
    border: 1px solid var(--zx-border-color-light);
    border-radius: var(--zx-border-radius-base);
    overflow: hidden;
  }
  
  .editor-actions {
    margin-top: 15px;
    display: flex;
    justify-content: space-between;
  }
  
  .output-container {
    margin-top: 20px;
    border-top: 1px solid var(--zx-border-color-light);
    padding-top: 15px;
    
    h3 {
      margin-bottom: 10px;
    }
    
    .output-content {
      padding: 15px;
      background-color: #f6f8fa;
      border-radius: var(--zx-border-radius-base);
      overflow: auto;
      max-height: 200px;
      
      pre {
        margin: 0;
        white-space: pre-wrap;
        word-wrap: break-word;
      }
    }
  }
}
</style>
```

以上示例展示了 ZXUI CN 编辑器组件的各种用法和场景，包括富文本编辑器、Markdown 编辑器和代码编辑器。这些编辑器组件能够满足各种内容创作和代码编辑需求，提升用户体验。 