<template>
  <div
    :class="[
      'zx-input',
      `zx-input--${size}`,
      {
        'is-disabled': disabled,
        'is-clearable': clearable && modelValue
      }
    ]"
    @mouseenter="hovering = true"
    @mouseleave="hovering = false"
  >
    <div class="zx-input__wrapper">
      <span v-if="prefixIcon" class="zx-input__prefix-icon">
        <i :class="prefixIcon"></i>
      </span>
      
      <input
        ref="input"
        :value="modelValue"
        :type="type"
        :disabled="disabled"
        :placeholder="placeholder"
        class="zx-input__inner"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
      >

      <span
        v-if="clearable && modelValue && hovering"
        class="zx-input__clear"
        @click="clear"
      >
        ×
      </span>
      
      <span v-if="suffixIcon" class="zx-input__suffix-icon">
        <i :class="suffixIcon"></i>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, PropType } from 'vue'

type InputSize = 'small' | 'medium' | 'large'
type InputType = 'text' | 'password' | 'number' | 'email' | 'tel' | 'url'

defineOptions({
  name: 'ZxInput'
})

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  placeholder: String,
  disabled: {
    type: Boolean,
    default: false
  },
  clearable: {
    type: Boolean,
    default: false
  },
  prefixIcon: String,
  suffixIcon: String,
  size: {
    type: String as PropType<InputSize>,
    default: 'medium',
    validator: (value: InputSize) => ['small', 'medium', 'large'].includes(value)
  },
  type: {
    type: String as PropType<InputType>,
    default: 'text',
    validator: (value: InputType) => ['text', 'password', 'number', 'email', 'tel', 'url'].includes(value)
  }
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'input': [value: string]
  'change': [value: string]
  'focus': [event: FocusEvent]
  'blur': [event: FocusEvent]
  'clear': []
}>()

const hovering = ref(false)
const input = ref<HTMLInputElement>()

const handleInput = (event: Event) => {
  const value = (event.target as HTMLInputElement).value
  emit('update:modelValue', value)
  emit('input', value)
}

const handleFocus = (event: FocusEvent) => {
  emit('focus', event)
}

const handleBlur = (event: FocusEvent) => {
  emit('blur', event)
  emit('change', (event.target as HTMLInputElement).value)
}

const clear = () => {
  emit('update:modelValue', '')
  emit('clear')
  input.value?.focus()
}
</script>

<style lang="scss">
.zx-input {
  position: relative;
  width: 100%;
  display: inline-flex;

  &__wrapper {
    display: flex;
    align-items: center;
    width: 100%;
    background-color: var(--z-bg-color);
    border: 1px solid var(--z-border-color);
    border-radius: var(--z-border-radius-base);
    transition: all 0.3s;
    
    &:hover {
      border-color: var(--z-border-color-light);
    }
    
    &:focus-within {
      border-color: var(--z-primary-color);
    }
  }

  &__inner {
    width: 100%;
    border: none;
    outline: none;
    background: none;
    padding: 0 12px;
    color: var(--z-text-color-primary);
    
    &::placeholder {
      color: var(--z-text-color-placeholder);
    }
  }

  &__prefix-icon,
  &__suffix-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 32px;
    color: var(--z-text-color-placeholder);
  }

  &__clear {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 32px;
    cursor: pointer;
    color: var(--z-text-color-placeholder);
    
    &:hover {
      color: var(--z-text-color-secondary);
    }
  }

  // 尺寸
  &--small {
    font-size: var(--z-font-size-small);
    .zx-input__wrapper {
      height: 32px;
    }
  }

  &--medium {
    font-size: var(--z-font-size-base);
    .zx-input__wrapper {
      height: 36px;
    }
  }

  &--large {
    font-size: var(--z-font-size-large);
    .zx-input__wrapper {
      height: 40px;
    }
  }

  &.is-disabled {
    .zx-input__wrapper {
      background-color: var(--z-bg-color-page);
      border-color: var(--z-border-color-light);
      cursor: not-allowed;
    }
    
    .zx-input__inner {
      cursor: not-allowed;
      color: var(--z-text-color-placeholder);
    }
  }
}
</style>