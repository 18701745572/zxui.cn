<template>
  <div 
    class="zx-time-picker" 
    :class="[
      `zx-time-picker--${size}`,
      { 'zx-time-picker--disabled': disabled }
    ]"
  >
    <div 
      class="zx-time-picker__trigger"
      @click="handleTriggerClick"
    >
      <div class="zx-time-picker__value">
        {{ displayValue }}
      </div>
      <i 
        class="zx-icon-time"
        :class="{ 'zx-icon-close': showPicker }"
        @click.stop="handleIconClick"
      ></i>
    </div>

    <Teleport to="body">
      <Transition name="zx-fade">
        <div 
          v-if="showPicker" 
          class="zx-time-picker__panel"
          :style="panelStyle"
        >
          <div class="zx-time-picker__panel-header">
            <div class="zx-time-picker__panel-title">
              <span>选择时间</span>
            </div>
            <i 
              class="zx-icon-close"
              @click="showPicker = false"
            ></i>
          </div>

          <div class="zx-time-picker__panel-body">
            <div class="zx-time-picker__time-input">
              <input 
                type="text" 
                v-model="inputValue"
                :placeholder="format"
                @input="handleInput"
                @blur="handleBlur"
              >
            </div>

            <div class="zx-time-picker__time-list">
              <div 
                v-for="time in timeList" 
                :key="time.value"
                class="zx-time-picker__time-item"
                :class="{
                  'zx-time-picker__time-item--selected': isSelected(time.value),
                  'zx-time-picker__time-item--disabled': isDisabled(time.value)
                }"
                @click="handleTimeSelect(time)"
              >
                {{ time.label }}
              </div>
            </div>
          </div>

          <div class="zx-time-picker__panel-footer">
            <button class="zx-button zx-button--text" @click="handleNow">现在</button>
            <button class="zx-button zx-button--primary" @click="handleConfirm">确定</button>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, onUnmounted, PropType } from 'vue'

type TimePickerSize = 'small' | 'medium' | 'large'

interface TimeOption {
  label: string
  value: string
}

interface PanelStyle {
  top?: string
  left?: string
  width?: string
}

interface TimePickerProps {
  modelValue: string | null
  size: TimePickerSize
  disabled: boolean
  placeholder: string
  format: string
  minTime: string | null
  maxTime: string | null
  step: number
  use12Hours: boolean
}

interface TimePickerEmits {
  (e: 'update:modelValue', value: string): void
  (e: 'change', value: string): void
}

export default defineComponent({
  name: 'ZxTimePicker',
  props: {
    modelValue: {
      type: String as PropType<string | null>,
      default: null
    },
    size: {
      type: String as PropType<TimePickerSize>,
      default: 'medium',
      validator: (value: string) => {
        return ['small', 'medium', 'large'].includes(value)
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: '请选择时间'
    },
    format: {
      type: String,
      default: 'HH:mm:ss'
    },
    minTime: {
      type: String as PropType<string | null>,
      default: null
    },
    maxTime: {
      type: String as PropType<string | null>,
      default: null
    },
    step: {
      type: Number,
      default: 60
    },
    use12Hours: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue', 'change'],
  setup(props: TimePickerProps, { emit }: { emit: TimePickerEmits }) {
    const showPicker = ref(false)
    const triggerRef = ref<HTMLElement | null>(null)
    const panelStyle = ref<PanelStyle>({})
    const inputValue = ref('')

    const displayValue = computed(() => {
      if (!props.modelValue) return props.placeholder
      return props.modelValue
    })

    const timeList = computed(() => {
      const times: TimeOption[] = []
      const start = new Date()
      start.setHours(0, 0, 0, 0)
      const end = new Date()
      end.setHours(23, 59, 59, 999)

      while (start <= end) {
        const time = formatTime(start)
        if (!isDisabled(time)) {
          times.push({
            label: time,
            value: time
          })
        }
        start.setMinutes(start.getMinutes() + props.step / 60)
      }

      return times
    })

    const handleTriggerClick = () => {
      if (props.disabled) return
      showPicker.value = !showPicker.value
      if (showPicker.value) {
        updatePanelPosition()
        inputValue.value = props.modelValue || ''
      }
    }

    const handleIconClick = () => {
      if (showPicker.value) {
        showPicker.value = false
      } else {
        handleTriggerClick()
      }
    }

    const handleInput = () => {
      const time = parseTime(inputValue.value)
      if (time && !isDisabled(time)) {
        emit('update:modelValue', time)
        emit('change', time)
      }
    }

    const handleBlur = () => {
      const time = parseTime(inputValue.value)
      if (time && !isDisabled(time)) {
        emit('update:modelValue', time)
        emit('change', time)
      } else {
        inputValue.value = props.modelValue || ''
      }
    }

    const handleTimeSelect = (time: TimeOption) => {
      if (isDisabled(time.value)) return
      emit('update:modelValue', time.value)
      emit('change', time.value)
      showPicker.value = false
    }

    const handleNow = () => {
      const now = formatTime(new Date())
      if (!isDisabled(now)) {
        emit('update:modelValue', now)
        emit('change', now)
        showPicker.value = false
      }
    }

    const handleConfirm = () => {
      showPicker.value = false
    }

    const isSelected = (time: string) => {
      return time === props.modelValue
    }

    const isDisabled = (time: string) => {
      if (props.minTime && time < props.minTime) return true
      if (props.maxTime && time > props.maxTime) return true
      return false
    }

    const formatTime = (date: Date) => {
      const hours = String(date.getHours()).padStart(2, '0')
      const minutes = String(date.getMinutes()).padStart(2, '0')
      const seconds = String(date.getSeconds()).padStart(2, '0')
      return `${hours}:${minutes}:${seconds}`
    }

    const parseTime = (time: string) => {
      const pattern = /^(\d{2}):(\d{2}):(\d{2})$/
      const match = time.match(pattern)
      if (!match) return null

      const hours = parseInt(match[1])
      const minutes = parseInt(match[2])
      const seconds = parseInt(match[3])

      if (
        hours >= 0 && hours <= 23 &&
        minutes >= 0 && minutes <= 59 &&
        seconds >= 0 && seconds <= 59
      ) {
        return time
      }

      return null
    }

    const updatePanelPosition = () => {
      if (!triggerRef.value) return
      const rect = triggerRef.value.getBoundingClientRect()
      panelStyle.value = {
        top: `${rect.bottom + window.scrollY}px`,
        left: `${rect.left}px`
      }
    }

    const handleClickOutside = (e: MouseEvent) => {
      if (showPicker.value && triggerRef.value) {
        const target = e.target as HTMLElement
        if (!triggerRef.value.contains(target)) {
          showPicker.value = false
        }
      }
    }

    onMounted(() => {
      document.addEventListener('click', handleClickOutside)
      window.addEventListener('scroll', updatePanelPosition)
      window.addEventListener('resize', updatePanelPosition)
    })

    onUnmounted(() => {
      document.removeEventListener('click', handleClickOutside)
      window.removeEventListener('scroll', updatePanelPosition)
      window.removeEventListener('resize', updatePanelPosition)
    })

    return {
      showPicker,
      triggerRef,
      panelStyle,
      inputValue,
      displayValue,
      timeList,
      handleTriggerClick,
      handleIconClick,
      handleInput,
      handleBlur,
      handleTimeSelect,
      handleNow,
      handleConfirm,
      isSelected,
      isDisabled
    }
  }
})
</script>

<style lang="scss" scoped>
.zx-time-picker {
  position: relative;
  display: inline-block;
  width: 100%;

  // 尺寸
  &--small {
    .zx-time-picker__trigger {
      height: 32px;
      font-size: 14px;
    }
  }

  &--medium {
    .zx-time-picker__trigger {
      height: 36px;
      font-size: 16px;
    }
  }

  &--large {
    .zx-time-picker__trigger {
      height: 40px;
      font-size: 18px;
    }
  }

  // 触发器
  &__trigger {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 12px;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      border-color: var(--zx-primary-color);
    }

    i {
      color: #909399;
      transition: all 0.3s;
    }
  }

  // 值
  &__value {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  // 面板
  &__panel {
    position: absolute;
    background-color: #fff;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    z-index: 2000;
    width: 280px;
  }

  // 面板头部
  &__panel-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px;
    border-bottom: 1px solid #ebeef5;
  }

  &__panel-title {
    font-size: 16px;
    font-weight: 500;
  }

  // 面板主体
  &__panel-body {
    padding: 12px;
  }

  // 时间输入
  &__time-input {
    margin-bottom: 12px;

    input {
      width: 100%;
      height: 32px;
      padding: 0 12px;
      border: 1px solid #dcdfe6;
      border-radius: 4px;
      font-size: 14px;
      transition: all 0.3s;

      &:focus {
        outline: none;
        border-color: var(--zx-primary-color);
      }

      &::placeholder {
        color: #c0c4cc;
      }
    }
  }

  // 时间列表
  &__time-list {
    height: 200px;
    overflow-y: auto;
  }

  &__time-item {
    padding: 8px 12px;
    cursor: pointer;
    transition: all 0.3s;

    &:hover:not(.zx-time-picker__time-item--disabled) {
      background-color: #f5f7fa;
    }

    &--selected {
      color: var(--zx-primary-color);
      font-weight: 500;
    }

    &--disabled {
      color: #c0c4cc;
      cursor: not-allowed;

      &:hover {
        background-color: transparent;
      }
    }
  }

  // 面板底部
  &__panel-footer {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    padding: 12px;
    border-top: 1px solid #ebeef5;
  }

  // 状态
  &--disabled {
    .zx-time-picker__trigger {
      background-color: #f5f7fa;
      cursor: not-allowed;
      opacity: 0.6;
    }
  }
}

// 过渡动画
.zx-fade-enter-active,
.zx-fade-leave-active {
  transition: opacity 0.3s ease;
}

.zx-fade-enter-from,
.zx-fade-leave-to {
  opacity: 0;
}
</style> 