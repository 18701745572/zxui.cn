<template>
  <transition name="zx-message-fade">
    <div
      v-show="visible"
      class="zx-message"
      :class="[
        `zx-message--${type}`,
        `zx-message--${size}`,
        { 'zx-message--center': center },
        { 'zx-message--show-icon': showIcon },
        { 'zx-message--show-close': showClose }
      ]"
    >
      <i v-if="showIcon" class="zx-message__icon">
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
      <span class="zx-message__content">
        <slot></slot>
      </span>
      <i
        v-if="showClose"
        class="zx-message__close"
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
  </transition>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeUnmount, PropType } from 'vue'

type MessageType = 'success' | 'warning' | 'info' | 'error'
type MessageSize = 'small' | 'medium' | 'large'

export default defineComponent({
  name: 'ZxMessage',
  props: {
    type: {
      type: String as PropType<MessageType>,
      default: 'info',
      validator: (value: MessageType) => {
        return ['success', 'warning', 'info', 'error'].includes(value)
      }
    },
    size: {
      type: String as PropType<MessageSize>,
      default: 'medium',
      validator: (value: MessageSize) => {
        return ['small', 'medium', 'large'].includes(value)
      }
    },
    center: {
      type: Boolean,
      default: false
    },
    showIcon: {
      type: Boolean,
      default: true
    },
    showClose: {
      type: Boolean,
      default: false
    },
    duration: {
      type: Number,
      default: 3000
    }
  },
  emits: ['close'],
  setup(props: {
    type: MessageType
    size: MessageSize
    center: boolean
    showIcon: boolean
    showClose: boolean
    duration: number
  }, { emit }: { emit: (event: 'close') => void }) {
    const visible = ref(false)
    let timer: number | null = null

    const startTimer = () => {
      if (props.duration > 0) {
        timer = window.setTimeout(() => {
          visible.value = false
          emit('close')
        }, props.duration)
      }
    }

    const handleClose = () => {
      visible.value = false
      emit('close')
    }

    onMounted(() => {
      visible.value = true
      startTimer()
    })

    onBeforeUnmount(() => {
      if (timer) {
        clearTimeout(timer)
      }
    })

    return {
      visible,
      handleClose
    }
  }
})
</script>

<style lang="scss" scoped>
.zx-message {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  padding: 12px 24px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 9999;
  transition: all 0.3s ease;

  // 尺寸
  &--small {
    padding: 8px 16px;
    font-size: 12px;
  }

  &--large {
    padding: 16px 32px;
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
    line-height: 1.5;
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
    color: #67c23a;
    border: 1px solid rgba(103, 194, 58, 0.2);
  }

  &--warning {
    color: #e6a23c;
    border: 1px solid rgba(230, 162, 60, 0.2);
  }

  &--info {
    color: #909399;
    border: 1px solid rgba(144, 147, 153, 0.2);
  }

  &--error {
    color: #f56c6c;
    border: 1px solid rgba(245, 108, 108, 0.2);
  }
}

// 过渡动画
.zx-message-fade-enter-active,
.zx-message-fade-leave-active {
  transition: all 0.3s ease;
}

.zx-message-fade-enter-from,
.zx-message-fade-leave-to {
  opacity: 0;
  transform: translate(-50%, -20px);
}
</style> 