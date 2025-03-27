# Tabs 标签页

Tabs 组件用于分隔内容上有关联但属于不同类别的数据集合，支持多种样式、禁用状态、自定义标签页等功能。

## 基础用法

```vue
<template>
  <zx-tabs v-model="activeTab">
    <zx-tab-pane label="用户管理" name="first">
      用户管理内容
    </zx-tab-pane>
    <zx-tab-pane label="配置管理" name="second">
      配置管理内容
    </zx-tab-pane>
    <zx-tab-pane label="角色管理" name="third">
      角色管理内容
    </zx-tab-pane>
  </zx-tabs>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const activeTab = ref('first')
</script>
```

## 禁用状态

通过 `disabled` 属性可以禁用某个标签页。

```vue
<template>
  <zx-tabs v-model="activeTab">
    <zx-tab-pane label="用户管理" name="first">
      用户管理内容
    </zx-tab-pane>
    <zx-tab-pane label="配置管理" name="second" disabled>
      配置管理内容
    </zx-tab-pane>
    <zx-tab-pane label="角色管理" name="third">
      角色管理内容
    </zx-tab-pane>
  </zx-tabs>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const activeTab = ref('first')
</script>
```

## 卡片式标签页

通过 `type="card"` 可以设置卡片式标签页。

```vue
<template>
  <zx-tabs v-model="activeTab" type="card">
    <zx-tab-pane label="用户管理" name="first">
      用户管理内容
    </zx-tab-pane>
    <zx-tab-pane label="配置管理" name="second">
      配置管理内容
    </zx-tab-pane>
    <zx-tab-pane label="角色管理" name="third">
      角色管理内容
    </zx-tab-pane>
  </zx-tabs>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const activeTab = ref('first')
</script>
```

## 可关闭标签页

通过 `closable` 属性可以设置标签页可关闭。

```vue
<template>
  <zx-tabs v-model="activeTab" type="card" closable>
    <zx-tab-pane label="用户管理" name="first">
      用户管理内容
    </zx-tab-pane>
    <zx-tab-pane label="配置管理" name="second">
      配置管理内容
    </zx-tab-pane>
    <zx-tab-pane label="角色管理" name="third">
      角色管理内容
    </zx-tab-pane>
  </zx-tabs>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const activeTab = ref('first')
</script>
```

## 自定义标签页

通过 `zx-tab-pane` 的 `label` 插槽可以自定义标签页的内容。

```vue
<template>
  <zx-tabs v-model="activeTab">
    <zx-tab-pane name="first">
      <template #label>
        <span>
          <zx-icon name="user" />
          用户管理
        </span>
      </template>
      用户管理内容
    </zx-tab-pane>
    <zx-tab-pane name="second">
      <template #label>
        <span>
          <zx-icon name="setting" />
          配置管理
        </span>
      </template>
      配置管理内容
    </zx-tab-pane>
  </zx-tabs>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const activeTab = ref('first')
</script>
```

## 不同尺寸

通过 `size` 属性可以设置标签页的尺寸。

```vue
<template>
  <div class="tabs-demo">
    <zx-tabs v-model="activeTab1" size="large">
      <zx-tab-pane label="用户管理" name="first">
        用户管理内容
      </zx-tab-pane>
      <zx-tab-pane label="配置管理" name="second">
        配置管理内容
      </zx-tab-pane>
    </zx-tabs>
    <zx-tabs v-model="activeTab2" size="default">
      <zx-tab-pane label="用户管理" name="first">
        用户管理内容
      </zx-tab-pane>
      <zx-tab-pane label="配置管理" name="second">
        配置管理内容
      </zx-tab-pane>
    </zx-tabs>
    <zx-tabs v-model="activeTab3" size="small">
      <zx-tab-pane label="用户管理" name="first">
        用户管理内容
      </zx-tab-pane>
      <zx-tab-pane label="配置管理" name="second">
        配置管理内容
      </zx-tab-pane>
    </zx-tabs>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const activeTab1 = ref('first')
const activeTab2 = ref('first')
const activeTab3 = ref('first')
</script>

<style scoped>
.tabs-demo {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
```

## 标签页位置

通过 `tab-position` 属性可以设置标签页的位置。

```vue
<template>
  <zx-tabs v-model="activeTab" tab-position="left">
    <zx-tab-pane label="用户管理" name="first">
      用户管理内容
    </zx-tab-pane>
    <zx-tab-pane label="配置管理" name="second">
      配置管理内容
    </zx-tab-pane>
    <zx-tab-pane label="角色管理" name="third">
      角色管理内容
    </zx-tab-pane>
  </zx-tabs>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const activeTab = ref('first')
</script>
```

## API

### Tabs Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| modelValue | 绑定值，选中选项卡的 name | string / number | - | - |
| type | 风格类型 | string | card / border-card | - |
| tab-position | 选项卡所在位置 | string | top / right / bottom / left | top |
| stretch | 标签是否自撑开 | boolean | - | false |
| closable | 标签是否可关闭 | boolean | - | false |
| addable | 标签是否可增加 | boolean | - | false |
| editable | 标签是否同时可增加和关闭 | boolean | - | false |
| size | 标签页的尺寸 | string | large / default / small | default |

### Tabs Events

| 事件名 | 说明 | 参数 |
|------|------|------|
| update:modelValue | 选中值发生变化时触发 | value: string / number |
| tab-click | tab 被选中时触发 | pane: object, event: Event |
| tab-change | activeName 改变时触发 | value: string / number |
| tab-remove | 点击 tab 移除按钮时触发 | name: string / number |
| tab-add | 点击 tabs 的新增按钮时触发 | - |

### TabPane Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| label | 选项卡标题 | string | - | - |
| name | 与选项卡绑定值对应的标识符 | string / number | - | - |
| disabled | 是否禁用 | boolean | - | false |
| closable | 标签是否可关闭 | boolean | - | false |
| lazy | 标签是否延迟渲染 | boolean | - | false |

### TabPane Slots

| 插槽名 | 说明 | 参数 |
|------|------|------|
| label | 自定义标签页的内容 | - |
| default | 默认插槽内容 | - | 