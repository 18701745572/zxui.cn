# 贡献指南

感谢您考虑为 ZXUI-CN 做出贡献！

## 开发流程

1. Fork 本仓库
2. 克隆你的 fork 仓库到本地
```bash
git clone https://github.com/YOUR_USERNAME/zxui-cn.git
```

3. 创建新的特性分支
```bash
git checkout -b feature/your-feature-name
```

4. 安装依赖
```bash
npm install
```

5. 进行开发
- 组件开发请遵循项目的代码规范
- 确保添加适当的测试用例
- 保持代码整洁

6. 提交代码
```bash
git add .
git commit -m "feat: add some feature"
```

请遵循 [Conventional Commits](https://www.conventionalcommits.org/zh-hans/) 规范：

- `feat`: 新功能
- `fix`: 修复问题
- `docs`: 文档修改
- `style`: 代码格式修改
- `refactor`: 代码重构
- `perf`: 性能优化
- `test`: 测试相关
- `chore`: 构建过程或辅助工具的变动

7. 推送到你的仓库
```bash
git push origin feature/your-feature-name
```

8. 创建 Pull Request

## 开发规范

- 遵循项目现有的代码风格
- 保持组件的独立性和可复用性
- 编写清晰的文档和注释
- 确保测试覆盖率

## 测试

在提交 PR 之前，请确保：

```bash
# 运行测试
npm run test

# 运行代码检查
npm run lint

# 运行类型检查
npm run build
```

## 文档

如果你添加了新功能或修改了现有功能，请确保更新相应的文档：

```bash
# 启动文档开发服务器
npm run docs:dev
```

## 问题反馈

如果你发现了 bug 或有新的功能建议，请先查看 [issues](https://github.com/YOUR_USERNAME/zxui-cn/issues) 列表，确保没有重复的问题。 