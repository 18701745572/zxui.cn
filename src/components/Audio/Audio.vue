<template>
  <div
    class="zx-audio"
    :class="[
      `zx-audio--${size}`,
      {
        'is-disabled': disabled
      }
    ]"
  >
    <div
      class="zx-audio__preview"
      @click="handlePreview"
    >
      <audio
        v-if="src"
        :src="src"
        :controls="controls"
        :autoplay="autoplay"
        :loop="loop"
        :muted="muted"
        @error="handleError"
      />
      <div
        v-else
        class="zx-audio__placeholder"
      >
        <i class="zx-icon-sound" />
      </div>
    </div>
    <div
      v-if="showActions"
      class="zx-audio__actions"
    >
      <span
        class="zx-audio__action"
        @click="handlePreview"
      >
        <i class="zx-icon-zoom-in" />
      </span>
      <span
        class="zx-audio__action"
        @click="handleEdit"
      >
        <i class="zx-icon-edit" />
      </span>
      <span
        class="zx-audio__action"
        @click="handleCompress"
      >
        <i class="zx-icon-compress" />
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

type AudioSize = 'large' | 'default' | 'small'

interface Props {
  // 音频地址
  src?: string
  // 是否显示控制栏
  controls?: boolean
  // 是否自动播放
  autoplay?: boolean
  // 是否循环播放
  loop?: boolean
  // 是否静音播放
  muted?: boolean
  // 音频大小
  size?: AudioSize
  // 是否禁用
  disabled?: boolean
  // 是否显示操作按钮
  showActions?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  src: '',
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
.zx-audio {
  position: relative;
  display: inline-block;
  width: 300px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  overflow: hidden;
  background-color: #f5f7fa;

  &--large {
    width: 360px;
    height: 48px;
    line-height: 48px;
  }

  &--small {
    width: 240px;
    height: 32px;
    line-height: 32px;
  }

  &__preview {
    width: 100%;
    height: 100%;
    cursor: pointer;

    audio {
      width: 100%;
      height: 100%;
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

    .zx-audio__preview,
    .zx-audio__action {
      cursor: not-allowed;
    }
  }
}
</style> 