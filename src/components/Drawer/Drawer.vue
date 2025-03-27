<template>
  <teleport to="body">
    <transition name="zx-drawer-fade">
      <div
        v-show="visible"
        class="zx-drawer"
        :class="[
          `zx-drawer--${direction}`,
          { 'zx-drawer--fullscreen': fullscreen }
        ]"
      >
        <div
          class="zx-drawer__mask"
          :class="{ 'zx-drawer__mask--blur': blur }"
          @click="handleMaskClick"
        ></div>
        <div
          class="zx-drawer__container"
          :class="[
            `zx-drawer__container--${size}`,
            { 'zx-drawer__container--fullscreen': fullscreen }
          ]"
        >
          <div class="zx-drawer__content">
            <!-- 头部 -->
            <div v-if="$slots.header || title" class="zx-drawer__header">
              <slot name="header">
                <span class="zx-drawer__title">{{ title }}</span>
              </slot>
              <i
                v-if="showClose"
                class="zx-drawer__close"
                @click="handleClose"
              >
                <svg viewBox="0 0 1024 1024" width="16" height="16">
                  <path
                    d="M512 456.727L284.364 229.091a31.418 31.418 0 00-44.364 0 31.418 31.418 0 000 44.364L467.636 501 240 728.636a31.418 31.418 0 000 44.364 31.418 31.418 0 0044.364 0L512 545.364l227.636 227.636a31.418 31.418 0 0044.364 0 31.418 31.418 0 000-44.364L556.364 501 784 273.364a31.418 31.418 0 000-44.364 31.418 31.418 0 00-44.364 0L512 456.727z"
                    fill="currentColor"
                  />
                </svg>
              </i>
            </div>

            <!-- 内容 -->
            <div class="zx-drawer__body">
              <slot></slot>
            </div>

            <!-- 底部 -->
            <div v-if="$slots.footer" class="zx-drawer__footer">
              <slot name="footer"></slot>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, ref, watch, onMounted, onBeforeUnmount, PropType } from 'vue'

type DrawerDirection = 'left' | 'right' | 'top' | 'bottom'
type DrawerSize = 'small' | 'medium' | 'large' | 'full'

interface DrawerProps {
  modelValue: boolean
  title: string
  direction: DrawerDirection
  size: DrawerSize
  fullscreen: boolean
  showClose: boolean
  closeOnClickMask: boolean
  blur: boolean
  escClose: boolean
}

interface DrawerEmits {
  (e: 'update:modelValue', value: boolean): void
  (e: 'close'): void
  (e: 'open'): void
}

export default defineComponent({
  name: 'ZxDrawer',
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    direction: {
      type: String as PropType<DrawerDirection>,
      default: 'right',
      validator: (value: DrawerDirection) => {
        return ['left', 'right', 'top', 'bottom'].includes(value)
      }
    },
    size: {
      type: String as PropType<DrawerSize>,
      default: 'medium',
      validator: (value: DrawerSize) => {
        return ['small', 'medium', 'large', 'full'].includes(value)
      }
    },
    fullscreen: {
      type: Boolean,
      default: false
    },
    showClose: {
      type: Boolean,
      default: true
    },
    closeOnClickMask: {
      type: Boolean,
      default: true
    },
    blur: {
      type: Boolean,
      default: false
    },
    escClose: {
      type: Boolean,
      default: true
    }
  },
  emits: ['update:modelValue', 'close', 'open'],
  setup(props: DrawerProps, { emit }: { emit: DrawerEmits }) {
    const visible = ref(false)

    const handleClose = () => {
      visible.value = false
      emit('update:modelValue', false)
      emit('close')
    }

    const handleOpen = () => {
      visible.value = true
      emit('update:modelValue', true)
      emit('open')
    }

    const handleMaskClick = () => {
      if (props.closeOnClickMask) {
        handleClose()
      }
    }

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && props.escClose) {
        handleClose()
      }
    }

    watch(() => props.modelValue, (val: boolean) => {
      if (val) {
        handleOpen()
      } else {
        handleClose()
      }
    })

    onMounted(() => {
      if (props.modelValue) {
        handleOpen()
      }
      document.addEventListener('keydown', handleEsc)
    })

    onBeforeUnmount(() => {
      document.removeEventListener('keydown', handleEsc)
    })

    return {
      visible,
      handleClose,
      handleMaskClick
    }
  }
})
</script>

<style lang="scss" scoped>
.zx-drawer {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;

  // 方向
  &--left {
    .zx-drawer__container {
      left: 0;
      right: auto;
      transform: translateX(-100%);
    }

    &.zx-drawer-fade-enter-active .zx-drawer__container,
    &.zx-drawer-fade-leave-active .zx-drawer__container {
      transform: translateX(0);
    }
  }

  &--right {
    .zx-drawer__container {
      right: 0;
      left: auto;
      transform: translateX(100%);
    }

    &.zx-drawer-fade-enter-active .zx-drawer__container,
    &.zx-drawer-fade-leave-active .zx-drawer__container {
      transform: translateX(0);
    }
  }

  &--top {
    .zx-drawer__container {
      top: 0;
      bottom: auto;
      transform: translateY(-100%);
    }

    &.zx-drawer-fade-enter-active .zx-drawer__container,
    &.zx-drawer-fade-leave-active .zx-drawer__container {
      transform: translateY(0);
    }
  }

  &--bottom {
    .zx-drawer__container {
      bottom: 0;
      top: auto;
      transform: translateY(100%);
    }

    &.zx-drawer-fade-enter-active .zx-drawer__container,
    &.zx-drawer-fade-leave-active .zx-drawer__container {
      transform: translateY(0);
    }
  }

  // 全屏
  &--fullscreen {
    .zx-drawer__container {
      width: 100%;
      height: 100%;
      max-width: none;
    }
  }

  // 遮罩层
  &__mask {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(0);
    transition: all 0.3s ease;

    &--blur {
      backdrop-filter: blur(4px);
    }
  }

  // 容器
  &__container {
    position: fixed;
    background: #fff;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    transition: all 0.3s ease;

    // 尺寸
    &--small {
      width: 300px;
      height: 100%;
    }

    &--medium {
      width: 500px;
      height: 100%;
    }

    &--large {
      width: 800px;
      height: 100%;
    }

    &--full {
      width: 100%;
      height: 100%;
    }

    // 全屏
    &--fullscreen {
      width: 100%;
      height: 100%;
      max-width: none;
    }
  }

  // 内容
  &__content {
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: hidden;
  }

  // 头部
  &__header {
    padding: 16px 20px;
    border-bottom: 1px solid #f0f0f0;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__title {
    font-size: 16px;
    font-weight: 500;
    color: #303133;
  }

  // 关闭按钮
  &__close {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    transition: all 0.3s ease;
    color: #909399;

    &:hover {
      background: #f5f7fa;
      color: #409eff;
    }
  }

  // 内容区
  &__body {
    padding: 20px;
    flex: 1;
    overflow: auto;
  }

  // 底部
  &__footer {
    padding: 16px 20px;
    border-top: 1px solid #f0f0f0;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
}

// 过渡动画
.zx-drawer-fade-enter-active,
.zx-drawer-fade-leave-active {
  transition: all 0.3s ease;
}

.zx-drawer-fade-enter-from,
.zx-drawer-fade-leave-to {
  opacity: 0;
}
</style> 