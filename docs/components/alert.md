# Alert 提示

用于页面中展示重要的提示信息。

## 基础用法

基础的按钮用法。

```vue
<template>
  <zx-alert title="默认提示" />
  <zx-alert title="成功提示" type="success" />
  <zx-alert title="警告提示" type="warning" />
  <zx-alert title="错误提示" type="error" />
</template>
```

## 主题

Alert 组件提供了两个不同的主题：`light` 和 `dark`。

```vue
<template>
  <zx-alert title="light 主题" effect="light" />
  <zx-alert title="dark 主题" effect="dark" />
</template>
```

## 可关闭的提示

设置 `closable` 属性可以定义是否可关闭。

```vue
<template>
  <zx-alert title="不可关闭的 alert" :closable="false" />
  <zx-alert title="可关闭的 alert" />
</template>
```

## 带有辅助性文字介绍

通过 `description` 属性可以添加更多的描述文字。

```vue
<template>
  <zx-alert
    title="带辅助性文字介绍"
    description="这是一段辅助性文字，可以用来详细描述内容。"
  />
</template>
```

## 带有图标

通过 `show-icon` 属性来显示图标。

```vue
<template>
  <zx-alert title="成功提示" type="success" show-icon />
  <zx-alert title="错误提示" type="error" show-icon />
</template>
```

## 文字居中

使用 `center` 属性让文字水平居中。

```vue
<template>
  <zx-alert title="文字居中的提示" center />
</template>
```

## API

### 属性

| 参数        | 说明           | 类型    | 可选值                                | 默认值  |
|------------|----------------|---------|--------------------------------------|---------|
| title      | 标题           | string  | —                                    | —       |
| type       | 类型           | string  | success / warning / info / error     | info    |
| description| 辅助性文字      | string  | —                                    | —       |
| closable   | 是否可关闭      | boolean | —                                    | true    |
| center     | 文字是否居中    | boolean | —                                    | false   |
| show-icon  | 是否显示图标    | boolean | —                                    | false   |
| effect     | 主题           | string  | light / dark                         | light   |

### 事件

| 事件名  | 说明                    | 回调参数 |
|---------|------------------------|----------|
| close   | 关闭 Alert 时触发的事件 | —        |

### 插槽

| 插槽名      | 说明                |
|------------|-------------------|
| default    | Alert 内容        |
| title      | 标题内容          |
``` 