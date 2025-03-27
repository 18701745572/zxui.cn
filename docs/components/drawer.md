# Drawer 抽屉

Drawer 组件用于从屏幕边缘滑出的抽屉面板，支持多个方向、自定义大小、嵌套抽屉等功能。

## 基础用法

```vue
<template>
  <zx-button @click="drawer = true">打开抽屉</zx-button>
  <zx-drawer
    v-model="drawer"
    title="标题"
    :size="30%"
    :with-header="true"
  >
    <span>我来啦!</span>
  </zx-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const drawer = ref(false)
</script>
```

## 不同方向

通过 `direction` 属性可以设置抽屉的方向。

```vue
<template>
  <div class="drawer-demo">
    <zx-button @click="drawer1 = true">从左边打开</zx-button>
    <zx-button @click="drawer2 = true">从右边打开</zx-button>
    <zx-button @click="drawer3 = true">从上边打开</zx-button>
    <zx-button @click="drawer4 = true">从下边打开</zx-button>

    <zx-drawer
      v-model="drawer1"
      title="从左边打开"
      direction="ltr"
      size="30%"
    >
      <span>我来啦!</span>
    </zx-drawer>

    <zx-drawer
      v-model="drawer2"
      title="从右边打开"
      direction="rtl"
      size="30%"
    >
      <span>我来啦!</span>
    </zx-drawer>

    <zx-drawer
      v-model="drawer3"
      title="从上边打开"
      direction="ttb"
      size="30%"
    >
      <span>我来啦!</span>
    </zx-drawer>

    <zx-drawer
      v-model="drawer4"
      title="从下边打开"
      direction="btt"
      size="30%"
    >
      <span>我来啦!</span>
    </zx-drawer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const drawer1 = ref(false)
const drawer2 = ref(false)
const drawer3 = ref(false)
const drawer4 = ref(false)
</script>

<style scoped>
.drawer-demo {
  display: flex;
  gap: 10px;
}
</style>
```

## 自定义大小

通过 `size` 属性可以设置抽屉的大小。

```vue
<template>
  <zx-button @click="drawer = true">打开抽屉</zx-button>
  <zx-drawer
    v-model="drawer"
    title="标题"
    :size="500"
  >
    <span>我来啦!</span>
  </zx-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const drawer = ref(false)
</script>
```

## 嵌套抽屉

Drawer 组件支持嵌套使用。

```vue
<template>
  <zx-button @click="drawer1 = true">打开抽屉</zx-button>
  <zx-drawer
    v-model="drawer1"
    title="标题"
    :size="30%"
  >
    <zx-button @click="drawer2 = true">打开第二个抽屉</zx-button>
    <zx-drawer
      v-model="drawer2"
      title="标题"
      :size="30%"
      direction="rtl"
      append-to-body
    >
      <span>我来啦!</span>
    </zx-drawer>
  </zx-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const drawer1 = ref(false)
const drawer2 = ref(false)
</script>
```

## 自定义头部

通过 `header` 插槽可以自定义头部内容。

```vue
<template>
  <zx-button @click="drawer = true">打开抽屉</zx-button>
  <zx-drawer
    v-model="drawer"
    :with-header="false"
    :size="30%"
  >
    <template #header>
      <div class="custom-header">
        <span>自定义头部</span>
        <zx-button @click="drawer = false">关闭</zx-button>
      </div>
    </template>
    <span>我来啦!</span>
  </zx-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const drawer = ref(false)
</script>

<style scoped>
.custom-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #dcdfe6;
}
</style>
```

## 关闭前确认

通过 `before-close` 属性可以设置关闭前的确认。

```vue
<template>
  <zx-button @click="drawer = true">打开抽屉</zx-button>
  <zx-drawer
    v-model="drawer"
    title="标题"
    :size="30%"
    :before-close="handleClose"
  >
    <span>我来啦!</span>
  </zx-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const drawer = ref(false)

const handleClose = (done: Function) => {
  if (confirm('确认关闭？')) {
    done()
  }
}
</script>
```

## API

### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| modelValue | 是否显示 Drawer | boolean | - | false |
| direction | Drawer 打开的方向 | string | ltr / rtl / ttb / btt | rtl |
| size | Drawer 的大小 | string / number | - | 30% |
| with-header | 是否显示头部 | boolean | - | true |
| modal | 是否需要遮罩层 | boolean | - | true |
| append-to-body | Drawer 自身是否插入至 body 元素上 | boolean | - | true |
| before-close | 关闭前的回调，会暂停 Drawer 的关闭 | function(done) | - | - |
| destroy-on-close | 控制是否在关闭 Drawer 之后将子元素全部销毁 | boolean | - | false |
| close-on-click-modal | 是否可以通过点击 modal 关闭 Drawer | boolean | - | true |
| close-on-press-escape | 是否可以通过按下 ESC 关闭 Drawer | boolean | - | true |
| show-close | 是否显示关闭按钮 | boolean | - | true |
| title | 标题 | string | - | - |
| custom-class | Drawer 的自定义类名 | string | - | - |

### Events

| 事件名 | 说明 | 参数 |
|------|------|------|
| open | Drawer 打开的回调 | - |
| close | Drawer 关闭的回调 | - |
| opened | Drawer 打开动画结束时的回调 | - |
| closed | Drawer 关闭动画结束时的回调 | - |

### Slots

| 插槽名 | 说明 | 参数 |
|------|------|------|
| default | Drawer 的内容 | - |
| header | 自定义标题栏的内容 | - | 