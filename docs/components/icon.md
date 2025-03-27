# Icon 图标

提供了一套常用的图标集合。

## 基础用法

直接通过设置 `name` 来使用即可。

```vue
<template>
  <zx-icon name="edit" />
  <zx-icon name="share" />
  <zx-icon name="delete" />
  <zx-icon name="search" />
  <zx-icon name="upload" />
</template>
```

## 图标颜色

通过 `color` 属性设置图标的颜色。

```vue
<template>
  <zx-icon name="edit" color="#409EFF" />
  <zx-icon name="share" color="#67C23A" />
  <zx-icon name="delete" color="#F56C6C" />
  <zx-icon name="star" color="#E6A23C" />
</template>
```

## 图标大小

通过 `size` 属性设置图标的大小。

```vue
<template>
  <zx-icon name="edit" :size="20" />
  <zx-icon name="share" :size="25" />
  <zx-icon name="delete" :size="30" />
  <zx-icon name="search" :size="35" />
</template>
```

## 自定义图标

如果内置的图标不满足需求，可以使用自定义图标。

```vue
<template>
  <zx-icon>
    <svg viewBox="0 0 24 24">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
    </svg>
  </zx-icon>
</template>
```

## API

### 属性

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| name     | 图标名称   | string  |   —            |    —     |
| color    | 图标颜色   | string    |   —           |    —    |
| size     | 图标大小   | number / string    |   —    |    16     |

### 事件

| 事件名称 | 说明 | 回调参数 |
|---------|---------|---------|
| click | 点击图标时触发 | event |

### 插槽

| 插槽名称 | 说明 |
|---------|---------|
| default | 自定义图标内容 |

## 图标集合

以下是所有内置图标的列表：

```vue
<template>
  <div class="icon-list">
    <div v-for="name in iconNames" :key="name" class="icon-item">
      <zx-icon :name="name" />
      <span>{{ name }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
const iconNames = [
  'edit',
  'share',
  'delete',
  'search',
  'upload',
  'download',
  'close',
  'check',
  'plus',
  'minus',
  'info',
  'warning',
  'success',
  'error',
  'star',
  'heart',
  'home',
  'setting',
  'message',
  'user',
  'time',
  'location',
  'phone',
  'email',
  'link',
  'camera',
  'image',
  'video',
  'music',
  'folder'
]
</script>

<style scoped>
.icon-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 20px;
  padding: 20px;
}

.icon-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}
</style>
``` 