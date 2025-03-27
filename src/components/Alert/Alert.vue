<template>
  <div
    class="zx-alert"
    :class="[
      `zx-alert--${type}`,
      `zx-alert--${size}`,
      { 'zx-alert--light': light },
      { 'zx-alert--center': center },
      { 'zx-alert--show-icon': showIcon },
      { 'zx-alert--closable': closable }
    ]"
  >
    <i v-if="showIcon" class="zx-alert__icon">
      <svg v-if="type === 'success'" viewBox="0 0 1024 1024" width="16" height="16">
        <path
          d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 01-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z"
          fill="currentColor"
        />
      </svg>
      <svg v-else-if="type === 'warning'" viewBox="0 0 1024 1024" width="16" height="16">
        <path
          d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48z"
          fill="currentColor"
        />
      </svg>
      <svg v-else-if="type === 'info'" viewBox="0 0 1024 1024" width="16" height="16">
        <path
          d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm32 664c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V456c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272zm-32-344c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48z"
          fill="currentColor"
        />
      </svg>
      <svg v-else viewBox="0 0 1024 1024" width="16" height="16">
        <path
          d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48z"
          fill="currentColor"
        />
      </svg>
    </i>
    <div class="zx-alert__content">
      <span v-if="title" class="zx-alert__title">{{ title }}</span>
      <span class="zx-alert__description">
        <slot></slot>
      </span>
    </div>
    <i
      v-if="closable"
      class="zx-alert__close"
      @click="handleClose"
    >
      <svg viewBox="0 0 1024 1024" width="12" height="12">
        <path
          d="M512 456.727L284.364 229.091a31.418 31.418 0 00-44.364 0 31.418 31.418 0 000 44.364L467.636 501 240 728.636a31.418 31.418 0 000 44.364 31.418 31.418 0 0044.364 0L512 545.364l227.636 227.636a31.418 31.418 0 0044.364 0 31.418 31.418 0 000-44.364L556.364 501 784 273.364a31.418 31.418 0 000-44.364 31.418 31.418 0 00-44.364 0L512 456.727z"
          fill="currentColor"
        />
      </svg>
    </i>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

type AlertType = 'success' | 'warning' | 'info' | 'error'
type AlertSize = 'small' | 'medium' | 'large'

interface AlertProps {
  title: string
  type: AlertType
  size: AlertSize
  light: boolean
  center: boolean
  showIcon: boolean
  closable: boolean
}

interface AlertEmits {
  (e: 'close'): void
}

export default defineComponent({
  name: 'ZxAlert',
  props: {
    title: {
      type: String,
      default: ''
    },
    type: {
      type: String as PropType<AlertType>,
      default: 'info',
      validator: (value: AlertType) => {
        return ['success', 'warning', 'info', 'error'].includes(value)
      }
    },
    size: {
      type: String as PropType<AlertSize>,
      default: 'medium',
      validator: (value: AlertSize) => {
        return ['small', 'medium', 'large'].includes(value)
      }
    },
    light: {
      type: Boolean,
      default: false
    },
    center: {
      type: Boolean,
      default: false
    },
    showIcon: {
      type: Boolean,
      default: true
    },
    closable: {
      type: Boolean,
      default: false
    }
  },
  emits: ['close'],
  setup(props: AlertProps, { emit }: { emit: AlertEmits }) {
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
.zx-alert {
  position: relative;
  padding: 12px 16px;
  border-radius: 8px;
  display: flex;
  align-items: flex-start;
  transition: all 0.3s ease;

  // 尺寸
  &--small {
    padding: 8px 12px;
    font-size: 12px;
  }

  &--large {
    padding: 16px 20px;
    font-size: 16px;
  }

  // 居中
  &--center {
    justify-content: center;
    text-align: center;
  }

  // 图标
  &__icon {
    margin-right: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  // 内容
  &__content {
    flex: 1;
    line-height: 1.5;
  }

  &__title {
    display: block;
    font-weight: 500;
    margin-bottom: 4px;
  }

  &__description {
    display: block;
  }

  // 关闭按钮
  &__close {
    margin-left: 8px;
    cursor: pointer;
    display: flex;
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
  &--success {
    background: rgba(103, 194, 58, 0.1);
    border: 1px solid rgba(103, 194, 58, 0.2);
    color: #67c23a;

    &.zx-alert--light {
      background: #f0f9eb;
    }
  }

  &--warning {
    background: rgba(230, 162, 60, 0.1);
    border: 1px solid rgba(230, 162, 60, 0.2);
    color: #e6a23c;

    &.zx-alert--light {
      background: #fdf6ec;
    }
  }

  &--info {
    background: rgba(144, 147, 153, 0.1);
    border: 1px solid rgba(144, 147, 153, 0.2);
    color: #909399;

    &.zx-alert--light {
      background: #f4f4f5;
    }
  }

  &--error {
    background: rgba(245, 108, 108, 0.1);
    border: 1px solid rgba(245, 108, 108, 0.2);
    color: #f56c6c;

    &.zx-alert--light {
      background: #fef0f0;
    }
  }
}
</style> 