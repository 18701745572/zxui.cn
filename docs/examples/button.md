# 按钮示例

按钮（Button）是用户界面中最常用的交互元素之一。ZXUI CN 提供了多种类型和样式的按钮，以满足不同场景的需求。

## 基础用法

展示了按钮的基本用法，包括不同类型、尺寸和状态。

```vue
<template>
  <div class="button-demo">
    <h3>按钮类型</h3>
    <div class="demo-row">
      <zx-button>默认按钮</zx-button>
      <zx-button type="primary">主要按钮</zx-button>
      <zx-button type="success">成功按钮</zx-button>
      <zx-button type="info">信息按钮</zx-button>
      <zx-button type="warning">警告按钮</zx-button>
      <zx-button type="danger">危险按钮</zx-button>
    </div>
    
    <h3>朴素按钮</h3>
    <div class="demo-row">
      <zx-button plain>朴素按钮</zx-button>
      <zx-button type="primary" plain>主要按钮</zx-button>
      <zx-button type="success" plain>成功按钮</zx-button>
      <zx-button type="info" plain>信息按钮</zx-button>
      <zx-button type="warning" plain>警告按钮</zx-button>
      <zx-button type="danger" plain>危险按钮</zx-button>
    </div>
    
    <h3>圆角按钮</h3>
    <div class="demo-row">
      <zx-button round>圆角按钮</zx-button>
      <zx-button type="primary" round>主要按钮</zx-button>
      <zx-button type="success" round>成功按钮</zx-button>
      <zx-button type="info" round>信息按钮</zx-button>
      <zx-button type="warning" round>警告按钮</zx-button>
      <zx-button type="danger" round>危险按钮</zx-button>
    </div>
    
    <h3>按钮尺寸</h3>
    <div class="demo-row">
      <zx-button size="large">大型按钮</zx-button>
      <zx-button>默认按钮</zx-button>
      <zx-button size="small">小型按钮</zx-button>
      <zx-button size="mini">迷你按钮</zx-button>
    </div>
    
    <h3>禁用状态</h3>
    <div class="demo-row">
      <zx-button disabled>禁用按钮</zx-button>
      <zx-button type="primary" disabled>禁用主要按钮</zx-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.button-demo {
  .demo-row {
    margin-bottom: 20px;
  }
  
  .zx-button {
    margin-right: 10px;
    margin-bottom: 10px;
  }
}
</style>
```

## 图标按钮

结合图标使用的按钮示例。

```vue
<template>
  <div class="icon-button-demo">
    <h3>图标按钮</h3>
    <div class="demo-row">
      <zx-button icon="search">搜索</zx-button>
      <zx-button icon="edit">编辑</zx-button>
      <zx-button icon="check">确认</zx-button>
      <zx-button icon="message">消息</zx-button>
      <zx-button icon="delete" type="danger">删除</zx-button>
    </div>
    
    <h3>纯图标按钮</h3>
    <div class="demo-row">
      <zx-button icon="search" circle></zx-button>
      <zx-button icon="edit" circle></zx-button>
      <zx-button icon="check" circle type="success"></zx-button>
      <zx-button icon="message" circle type="info"></zx-button>
      <zx-button icon="delete" circle type="danger"></zx-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.icon-button-demo {
  .demo-row {
    margin-bottom: 20px;
  }
  
  .zx-button {
    margin-right: 10px;
    margin-bottom: 10px;
  }
}
</style>
```

## 加载状态按钮

展示按钮的加载状态示例。

```vue
<template>
  <div class="loading-button-demo">
    <h3>加载状态</h3>
    <div class="demo-row">
      <zx-button loading>加载中</zx-button>
      <zx-button type="primary" loading>加载中</zx-button>
      <zx-button type="success" loading>加载中</zx-button>
    </div>
    
    <h3>动态控制加载状态</h3>
    <div class="demo-row">
      <zx-button type="primary" :loading="loading1" @click="handleClick1">
        {{ loading1 ? '加载中' : '点击加载' }}
      </zx-button>
      <zx-button type="success" :loading="loading2" @click="handleClick2">
        {{ loading2 ? '提交中' : '提交表单' }}
      </zx-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const loading1 = ref(false)
const loading2 = ref(false)

const handleClick1 = () => {
  loading1.value = true
  setTimeout(() => {
    loading1.value = false
  }, 2000)
}

const handleClick2 = () => {
  loading2.value = true
  setTimeout(() => {
    loading2.value = false
  }, 2000)
}
</script>

<style lang="scss" scoped>
.loading-button-demo {
  .demo-row {
    margin-bottom: 20px;
  }
  
  .zx-button {
    margin-right: 10px;
    margin-bottom: 10px;
  }
}
</style>
```

## 按钮组

按钮组的使用示例。

```vue
<template>
  <div class="button-group-demo">
    <h3>基础按钮组</h3>
    <div class="demo-row">
      <zx-button-group>
        <zx-button>左侧按钮</zx-button>
        <zx-button>中间按钮</zx-button>
        <zx-button>右侧按钮</zx-button>
      </zx-button-group>
    </div>
    
    <h3>图标按钮组</h3>
    <div class="demo-row">
      <zx-button-group>
        <zx-button icon="arrow-left">上一页</zx-button>
        <zx-button icon="arrow-right" icon-position="right">下一页</zx-button>
      </zx-button-group>
    </div>
    
    <h3>不同类型的按钮组</h3>
    <div class="demo-row">
      <zx-button-group>
        <zx-button type="primary" icon="edit">编辑</zx-button>
        <zx-button type="success" icon="share">分享</zx-button>
        <zx-button type="info" icon="delete">删除</zx-button>
      </zx-button-group>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.button-group-demo {
  .demo-row {
    margin-bottom: 20px;
  }
}
</style>
```

## 块级按钮

展示块级按钮的使用。

```vue
<template>
  <div class="block-button-demo">
    <h3>块级按钮</h3>
    <div class="demo-container">
      <zx-button type="primary" block>块级主要按钮</zx-button>
      <zx-button type="success" block>块级成功按钮</zx-button>
      <zx-button block>块级默认按钮</zx-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.block-button-demo {
  .demo-container {
    width: 400px;
    margin-bottom: 20px;
    
    .zx-button {
      margin-bottom: 10px;
    }
  }
}
</style>
```

## 实际应用场景

在实际应用中的按钮使用示例。

```vue
<template>
  <div class="application-demo">
    <h3>文件操作</h3>
    <div class="demo-row">
      <zx-button type="primary" icon="upload">上传文件</zx-button>
      <zx-button type="info" icon="download">下载文件</zx-button>
      <zx-button type="danger" icon="delete">删除文件</zx-button>
    </div>
    
    <h3>表单操作</h3>
    <div class="form-actions">
      <zx-button type="primary">提交</zx-button>
      <zx-button>重置</zx-button>
      <zx-button type="text">取消</zx-button>
    </div>
    
    <h3>权限按钮</h3>
    <div class="demo-row">
      <zx-button type="primary" v-if="hasCreatePermission">创建</zx-button>
      <zx-button type="warning" v-if="hasEditPermission">编辑</zx-button>
      <zx-button type="danger" v-if="hasDeletePermission">删除</zx-button>
      <p v-if="!hasAnyPermission">您没有操作权限</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

// 模拟权限状态
const permissions = {
  create: true,
  edit: true,
  delete: false
}

const hasCreatePermission = computed(() => permissions.create)
const hasEditPermission = computed(() => permissions.edit)
const hasDeletePermission = computed(() => permissions.delete)
const hasAnyPermission = computed(() => {
  return permissions.create || permissions.edit || permissions.delete
})
</script>

<style lang="scss" scoped>
.application-demo {
  .demo-row {
    margin-bottom: 20px;
  }
  
  .zx-button {
    margin-right: 10px;
    margin-bottom: 10px;
  }
  
  .form-actions {
    padding: 20px;
    border-top: 1px solid var(--zx-border-color);
    background-color: var(--zx-background-color-light);
    text-align: right;
    margin-bottom: 20px;
  }
}
</style>
```

以上示例展示了 ZXUI CN 按钮组件的各种用法和场景，可以根据实际需求选择合适的按钮类型和样式。 