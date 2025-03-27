# Audio 音频处理

Audio 组件用于处理音频文件，支持音频播放、录制、编辑等功能。

## 基础用法

```vue
<template>
  <zx-audio
    src="https://example.com/audio.mp3"
    @load="handleLoad"
  />
</template>

<script setup lang="ts">
const handleLoad = () => {
  console.log('音频加载完成')
}
</script>
```

## 音频播放

通过 `play` 方法可以播放音频。

```vue
<template>
  <div>
    <zx-button @click="handlePlay">播放音频</zx-button>
    <zx-audio ref="audioRef" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const audioRef = ref()

const handlePlay = () => {
  const file = new File(['audio content'], 'audio.mp3')
  audioRef.value?.play(file)
}
</script>
```

## 音频录制

通过 `record` 方法可以录制音频。

```vue
<template>
  <div>
    <zx-button @click="handleRecord">录制音频</zx-button>
    <zx-audio ref="audioRef" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const audioRef = ref()

const handleRecord = () => {
  audioRef.value?.record()
}
</script>
```

## 音频编辑

通过 `edit` 方法可以编辑音频。

```vue
<template>
  <div>
    <zx-button @click="handleEdit">编辑音频</zx-button>
    <zx-audio ref="audioRef" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const audioRef = ref()

const handleEdit = () => {
  const file = new File(['audio content'], 'audio.mp3')
  audioRef.value?.edit(file)
}
</script>
```

## 自定义配置

通过 `config` 属性可以自定义配置。

```vue
<template>
  <zx-audio
    :config="config"
    src="https://example.com/audio.mp3"
  />
</template>

<script setup lang="ts">
const config = {
  volume: 0.8,
  playbackRate: 1.0,
  loop: false,
  autoplay: false,
  format: 'mp3'
}
</script>
```

## 事件监听

通过事件可以监听音频处理状态。

```vue
<template>
  <zx-audio
    src="https://example.com/audio.mp3"
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
| src | 音频地址 | string | - | - |
| config | 配置项 | object | - | - |
| accept | 接受的文件类型 | string | - | .mp3,.wav,.ogg |
| max-size | 最大文件大小(MB) | number | - | 50 |

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

### Methods

| 方法名 | 说明 | 参数 |
|------|------|------|
| play | 播放音频 | file |
| pause | 暂停播放 | - |
| stop | 停止播放 | - |
| record | 录制音频 | - |
| edit | 编辑音频 | file |
| setVolume | 设置音量 | volume |
| setPlaybackRate | 设置播放速度 | rate | 