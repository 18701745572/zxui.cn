# 常见问题

这里列出了使用 ZXUI CN 时的常见问题和解决方案。

## 安装和配置

### Q: 如何按需引入组件？

使用 `unplugin-vue-components` 实现自动按需引入：

```bash
npm install -D unplugin-vue-components
```

在 `vite.config.ts` 中配置：

```ts
import { defineConfig } from 'vite'
import Components from 'unplugin-vue-components/vite'
import { ZXUIResolver } from 'zxui-cn/resolver'

export default defineConfig({
  plugins: [
    Components({
      resolvers: [ZXUIResolver()]
    })
  ]
})
```

### Q: 如何处理 TypeScript 类型报错？

确保在 `tsconfig.json` 中包含以下配置：

```json
{
  "compilerOptions": {
    "types": ["zxui-cn/types"]
  }
}
```

## 样式相关

### Q: 如何覆盖组件默认样式？

1. 使用 CSS 变量：

```css
:root {
  --zx-primary-color: #1890ff;
  --zx-border-radius: 4px;
}
```

2. 使用 scoped 样式和 deep 选择器：

```vue
<style lang="scss" scoped>
.custom-form {
  :deep(.z-input) {
    width: 300px;
  }
}
</style>
```

### Q: 暗黑模式切换后样式未更新？

确保在切换主题时更新了根元素的 class：

```ts
const toggleTheme = () => {
  // 移除所有主题相关的 class
  document.documentElement.classList.remove('light', 'dark')
  // 添加新的主题 class
  document.documentElement.classList.add(isDark.value ? 'dark' : 'light')
  // 触发组件重新渲染
  nextTick(() => {
    // 可以在这里执行其他操作
  })
}
```

## 组件使用

### Q: Form 组件如何进行异步验证？

```vue
<template>
  <z-form :model="form" :rules="rules" ref="formRef">
    <z-form-item prop="username">
      <z-input v-model="form.username" />
    </z-form-item>
  </z-form>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const formRef = ref()
const form = ref({
  username: ''
})

const validateUsername = async (rule: any, value: string) => {
  if (!value) {
    return Promise.reject('请输入用户名')
  }
  
  try {
    const res = await fetch(`/api/validate-username?username=${value}`)
    const { valid } = await res.json()
    return valid ? Promise.resolve() : Promise.reject('用户名已存在')
  } catch (error) {
    return Promise.reject('验证失败')
  }
}

const rules = {
  username: [{ validator: validateUsername, trigger: 'blur' }]
}
</script>
```

### Q: Table 组件如何实现自定义排序？

```vue
<template>
  <z-table :data="tableData" :default-sort="{ prop: 'date', order: 'descending' }">
    <z-table-column
      prop="date"
      label="日期"
      sortable
      :sort-method="sortByDate"
    />
  </z-table>
</template>

<script setup lang="ts">
const sortByDate = (a: any, b: any) => {
  return new Date(a.date).getTime() - new Date(b.date).getTime()
}
</script>
```

## 性能优化

### Q: 大数据列表如何优化性能？

1. 使用虚拟滚动：

```vue
<template>
  <z-virtual-list
    :data="largeData"
    :item-size="50"
    :buffer-size="10"
  >
    <template #default="{ item }">
      <div class="list-item">{{ item.name }}</div>
    </template>
  </z-virtual-list>
</template>
```

2. 使用分页加载：

```vue
<template>
  <z-table
    v-loading="loading"
    :data="tableData"
    :pagination="{
      total,
      current: currentPage,
      pageSize
    }"
    @page-change="handlePageChange"
  >
    <!-- 表格列配置 -->
  </z-table>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const loading = ref(false)
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)

const loadData = async (page: number) => {
  loading.value = true
  try {
    const res = await fetch(`/api/data?page=${page}&size=${pageSize.value}`)
    const data = await res.json()
    tableData.value = data.items
    total.value = data.total
  } finally {
    loading.value = false
  }
}

const handlePageChange = (page: number) => {
  currentPage.value = page
  loadData(page)
}
</script>
```

### Q: 如何减小打包体积？

1. 使用按需引入：

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import Components from 'unplugin-vue-components/vite'
import { ZXUIResolver } from 'zxui-cn/resolver'

export default defineConfig({
  plugins: [
    Components({
      resolvers: [ZXUIResolver()]
    })
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'zxui-core': ['zxui-cn/core'],
          'zxui-utils': ['zxui-cn/utils']
        }
      }
    }
  }
})
```

2. 使用动态导入：

```vue
<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

const ComplexComponent = defineAsyncComponent(() =>
  import('./ComplexComponent.vue')
)
</script>
```

## 其他

### Q: 如何贡献代码？

1. Fork 仓库并克隆到本地
2. 创建新的分支：`git checkout -b feature/new-feature`
3. 提交更改：`git commit -m 'feat: add new feature'`
4. 推送到远程：`git push origin feature/new-feature`
5. 创建 Pull Request

详细步骤请参考 [贡献指南](/guide/contributing)。

### Q: 如何调试组件库？

1. 克隆仓库并安装依赖：

```bash
git clone https://github.com/your-repo/zxui-cn.git
cd zxui-cn
pnpm install
```

2. 启动开发服务器：

```bash
pnpm dev
```

3. 使用 Vue Devtools 调试组件。

4. 使用示例项目测试：

```bash
pnpm example:dev
``` 