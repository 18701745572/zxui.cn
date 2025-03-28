<template>
  <label 
    class="zx-checkbox" 
    :class="[
      `zx-checkbox--${size}`,
      { 'zx-checkbox--checked': isChecked },
      { 'zx-checkbox--indeterminate': indeterminate },
      { 'zx-checkbox--disabled': disabled }
    ]"
    @click="handleClick"
  >
    <span class="zx-checkbox__input">
      <span class="zx-checkbox__inner"></span>
    </span>
    <span v-if="$slots.default" class="zx-checkbox__label">
      <slot></slot>
    </span>
  </label>
</template>

<script lang="ts">
import { defineComponent, computed, inject, PropType } from 'vue'
import type { CheckboxGroupInstance } from '../../types/common'

type CheckboxSize = 'small' | 'medium' | 'large'
type CheckboxLabel = string | number | boolean

interface CheckboxProps {
  modelValue: boolean
  label: CheckboxLabel
  size: CheckboxSize
  disabled: boolean
  indeterminate: boolean
}

interface CheckboxEmits {
  (e: 'update:modelValue', value: boolean): void
  (e: 'change', value: boolean): void
}

export default defineComponent({
  name: 'ZxCheckbox',
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    label: {
      type: [String, Number, Boolean] as PropType<CheckboxLabel>,
      default: ''
    },
    size: {
      type: String as PropType<CheckboxSize>,
      default: 'medium',
      validator: (value: CheckboxSize) => {
        return ['small', 'medium', 'large'].includes(value)
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    indeterminate: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue', 'change'],
  setup(props: CheckboxProps, { emit }: { emit: CheckboxEmits }) {
    const checkboxGroup = inject<CheckboxGroupInstance>('checkboxGroup', {} as CheckboxGroupInstance)

    const isChecked = computed(() => {
      if (checkboxGroup && checkboxGroup.modelValue) {
        return checkboxGroup.modelValue.includes(props.label)
      }
      return props.modelValue
    })

    const handleClick = () => {
      if (props.disabled) return
      if (checkboxGroup) {
        const value = props.label
        const index = checkboxGroup.modelValue.indexOf(value)
        if (index === -1) {
          checkboxGroup.modelValue.push(value)
        } else {
          checkboxGroup.modelValue.splice(index, 1)
        }
        checkboxGroup.updateModelValue(checkboxGroup.modelValue)
      } else {
        emit('update:modelValue', !props.modelValue)
        emit('change', !props.modelValue)
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
.zx-checkbox {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  user-select: none;

  // 尺寸
  &--small {
    .zx-checkbox__input {
      width: 14px;
      height: 14px;
    }

    .zx-checkbox__inner {
      width: 6px;
      height: 6px;
    }

    .zx-checkbox__label {
      font-size: 14px;
    }
  }

  &--medium {
    .zx-checkbox__input {
      width: 16px;
      height: 16px;
    }

    .zx-checkbox__inner {
      width: 8px;
      height: 8px;
    }

    .zx-checkbox__label {
      font-size: 16px;
    }
  }

  &--large {
    .zx-checkbox__input {
      width: 18px;
      height: 18px;
    }

    .zx-checkbox__inner {
      width: 10px;
      height: 10px;
    }

    .zx-checkbox__label {
      font-size: 18px;
    }
  }

  // 输入框
  &__input {
    position: relative;
    border: 1px solid #dcdfe6;
    border-radius: 2px;
    transition: all 0.3s;
  }

  &__inner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0);
    background-color: var(--zx-primary-color);
    border-radius: 2px;
    transition: all 0.3s;
  }

  // 标签
  &__label {
    color: #606266;
  }

  // 状态
  &--checked {
    .zx-checkbox__input {
      border-color: var(--zx-primary-color);
    }

    .zx-checkbox__inner {
      transform: translate(-50%, -50%) scale(1);
    }
  }

  &--indeterminate {
    .zx-checkbox__input {
      border-color: var(--zx-primary-color);
    }

    .zx-checkbox__inner {
      transform: translate(-50%, -50%) scale(0.5);
    }
  }

  &--disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
}
</style> 