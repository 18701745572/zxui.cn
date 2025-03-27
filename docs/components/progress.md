# Progress 进度条

Progress 组件用于展示操作进度，支持多种类型和自定义配置。

## 基础用法

```vue
<template>
  <zx-progress :percentage="50"></zx-progress>
</template>
```

## 不同类型

支持 `line`、`circle`、`dashboard` 三种类型。

```vue
<template>
  <div class="progress-demo">
    <zx-progress :percentage="50" type="line"></zx-progress>
    <zx-progress :percentage="50" type="circle"></zx-progress>
    <zx-progress :percentage="50" type="dashboard"></zx-progress>
  </div>
</template>

<style scoped>
.progress-demo {
  display: flex;
  gap: 20px;
  align-items: center;
}
</style>
```

## 自定义颜色

通过 `color` 属性可以自定义进度条的颜色。

```vue
<template>
  <zx-progress :percentage="50" color="#67c23a"></zx-progress>
</template>
```

## 渐变色

通过 `color` 属性可以设置渐变色。

```vue
<template>
  <zx-progress
    :percentage="50"
    :color="customColor"
  ></zx-progress>
</template>

<script setup lang="ts">
const customColor = (percentage: number) => {
  if (percentage < 30) {
    return '#909399'
  } else if (percentage < 70) {
    return '#e6a23c'
  } else {
    return '#67c23a'
  }
}
</script>
```

## 自定义宽度

通过 `stroke-width` 属性可以自定义进度条的宽度。

```vue
<template>
  <zx-progress :percentage="50" :stroke-width="15"></zx-progress>
</template>
```

## 显示文字

设置 `show-text` 属性可以显示进度文字。

```vue
<template>
  <zx-progress :percentage="50" show-text></zx-progress>
</template>
```

## 自定义文字

通过 `format` 属性可以自定义进度文字。

```vue
<template>
  <zx-progress
    :percentage="50"
    :format="customFormat"
  ></zx-progress>
</template>

<script setup lang="ts">
const customFormat = (percentage: number) => {
  return percentage === 100 ? '完成' : `${percentage}%`
}
</script>
```

## 状态进度条

通过 `status` 属性可以设置进度条的状态。

```vue
<template>
  <div class="status-demo">
    <zx-progress :percentage="50" status="success"></zx-progress>
    <zx-progress :percentage="50" status="warning"></zx-progress>
    <zx-progress :percentage="50" status="exception"></zx-progress>
  </div>
</template>

<style scoped>
.status-demo {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
```

## 条纹进度条

设置 `striped` 属性可以显示条纹进度条。

```vue
<template>
  <zx-progress :percentage="50" striped></zx-progress>
</template>
```

## 动画效果

设置 `animated` 属性可以显示动画效果。

```vue
<template>
  <zx-progress :percentage="50" striped animated></zx-progress>
</template>
```

## API

### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| percentage | 百分比 | number | 0-100 | 0 |
| type | 进度条类型 | string | line / circle / dashboard | line |
| color | 进度条颜色 | string / function | - | - |
| strokeWidth | 进度条的宽度 | number | - | 6 |
| showText | 是否显示进度文字 | boolean | - | true |
| format | 进度条显示文字格式化函数 | function | - | - |
| status | 进度条当前状态 | string | success / warning / exception | - |
| striped | 是否显示条纹 | boolean | - | false |
| animated | 是否显示动画 | boolean | - | false |
| width | 环形进度条画布宽度 | number | - | 126 |
| textInside | 进度条显示文字内置在进度条内 | boolean | - | false | 