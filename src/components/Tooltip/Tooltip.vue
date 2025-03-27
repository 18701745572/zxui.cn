<template>
  <div
    class="zx-tooltip"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <div
      ref="trigger"
      class="zx-tooltip__trigger"
    >
      <slot />
    </div>
    <div
      v-show="visible"
      ref="popper"
      class="zx-tooltip__popper"
      :class="[
        `zx-tooltip--${placement}`,
        `zx-tooltip--${effect}`
      ]"
      :style="popperStyle"
    >
      <slot name="content">
        {{ content }}
      </slot>
      <div
        class="zx-tooltip__arrow"
        :style="arrowStyle"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, watch, nextTick } from 'vue'
import { createPopper, Instance as PopperInstance } from '@popperjs/core'

type TooltipPlacement = 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end' | 'right' | 'right-start' | 'right-end'
type TooltipEffect = 'dark' | 'light'

interface Props {
  content: string
  placement?: TooltipPlacement
  enterDelay?: number
  leaveDelay?: number
  disabled?: boolean
  effect?: TooltipEffect
}

const props = withDefaults(defineProps<Props>(), {
  placement: 'top',
  enterDelay: 0,
  leaveDelay: 0,
  disabled: false,
  effect: 'dark'
})

interface Emits {
  (e: 'show'): void
  (e: 'hide'): void
}

const emit = defineEmits<Emits>()

const trigger = ref<HTMLElement>()
const popper = ref<HTMLElement>()
const visible = ref(false)
const popperInstance = ref<PopperInstance>()
const enterTimer = ref<number>()
const leaveTimer = ref<number>()

// 计算popper样式
const popperStyle = computed(() => {
  return {
    zIndex: 2000
  }
})

// 计算箭头样式
const arrowStyle = computed(() => ({
  position: 'absolute',
  width: '8px',
  height: '8px',
  background: 'inherit',
  visibility: 'hidden'
} as const))

// 处理鼠标进入
const handleMouseEnter = () => {
  if (props.disabled) return
  if (enterTimer.value) {
    clearTimeout(enterTimer.value)
  }
  enterTimer.value = window.setTimeout(() => {
    visible.value = true
    emit('show')
  }, props.enterDelay)
}

// 处理鼠标离开
const handleMouseLeave = () => {
  if (leaveTimer.value) {
    clearTimeout(leaveTimer.value)
  }
  leaveTimer.value = window.setTimeout(() => {
    visible.value = false
    emit('hide')
  }, props.leaveDelay)
}

// 创建popper实例
const createPopperInstance = () => {
  if (!trigger.value || !popper.value) return
  popperInstance.value = createPopper(trigger.value, popper.value, {
    placement: props.placement,
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 8]
        }
      }
    ]
  })
}

// 更新popper位置
const updatePopper = () => {
  if (popperInstance.value) {
    popperInstance.value.update()
  }
}

// 监听visible变化
watch(visible, (val: boolean) => {
  if (val) {
    nextTick(() => {
      createPopperInstance()
      updatePopper()
    })
  }
})

// 组件挂载时
onMounted(() => {
  if (visible.value) {
    createPopperInstance()
  }
})

// 组件卸载前
onBeforeUnmount(() => {
  if (enterTimer.value) {
    clearTimeout(enterTimer.value)
  }
  if (leaveTimer.value) {
    clearTimeout(leaveTimer.value)
  }
  if (popperInstance.value) {
    popperInstance.value.destroy()
  }
})
</script>

<style lang="scss" scoped>
.zx-tooltip {
  display: inline-block;
  position: relative;

  &__trigger {
    display: inline-block;
  }

  &__popper {
    position: absolute;
    padding: 8px 12px;
    border-radius: 4px;
    font-size: 14px;
    line-height: 1.4;
    word-break: break-all;
    z-index: 2000;

    &--dark {
      background-color: #303133;
      color: #fff;
    }

    &--light {
      background-color: #fff;
      color: #303133;
      border: 1px solid #dcdfe6;
    }
  }

  &__arrow {
    position: absolute;
    width: 8px;
    height: 8px;
    background: inherit;
    visibility: hidden;

    &::before {
      position: absolute;
      width: 8px;
      height: 8px;
      background: inherit;
      visibility: visible;
      content: '';
      transform: rotate(45deg);
    }
  }
}
</style> 