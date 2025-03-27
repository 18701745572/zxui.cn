<template>
  <span
    class="zx-tag"
    :class="[
      `zx-tag--${type}`,
      `zx-tag--${size}`,
      { 'zx-tag--light': light },
      { 'zx-tag--round': round },
      { 'zx-tag--closable': closable }
    ]"
  >
    <slot></slot>
    <i
      v-if="closable"
      class="zx-tag__close"
      @click="handleClose"
    >
      <svg viewBox="0 0 1024 1024" width="12" height="12">
        <path
          d="M512 456.727L284.364 229.091a31.418 31.418 0 00-44.364 0 31.418 31.418 0 000 44.364L467.636 501 240 728.636a31.418 31.418 0 000 44.364 31.418 31.418 0 0044.364 0L512 545.364l227.636 227.636a31.418 31.418 0 0044.364 0 31.418 31.418 0 000-44.364L556.364 501 784 273.364a31.418 31.418 0 000-44.364 31.418 31.418 0 00-44.364 0L512 456.727z"
          fill="currentColor"
        />
      </svg>
    </i>
  </span>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

type TagType = 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info'
type TagSize = 'small' | 'medium' | 'large'

interface TagProps {
  type: TagType
  size: TagSize
  light: boolean
  round: boolean
  closable: boolean
}

interface TagEmits {
  (e: 'close'): void
}

export default defineComponent({
  name: 'ZxTag',
  props: {
    type: {
      type: String as PropType<TagType>,
      default: 'default',
      validator: (value: string) => {
        return ['default', 'primary', 'success', 'warning', 'danger', 'info'].includes(value)
      }
    },
    size: {
      type: String as PropType<TagSize>,
      default: 'medium',
      validator: (value: string) => {
        return ['small', 'medium', 'large'].includes(value)
      }
    },
    light: {
      type: Boolean,
      default: false
    },
    round: {
      type: Boolean,
      default: false
    },
    closable: {
      type: Boolean,
      default: false
    }
  },
  emits: ['close'],
  setup(props: TagProps, { emit }: { emit: TagEmits }) {
    const handleClose = (e: MouseEvent) => {
      e.stopPropagation()
      emit('close')
    }
    return {
      handleClose
    }
  }
})
</script>

<style lang="scss" scoped>
.zx-tag {
  display: inline-flex;
  align-items: center;
  padding: 0 12px;
  font-size: 14px;
  line-height: 1.5;
  border-radius: 4px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: currentColor;
    opacity: 0.1;
    transition: opacity 0.3s ease;
  }

  // 尺寸
  &--small {
    height: 24px;
    font-size: 12px;
    padding: 0 8px;
  }

  &--medium {
    height: 32px;
    font-size: 14px;
    padding: 0 12px;
  }

  &--large {
    height: 40px;
    font-size: 16px;
    padding: 0 16px;
  }

  // 圆角
  &--round {
    border-radius: 16px;
  }

  // 可关闭
  &--closable {
    padding-right: 8px;
  }

  &__close {
    margin-left: 4px;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    transition: all 0.3s ease;

    &:hover {
      background: rgba(0, 0, 0, 0.1);
    }
  }

  // 主题样式
  &--default {
    color: #606266;
    background: rgba(96, 98, 102, 0.1);
  }

  &--primary {
    color: #409eff;
    background: rgba(64, 158, 255, 0.1);
  }

  &--success {
    color: #67c23a;
    background: rgba(103, 194, 58, 0.1);
  }

  &--warning {
    color: #e6a23c;
    background: rgba(230, 162, 60, 0.1);
  }

  &--danger {
    color: #f56c6c;
    background: rgba(245, 108, 108, 0.1);
  }

  &--info {
    color: #909399;
    background: rgba(144, 147, 153, 0.1);
  }

  // 浅色主题
  &--light {
    background: transparent;

    &::before {
      opacity: 0.05;
    }
  }
}
</style> 