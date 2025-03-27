<template>
  <div 
    class="zx-radio-group" 
    :class="[
      `zx-radio-group--${size}`,
      { 'zx-radio-group--vertical': vertical }
    ]"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, provide, PropType } from 'vue'

type RadioGroupSize = 'small' | 'medium' | 'large'
type RadioGroupValue = string | number | boolean

interface RadioGroupProps {
  modelValue: RadioGroupValue
  size: RadioGroupSize
  disabled: boolean
  vertical: boolean
}

interface RadioGroupEmits {
  (e: 'update:modelValue', value: RadioGroupValue): void
  (e: 'change', value: RadioGroupValue): void
}

interface RadioGroupContext {
  modelValue: RadioGroupValue
  disabled: boolean
  updateModelValue: (value: RadioGroupValue) => void
}

export default defineComponent({
  name: 'ZxRadioGroup',
  props: {
    modelValue: {
      type: [String, Number, Boolean] as PropType<RadioGroupValue>,
      default: ''
    },
    size: {
      type: String as PropType<RadioGroupSize>,
      default: 'medium',
      validator: (value: string) => {
        return ['small', 'medium', 'large'].includes(value)
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    vertical: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue', 'change'],
  setup(props: RadioGroupProps, { emit }: { emit: RadioGroupEmits }) {
    const updateModelValue = (value: RadioGroupValue) => {
      emit('update:modelValue', value)
      emit('change', value)
    }

    provide('radioGroup', {
      modelValue: props.modelValue,
      disabled: props.disabled,
      updateModelValue
    } as RadioGroupContext)

    return {}
  }
})
</script>

<style lang="scss" scoped>
.zx-radio-group {
  display: inline-flex;
  gap: 16px;

  // 尺寸
  &--small {
    gap: 12px;
  }

  &--large {
    gap: 20px;
  }

  // 垂直布局
  &--vertical {
    flex-direction: column;
    gap: 12px;
  }
}
</style> 