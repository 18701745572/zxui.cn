# 示例

这里提供了一些常见的使用场景示例，帮助你快速上手 ZXUI CN。

## 基础示例

### 登录表单

```vue
<template>
  <div class="login-form">
    <zx-form ref="formRef" :model="formData" :rules="rules">
      <zx-form-item prop="username">
        <zx-input
          v-model="formData.username"
          placeholder="请输入用户名"
          prefix-icon="user"
        />
      </z-form-item>
      <zx-form-item prop="password">
        <zx-input
          v-model="formData.password"
          type="password"
          placeholder="请输入密码"
          prefix-icon="lock"
        />
      </z-form-item>
      <zx-form-item>
        <zx-button type="primary" @click="handleSubmit">登录</zx-button>
        <zx-button @click="handleReset">重置</zx-button>
      </z-form-item>
    </z-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const formRef = ref()
const formData = ref({
  username: '',
  password: ''
})

const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
  ]
}

const handleSubmit = async () => {
  if (!formRef.value) return
  await formRef.value.validate()
  // 处理登录逻辑
}

const handleReset = () => {
  if (!formRef.value) return
  formRef.value.resetFields()
}
</script>

<style lang="scss">
.login-form {
  width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid var(--zx-border-color);
  border-radius: var(--zx-border-radius-base);
}
</style>
```

### 数据表格

```vue
<template>
  <div class="table-example">
    <zx-table :data="tableData" :loading="loading">
      <zx-table-column prop="name" label="姓名" />
      <zx-table-column prop="age" label="年龄" />
      <zx-table-column prop="address" label="地址" />
      <zx-table-column label="操作">
        <template #default="{ row }">
          <zx-button type="primary" size="small" @click="handleEdit(row)">
            编辑
          </zx-button>
          <zx-button type="danger" size="small" @click="handleDelete(row)">
            删除
          </zx-button>
        </template>
      </z-table-column>
    </z-table>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const loading = ref(false)
const tableData = ref([
  {
    name: '张三',
    age: 18,
    address: '北京市朝阳区'
  },
  {
    name: '李四',
    age: 20,
    address: '上海市浦东新区'
  }
])

const handleEdit = (row: any) => {
  console.log('编辑', row)
}

const handleDelete = (row: any) => {
  console.log('删除', row)
}
</script>
```

### 主题切换示例

```vue
<template>
  <div class="theme-example">
    <zx-space>
      <zx-button
        v-for="theme in themes"
        :key="theme.name"
        :class="{ active: currentTheme === theme.name }"
        @click="changeTheme(theme)"
      >
        {{ theme.label }}
      </zx-button>
    </z-space>

    <div class="preview-area">
      <zx-card>
        <zx-space direction="vertical">
          <zx-button type="primary">主要按钮</zx-button>
          <zx-input placeholder="请输入内容" />
          <zx-switch v-model="switchValue" />
        </z-space>
      </z-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const themes = [
  { name: 'light', label: '亮色主题' },
  { name: 'dark', label: '暗色主题' },
  { name: 'custom', label: '自定义主题' }
]

const currentTheme = ref('light')
const switchValue = ref(false)

const changeTheme = (theme: { name: string }) => {
  currentTheme.value = theme.name
  document.documentElement.className = theme.name
}
</script>

<style lang="scss">
.theme-example {
  .preview-area {
    margin-top: 20px;
    padding: 20px;
    border: 1px solid var(--zx-border-color);
    border-radius: var(--zx-border-radius-base);
  }

  .active {
    background-color: var(--zx-primary-color);
    color: #fff;
  }
}
</style>
```

## 进阶示例

### 动态表单

```vue
<template>
  <div class="dynamic-form">
    <zx-form :model="formData" :rules="rules">
      <zx-form-item
        v-for="(field, index) in formData.fields"
        :key="index"
        :label="field.label"
        :prop="'fields.' + index + '.value'"
      >
        <zx-input v-model="field.value" />
        <zx-button type="danger" @click="removeField(index)">删除</zx-button>
      </z-form-item>
      <zx-form-item>
        <zx-button type="primary" @click="addField">添加字段</zx-button>
        <zx-button type="success" @click="submitForm">提交</zx-button>
      </z-form-item>
    </z-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const formData = ref({
  fields: [
    { label: '字段1', value: '' }
  ]
})

const rules = {
  'fields.*.value': [
    { required: true, message: '请输入字段值', trigger: 'blur' }
  ]
}

const addField = () => {
  formData.value.fields.push({
    label: `字段${formData.value.fields.length + 1}`,
    value: ''
  })
}

const removeField = (index: number) => {
  formData.value.fields.splice(index, 1)
}

const submitForm = () => {
  console.log('表单数据', formData.value)
}
</script>
```

这些示例展示了组件库的基本用法和一些常见的业务场景。每个示例都包含了完整的代码和必要的样式，可以直接复制使用。 