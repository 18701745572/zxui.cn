# Button 按钮

常用的操作按钮。

## 基础用法

基础的按钮用法。

```vue
<template>
  <zx-button>默认按钮</zx-button>
  <zx-button type="primary">主要按钮</zx-button>
  <zx-button type="success">成功按钮</zx-button>
  <zx-button type="warning">警告按钮</zx-button>
  <zx-button type="danger">危险按钮</zx-button>
  <zx-button type="info">信息按钮</zx-button>
</template>
```

## 禁用状态

按钮不可用状态。

```vue
<template>
  <zx-button disabled>默认按钮</zx-button>
  <zx-button type="primary" disabled>主要按钮</zx-button>
  <zx-button type="success" disabled>成功按钮</zx-button>
  <zx-button type="warning" disabled>警告按钮</zx-button>
  <zx-button type="danger" disabled>危险按钮</zx-button>
  <zx-button type="info" disabled>信息按钮</zx-button>
</template>
```

## 图标按钮

带图标的按钮可增强辨识度。

```vue
<template>
  <zx-button icon="search">搜索</zx-button>
  <zx-button icon="edit">编辑</zx-button>
  <zx-button icon="check">确认</zx-button>
  <zx-button icon="message">消息</zx-button>
  <zx-button icon="delete">删除</zx-button>
</template>
```

## 加载中状态

点击按钮后进行数据加载操作，在按钮上显示加载状态。

```vue
<template>
  <zx-button :loading="true">加载中</zx-button>
  <zx-button type="primary" :loading="true">加载中</zx-button>
</template>
```

## 按钮尺寸

Button 组件提供除了默认值以外的三种尺寸。

```vue
<template>
  <zx-button size="large">大型按钮</zx-button>
  <zx-button>默认按钮</zx-button>
  <zx-button size="small">小型按钮</zx-button>
  <zx-button size="mini">迷你按钮</zx-button>
</template>
```

## 按钮组

以按钮组的方式出现，常用于多项类似操作。

```vue
<template>
  <zx-button-group>
    <zx-button type="primary" icon="left">上一页</zx-button>
    <zx-button type="primary">
      下一页
      <i class="zx-icon-right"></i>
    </zx-button>
  </zx-button-group>
</template>
```

## API

### Button 属性

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| size     | 尺寸   | string  |   large / small / mini            |    —     |
| type     | 类型   | string    |   primary / success / warning / danger / info / text |     —    |
| plain     | 是否朴素按钮   | boolean    | — | false   |
| round     | 是否圆角按钮   | boolean    | — | false   |
| circle     | 是否圆形按钮   | boolean    | — | false   |
| loading     | 是否加载中状态   | boolean    | — | false   |
| disabled  | 是否禁用状态    | boolean   | —   | false   |
| icon  | 图标类名 | string   |  —  |  —  |
| autofocus  | 是否默认聚焦 | boolean   |  —  |  false  |
| native-type | 原生 type 属性 | string | button / submit / reset | button |

### Button 事件

| 事件名称 | 说明 | 回调参数 |
|---------|---------|---------|
| click | 点击按钮时触发 | event |

### Button 插槽

| 插槽名称 | 说明 |
|---------|---------|
| default | 按钮内容 |

### Button Group 属性

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| size     | 按钮组尺寸   | string  |   large / small / mini  |    —     |

## 最佳实践

### 在表单中使用

```vue
<template>
  <div class="form-buttons">
    <zx-button type="primary" @click="handleSubmit">提交</zx-button>
    <zx-button @click="handleReset">重置</zx-button>
  </div>
</template>

<script setup lang="ts">
const handleSubmit = () => {
  // 处理表单提交
}

const handleReset = () => {
  // 处理表单重置
}
</script>
```

### 配合图标使用

```vue
<template>
  <zx-button type="primary" icon="search">搜索</zx-button>
  <zx-button type="success" icon="upload">上传</zx-button>
</template>
```
