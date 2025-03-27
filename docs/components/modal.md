# Modal 对话框

Modal 组件用于展示重要信息或获取用户操作，支持多种自定义配置。

## 基础用法

```vue
<template>
  <zx-button @click="visible = true">打开对话框</zx-button>
  <zx-modal v-model="visible" title="标题">
    <p>这是一段内容</p>
  </zx-modal>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)
</script>
```

## 自定义内容

通过默认插槽可以自定义对话框的内容。

```vue
<template>
  <zx-button @click="visible = true">打开对话框</zx-button>
  <zx-modal v-model="visible" title="自定义内容">
    <div class="custom-content">
      <h3>标题</h3>
      <p>这是一段自定义内容</p>
      <zx-input v-model="inputValue" placeholder="请输入内容"></zx-input>
    </div>
  </zx-modal>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)
const inputValue = ref('')
</script>

<style scoped>
.custom-content {
  padding: 20px;
}
</style>
```

## 自定义头部

通过 `header` 插槽可以自定义对话框的头部。

```vue
<template>
  <zx-button @click="visible = true">打开对话框</zx-button>
  <zx-modal v-model="visible">
    <template #header>
      <div class="custom-header">
        <h3>自定义头部</h3>
        <span class="sub-title">副标题</span>
      </div>
    </template>
    <p>这是一段内容</p>
  </zx-modal>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)
</script>

<style scoped>
.custom-header {
  display: flex;
  align-items: center;
  gap: 10px;
}
.sub-title {
  color: #999;
  font-size: 14px;
}
</style>
```

## 自定义底部

通过 `footer` 插槽可以自定义对话框的底部。

```vue
<template>
  <zx-button @click="visible = true">打开对话框</zx-button>
  <zx-modal v-model="visible" title="自定义底部">
    <p>这是一段内容</p>
    <template #footer>
      <div class="custom-footer">
        <zx-button @click="visible = false">取消</zx-button>
        <zx-button type="primary" @click="handleConfirm">确定</zx-button>
      </div>
    </template>
  </zx-modal>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)
const handleConfirm = () => {
  // 处理确认逻辑
  visible.value = false
}
</script>

<style scoped>
.custom-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style>
```

## 居中显示

设置 `center` 属性可以使对话框居中显示。

```vue
<template>
  <zx-button @click="visible = true">打开对话框</zx-button>
  <zx-modal v-model="visible" title="居中显示" center>
    <p>这是一段内容</p>
  </zx-modal>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)
</script>
```

## 自定义宽度

通过 `width` 属性可以自定义对话框的宽度。

```vue
<template>
  <zx-button @click="visible = true">打开对话框</zx-button>
  <zx-modal v-model="visible" title="自定义宽度" width="800px">
    <p>这是一段内容</p>
  </zx-modal>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)
</script>
```

## 关闭前确认

通过 `beforeClose` 属性可以在关闭前进行确认。

```vue
<template>
  <zx-button @click="visible = true">打开对话框</zx-button>
  <zx-modal
    v-model="visible"
    title="关闭前确认"
    :beforeClose="handleBeforeClose"
  >
    <p>这是一段内容</p>
  </zx-modal>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)
const handleBeforeClose = (done: Function) => {
  // 这里可以添加确认逻辑
  if (confirm('确定要关闭吗？')) {
    done()
  }
}
</script>
```

## API

### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| modelValue | 是否显示对话框 | boolean | - | false |
| title | 对话框标题 | string | - | - |
| width | 对话框宽度 | string | - | '50%' |
| top | 对话框距离顶部的距离 | string | - | '15vh' |
| center | 是否居中显示 | boolean | - | false |
| closeOnClickModal | 是否可以通过点击 modal 关闭对话框 | boolean | - | true |
| closeOnPressEscape | 是否可以通过按下 ESC 关闭对话框 | boolean | - | true |
| showClose | 是否显示关闭按钮 | boolean | - | true |
| beforeClose | 关闭前的回调函数 | function | - | - |

### Events

| 事件名 | 说明 | 参数 |
|------|------|------|
| update:modelValue | 值改变时触发 | value |
| open | 对话框打开时触发 | - |
| close | 对话框关闭时触发 | - |
| confirm | 点击确定按钮时触发 | - |
| cancel | 点击取消按钮时触发 | - |

### Slots

| 名称 | 说明 |
|------|------|
| default | 对话框的内容 |
| header | 对话框标题区域的内容 |
| footer | 对话框底部区域的内容 |