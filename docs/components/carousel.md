# Carousel 走马灯

Carousel 组件用于轮播展示内容，支持自动轮播、指示器、切换按钮等功能。

## 基础用法

```vue
<template>
  <zx-carousel>
    <zx-carousel-item v-for="item in 4" :key="item">
      <div class="carousel-content">
        {{ item }}
      </div>
    </zx-carousel-item>
  </zx-carousel>
</template>

<style scoped>
.carousel-content {
  height: 200px;
  background-color: #d3dce6;
  color: #fff;
  font-size: 18px;
  text-align: center;
  line-height: 200px;
}
</style>
```

## 自动轮播

设置 `autoplay` 属性可以启用自动轮播。

```vue
<template>
  <zx-carousel :interval="4000" type="card" height="200px">
    <zx-carousel-item v-for="item in 4" :key="item">
      <div class="carousel-content">
        {{ item }}
      </div>
    </zx-carousel-item>
  </zx-carousel>
</template>

<style scoped>
.carousel-content {
  height: 200px;
  background-color: #d3dce6;
  color: #fff;
  font-size: 18px;
  text-align: center;
  line-height: 200px;
}
</style>
```

## 指示器

通过 `indicator-position` 属性可以设置指示器的位置。

```vue
<template>
  <zx-carousel indicator-position="outside">
    <zx-carousel-item v-for="item in 4" :key="item">
      <div class="carousel-content">
        {{ item }}
      </div>
    </zx-carousel-item>
  </zx-carousel>
</template>

<style scoped>
.carousel-content {
  height: 200px;
  background-color: #d3dce6;
  color: #fff;
  font-size: 18px;
  text-align: center;
  line-height: 200px;
}
</style>
```

## 切换按钮

设置 `arrow` 属性可以显示切换按钮。

```vue
<template>
  <zx-carousel :interval="5000" arrow="always">
    <zx-carousel-item v-for="item in 4" :key="item">
      <div class="carousel-content">
        {{ item }}
      </div>
    </zx-carousel-item>
  </zx-carousel>
</template>

<style scoped>
.carousel-content {
  height: 200px;
  background-color: #d3dce6;
  color: #fff;
  font-size: 18px;
  text-align: center;
  line-height: 200px;
}
</style>
```

## 卡片化轮播

设置 `type="card"` 可以启用卡片化轮播。

```vue
<template>
  <zx-carousel :interval="4000" type="card" height="200px">
    <zx-carousel-item v-for="item in 4" :key="item">
      <div class="carousel-content">
        {{ item }}
      </div>
    </zx-carousel-item>
  </zx-carousel>
</template>

<style scoped>
.carousel-content {
  height: 200px;
  background-color: #d3dce6;
  color: #fff;
  font-size: 18px;
  text-align: center;
  line-height: 200px;
}
</style>
```

## 自定义指示器

通过 `indicator` 插槽可以自定义指示器。

```vue
<template>
  <zx-carousel>
    <zx-carousel-item v-for="item in 4" :key="item">
      <div class="carousel-content">
        {{ item }}
      </div>
    </zx-carousel-item>
    <template #indicator="{ currentIndex, total }">
      <div class="custom-indicator">
        <span
          v-for="index in total"
          :key="index"
          :class="{ active: currentIndex === index - 1 }"
        ></span>
      </div>
    </template>
  </zx-carousel>
</template>

<style scoped>
.carousel-content {
  height: 200px;
  background-color: #d3dce6;
  color: #fff;
  font-size: 18px;
  text-align: center;
  line-height: 200px;
}
.custom-indicator {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
}
.custom-indicator span {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #fff;
  cursor: pointer;
}
.custom-indicator span.active {
  background-color: #409eff;
}
</style>
```

## 手动控制

通过 `ref` 可以获取组件实例，调用相应的方法进行控制。

```vue
<template>
  <div>
    <zx-carousel ref="carouselRef">
      <zx-carousel-item v-for="item in 4" :key="item">
        <div class="carousel-content">
          {{ item }}
        </div>
      </zx-carousel-item>
    </zx-carousel>
    <div class="controls">
      <zx-button @click="prev">上一张</zx-button>
      <zx-button @click="next">下一张</zx-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const carouselRef = ref()

const prev = () => {
  carouselRef.value?.prev()
}

const next = () => {
  carouselRef.value?.next()
}
</script>

<style scoped>
.carousel-content {
  height: 200px;
  background-color: #d3dce6;
  color: #fff;
  font-size: 18px;
  text-align: center;
  line-height: 200px;
}
.controls {
  margin-top: 20px;
  text-align: center;
}
</style>
```

## API

### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| height | 走马灯的高度 | string | - | - |
| initial-index | 初始激活的幻灯片的索引 | number | - | 0 |
| trigger | 指示器的触发方式 | string | click / hover | click |
| autoplay | 是否自动切换 | boolean | - | false |
| interval | 自动切换的时间间隔，单位为毫秒 | number | - | 3000 |
| indicator-position | 指示器的位置 | string | outside / none | - |
| arrow | 切换箭头显示时机 | string | always / hover / never | hover |
| type | 走马灯的类型 | string | card | - |
| direction | 走马灯展示的方向 | string | horizontal / vertical | horizontal |

### Events

| 事件名 | 说明 | 参数 |
|------|------|------|
| change | 幻灯片切换时触发 | (currentIndex: number, oldIndex: number) |

### Methods

| 方法名 | 说明 | 参数 |
|------|------|------|
| setActiveItem | 手动切换幻灯片 | (index: number) |
| prev | 切换到上一张幻灯片 | - |
| next | 切换到下一张幻灯片 | - |

### Slots

| 插槽名 | 说明 | 参数 |
|------|------|------|
| default | 默认插槽，用于放置 CarouselItem 组件 | - |
| indicator | 自定义指示器 | { currentIndex, total } | 