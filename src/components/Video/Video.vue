<template>
  <div
    class="zx-video"
    :class="[
      `zx-video--${size}`,
      {
        'is-disabled': disabled
      }
    ]"
  >
    <div
      class="zx-video__preview"
      @click="handlePreview"
    >
      <video
        v-if="src"
        :src="src"
        :poster="poster"
        :controls="controls"
        :autoplay="autoplay"
        :loop="loop"
        :muted="muted"
        @error="handleError"
      />
      <div
        v-else
        class="zx-video__placeholder"
      >
        <i class="zx-icon-video" />
      </div>
    </div>
    <div
      v-if="showActions"
      class="zx-video__actions"
    >
      <span
        class="zx-video__action"
        @click="handlePreview"
      >
        <i class="zx-icon-zoom-in" />
      </span>
      <span
        class="zx-video__action"
        @click="handleEdit"
      >
        <i class="zx-icon-edit" />
      </span>
      <span
        class="zx-video__action"
        @click="handleCompress"
      >
        <i class="zx-icon-compress" />
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

type VideoSize = 'large' | 'default' | 'small'

interface Props {
  // 视频地址
  src?: string
  // 视频封面
  poster?: string
  // 是否显示控制栏
  controls?: boolean
  // 是否自动播放
  autoplay?: boolean
  // 是否循环播放
  loop?: boolean
  // 是否静音播放
  muted?: boolean
  // 视频大小
  size?: VideoSize
  // 是否禁用
  disabled?: boolean
  // 是否显示操作按钮
  showActions?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  src: '',
  poster: '',
  controls: true,
  autoplay: false,
  loop: false,
  muted: false,
  size: 'default',
  disabled: false,
  showActions: true
})

interface Emits {
  (e: 'error', event: Event): void
  (e: 'preview'): void
  (e: 'edit'): void
  (e: 'compress'): void
}

const emit = defineEmits<Emits>()

// 处理预览
const handlePreview = () => {
  if (props.disabled) return
  emit('preview')
}

// 处理编辑
const handleEdit = () => {
  if (props.disabled) return
  emit('edit')
}

// 处理压缩
const handleCompress = () => {
  if (props.disabled) return
  emit('compress')
}

// 处理加载错误
const handleError = (e: Event) => {
  emit('error', e)
}
</script>

<style lang="scss" scoped>
.zx-video {
  position: relative;
  display: inline-block;
  width: 200px;
  height: 150px;
  line-height: 150px;
  text-align: center;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  overflow: hidden;
  background-color: #f5f7fa;

  &--large {
    width: 240px;
    height: 180px;
    line-height: 180px;
  }

  &--small {
    width: 160px;
    height: 120px;
    line-height: 120px;
  }

  &__preview {
    width: 100%;
    height: 100%;
    cursor: pointer;

    video {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__placeholder {
    width: 100%;
    height: 100%;
    color: #909399;
    font-size: 24px;
  }

  &__actions {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
    opacity: 0;
    transition: opacity 0.3s;

    &:hover {
      opacity: 1;
    }
  }

  &__action {
    margin: 0 8px;
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    transition: transform 0.3s;

    &:hover {
      transform: scale(1.1);
    }
  }

  &.is-disabled {
    cursor: not-allowed;
    opacity: 0.6;

    .zx-video__preview,
    .zx-video__action {
      cursor: not-allowed;
    }
  }
}
</style> 