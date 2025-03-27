<template>
  <div
    class="zx-powerpoint"
    :class="[
      `zx-powerpoint--${size}`,
      {
        'is-disabled': disabled
      }
    ]"
  >
    <div
      class="zx-powerpoint__preview"
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
        class="zx-powerpoint__placeholder"
      >
        <i class="zx-icon-file-ppt" />
      </div>
    </div>
    <div
      v-if="showActions"
      class="zx-powerpoint__actions"
    >
      <span
        class="zx-powerpoint__action"
        @click="handlePreview"
      >
        <i class="zx-icon-zoom-in" />
      </span>
      <span
        class="zx-powerpoint__action"
        @click="handleEdit"
      >
        <i class="zx-icon-edit" />
      </span>
      <span
        class="zx-powerpoint__action"
        @click="handleDownload"
      >
        <i class="zx-icon-download" />
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

type PowerPointSize = 'large' | 'default' | 'small'

interface Props {
  // PowerPoint地址
  src?: string
  // PowerPoint大小
  size?: PowerPointSize
  // 是否禁用
  disabled?: boolean
  // 是否显示操作按钮
  showActions?: boolean
  // 是否允许全屏
  allowFullscreen?: boolean
  // 是否允许滚动
  allowScroll?: boolean
  // 是否允许编辑
  allowEdit?: boolean
  // 是否允许下载
  allowDownload?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  src: '',
  size: 'default',
  disabled: false,
  showActions: true,
  allowFullscreen: true,
  allowScroll: true,
  allowEdit: true,
  allowDownload: true
})

interface Emits {
  (e: 'load', event: Event): void
  (e: 'error', event: Event): void
  (e: 'preview'): void
  (e: 'edit'): void
  (e: 'download'): void
}

const emit = defineEmits<Emits>()

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

// 处理编辑
const handleEdit = () => {
  if (props.disabled || !props.allowEdit) return
  emit('edit')
}

// 处理下载
const handleDownload = () => {
  if (props.disabled || !props.allowDownload) return
  emit('download')
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
.zx-powerpoint {
  position: relative;
  display: inline-block;
  width: 400px;
  height: 500px;
  line-height: 500px;
  text-align: center;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  overflow: hidden;
  background-color: #f5f7fa;

  &--large {
    width: 480px;
    height: 600px;
    line-height: 600px;
  }

  &--small {
    width: 320px;
    height: 400px;
    line-height: 400px;
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

    .zx-powerpoint__preview,
    .zx-powerpoint__action {
      cursor: not-allowed;
    }
  }
}
</style> 