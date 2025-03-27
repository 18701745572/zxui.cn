# Steps 步骤条

Steps 组件用于引导用户按照流程完成任务的导航条。

## 基础用法

```vue
<template>
  <zx-steps :active="active">
    <zx-step title="步骤1" description="这是第一步"></zx-step>
    <zx-step title="步骤2" description="这是第二步"></zx-step>
    <zx-step title="步骤3" description="这是第三步"></zx-step>
    <zx-step title="步骤4" description="这是第四步"></zx-step>
  </zx-steps>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const active = ref(0)
</script>
```

## 自定义图标

通过 `icon` 插槽可以自定义步骤图标。

```vue
<template>
  <zx-steps :active="active">
    <zx-step title="步骤1">
      <template #icon>
        <i class="icon-user"></i>
      </template>
    </zx-step>
    <zx-step title="步骤2">
      <template #icon>
        <i class="icon-location"></i>
      </template>
    </zx-step>
    <zx-step title="步骤3">
      <template #icon>
        <i class="icon-shopping-cart"></i>
      </template>
    </zx-step>
  </zx-steps>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const active = ref(0)
</script>
```

## 垂直方向

设置 `direction` 属性为 `vertical` 可以显示垂直方向的步骤条。

```vue
<template>
  <zx-steps :active="active" direction="vertical">
    <zx-step title="步骤1" description="这是第一步"></zx-step>
    <zx-step title="步骤2" description="这是第二步"></zx-step>
    <zx-step title="步骤3" description="这是第三步"></zx-step>
    <zx-step title="步骤4" description="这是第四步"></zx-step>
  </zx-steps>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const active = ref(0)
</script>
```

## 简洁模式

设置 `simple` 属性可以显示简洁模式的步骤条。

```vue
<template>
  <zx-steps :active="active" simple>
    <zx-step title="步骤1"></zx-step>
    <zx-step title="步骤2"></zx-step>
    <zx-step title="步骤3"></zx-step>
    <zx-step title="步骤4"></zx-step>
  </zx-steps>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const active = ref(0)
</script>
```

## 自定义状态

通过 `status` 属性可以自定义步骤的状态。

```vue
<template>
  <zx-steps :active="active">
    <zx-step title="步骤1" status="finish"></zx-step>
    <zx-step title="步骤2" status="process"></zx-step>
    <zx-step title="步骤3" status="wait"></zx-step>
    <zx-step title="步骤4" status="error"></zx-step>
  </zx-steps>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const active = ref(1)
</script>
```

## API

### Steps Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| active | 当前激活步骤 | number | - | 0 |
| direction | 显示方向 | string | horizontal / vertical | horizontal |
| alignCenter | 居中对齐 | boolean | - | false |
| simple | 是否简洁模式 | boolean | - | false |
| finishStatus | 完成步骤的状态 | string | wait / process / finish / error | finish |

### Step Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| title | 标题 | string | - | - |
| description | 描述性文字 | string | - | - |
| icon | 图标 | string | - | - |
| status | 设置当前步骤的状态 | string | wait / process / finish / error | - |

### Step Slots

| 名称 | 说明 |
|------|------|
| icon | 自定义图标 |
| title | 自定义标题 |
| description | 自定义描述性文字 | 