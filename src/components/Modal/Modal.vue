<template>
  <teleport to="body">
    <transition name="zx-modal-fade">
      <div
        v-show="visible"
        class="zx-modal"
        :class="[
          { 'zx-modal--center': center },
          { 'zx-modal--fullscreen': fullscreen }
        ]"
      >
        <div
          class="zx-modal__mask"
          :class="{ 'zx-modal__mask--blur': blur }"
          @click="handleMaskClick"
        ></div>
        <div
          class="zx-modal__container"
          :class="[
            `zx-modal__container--${size}`,
            { 'zx-modal__container--center': center }
          ]"
        >
          <div class="zx-modal__content">
            <!-- 头部 -->
            <div v-if="$slots.header || title" class="zx-modal__header">
              <slot name="header">
                <span class="zx-modal__title">{{ title }}</span>
              </slot>
              <i
                v-if="showClose"
                class="zx-modal__close"
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
            <div class="zx-modal__body">
              <slot></slot>
            </div>

            <!-- 底部 -->
            <div v-if="$slots.footer" class="zx-modal__footer">
              <slot name="footer"></slot>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script lang="ts">
import { type PropType, defineComponent, ref, watch, onMounted, onBeforeUnmount } from 'vue'

type ModalSize = 'small' | 'medium' | 'large' | 'full'

interface ModalProps {
  modelValue: boolean
  title: string
  width: string
  top: string
  modal: boolean
  appendToBody: boolean
  lockScroll: boolean
  customClass: string
  closeOnClickModal: boolean
  closeOnPressEscape: boolean
  showClose: boolean
  beforeClose: ((done: () => void) => void) | null
  size: ModalSize
  center: boolean
  fullscreen: boolean
  blur: boolean
  escClose: boolean
}

interface ModalEmits {
  (e: 'update:modelValue', value: boolean): void
  (e: 'close'): void
  (e: 'open'): void
}

interface ModalStyle {
  position: 'fixed'
  top: string
  right?: number
  bottom?: number
  left: string | number
  transform?: string
  backgroundColor: string
  borderRadius?: string
  boxShadow?: string
  zIndex: number
  display: string
}

export default defineComponent({
  name: 'ZxModal',
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: '50%'
    },
    top: {
      type: String,
      default: '15vh'
    },
    modal: {
      type: Boolean,
      default: true
    },
    appendToBody: {
      type: Boolean,
      default: false
    },
    lockScroll: {
      type: Boolean,
      default: true
    },
    customClass: {
      type: String,
      default: ''
    },
    closeOnClickModal: {
      type: Boolean,
      default: true
    },
    closeOnPressEscape: {
      type: Boolean,
      default: true
    },
    showClose: {
      type: Boolean,
      default: true
    },
    beforeClose: {
      type: Function as PropType<(done: () => void) => void>,
      default: null
    },
    size: {
      type: String as PropType<ModalSize>,
      default: 'medium',
      validator: (value: ModalSize) => {
        return ['small', 'medium', 'large', 'full'].includes(value)
      }
    },
    center: {
      type: Boolean,
      default: false
    },
    fullscreen: {
      type: Boolean,
      default: false
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
  setup(props: ModalProps, { emit }: { emit: ModalEmits }) {
    const visible = ref<boolean>(props.modelValue)
    const modalRef = ref<HTMLElement | null>(null)
    const modalMaskRef = ref<HTMLElement | null>(null)
    const modalWrapperRef = ref<HTMLElement | null>(null)
    const modalBodyRef = ref<HTMLElement | null>(null)
    const modalHeaderRef = ref<HTMLElement | null>(null)
    const modalFooterRef = ref<HTMLElement | null>(null)
    const modalCloseRef = ref<HTMLElement | null>(null)
    const modalTitleRef = ref<HTMLElement | null>(null)
    const modalContentRef = ref<HTMLElement | null>(null)
    const modalMaskStyle = ref<ModalStyle>({
      position: 'fixed',
      top: '0',
      right: 0,
      bottom: 0,
      left: 0,
      zIndex: 2000,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'none'
    })
    const modalStyle = ref<ModalStyle>({
      position: 'fixed',
      top: props.top,
      left: '50%',
      transform: 'translateX(-50%)',
      backgroundColor: '#fff',
      borderRadius: '4px',
      boxShadow: '0 2px 12px 0 rgba(0, 0, 0, 0.1)',
      zIndex: 2001,
      display: 'none'
    })
    const modalHeaderStyle = ref({
      padding: '20px',
      borderBottom: '1px solid #ebeef5',
      boxSizing: 'border-box',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    })
    const modalTitleStyle = ref({
      fontSize: '16px',
      fontWeight: 500,
      color: '#303133',
      margin: 0
    })
    const modalCloseStyle = ref({
      fontSize: '16px',
      color: '#909399',
      cursor: 'pointer',
      lineHeight: 1,
      padding: '0',
      border: '0',
      outline: 'none',
      background: 'transparent'
    })
    const modalBodyStyle = ref({
      padding: '20px',
      fontSize: '14px',
      lineHeight: 1.5,
      color: '#606266',
      boxSizing: 'border-box'
    })
    const modalFooterStyle = ref({
      padding: '20px',
      borderTop: '1px solid #ebeef5',
      boxSizing: 'border-box',
      textAlign: 'right'
    })
    const modalContentStyle = ref({
      position: 'relative',
      width: props.width,
      maxWidth: '90%'
    })

    watch(() => props.modelValue, (val: boolean) => {
      visible.value = val
      if (val) {
        emit('open')
      } else {
        emit('close')
      }
    })

    watch(visible, (val: boolean) => {
      emit('update:modelValue', val)
    })

    const handleClose = () => {
      if (props.beforeClose) {
        props.beforeClose(() => {
          visible.value = false
        })
      } else {
        visible.value = false
      }
    }

    const handleMaskClick = () => {
      if (props.closeOnClickModal) {
        handleClose()
      }
    }

    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && props.closeOnPressEscape) {
        handleClose()
      }
    }

    onMounted(() => {
      document.addEventListener('keydown', handleKeydown)
    })

    onBeforeUnmount(() => {
      document.removeEventListener('keydown', handleKeydown)
    })

    return {
      visible,
      modalRef,
      modalMaskRef,
      modalWrapperRef,
      modalBodyRef,
      modalHeaderRef,
      modalFooterRef,
      modalCloseRef,
      modalTitleRef,
      modalContentRef,
      modalMaskStyle,
      modalStyle,
      modalHeaderStyle,
      modalTitleStyle,
      modalCloseStyle,
      modalBodyStyle,
      modalFooterStyle,
      modalContentStyle,
      handleClose,
      handleMaskClick
    }
  }
})
</script>

<style lang="scss" scoped>
.zx-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;

  // 居中
  &--center {
    .zx-modal__container {
      margin: 0;
    }
  }

  // 全屏
  &--fullscreen {
    .zx-modal__container {
      width: 100%;
      height: 100%;
      max-width: none;
      margin: 0;
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
    position: relative;
    margin: 20px;
    max-width: 90%;
    max-height: 90vh;
    transition: all 0.3s ease;

    // 尺寸
    &--small {
      width: 400px;
    }

    &--medium {
      width: 600px;
    }

    &--large {
      width: 800px;
    }

    &--full {
      width: 90%;
      height: 90vh;
    }

    // 居中
    &--center {
      margin: 0;
    }
  }

  // 内容
  &__content {
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
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
.zx-modal-fade-enter-active,
.zx-modal-fade-leave-active {
  transition: all 0.3s ease;
}

.zx-modal-fade-enter-from,
.zx-modal-fade-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style> 