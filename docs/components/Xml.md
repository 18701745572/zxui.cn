# Xml 预览

用于预览XML文件的组件。

## 基础用法

```vue
<template>
  <zx-xml
    content="<root><item>内容</item></root>"
    :font-size="14"
    :line-height="1.6"
  />
</template>
```

## 属性

| 属性名 | 说明 | 类型 | 可选值 | 默认值 |
|--------|------|------|--------|--------|
| content | XML内容 | string | - | '' |
| src | XML文件地址 | string | - | '' |
| size | 组件大小 | string | large / default / small | default |
| disabled | 是否禁用 | boolean | - | false |
| showActions | 是否显示操作按钮 | boolean | - | true |
| allowFullscreen | 是否允许全屏 | boolean | - | true |
| allowScroll | 是否允许滚动 | boolean | - | true |
| allowEdit | 是否允许编辑 | boolean | - | true |
| allowDownload | 是否允许下载 | boolean | - | true |
| fontSize | 字体大小 | number | - | 14 |
| lineHeight | 行高 | number | - | 1.6 |

## 事件

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| load | 加载完成时触发 | Event |
| error | 加载错误时触发 | Event |
| preview | 点击预览时触发 | - |
| edit | 点击编辑时触发 | - |
| download | 点击下载时触发 | - |

## 插槽

无

## 依赖

- xml-formatter 