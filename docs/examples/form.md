# 表单示例

表单（Form）是收集、验证和提交数据的重要组件。ZXUI CN 提供了灵活且功能强大的表单组件，可满足各种表单需求。

## 基础表单

最基本的表单示例，包含输入框、选择器、单选框等控件。

```vue
<template>
  <div class="basic-form-demo">
    <zx-form ref="formRef" :model="form" :rules="rules" label-width="100px">
      <zx-form-item label="用户名" prop="username">
        <zx-input v-model="form.username" placeholder="请输入用户名" />
      </zx-form-item>
      
      <zx-form-item label="密码" prop="password">
        <zx-input
          v-model="form.password"
          type="password"
          placeholder="请输入密码"
          show-password
        />
      </zx-form-item>
      
      <zx-form-item label="性别" prop="gender">
        <zx-radio-group v-model="form.gender">
          <zx-radio label="male">男</zx-radio>
          <zx-radio label="female">女</zx-radio>
        </zx-radio-group>
      </zx-form-item>
      
      <zx-form-item label="兴趣爱好" prop="hobbies">
        <zx-checkbox-group v-model="form.hobbies">
          <zx-checkbox label="reading">阅读</zx-checkbox>
          <zx-checkbox label="music">音乐</zx-checkbox>
          <zx-checkbox label="sports">运动</zx-checkbox>
        </zx-checkbox-group>
      </zx-form-item>
      
      <zx-form-item label="所在城市" prop="city">
        <zx-select v-model="form.city" placeholder="请选择城市">
          <zx-option value="beijing" label="北京" />
          <zx-option value="shanghai" label="上海" />
          <zx-option value="guangzhou" label="广州" />
          <zx-option value="shenzhen" label="深圳" />
        </zx-select>
      </zx-form-item>
      
      <zx-form-item label="个人简介" prop="introduction">
        <zx-input
          v-model="form.introduction"
          type="textarea"
          placeholder="请输入个人简介"
          :rows="4"
        />
      </zx-form-item>
      
      <zx-form-item>
        <zx-button type="primary" @click="submitForm">提交</zx-button>
        <zx-button @click="resetForm">重置</zx-button>
      </zx-form-item>
    </zx-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const formRef = ref()
const form = ref({
  username: '',
  password: '',
  gender: 'male',
  hobbies: [],
  city: '',
  introduction: ''
})

const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
  ],
  gender: [
    { required: true, message: '请选择性别', trigger: 'change' }
  ],
  hobbies: [
    { type: 'array', required: true, message: '请至少选择一个兴趣爱好', trigger: 'change' }
  ],
  city: [
    { required: true, message: '请选择城市', trigger: 'change' }
  ],
  introduction: [
    { required: true, message: '请输入个人简介', trigger: 'blur' },
    { max: 200, message: '最多输入200个字符', trigger: 'blur' }
  ]
}

const submitForm = async () => {
  if (!formRef.value) return
  
  try {
    await formRef.value.validate()
    console.log('表单验证通过', form.value)
    // 在这里处理表单提交逻辑
  } catch (error) {
    console.error('表单验证失败', error)
  }
}

const resetForm = () => {
  if (!formRef.value) return
  formRef.value.resetFields()
}
</script>
```

## 行内表单

行内表单的示例，适用于简单表单且空间受限的场景。

```vue
<template>
  <div class="inline-form-demo">
    <zx-form
      ref="formRef"
      :model="searchForm"
      inline
      @keyup.enter="handleSearch"
    >
      <zx-form-item label="关键词" prop="keyword">
        <zx-input v-model="searchForm.keyword" placeholder="请输入关键词" />
      </zx-form-item>
      
      <zx-form-item label="类型" prop="type">
        <zx-select v-model="searchForm.type" placeholder="请选择类型" clearable>
          <zx-option value="article" label="文章" />
          <zx-option value="video" label="视频" />
          <zx-option value="question" label="问答" />
        </zx-select>
      </zx-form-item>
      
      <zx-form-item label="日期" prop="date">
        <zx-date-picker
          v-model="searchForm.date"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
      </zx-form-item>
      
      <zx-form-item>
        <zx-button type="primary" @click="handleSearch">搜索</zx-button>
        <zx-button @click="handleReset">重置</zx-button>
      </zx-form-item>
    </zx-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const formRef = ref()
const searchForm = ref({
  keyword: '',
  type: '',
  date: []
})

const handleSearch = () => {
  console.log('搜索条件', searchForm.value)
  // 执行搜索逻辑
}

const handleReset = () => {
  if (!formRef.value) return
  formRef.value.resetFields()
}
</script>
```

## 动态表单

动态添加和删除表单项的示例。

```vue
<template>
  <div class="dynamic-form-demo">
    <zx-form ref="formRef" :model="dynamicForm" :rules="dynamicRules" label-width="120px">
      <zx-form-item label="活动名称" prop="name">
        <zx-input v-model="dynamicForm.name" placeholder="请输入活动名称" />
      </zx-form-item>
      
      <zx-form-item
        v-for="(participant, index) in dynamicForm.participants"
        :key="index"
        :label="'参与者 ' + (index + 1)"
        :prop="'participants.' + index + '.name'"
      >
        <div class="participant-item">
          <zx-input v-model="participant.name" placeholder="请输入参与者姓名" />
          <zx-button 
            type="danger" 
            icon="delete" 
            circle 
            @click="removeParticipant(index)"
            :disabled="dynamicForm.participants.length === 1"
          ></zx-button>
        </div>
      </zx-form-item>
      
      <zx-form-item>
        <zx-button type="primary" plain @click="addParticipant">添加参与者</zx-button>
      </zx-form-item>
      
      <zx-form-item>
        <zx-button type="primary" @click="submitDynamicForm">提交</zx-button>
        <zx-button @click="resetDynamicForm">重置</zx-button>
      </zx-form-item>
    </zx-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const formRef = ref()
const dynamicForm = ref({
  name: '',
  participants: [{ name: '' }]
})

const dynamicRules = {
  name: [
    { required: true, message: '请输入活动名称', trigger: 'blur' }
  ],
  'participants.*.name': [
    { required: true, message: '请输入参与者姓名', trigger: 'blur' }
  ]
}

const addParticipant = () => {
  dynamicForm.value.participants.push({ name: '' })
}

const removeParticipant = (index: number) => {
  if (dynamicForm.value.participants.length > 1) {
    dynamicForm.value.participants.splice(index, 1)
  }
}

const submitDynamicForm = async () => {
  if (!formRef.value) return
  
  try {
    await formRef.value.validate()
    console.log('表单验证通过', dynamicForm.value)
    // 处理表单提交逻辑
  } catch (error) {
    console.error('表单验证失败', error)
  }
}

const resetDynamicForm = () => {
  if (!formRef.value) return
  formRef.value.resetFields()
  dynamicForm.value.participants = [{ name: '' }]
}
</script>

<style lang="scss" scoped>
.dynamic-form-demo {
  .participant-item {
    display: flex;
    align-items: center;
    gap: 10px;
    
    .zx-input {
      flex: 1;
    }
  }
}
</style>
```

## 自定义验证规则

展示如何创建和使用自定义验证规则。

```vue
<template>
  <div class="custom-validation-demo">
    <zx-form ref="formRef" :model="customForm" :rules="customRules" label-width="100px">
      <zx-form-item label="邮箱" prop="email">
        <zx-input v-model="customForm.email" placeholder="请输入邮箱" />
      </zx-form-item>
      
      <zx-form-item label="手机号码" prop="phone">
        <zx-input v-model="customForm.phone" placeholder="请输入手机号码" />
      </zx-form-item>
      
      <zx-form-item label="密码" prop="password">
        <zx-input 
          v-model="customForm.password" 
          type="password" 
          placeholder="请输入密码"
          show-password
        />
      </zx-form-item>
      
      <zx-form-item label="确认密码" prop="confirmPassword">
        <zx-input 
          v-model="customForm.confirmPassword" 
          type="password" 
          placeholder="请再次输入密码"
          show-password
        />
      </zx-form-item>
      
      <zx-form-item label="年龄" prop="age">
        <zx-input-number v-model="customForm.age" :min="1" :max="120" />
      </zx-form-item>
      
      <zx-form-item label="网站" prop="website">
        <zx-input v-model="customForm.website" placeholder="请输入网站地址" />
      </zx-form-item>
      
      <zx-form-item>
        <zx-button type="primary" @click="submitCustomForm">提交</zx-button>
        <zx-button @click="resetCustomForm">重置</zx-button>
      </zx-form-item>
    </zx-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const formRef = ref()
const customForm = ref({
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  age: 18,
  website: ''
})

// 自定义校验规则
const validateEmail = (rule: any, value: string, callback: Function) => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
  if (!value) {
    callback(new Error('请输入邮箱地址'))
  } else if (!emailRegex.test(value)) {
    callback(new Error('请输入有效的邮箱地址'))
  } else {
    callback()
  }
}

const validatePhone = (rule: any, value: string, callback: Function) => {
  const phoneRegex = /^1[3-9]\d{9}$/
  if (!value) {
    callback(new Error('请输入手机号码'))
  } else if (!phoneRegex.test(value)) {
    callback(new Error('请输入有效的手机号码'))
  } else {
    callback()
  }
}

const validatePassword = (rule: any, value: string, callback: Function) => {
  if (!value) {
    callback(new Error('请输入密码'))
  } else if (value.length < 6) {
    callback(new Error('密码长度不能少于6个字符'))
  } else {
    // 当密码变化时，检查确认密码是否需要验证
    if (customForm.value.confirmPassword !== '') {
      formRef.value?.validateField('confirmPassword')
    }
    callback()
  }
}

const validateConfirmPassword = (rule: any, value: string, callback: Function) => {
  if (!value) {
    callback(new Error('请再次输入密码'))
  } else if (value !== customForm.value.password) {
    callback(new Error('两次输入的密码不一致'))
  } else {
    callback()
  }
}

const validateWebsite = (rule: any, value: string, callback: Function) => {
  if (!value) {
    callback()
  } else {
    try {
      // 尝试创建 URL 对象来验证网址格式
      new URL(value)
      callback()
    } catch (error) {
      callback(new Error('请输入有效的网站地址'))
    }
  }
}

const customRules = {
  email: [
    { required: true, validator: validateEmail, trigger: 'blur' }
  ],
  phone: [
    { required: true, validator: validatePhone, trigger: 'blur' }
  ],
  password: [
    { required: true, validator: validatePassword, trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, validator: validateConfirmPassword, trigger: 'blur' }
  ],
  age: [
    { required: true, message: '请输入年龄', trigger: 'blur' },
    { type: 'number', min: 1, max: 120, message: '年龄必须在1-120之间', trigger: 'blur' }
  ],
  website: [
    { validator: validateWebsite, trigger: 'blur' }
  ]
}

const submitCustomForm = async () => {
  if (!formRef.value) return
  
  try {
    await formRef.value.validate()
    console.log('表单验证通过', customForm.value)
    // 处理表单提交逻辑
  } catch (error) {
    console.error('表单验证失败', error)
  }
}

const resetCustomForm = () => {
  if (!formRef.value) return
  formRef.value.resetFields()
}
</script>
```

## 表单布局和样式

展示不同的表单布局和样式。

```vue
<template>
  <div class="form-layout-demo">
    <h3>标准表单（标签在左侧）</h3>
    <zx-form :model="layoutForm" label-width="120px" class="demo-form">
      <zx-form-item label="姓名">
        <zx-input v-model="layoutForm.name" />
      </zx-form-item>
      <zx-form-item label="活动区域">
        <zx-select v-model="layoutForm.region" placeholder="请选择活动区域">
          <zx-option value="beijing" label="北京" />
          <zx-option value="shanghai" label="上海" />
          <zx-option value="guangzhou" label="广州" />
        </zx-select>
      </zx-form-item>
    </zx-form>
    
    <h3>顶部对齐表单（标签在顶部）</h3>
    <zx-form :model="layoutForm" label-position="top" class="demo-form">
      <zx-form-item label="姓名">
        <zx-input v-model="layoutForm.name" />
      </zx-form-item>
      <zx-form-item label="活动区域">
        <zx-select v-model="layoutForm.region" placeholder="请选择活动区域">
          <zx-option value="beijing" label="北京" />
          <zx-option value="shanghai" label="上海" />
          <zx-option value="guangzhou" label="广州" />
        </zx-select>
      </zx-form-item>
    </zx-form>
    
    <h3>右对齐表单（标签在右侧）</h3>
    <zx-form :model="layoutForm" label-position="right" label-width="120px" class="demo-form">
      <zx-form-item label="姓名">
        <zx-input v-model="layoutForm.name" />
      </zx-form-item>
      <zx-form-item label="活动区域">
        <zx-select v-model="layoutForm.region" placeholder="请选择活动区域">
          <zx-option value="beijing" label="北京" />
          <zx-option value="shanghai" label="上海" />
          <zx-option value="guangzhou" label="广州" />
        </zx-select>
      </zx-form-item>
    </zx-form>
    
    <h3>栅格布局表单</h3>
    <zx-form :model="layoutForm" label-width="100px" class="demo-form">
      <zx-row :gutter="20">
        <zx-col :span="12">
          <zx-form-item label="姓名">
            <zx-input v-model="layoutForm.name" />
          </zx-form-item>
        </zx-col>
        <zx-col :span="12">
          <zx-form-item label="年龄">
            <zx-input-number v-model="layoutForm.age" :min="1" />
          </zx-form-item>
        </zx-col>
      </zx-row>
      <zx-row :gutter="20">
        <zx-col :span="12">
          <zx-form-item label="活动区域">
            <zx-select v-model="layoutForm.region" placeholder="请选择活动区域">
              <zx-option value="beijing" label="北京" />
              <zx-option value="shanghai" label="上海" />
              <zx-option value="guangzhou" label="广州" />
            </zx-select>
          </zx-form-item>
        </zx-col>
        <zx-col :span="12">
          <zx-form-item label="日期">
            <zx-date-picker v-model="layoutForm.date" type="date" placeholder="选择日期" style="width: 100%;" />
          </zx-form-item>
        </zx-col>
      </zx-row>
    </zx-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const layoutForm = ref({
  name: '',
  region: '',
  age: 18,
  date: ''
})
</script>

<style lang="scss" scoped>
.form-layout-demo {
  .demo-form {
    max-width: 600px;
    margin-bottom: 30px;
    padding: 20px;
    border: 1px solid var(--zx-border-color-light);
    border-radius: var(--zx-border-radius-base);
  }
  
  h3 {
    margin-top: 20px;
    margin-bottom: 10px;
  }
}
</style>
```

以上示例展示了 ZXUI CN 表单组件的各种用法和场景，包括基础表单、行内表单、动态表单、自定义验证以及不同的布局样式。你可以根据实际需求选择合适的表单类型和样式。 