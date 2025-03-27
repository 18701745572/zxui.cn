# Form 表单

Form 组件用于数据录入、校验，支持多种表单控件、自定义校验规则、表单验证等功能。

## 基础用法

```vue
<template>
  <zx-form
    ref="formRef"
    :model="form"
    :rules="rules"
    label-width="100px"
  >
    <zx-form-item label="用户名" prop="username">
      <zx-input v-model="form.username" />
    </zx-form-item>
    <zx-form-item label="密码" prop="password">
      <zx-input v-model="form.password" type="password" />
    </zx-form-item>
    <zx-form-item>
      <zx-button type="primary" @click="handleSubmit">提交</zx-button>
      <zx-button @click="handleReset">重置</zx-button>
    </zx-form-item>
  </zx-form>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

const formRef = ref()

const form = reactive({
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
  await formRef.value.validate((valid: boolean) => {
    if (valid) {
      console.log('提交表单:', form)
    }
  })
}

const handleReset = () => {
  if (!formRef.value) return
  formRef.value.resetFields()
}
</script>
```

## 表单验证

Form 组件提供了表单验证功能，支持多种验证规则。

```vue
<template>
  <zx-form
    ref="formRef"
    :model="form"
    :rules="rules"
    label-width="100px"
  >
    <zx-form-item label="邮箱" prop="email">
      <zx-input v-model="form.email" />
    </zx-form-item>
    <zx-form-item label="手机号" prop="phone">
      <zx-input v-model="form.phone" />
    </zx-form-item>
    <zx-form-item label="年龄" prop="age">
      <zx-input-number v-model="form.age" :min="0" :max="100" />
    </zx-form-item>
    <zx-form-item>
      <zx-button type="primary" @click="handleSubmit">提交</zx-button>
    </zx-form-item>
  </zx-form>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

const formRef = ref()

const form = reactive({
  email: '',
  phone: '',
  age: 18
})

const validateEmail = (rule: any, value: string, callback: Function) => {
  if (!value) {
    callback(new Error('请输入邮箱'))
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    callback(new Error('请输入正确的邮箱地址'))
  } else {
    callback()
  }
}

const validatePhone = (rule: any, value: string, callback: Function) => {
  if (!value) {
    callback(new Error('请输入手机号'))
  } else if (!/^1[3-9]\d{9}$/.test(value)) {
    callback(new Error('请输入正确的手机号'))
  } else {
    callback()
  }
}

const rules = {
  email: [
    { required: true, validator: validateEmail, trigger: 'blur' }
  ],
  phone: [
    { required: true, validator: validatePhone, trigger: 'blur' }
  ],
  age: [
    { required: true, message: '请输入年龄', trigger: 'blur' },
    { type: 'number', message: '年龄必须为数字', trigger: 'blur' },
    { min: 0, max: 100, message: '年龄在 0 到 100 之间', trigger: 'blur' }
  ]
}

const handleSubmit = async () => {
  if (!formRef.value) return
  await formRef.value.validate((valid: boolean) => {
    if (valid) {
      console.log('提交表单:', form)
    }
  })
}
</script>
```

## 表单布局

通过 `label-position` 属性可以设置标签的位置。

```vue
<template>
  <div class="form-demo">
    <zx-form
      ref="formRef"
      :model="form"
      :rules="rules"
      label-width="100px"
      label-position="top"
    >
      <zx-form-item label="用户名" prop="username">
        <zx-input v-model="form.username" />
      </zx-form-item>
      <zx-form-item label="密码" prop="password">
        <zx-input v-model="form.password" type="password" />
      </zx-form-item>
    </zx-form>

    <zx-form
      ref="formRef2"
      :model="form"
      :rules="rules"
      label-width="100px"
      label-position="left"
    >
      <zx-form-item label="用户名" prop="username">
        <zx-input v-model="form.username" />
      </zx-form-item>
      <zx-form-item label="密码" prop="password">
        <zx-input v-model="form.password" type="password" />
      </zx-form-item>
    </zx-form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

const formRef = ref()
const formRef2 = ref()

const form = reactive({
  username: '',
  password: ''
})

const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' }
  ]
}
</script>

<style scoped>
.form-demo {
  display: flex;
  gap: 20px;
}
</style>
```

## 表单控件

Form 组件支持多种表单控件。

```vue
<template>
  <zx-form
    ref="formRef"
    :model="form"
    :rules="rules"
    label-width="100px"
  >
    <zx-form-item label="用户名" prop="username">
      <zx-input v-model="form.username" />
    </zx-form-item>
    <zx-form-item label="密码" prop="password">
      <zx-input v-model="form.password" type="password" />
    </zx-form-item>
    <zx-form-item label="性别" prop="gender">
      <zx-radio-group v-model="form.gender">
        <zx-radio label="male">男</zx-radio>
        <zx-radio label="female">女</zx-radio>
      </zx-radio-group>
    </zx-form-item>
    <zx-form-item label="爱好" prop="hobbies">
      <zx-checkbox-group v-model="form.hobbies">
        <zx-checkbox label="reading">阅读</zx-checkbox>
        <zx-checkbox label="music">音乐</zx-checkbox>
        <zx-checkbox label="sports">运动</zx-checkbox>
      </zx-checkbox-group>
    </zx-form-item>
    <zx-form-item label="城市" prop="city">
      <zx-select v-model="form.city" placeholder="请选择城市">
        <zx-option label="北京" value="beijing" />
        <zx-option label="上海" value="shanghai" />
        <zx-option label="广州" value="guangzhou" />
      </zx-select>
    </zx-form-item>
    <zx-form-item label="备注" prop="remark">
      <zx-textarea v-model="form.remark" rows="3" />
    </zx-form-item>
    <zx-form-item>
      <zx-button type="primary" @click="handleSubmit">提交</zx-button>
    </zx-form-item>
  </zx-form>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

const formRef = ref()

const form = reactive({
  username: '',
  password: '',
  gender: 'male',
  hobbies: [],
  city: '',
  remark: ''
})

const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' }
  ],
  gender: [
    { required: true, message: '请选择性别', trigger: 'change' }
  ],
  hobbies: [
    { type: 'array', required: true, message: '请选择爱好', trigger: 'change' }
  ],
  city: [
    { required: true, message: '请选择城市', trigger: 'change' }
  ]
}

const handleSubmit = async () => {
  if (!formRef.value) return
  await formRef.value.validate((valid: boolean) => {
    if (valid) {
      console.log('提交表单:', form)
    }
  })
}
</script>
```

## 动态表单

Form 组件支持动态添加和删除表单项。

```vue
<template>
  <zx-form
    ref="formRef"
    :model="form"
    :rules="rules"
    label-width="100px"
  >
    <zx-form-item label="用户名" prop="username">
      <zx-input v-model="form.username" />
    </zx-form-item>
    <zx-form-item label="邮箱" prop="email">
      <zx-input v-model="form.email" />
    </zx-form-item>
    <zx-form-item
      v-for="(item, index) in form.emails"
      :key="index"
      :label="'邮箱' + (index + 1)"
      :prop="'emails.' + index + '.value'"
      :rules="{
        required: true,
        message: '请输入邮箱',
        trigger: 'blur'
      }"
    >
      <zx-input v-model="item.value" />
      <zx-button type="danger" @click="removeEmail(index)">删除</zx-button>
    </zx-form-item>
    <zx-form-item>
      <zx-button type="primary" @click="addEmail">添加邮箱</zx-button>
      <zx-button @click="handleSubmit">提交</zx-button>
    </zx-form-item>
  </zx-form>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

const formRef = ref()

const form = reactive({
  username: '',
  email: '',
  emails: []
})

const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
  ]
}

const addEmail = () => {
  form.emails.push({
    value: ''
  })
}

const removeEmail = (index: number) => {
  form.emails.splice(index, 1)
}

const handleSubmit = async () => {
  if (!formRef.value) return
  await formRef.value.validate((valid: boolean) => {
    if (valid) {
      console.log('提交表单:', form)
    }
  })
}
</script>
```

## API

### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| model | 表单数据对象 | object | - | - |
| rules | 表单验证规则 | object | - | - |
| label-width | 表单域标签的宽度 | string | - | - |
| label-position | 表单域标签的位置 | string | left / right / top | right |
| inline | 是否行内表单 | boolean | - | false |
| disabled | 是否禁用该表单内的所有组件 | boolean | - | false |
| size | 用于控制该表单内组件的尺寸 | string | large / default / small | default |
| validate-on-rule-change | 是否在 rules 属性改变后立即触发一次验证 | boolean | - | true |

### Events

| 事件名 | 说明 | 参数 |
|------|------|------|
| validate | 任一表单项被校验后触发 | (prop: string, valid: boolean, message: string) => void |

### Methods

| 方法名 | 说明 | 参数 |
|------|------|------|
| validate | 对整个表单进行校验 | (callback?: Function) => void |
| validateField | 对部分表单字段进行校验 | (props?: string \| string[]) => void |
| resetFields | 重置表单，将所有字段值重置为初始值 | - |
| clearValidate | 清除校验结果 | (props?: string \| string[]) => void |

### FormItem Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| prop | 表单域 model 字段，在使用 validate、resetFields 方法的情况下，该属性是必填的 | string | - | - |
| label | 标签文本 | string | - | - |
| label-width | 标签宽度，例如 '50px' | string | - | - |
| required | 是否必填，如不设置，则会根据校验规则自动生成 | boolean | - | false |
| rules | 表单验证规则 | object / array | - | - |
| error | 表单域验证错误信息, 设置该值会使表单验证状态变为error，并显示该错误信息 | string | - | - |
| validate-status | 校验状态，如不设置，则根据校验规则自动生成 | string | success / warning / error / validating | - |
| show-message | 是否显示校验错误信息 | boolean | - | true |
| inline-message | 是否以行内形式展示校验信息 | boolean | - | false |

### FormItem Events

| 事件名 | 说明 | 参数 |
|------|------|------|
| validate | 任一表单项被校验后触发 | (prop: string, valid: boolean, message: string) => void |

### FormItem Slots

| 插槽名 | 说明 | 参数 |
|------|------|------|
| default | Form Item 的内容 | - |
| label | 标签插槽 | - | 