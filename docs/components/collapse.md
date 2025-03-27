# Collapse 折叠面板

Collapse 组件用于展示可以折叠/展开的内容区域，支持手风琴模式、自定义标题等功能。

## 基础用法

```vue
<template>
  <zx-collapse v-model="activeNames">
    <zx-collapse-item title="一致性 Consistency" name="1">
      <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
      <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
    </zx-collapse-item>
    <zx-collapse-item title="反馈 Feedback" name="2">
      <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
      <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
    </zx-collapse-item>
    <zx-collapse-item title="效率 Efficiency" name="3">
      <div>简化流程：设计简洁直观的操作流程；</div>
      <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
      <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
    </zx-collapse-item>
  </zx-collapse>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const activeNames = ref(['1'])
</script>
```

## 手风琴模式

设置 `accordion` 属性可以启用手风琴模式。

```vue
<template>
  <zx-collapse v-model="activeName" accordion>
    <zx-collapse-item title="一致性 Consistency" name="1">
      <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
      <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
    </zx-collapse-item>
    <zx-collapse-item title="反馈 Feedback" name="2">
      <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
      <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
    </zx-collapse-item>
    <zx-collapse-item title="效率 Efficiency" name="3">
      <div>简化流程：设计简洁直观的操作流程；</div>
      <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
      <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
    </zx-collapse-item>
  </zx-collapse>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const activeName = ref('1')
</script>
```

## 自定义标题

通过 `title` 插槽可以自定义标题内容。

```vue
<template>
  <zx-collapse v-model="activeNames">
    <zx-collapse-item name="1">
      <template #title>
        <div class="custom-title">
          <zx-icon name="info"></zx-icon>
          <span>自定义标题</span>
        </div>
      </template>
      <div>自定义标题的内容</div>
    </zx-collapse-item>
  </zx-collapse>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const activeNames = ref(['1'])
</script>

<style scoped>
.custom-title {
  display: flex;
  align-items: center;
  gap: 8px;
}
</style>
```

## 禁用状态

通过 `disabled` 属性可以禁用整个折叠面板，或者通过 `disabled` 属性禁用特定面板。

```vue
<template>
  <zx-collapse v-model="activeNames">
    <zx-collapse-item title="一致性 Consistency" name="1">
      <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
      <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
    </zx-collapse-item>
    <zx-collapse-item title="反馈 Feedback" name="2" disabled>
      <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
      <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
    </zx-collapse-item>
  </zx-collapse>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const activeNames = ref(['1'])
</script>
```

## 自定义图标

通过 `icon` 插槽可以自定义展开/收起的图标。

```vue
<template>
  <zx-collapse v-model="activeNames">
    <zx-collapse-item title="一致性 Consistency" name="1">
      <template #icon>
        <zx-icon name="arrow-right"></zx-icon>
      </template>
      <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
      <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
    </zx-collapse-item>
  </zx-collapse>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const activeNames = ref(['1'])
</script>
```

## API

### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| modelValue | 当前激活的面板 | string / string[] | - | - |
| accordion | 是否手风琴模式 | boolean | - | false |
| disabled | 是否禁用 | boolean | - | false |

### Events

| 事件名 | 说明 | 参数 |
|------|------|------|
| change | 当前激活面板改变时触发 | (activeNames: string / string[]) |

### Slots

| 插槽名 | 说明 | 参数 |
|------|------|------|
| default | 默认插槽，用于放置 CollapseItem 组件 | - |
| title | 自定义标题内容 | - |
| icon | 自定义展开/收起图标 | - |

### CollapseItem Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| name | 唯一标志符 | string / number | - | - |
| title | 面板标题 | string | - | - |
| disabled | 是否禁用 | boolean | - | false |

### CollapseItem Slots

| 插槽名 | 说明 | 参数 |
|------|------|------|
| default | 默认插槽，用于放置面板内容 | - |
| title | 自定义标题内容 | - |
| icon | 自定义展开/收起图标 | - | 