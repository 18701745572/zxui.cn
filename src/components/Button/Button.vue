<template>
  <button
    :class="[
      'z-button',
      `z-button--${type}`,
      `z-button--${size}`,
      { 'is-disabled': disabled }
    ]"
    :disabled="disabled"
    @click="handleClick"
  >
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

type ButtonType = 'primary' | 'success' | 'warning' | 'danger'
type ButtonSize = 'small' | 'medium' | 'large'

interface ButtonProps {
  type: ButtonType
  size: ButtonSize
  disabled: boolean
}

interface ButtonEmits {
  (e: 'click', event: Event): void
}

export default defineComponent({
  name: 'ZxButton',
  props: {
    type: {
      type: String as PropType<ButtonType>,
      default: 'primary'
    },
    size: {
      type: String as PropType<ButtonSize>,
      default: 'medium'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: ['click'],
  setup(props: ButtonProps, { emit }: { emit: ButtonEmits }) {
    const handleClick = (e: Event) => {
      if (!props.disabled) {
        emit('click', e)
      }
    }

    return {
      handleClick
    }
  }
})
</script>

<style lang="scss" scoped>
.z-button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  color: #fff;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  transition: 0.1s;
  font-weight: 500;
  padding: 8px 15px;
  font-size: 14px;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  background-color: #fff;
  color: #606266;

  &:hover,
  &:focus {
    color: #409eff;
    border-color: #c6e2ff;
    background-color: #ecf5ff;
  }

  &:active {
    color: #3a8ee6;
    border-color: #3a8ee6;
    outline: none;
  }

  &.is-disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  &--primary {
    color: #fff;
    background-color: #409eff;
    border-color: #409eff;

    &:hover,
    &:focus {
      background: #66b1ff;
      border-color: #66b1ff;
      color: #fff;
    }

    &:active {
      background: #3a8ee6;
      border-color: #3a8ee6;
      color: #fff;
    }
  }

  &--success {
    color: #fff;
    background-color: #67c23a;
    border-color: #67c23a;

    &:hover,
    &:focus {
      background: #85ce61;
      border-color: #85ce61;
      color: #fff;
    }

    &:active {
      background: #5daf34;
      border-color: #5daf34;
      color: #fff;
    }
  }

  &--warning {
    color: #fff;
    background-color: #e6a23c;
    border-color: #e6a23c;

    &:hover,
    &:focus {
      background: #ebb563;
      border-color: #ebb563;
      color: #fff;
    }

    &:active {
      background: #cf9236;
      border-color: #cf9236;
      color: #fff;
    }
  }

  &--danger {
    color: #fff;
    background-color: #f56c6c;
    border-color: #f56c6c;

    &:hover,
    &:focus {
      background: #f78989;
      border-color: #f78989;
      color: #fff;
    }

    &:active {
      background: #dd6161;
      border-color: #dd6161;
      color: #fff;
    }
  }

  &--small {
    padding: 5px 11px;
    font-size: 12px;
  }

  &--large {
    padding: 12px 19px;
    font-size: 14px;
  }
}
</style>