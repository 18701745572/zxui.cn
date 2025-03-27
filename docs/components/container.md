# Container 布局容器

Container 组件用于布局的容器组件，方便快速搭建页面的基本结构，支持嵌套使用。

## 基础用法

```vue
<template>
  <zx-container>
    <zx-header>Header</zx-header>
    <zx-main>Main</zx-main>
    <zx-footer>Footer</zx-footer>
  </zx-container>
</template>

<style scoped>
.zx-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
  text-align: center;
}

.zx-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

.zx-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}
</style>
```

## 嵌套布局

Container 组件支持嵌套使用。

```vue
<template>
  <zx-container>
    <zx-header>Header</zx-header>
    <zx-container>
      <zx-aside width="200px">Aside</zx-aside>
      <zx-container>
        <zx-main>Main</zx-main>
        <zx-footer>Footer</zx-footer>
      </zx-container>
    </zx-container>
  </zx-container>
</template>

<style scoped>
.zx-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
  text-align: center;
}

.zx-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.zx-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

.zx-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}
</style>
```

## 侧边栏宽度

通过 `width` 属性可以设置侧边栏的宽度。

```vue
<template>
  <zx-container>
    <zx-aside width="200px">Aside</zx-aside>
    <zx-container>
      <zx-header>Header</zx-header>
      <zx-main>Main</zx-main>
      <zx-footer>Footer</zx-footer>
    </zx-container>
  </zx-container>
</template>

<style scoped>
.zx-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
  text-align: center;
}

.zx-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.zx-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

.zx-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}
</style>
```

## 固定头部

设置 `fixed` 属性可以固定头部。

```vue
<template>
  <zx-container>
    <zx-header fixed>Header</zx-header>
    <zx-main>Main</zx-main>
    <zx-footer>Footer</zx-footer>
  </zx-container>
</template>

<style scoped>
.zx-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
  text-align: center;
}

.zx-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

.zx-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}
</style>
```

## 固定侧边栏

设置 `fixed` 属性可以固定侧边栏。

```vue
<template>
  <zx-container>
    <zx-aside fixed width="200px">Aside</zx-aside>
    <zx-container>
      <zx-header>Header</zx-header>
      <zx-main>Main</zx-main>
      <zx-footer>Footer</zx-footer>
    </zx-container>
  </zx-container>
</template>

<style scoped>
.zx-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
  text-align: center;
}

.zx-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.zx-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

.zx-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}
</style>
```

## API

### Container Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| direction | 子元素的排列方向 | string | horizontal / vertical | vertical |

### Header Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| height | 顶栏高度 | string | - | 60px |

### Aside Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| width | 侧边栏宽度 | string | - | 300px |

### Main Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| padding | 内边距 | string | - | 20px |

### Footer Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| height | 底栏高度 | string | - | 60px |

### Slots

| 插槽名 | 说明 | 参数 |
|------|------|------|
| default | 默认插槽，用于放置子组件 | - | 