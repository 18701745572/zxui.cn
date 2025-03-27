# Video 视频处理

Video 组件用于处理视频文件，支持视频播放、录制、编辑等功能。

## 基础用法

```vue
<template>
  <zx-video
    src="https://example.com/video.mp4"
    @load="handleLoad"
  />
</template>

<script setup lang="ts">
const handleLoad = () => {
  console.log('视频加载完成')
}
</script>
```

## 视频播放

通过 `play` 方法可以播放视频。

```vue
<template>
  <div>
    <zx-button @click="handlePlay">播放视频</zx-button>
    <zx-video ref="videoRef" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const videoRef = ref()

const handlePlay = () => {
  const file = new File(['video content'], 'video.mp4')
  videoRef.value?.play(file)
}
</script>
```

## 视频录制

通过 `record` 方法可以录制视频。

```vue
<template>
  <div>
    <zx-button @click="handleRecord">录制视频</zx-button>
    <zx-video ref="videoRef" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const videoRef = ref()

const handleRecord = () => {
  videoRef.value?.record()
}
</script>
```

## 视频编辑

通过 `edit` 方法可以编辑视频。

```vue
<template>
  <div>
    <zx-button @click="handleEdit">编辑视频</zx-button>
    <zx-video ref="videoRef" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const videoRef = ref()

const handleEdit = () => {
  const file = new File(['video content'], 'video.mp4')
  videoRef.value?.edit(file)
}
</script>
```

## 自定义配置

通过 `config` 属性可以自定义配置。

```vue
<template>
  <zx-video
    :config="config"
    src="https://example.com/video.mp4"
  />
</template>

<script setup lang="ts">
const config = {
  width: 800,
  height: 450,
  volume: 0.8,
  playbackRate: 1.0,
  loop: false,
  autoplay: false,
  format: 'mp4',
  controls: true,
  muted: false
}
</script>
```

## 事件监听

通过事件可以监听视频处理状态。

```vue
<template>
  <zx-video
    src="https://example.com/video.mp4"
    @load="handleLoad"
    @error="handleError"
    @play="handlePlay"
  />
</template>

<script setup lang="ts">
const handleLoad = () => {
  console.log('加载成功')
}

const handleError = (error: any) => {
  console.log('加载失败', error)
}

const handlePlay = () => {
  console.log('播放成功')
}
</script>
```

## API

### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| src | 视频地址 | string | - | - |
| config | 配置项 | object | - | - |
| accept | 接受的文件类型 | string | - | .mp4,.webm,.ogg |
| max-size | 最大文件大小(MB) | number | - | 500 |

### Events

| 事件名 | 说明 | 参数 |
|------|------|------|
| load | 加载完成时触发 | - |
| error | 加载失败时触发 | error |
| play | 播放时触发 | - |
| pause | 暂停时触发 | - |
| ended | 播放结束时触发 | - |
| timeupdate | 播放进度更新时触发 | currentTime |
| volumechange | 音量改变时触发 | volume |
| fullscreenchange | 全屏状态改变时触发 | isFullscreen |

### Methods

| 方法名 | 说明 | 参数 |
|------|------|------|
| play | 播放视频 | file |
| pause | 暂停播放 | - |
| stop | 停止播放 | - |
| record | 录制视频 | - |
| edit | 编辑视频 | file |
| setVolume | 设置音量 | volume |
| setPlaybackRate | 设置播放速度 | rate |
| requestFullscreen | 请求全屏 | - |
| exitFullscreen | 退出全屏 | - |

### Slots

| 插槽名 | 说明 | 参数 |
|------|------|------|
| controls | 自定义控制栏 | - | 