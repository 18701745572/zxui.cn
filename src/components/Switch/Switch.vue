<template>
  <div 
    class="zx-switch" 
    :class="[
      `zx-switch--${size}`,
      { 'zx-switch--checked': modelValue },
      { 'zx-switch--disabled': disabled }
    ]"
    @click="handleClick"
  >
    <div class="zx-switch__core">
      <div class="zx-switch__button"></div>
    </div>
    <div v-if="$slots.default" class="zx-switch__label">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

type SwitchSize = 'small' | 'medium' | 'large'

interface SwitchProps {
  modelValue: boolean
  size: SwitchSize
  disabled: boolean
}

interface SwitchEmits {
  (e: 'update:modelValue', value: boolean): void
  (e: 'change', value: boolean): void
}

export default defineComponent({
  name: 'ZxSwitch',
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    size: {
      type: String as PropType<SwitchSize>,
      default: 'medium',
      validator: (value: string) => {
        return ['small', 'medium', 'large'].includes(value)
      }
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue', 'change'],
  setup(props: SwitchProps, { emit }: { emit: SwitchEmits }) {
    const handleClick = () => {
      if (props.disabled) return
      emit('update:modelValue', !props.modelValue)
      emit('change', !props.modelValue)
    }

    return {
      handleClick
    }
  }
})
</script>

<style lang="scss" scoped>
.zx-switch {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  user-select: none;

  // 尺寸
  &--small {
    .zx-switch__core {
      width: 32px;
      height: 16px;
    }

    .zx-switch__button {
      width: 12px;
      height: 12px;
    }

    .zx-switch__label {
      font-size: 14px;
    }
  }

  &--medium {
    .zx-switch__core {
      width: 40px;
      height: 20px;
    }

    .zx-switch__button {
      width: 16px;
      height: 16px;
    }

    .zx-switch__label {
      font-size: 16px;
    }
  }

  &--large {
    .zx-switch__core {
      width: 48px;
      height: 24px;
    }

    .zx-switch__button {
      width: 20px;
      height: 20px;
    }

    .zx-switch__label {
      font-size: 18px;
    }
  }

  // 核心
  &__core {
    position: relative;
    background-color: #dcdfe6;
    border-radius: 9999px;
    transition: all 0.3s;
  }

  &__button {
    position: absolute;
    top: 50%;
    left: 2px;
    transform: translateY(-50%);
    background-color: #fff;
    border-radius: 50%;
    transition: all 0.3s;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  // 标签
  &__label {
    color: #606266;
  }

  // 状态
  &--checked {
    .zx-switch__core {
      background-color: var(--zx-primary-color);
    }

    .zx-switch__button {
      transform: translate(calc(100% - 2px), -50%);
    }
  }

  &--disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
}
</style> 