# Divider 分割线

Divider 组件用于分隔不同内容，支持水平分割线和垂直分割线，可以自定义分割线的样式和内容。

## 基础用法

```vue
<template>
  <div>
    <span>青春是一个短暂的美梦</span>
    <zx-divider></zx-divider>
    <span>当你醒来时，它早已消失无踪</span>
  </div>
</template>
```

## 垂直分割线

设置 `direction` 属性为 `vertical` 可以显示垂直分割线。

```vue
<template>
  <div class="vertical-demo">
    <span>青春是一个短暂的美梦</span>
    <zx-divider direction="vertical"></zx-divider>
    <span>当你醒来时，它早已消失无踪</span>
  </div>
</template>

<style scoped>
.vertical-demo {
  display: flex;
  align-items: center;
  height: 100px;
}
</style>
```

## 带文字的分割线

通过默认插槽可以添加文字内容。

```vue
<template>
  <div>
    <span>青春是一个短暂的美梦</span>
    <zx-divider>青春</zx-divider>
    <span>当你醒来时，它早已消失无踪</span>
  </div>
</template>
```

## 文字位置

通过 `content-position` 属性可以设置文字的位置。

```vue
<template>
  <div>
    <span>青春是一个短暂的美梦</span>
    <zx-divider content-position="left">青春</zx-divider>
    <span>当你醒来时，它早已消失无踪</span>
    <zx-divider content-position="right">青春</zx-divider>
    <span>当你醒来时，它早已消失无踪</span>
  </div>
</template>
```

## 自定义样式

通过 `style` 属性可以自定义分割线的样式。

```vue
<template>
  <div>
    <span>青春是一个短暂的美梦</span>
    <zx-divider style="color: #409eff; border-color: #409eff;">青春</zx-divider>
    <span>当你醒来时，它早已消失无踪</span>
  </div>
</template>
```

## 虚线

设置 `dashed` 属性可以显示虚线。

```vue
<template>
  <div>
    <span>青春是一个短暂的美梦</span>
    <zx-divider dashed>青春</zx-divider>
    <span>当你醒来时，它早已消失无踪</span>
  </div>
</template>
```

## 间距

通过 `margin` 属性可以设置分割线的上下间距。

```vue
<template>
  <div>
    <span>青春是一个短暂的美梦</span>
    <zx-divider :margin="20">青春</zx-divider>
    <span>当你醒来时，它早已消失无踪</span>
  </div>
</template>
```

## API

### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| direction | 设置分割线方向 | string | horizontal / vertical | horizontal |
| content-position | 设置分割线文案的位置 | string | left / center / right | center |
| dashed | 是否虚线 | boolean | - | false |
| margin | 设置分割线上下间距，单位为像素 | number | - | 16 |

### Slots

| 插槽名 | 说明 | 参数 |
|------|------|------|
| default | 默认插槽，用于放置分割线中间的内容 | - |
``` 