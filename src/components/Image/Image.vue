<template>
  <div
    class="zx-image"
    :class="[
      `zx-image--${size}`,
      {
        'is-disabled': disabled
      }
    ]"
  >
    <div
      class="zx-image__preview"
      @click="handlePreview"
    >
      <img
        v-if="src"
        :src="src"
        :alt="alt"
        @error="handleError"
      />
      <div
        v-else
        class="zx-image__placeholder"
      >
        <i class="zx-icon-picture" />
      </div>
    </div>
    <div
      v-if="showActions"
      class="zx-image__actions"
    >
      <span
        class="zx-image__action"
        @click="handlePreview"
      >
        <i class="zx-icon-zoom-in" />
      </span>
      <span
        class="zx-image__action"
        @click="handleCrop"
      >
        <i class="zx-icon-scissors" />
      </span>
      <span
        class="zx-image__action"
        @click="handleCompress"
      >
        <i class="zx-icon-compress" />
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps({
  // 图片地址
  src: {
    type: String,
    default: ''
  },
  // 图片大小
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
  // 图片加载失败时的替代文本
  alt: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['error', 'preview', 'crop', 'compress'])

// 处理预览
const handlePreview = () => {
  if (props.disabled) return
  emit('preview')
}

// 处理裁剪
const handleCrop = () => {
  if (props.disabled) return
  emit('crop')
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
.zx-image {
  position: relative;
  display: inline-block;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  overflow: hidden;
  background-color: #f5f7fa;

  &--large {
    width: 120px;
    height: 120px;
    line-height: 120px;
  }

  &--small {
    width: 80px;
    height: 80px;
    line-height: 80px;
  }

  &__preview {
    width: 100%;
    height: 100%;
    cursor: pointer;

    img {
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

    .zx-image__preview,
    .zx-image__action {
      cursor: not-allowed;
    }
  }
}
</style> 