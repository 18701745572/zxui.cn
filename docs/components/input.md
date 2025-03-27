# Input 输入框

通过鼠标或键盘输入字符。

## 基础用法

```vue
<template>
  <zx-input v-model="input" placeholder="请输入内容" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const input = ref('')
</script>
```

## 禁用状态

通过 `disabled` 属性指定是否禁用 input 组件。

```vue
<template>
  <zx-input v-model="input" disabled placeholder="禁用状态" />
</template>
```

## 可清空

使用 `clearable` 属性即可得到一个可清空的输入框。

```vue
<template>
  <zx-input v-model="input" clearable placeholder="请输入内容" />
</template>
```

## 密码框

使用 `show-password` 属性即可得到一个可切换显示隐藏的密码框。

```vue
<template>
  <zx-input v-model="password" show-password placeholder="请输入密码" />
</template>
```

## 带图标的输入框

可以通过 `prefix-icon` 和 `suffix-icon` 属性在输入框前后添加图标。

```vue
<template>
  <zx-input v-model="input1" prefix-icon="search" placeholder="请输入搜索内容" />
  <zx-input v-model="input2" suffix-icon="calendar" placeholder="请选择日期" />
</template>
```

## 文本域

用于输入多行文本信息，通过将 `type` 属性的值指定为 textarea。

```vue
<template>
  <zx-input
    v-model="textarea"
    type="textarea"
    placeholder="请输入内容"
    :rows="4"
  />
</template>
```

## 尺寸

使用 `size` 属性改变输入框大小。

```vue
<template>
  <zx-input v-model="input1" size="large" placeholder="大型输入框" />
  <zx-input v-model="input2" placeholder="默认输入框" />
  <zx-input v-model="input3" size="small" placeholder="小型输入框" />
</template>
```

## API

### 属性

| 参数           | 说明                 | 类型            | 可选值                    | 默认值 |
|---------------|---------------------|-----------------|--------------------------|--------|
| type          | 类型                | string          | text / textarea / password | text   |
| v-model       | 绑定值              | string / number | —                        | —      |
| placeholder   | 输入框占位文本       | string          | —                        | —      |
| disabled      | 是否禁用            | boolean         | —                        | false  |
| clearable     | 是否可清空          | boolean         | —                        | false  |
| show-password | 是否显示切换密码图标  | boolean         | —                        | false  |
| prefix-icon   | 输入框头部图标       | string          | —                        | —      |
| suffix-icon   | 输入框尾部图标       | string          | —                        | —      |
| rows          | 输入框行数，仅 type 为 'textarea' 时有效 | number | —             | 2      |
| size          | 输入框尺寸           | string          | large / default / small  | default |
| maxlength     | 最大输入长度         | number          | —                        | —      |
| minlength     | 最小输入长度         | number          | —                        | —      |
| readonly      | 原生 readonly 属性   | boolean         | —                        | false  |

### 事件

| 事件名    | 说明                     | 回调参数                |
|----------|-------------------------|------------------------|
| input    | 在输入值改变时触发        | (value: string) => void |
| change   | 在失去焦点或按下回车时触发  | (value: string) => void |
| focus    | 在 Input 获得焦点时触发    | (event: Event) => void |
| blur     | 在 Input 失去焦点时触发    | (event: Event) => void |
| clear    | 在点击由 clearable 属性生成的清空按钮时触发 | — |

### 插槽

| 插槽名    | 说明                |
|----------|-------------------|
| prefix   | 输入框头部内容      |
| suffix   | 输入框尾部内容      |
| prepend  | 输入框前置内容      |
| append   | 输入框后置内容      |

## 最佳实践

### 表单验证

```vue
<template>
  <zx-form>
    <zx-form-item label="用户名" prop="username">
      <zx-input v-model="form.username" placeholder="请输入用户名" />
    </zx-form-item>
    <zx-form-item label="密码" prop="password">
      <zx-input v-model="form.password" show-password placeholder="请输入密码" />
    </zx-form-item>
  </zx-form>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const form = reactive({
  username: '',
  password: ''
})
</script>
```
