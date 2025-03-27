<template>
  <div
    class="zx-input-number"
    :class="[
      `zx-input-number--${size}`,
      {
        'is-disabled': disabled,
        'is-controls-right': controlsPosition === 'right'
      }
    ]"
  >
    <span
      v-if="controlsPosition !== 'right'"
      class="zx-input-number__decrease"
      :class="{ 'is-disabled': minDisabled }"
      @click="handleDecrease"
    >
      <i class="zx-icon-minus" />
    </span>
    <span
      v-if="controlsPosition === 'right'"
      class="zx-input-number__decrease"
      :class="{ 'is-disabled': minDisabled }"
      @click="handleDecrease"
    >
      <i class="zx-icon-minus" />
    </span>
    <input
      ref="input"
      class="zx-input-number__input"
      :value="displayValue"
      :disabled="disabled"
      :readonly="disabledInput"
      @input="handleInput"
      @change="handleChange"
      @blur="handleBlur"
      @focus="handleFocus"
    />
    <span
      v-if="controlsPosition !== 'right'"
      class="zx-input-number__increase"
      :class="{ 'is-disabled': maxDisabled }"
      @click="handleIncrease"
    >
      <i class="zx-icon-plus" />
    </span>
    <span
      v-if="controlsPosition === 'right'"
      class="zx-input-number__increase"
      :class="{ 'is-disabled': maxDisabled }"
      @click="handleIncrease"
    >
      <i class="zx-icon-plus" />
    </span>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, PropType } from 'vue'

type InputNumberSize = 'large' | 'default' | 'small'
type InputNumberControlsPosition = '' | 'right'

interface InputNumberProps {
  modelValue: number | string
  min: number
  max: number
  step: number
  precision: number
  disabled: boolean
  disabledInput: boolean
  size: InputNumberSize
  controlsPosition: InputNumberControlsPosition
}

interface InputNumberEmits {
  (e: 'update:modelValue', value: number | string): void
  (e: 'change', value: number): void
  (e: 'blur', event: FocusEvent): void
  (e: 'focus', event: FocusEvent): void
}

const props = defineProps({
  modelValue: {
    type: [Number, String],
    default: 0
  },
  min: {
    type: Number,
    default: -Infinity
  },
  max: {
    type: Number,
    default: Infinity
  },
  step: {
    type: Number,
    default: 1
  },
  precision: {
    type: Number,
    default: 0
  },
  disabled: {
    type: Boolean,
    default: false
  },
  disabledInput: {
    type: Boolean,
    default: false
  },
  size: {
    type: String as PropType<InputNumberSize>,
    default: 'default',
    validator: (value: InputNumberSize) => {
      return ['large', 'default', 'small'].includes(value)
    }
  },
  controlsPosition: {
    type: String as PropType<InputNumberControlsPosition>,
    default: '',
    validator: (value: InputNumberControlsPosition) => {
      return ['', 'right'].includes(value)
    }
  }
})

const emit = defineEmits<{
  'update:modelValue': [value: number | string]
  'change': [value: number]
  'blur': [event: FocusEvent]
  'focus': [event: FocusEvent]
}>()

const input = ref<HTMLInputElement>()

const displayValue = computed(() => {
  return props.modelValue
})

const minDisabled = computed(() => {
  return props.disabled || Number(props.modelValue) <= props.min
})

const maxDisabled = computed(() => {
  return props.disabled || Number(props.modelValue) >= props.max
})

const handleInput = (event: Event) => {
  const value = (event.target as HTMLInputElement).value
  emit('update:modelValue', value)
}

const handleChange = (event: Event) => {
  const value = (event.target as HTMLInputElement).value
  const numValue = Number(value)
  if (isNaN(numValue)) {
    emit('update:modelValue', props.modelValue)
    return
  }
  let newValue = numValue
  if (newValue > props.max) {
    newValue = props.max
  }
  if (newValue < props.min) {
    newValue = props.min
  }
  if (props.precision > 0) {
    newValue = Number(newValue.toFixed(props.precision))
  }
  emit('update:modelValue', newValue)
  emit('change', newValue)
}

const handleDecrease = () => {
  if (minDisabled.value) return
  const newValue = Number(props.modelValue) - props.step
  if (newValue < props.min) {
    emit('update:modelValue', props.min)
    emit('change', props.min)
  } else {
    emit('update:modelValue', newValue)
    emit('change', newValue)
  }
}

const handleIncrease = () => {
  if (maxDisabled.value) return
  const newValue = Number(props.modelValue) + props.step
  if (newValue > props.max) {
    emit('update:modelValue', props.max)
    emit('change', props.max)
  } else {
    emit('update:modelValue', newValue)
    emit('change', newValue)
  }
}

const handleBlur = (event: FocusEvent) => {
  emit('blur', event)
}

const handleFocus = (event: FocusEvent) => {
  emit('focus', event)
}

watch(() => props.modelValue, (newValue: number | string) => {
  if (newValue === undefined || newValue === '') {
    emit('update:modelValue', 0)
  }
})
</script>

<style lang="scss" scoped>
.zx-input-number {
  position: relative;
  display: inline-block;
  width: 180px;
  line-height: 32px;

  &--large {
    width: 200px;
    line-height: 40px;
  }

  &--small {
    width: 160px;
    line-height: 24px;
  }

  &__decrease,
  &__increase {
    position: absolute;
    top: 0;
    width: 32px;
    height: 100%;
    line-height: inherit;
    text-align: center;
    background-color: #f5f7fa;
    border: 1px solid #dcdfe6;
    cursor: pointer;
    transition: all 0.3s;
    user-select: none;

    &:hover {
      color: #409eff;
      border-color: #409eff;
      background-color: #ecf5ff;
    }

    &.is-disabled {
      color: #c0c4cc;
      cursor: not-allowed;
      background-color: #f5f7fa;
      border-color: #e4e7ed;

      &:hover {
        color: #c0c4cc;
        border-color: #e4e7ed;
        background-color: #f5f7fa;
      }
    }
  }

  &__decrease {
    left: 0;
    border-radius: 4px 0 0 4px;
  }

  &__increase {
    right: 0;
    border-radius: 0 4px 4px 0;
  }

  &__input {
    display: block;
    width: 100%;
    height: 100%;
    padding: 0 32px;
    text-align: center;
    background-color: #fff;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    transition: all 0.3s;

    &:focus {
      outline: none;
      border-color: #409eff;
    }

    &:disabled {
      color: #c0c4cc;
      cursor: not-allowed;
      background-color: #f5f7fa;
      border-color: #e4e7ed;
    }
  }

  &.is-controls-right {
    .zx-input-number__decrease {
      left: auto;
      right: 32px;
      border-radius: 0;
    }

    .zx-input-number__input {
      padding: 0 64px 0 12px;
    }
  }

  &.is-disabled {
    .zx-input-number__input {
      color: #c0c4cc;
      cursor: not-allowed;
      background-color: #f5f7fa;
      border-color: #e4e7ed;
    }
  }
}
</style> 