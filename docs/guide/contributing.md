# 贡献指南

感谢你对 ZXUI CN 组件库的关注和支持！本指南将帮助你参与到组件库的开发中来。

## 开发准备

### 环境要求

- Node.js >= 16
- pnpm >= 8
- Git

### 开发工具

推荐使用以下工具：
- VS Code
- Vue.js Devtools
- ESLint 插件
- Prettier 插件

### 代码获取

1. Fork 仓库
```bash
# 访问 https://github.com/18701745572/zxui.cn
# 点击 Fork 按钮创建自己的仓库副本
```

2. 克隆代码
```bash
git clone https://github.com/你的用户名/zxui.cn.git
cd zxui.cn
```

3. 安装依赖
```bash
pnpm install
```

4. 启动开发服务
```bash
# 启动组件库开发环境
pnpm dev

# 启动文档站点
pnpm docs:dev

# 启动示例项目
pnpm example:dev
```

## 开发规范

### 目录结构

```
zxui-cn
├── docs/               # 文档源码
├── src/               # 组件源码
│   ├── button/       # 按钮组件
│   ├── input/        # 输入框组件
│   └── ...
├── examples/          # 示例代码
├── scripts/          # 构建脚本
├── tests/            # 测试文件
└── package.json
```

### 组件开发规范

1. 组件命名
```ts
// 使用 PascalCase
export default defineComponent({
  name: 'ZButton'
})
```

2. 属性定义
```ts
// 使用 TypeScript 类型定义
interface ButtonProps {
  type?: 'primary' | 'success' | 'warning' | 'danger'
  size?: 'large' | 'default' | 'small'
  disabled?: boolean
}
```

3. 事件命名
```ts
// 使用 kebab-case
emit('click')
emit('change')
emit('update:modelValue')
```

4. 样式规范
```scss
// 使用 BEM 命名规范
.z-button {
  &--primary {}
  &--disabled {}
  &__icon {}
}
```

### Git 提交规范

我们使用 [Conventional Commits](https://www.conventionalcommits.org/zh-hans/) 规范：

```bash
# 格式：<类型>[可选 范围]: <描述>

feat: 添加按钮组件
fix: 修复输入框验证问题
docs: 更新快速开始文档
style: 改进代码格式
refactor: 重构表单组件
test: 添加单元测试
chore: 更新构建配置
```

### 分支管理

- `main`: 主分支，用于发布
- `dev`: 开发分支，用于开发
- `feat/*`: 特性分支
- `fix/*`: 修复分支
- `docs/*`: 文档分支

## 开发流程

### 1. 创建特性分支

```bash
git checkout -b feat/new-component
```

### 2. 开发新功能

```bash
# 开发组件
cd src/new-component

# 编写测试
cd tests/new-component

# 添加文档
cd docs/components/new-component.md
```

### 3. 运行测试

```bash
# 运行所有测试
pnpm test

# 运行特定测试
pnpm test src/new-component/__tests__
```

### 4. 提交代码

```bash
git add .
git commit -m "feat: add new component"
git push origin feat/new-component
```

### 5. 创建 Pull Request

1. 访问你的 GitHub 仓库
2. 点击 "New Pull Request"
3. 选择要合并的分支
4. 填写 PR 描述
5. 等待 Review

## 文档编写

### 组件文档模板

```markdown
# 组件名称

组件描述

## 基础用法

基础用法示例

## API

### 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| prop | 说明 | type | default |

### 事件

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| event | 说明 | params |

### 插槽

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| slot | 说明 | params |
```

### 示例编写规范

```vue
<template>
  <div class="example">
    <zx-button type="primary">示例按钮</zx-button>
  </div>
</template>

<script setup lang="ts">
// 示例代码
</script>

<style scoped>
.example {
  padding: 20px;
}
</style>
```

## 发布流程

### 1. 版本更新

```bash
# 更新版本号
pnpm version patch/minor/major

# 生成更新日志
pnpm changelog
```

### 2. 构建发布

```bash
# 构建组件库
pnpm build

# 构建文档
pnpm docs:build

# 发布到 npm
pnpm publish
```

## 注意事项

1. 提交前请确保：
   - 所有测试通过
   - 代码格式正确
   - 文档已更新
   - 示例可运行

2. PR 要求：
   - 标题清晰明了
   - 描述完整详细
   - 包含测试用例
   - 更新相关文档

3. 代码审查：
   - 遵循代码规范
   - 保持向后兼容
   - 考虑性能影响
   - 注意安全问题

## 帮助和支持

如果你在开发过程中遇到问题：

1. 查看[常见问题](./faq)
2. 搜索 [Issues](https://github.com/18701745572/zxui.cn/issues)
3. 加入技术交流群
4. 联系维护团队

## 致谢

感谢所有贡献者对 ZXUI CN 的支持和帮助！

# 组件命名规范

## 组件前缀规范

我们采用统一的命名规范来确保代码的一致性：

1. 组件注册名称：
```typescript
defineOptions({
  name: 'ZxButton'  // 使用 Zx 前缀，PascalCase 命名
})
```

2. 组件使用方式：
```vue
<!-- 推荐使用 kebab-case -->
<zx-button type="primary">按钮</zx-button>

<!-- 也支持 PascalCase -->
<ZxButton type="primary">按钮</ZxButton>
```

3. CSS 类名：
```scss
.zx-button {  // 使用 zx- 前缀
  &__wrapper { ... }  // BEM 命名方式
  &--primary { ... }  // 修饰符
}
```

4. 主题变量：
```css
:root {
  --z-primary-color: #409eff;  // 主题变量使用 z- 前缀
  --z-success-color: #67c23a;
}
```

## 命名规范说明

1. 组件前缀：
- 使用 `Zx` 作为组件前缀，表示 ZXUI 组件库
- 组件注册名使用 PascalCase：`ZxButton`、`ZxInput`
- 模板中推荐使用 kebab-case：`<zx-button>`

2. CSS 类名：
- 使用 `zx-` 作为前缀
- 遵循 BEM 命名规范
- 使用 kebab-case 命名方式

3. 主题变量：
- 使用 `--z-` 作为前缀
- 使用 kebab-case 命名方式
- 与组件类名区分，专门用于主题定制

## 为什么这样规范？

1. 避免命名冲突：
- 使用特定前缀避免与其他库或用户代码冲突
- 区分组件类名和主题变量

2. 提高可维护性：
- 统一的命名方式便于理解和维护
- BEM 命名方式清晰表达类名的层级关系

3. 提供灵活性：
- 支持 PascalCase 和 kebab-case 两种使用方式
- 主题变量独立命名便于全局管理

4. 遵循最佳实践：
- 符合 Vue 官方推荐的命名规范
- 采用通用的 CSS 命名规范 