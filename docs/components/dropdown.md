# Dropdown 下拉菜单

Dropdown 组件用于将下拉菜单触发到目标元素上，支持多种触发方式、自定义内容、禁用状态等功能。

## 基础用法

```vue
<template>
  <zx-dropdown>
    <zx-button>
      下拉菜单
      <zx-icon name="arrow-down" />
    </zx-button>
    <template #dropdown>
      <zx-dropdown-menu>
        <zx-dropdown-item>选项一</zx-dropdown-item>
        <zx-dropdown-item>选项二</zx-dropdown-item>
        <zx-dropdown-item>选项三</zx-dropdown-item>
      </zx-dropdown-menu>
    </template>
  </zx-dropdown>
</template>
```

## 触发方式

通过 `trigger` 属性可以设置触发下拉菜单的方式。

```vue
<template>
  <div class="dropdown-demo">
    <zx-dropdown trigger="click">
      <zx-button>点击触发</zx-button>
      <template #dropdown>
        <zx-dropdown-menu>
          <zx-dropdown-item>选项一</zx-dropdown-item>
          <zx-dropdown-item>选项二</zx-dropdown-item>
        </zx-dropdown-menu>
      </template>
    </zx-dropdown>

    <zx-dropdown trigger="hover">
      <zx-button>悬停触发</zx-button>
      <template #dropdown>
        <zx-dropdown-menu>
          <zx-dropdown-item>选项一</zx-dropdown-item>
          <zx-dropdown-item>选项二</zx-dropdown-item>
        </zx-dropdown-menu>
      </template>
    </zx-dropdown>

    <zx-dropdown trigger="contextmenu">
      <zx-button>右键触发</zx-button>
      <template #dropdown>
        <zx-dropdown-menu>
          <zx-dropdown-item>选项一</zx-dropdown-item>
          <zx-dropdown-item>选项二</zx-dropdown-item>
        </zx-dropdown-menu>
      </template>
    </zx-dropdown>
  </div>
</template>

<style scoped>
.dropdown-demo {
  display: flex;
  gap: 10px;
}
</style>
```

## 菜单项禁用

通过 `disabled` 属性可以禁用菜单项。

```vue
<template>
  <zx-dropdown>
    <zx-button>
      下拉菜单
      <zx-icon name="arrow-down" />
    </zx-button>
    <template #dropdown>
      <zx-dropdown-menu>
        <zx-dropdown-item>选项一</zx-dropdown-item>
        <zx-dropdown-item disabled>选项二</zx-dropdown-item>
        <zx-dropdown-item>选项三</zx-dropdown-item>
      </zx-dropdown-menu>
    </template>
  </zx-dropdown>
</template>
```

## 分割线

通过 `zx-dropdown-item` 的 `divided` 属性可以添加分割线。

```vue
<template>
  <zx-dropdown>
    <zx-button>
      下拉菜单
      <zx-icon name="arrow-down" />
    </zx-button>
    <template #dropdown>
      <zx-dropdown-menu>
        <zx-dropdown-item>选项一</zx-dropdown-item>
        <zx-dropdown-item>选项二</zx-dropdown-item>
        <zx-dropdown-item divided>选项三</zx-dropdown-item>
      </zx-dropdown-menu>
    </template>
  </zx-dropdown>
</template>
```

## 自定义内容

通过 `dropdown` 插槽可以自定义下拉菜单的内容。

```vue
<template>
  <zx-dropdown>
    <zx-button>
      自定义内容
      <zx-icon name="arrow-down" />
    </zx-button>
    <template #dropdown>
      <div class="custom-dropdown">
        <div class="custom-header">自定义头部</div>
        <div class="custom-content">
          <zx-input v-model="searchText" placeholder="搜索..." />
          <zx-button type="primary" @click="handleSearch">搜索</zx-button>
        </div>
      </div>
    </template>
  </zx-dropdown>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const searchText = ref('')

const handleSearch = () => {
  console.log('搜索:', searchText.value)
}
</script>

<style scoped>
.custom-dropdown {
  padding: 10px;
  min-width: 200px;
}

.custom-header {
  padding: 8px 0;
  border-bottom: 1px solid #dcdfe6;
  margin-bottom: 10px;
}

.custom-content {
  display: flex;
  gap: 10px;
}
</style>
```

## 触发元素禁用

通过 `disabled` 属性可以禁用整个下拉菜单。

```vue
<template>
  <zx-dropdown disabled>
    <zx-button>
      禁用状态
      <zx-icon name="arrow-down" />
    </zx-button>
    <template #dropdown>
      <zx-dropdown-menu>
        <zx-dropdown-item>选项一</zx-dropdown-item>
        <zx-dropdown-item>选项二</zx-dropdown-item>
      </zx-dropdown-menu>
    </template>
  </zx-dropdown>
</template>
```

## API

### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| trigger | 触发下拉菜单的方式 | string | hover / click / contextmenu | hover |
| disabled | 是否禁用 | boolean | - | false |
| placement | 菜单弹出位置 | string | top / top-start / top-end / bottom / bottom-start / bottom-end / left / left-start / left-end / right / right-start / right-end | bottom |
| visible | 是否显示下拉菜单 | boolean | - | false |
| hide-after | 延迟关闭，单位毫秒 | number | - | 0 |
| show-timeout | 显示下拉菜单的延时，单位毫秒 | number | - | 0 |
| hide-timeout | 隐藏下拉菜单的延时，单位毫秒 | number | - | 200 |
| tabindex | 下拉菜单的 tabindex | number | - | 0 |

### Events

| 事件名 | 说明 | 参数 |
|------|------|------|
| visible-change | 下拉菜单出现/隐藏时触发 | visible: boolean |

### Slots

| 插槽名 | 说明 | 参数 |
|------|------|------|
| default | 触发下拉菜单的元素 | - |
| dropdown | 下拉菜单的内容 | - |

### DropdownItem Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| disabled | 是否禁用 | boolean | - | false |
| divided | 是否显示分割线 | boolean | - | false |
| command | 指令 | string / number / object | - | - |

### DropdownItem Events

| 事件名 | 说明 | 参数 |
|------|------|------|
| click | 点击菜单项时触发 | command: string / number / object | 