<template>
  <div
    class="zx-webview"
    :class="[
      `zx-webview--${size}`,
      {
        'is-disabled': disabled
      }
    ]"
  >
    <div
      class="zx-webview__preview"
      @click="handlePreview"
    >
      <iframe
        v-if="src"
        :src="src"
        :style="iframeStyle"
        @load="handleLoad"
        @error="handleError"
      />
      <div
        v-else
        class="zx-webview__placeholder"
      >
        <i class="zx-icon-globe" />
      </div>
    </div>
    <div
      v-if="showActions"
      class="zx-webview__actions"
    >
      <span
        class="zx-webview__action"
        @click="handlePreview"
      >
        <i class="zx-icon-zoom-in" />
      </span>
      <span
        class="zx-webview__action"
        @click="handleRefresh"
      >
        <i class="zx-icon-refresh" />
      </span>
      <span
        class="zx-webview__action"
        @click="handleOpen"
      >
        <i class="zx-icon-link" />
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps({
  // 网页地址
  src: {
    type: String,
    default: ''
  },
  // 网页大小
  size: {
    type: String,
    default: 'default',
    validator: (value: string) => {
      return ['large', 'default', 'small'].includes(value)
    }
  },
  // 是否禁用
  disabled: {
    type: Boolean,
    default: false
  },
  // 是否显示操作按钮
  showActions: {
    type: Boolean,
    default: true
  },
  // 是否允许全屏
  allowFullscreen: {
    type: Boolean,
    default: true
  },
  // 是否允许滚动
  allowScroll: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['load', 'error', 'preview', 'refresh', 'open'])

// 计算iframe样式
const iframeStyle = computed(() => {
  return {
    width: '100%',
    height: '100%',
    border: 'none',
    overflow: props.allowScroll ? 'auto' : 'hidden'
  }
})

// 处理预览
const handlePreview = () => {
  if (props.disabled) return
  emit('preview')
}

// 处理刷新
const handleRefresh = () => {
  if (props.disabled) return
  emit('refresh')
}

// 处理打开
const handleOpen = () => {
  if (props.disabled) return
  emit('open')
}

// 处理加载完成
const handleLoad = (e: Event) => {
  emit('load', e)
}

// 处理加载错误
const handleError = (e: Event) => {
  emit('error', e)
}
</script>

<style lang="scss" scoped>
.zx-webview {
  position: relative;
  display: inline-block;
  width: 400px;
  height: 300px;
  line-height: 300px;
  text-align: center;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  overflow: hidden;
  background-color: #f5f7fa;

  &--large {
    width: 480px;
    height: 360px;
    line-height: 360px;
  }

  &--small {
    width: 320px;
    height: 240px;
    line-height: 240px;
  }

  &__preview {
    width: 100%;
    height: 100%;
    cursor: pointer;
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

    .zx-webview__preview,
    .zx-webview__action {
      cursor: not-allowed;
    }
  }
}
</style> 