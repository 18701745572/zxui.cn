<template>
  <label 
    class="zx-radio" 
    :class="[
      `zx-radio--${size}`,
      { 'zx-radio--checked': isChecked },
      { 'zx-radio--disabled': disabled }
    ]"
    @click="handleClick"
  >
    <span class="zx-radio__input">
      <span class="zx-radio__inner"></span>
    </span>
    <span v-if="$slots.default" class="zx-radio__label">
      <slot></slot>
    </span>
  </label>
</template>

<script lang="ts">
import { defineComponent, computed, inject, PropType } from 'vue'
import type { RadioGroupInstance } from '../../types/common'

type RadioSize = 'small' | 'medium' | 'large'
type RadioValue = string | number | boolean

interface RadioProps {
  modelValue: RadioValue
  label: RadioValue
  size: RadioSize
  disabled: boolean
}

interface RadioEmits {
  (e: 'update:modelValue', value: RadioValue): void
  (e: 'change', value: RadioValue): void
}

export default defineComponent({
  name: 'ZxRadio',
  props: {
    modelValue: {
      type: [String, Number, Boolean] as PropType<RadioValue>,
      default: ''
    },
    label: {
      type: [String, Number, Boolean] as PropType<RadioValue>,
      required: true
    },
    size: {
      type: String as PropType<RadioSize>,
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
  setup(props: RadioProps, { emit }: { emit: RadioEmits }) {
    const radioGroup = inject<RadioGroupInstance>('radioGroup', {} as RadioGroupInstance)

    const isChecked = computed(() => {
      if (radioGroup) {
        return radioGroup.modelValue === props.label
      }
      return props.modelValue === props.label
    })

    const handleClick = () => {
      if (props.disabled) return
      const value = props.label
      if (radioGroup) {
        radioGroup.updateModelValue(value)
      } else {
        emit('update:modelValue', value)
        emit('change', value)
      }
    }

    return {
      isChecked,
      handleClick
    }
  }
})
</script>

<style lang="scss" scoped>
.zx-radio {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  user-select: none;

  // 尺寸
  &--small {
    .zx-radio__input {
      width: 14px;
      height: 14px;
    }

    .zx-radio__inner {
      width: 6px;
      height: 6px;
    }

    .zx-radio__label {
      font-size: 14px;
    }
  }

  &--medium {
    .zx-radio__input {
      width: 16px;
      height: 16px;
    }

    .zx-radio__inner {
      width: 8px;
      height: 8px;
    }

    .zx-radio__label {
      font-size: 16px;
    }
  }

  &--large {
    .zx-radio__input {
      width: 18px;
      height: 18px;
    }

    .zx-radio__inner {
      width: 10px;
      height: 10px;
    }

    .zx-radio__label {
      font-size: 18px;
    }
  }

  // 输入框
  &__input {
    position: relative;
    border: 1px solid #dcdfe6;
    border-radius: 50%;
    transition: all 0.3s;
  }

  &__inner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0);
    background-color: var(--zx-primary-color);
    border-radius: 50%;
    transition: all 0.3s;
  }

  // 标签
  &__label {
    color: #606266;
  }

  // 状态
  &--checked {
    .zx-radio__input {
      border-color: var(--zx-primary-color);
    }

    .zx-radio__inner {
      transform: translate(-50%, -50%) scale(1);
    }
  }

  &--disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
}
</style> 