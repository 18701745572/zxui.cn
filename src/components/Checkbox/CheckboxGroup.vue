<template>
  <div 
    class="zx-checkbox-group" 
    :class="[
      `zx-checkbox-group--${size}`,
      { 'zx-checkbox-group--vertical': vertical }
    ]"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, provide, ref, PropType } from 'vue'

type CheckboxGroupSize = 'small' | 'medium' | 'large'
type CheckboxGroupValue = (string | number | boolean)[]

interface CheckboxGroupProps {
  modelValue: CheckboxGroupValue
  size: CheckboxGroupSize
  disabled: boolean
  vertical: boolean
}

interface CheckboxGroupEmits {
  (e: 'update:modelValue', value: CheckboxGroupValue): void
  (e: 'change', value: CheckboxGroupValue): void
}

export default defineComponent({
  name: 'ZxCheckboxGroup',
  props: {
    modelValue: {
      type: Array as PropType<CheckboxGroupValue>,
      default: () => []
    },
    size: {
      type: String as PropType<CheckboxGroupSize>,
      default: 'medium',
      validator: (value: CheckboxGroupSize) => {
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
  setup(props: CheckboxGroupProps, { emit }: { emit: CheckboxGroupEmits }) {
    const modelValue = ref<CheckboxGroupValue>(props.modelValue)

    const updateModelValue = (value: CheckboxGroupValue) => {
      modelValue.value = value
      emit('update:modelValue', value)
      emit('change', value)
    }

    provide('checkboxGroup', {
      modelValue,
      disabled: props.disabled,
      updateModelValue
    })

    return {}
  }
})
</script>

<style lang="scss" scoped>
.zx-checkbox-group {
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