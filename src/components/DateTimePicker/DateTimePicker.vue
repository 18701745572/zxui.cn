<template>
  <div 
    class="zx-datetime-picker" 
    :class="[
      `zx-datetime-picker--${size}`,
      { 'zx-datetime-picker--disabled': disabled }
    ]"
  >
    <div 
      class="zx-datetime-picker__trigger"
      @click="handleTriggerClick"
    >
      <div class="zx-datetime-picker__value">
        {{ displayValue }}
      </div>
      <i 
        class="zx-icon-calendar"
        :class="{ 'zx-icon-close': showPicker }"
        @click.stop="handleIconClick"
      ></i>
    </div>

    <Teleport to="body">
      <Transition name="zx-fade">
        <div 
          v-if="showPicker" 
          class="zx-datetime-picker__panel"
          :style="panelStyle"
        >
          <div class="zx-datetime-picker__panel-header">
            <div class="zx-datetime-picker__panel-title">
              <i 
                class="zx-icon-arrow-left"
                @click="handlePrevMonth"
              ></i>
              <span>{{ currentYear }}年 {{ currentMonth + 1 }}月</span>
              <i 
                class="zx-icon-arrow-right"
                @click="handleNextMonth"
              ></i>
            </div>
            <i 
              class="zx-icon-close"
              @click="showPicker = false"
            ></i>
          </div>

          <div class="zx-datetime-picker__panel-body">
            <div class="zx-datetime-picker__weekdays">
              <span v-for="day in weekDays" :key="day">{{ day }}</span>
            </div>
            <div class="zx-datetime-picker__days">
              <div 
                v-for="day in calendarDays" 
                :key="day.date.getTime()"
                class="zx-datetime-picker__day"
                :class="{
                  'zx-datetime-picker__day--other-month': !day.isCurrentMonth,
                  'zx-datetime-picker__day--today': day.isToday,
                  'zx-datetime-picker__day--selected': isSelected(day.date),
                  'zx-datetime-picker__day--disabled': isDisabled(day.date)
                }"
                @click="handleDayClick(day.date)"
              >
                {{ day.dayOfMonth }}
              </div>
            </div>

            <div class="zx-datetime-picker__time-input">
              <input 
                type="text" 
                v-model="inputValue"
                :placeholder="timeFormat"
                @input="handleInput"
                @blur="handleBlur"
              >
            </div>

            <div class="zx-datetime-picker__time-list">
              <div 
                v-for="time in timeList" 
                :key="time.value"
                class="zx-datetime-picker__time-item"
                :class="{
                  'zx-datetime-picker__time-item--selected': isTimeSelected(time.value),
                  'zx-datetime-picker__time-item--disabled': isTimeDisabled(time.value)
                }"
                @click="handleTimeSelect(time)"
              >
                {{ time.label }}
              </div>
            </div>
          </div>

          <div class="zx-datetime-picker__panel-footer">
            <button class="zx-button zx-button--text" @click="handleNow">现在</button>
            <button class="zx-button zx-button--primary" @click="handleConfirm">确定</button>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

interface CalendarDay {
  date: Date
  dayOfMonth: number
  isCurrentMonth: boolean
  isToday: boolean
}

interface TimeOption {
  label: string
  value: string
}

type DateTimePickerSize = 'small' | 'medium' | 'large'

interface PanelStyle {
  top?: string
  left?: string
}

interface Props {
  modelValue?: Date | null
  size?: DateTimePickerSize
  disabled?: boolean
  placeholder?: string
  format?: string
  timeFormat?: string
  minDate?: Date | null
  maxDate?: Date | null
  minTime?: string | null
  maxTime?: string | null
  step?: number
  use12Hours?: boolean
}

interface Emits {
  (e: 'update:modelValue', value: Date | null): void
  (e: 'change', value: Date | null): void
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: null,
  size: 'medium',
  disabled: false,
  placeholder: '请选择日期时间',
  format: 'YYYY-MM-DD HH:mm:ss',
  timeFormat: 'HH:mm:ss',
  minDate: null,
  maxDate: null,
  minTime: null,
  maxTime: null,
  step: 60,
  use12Hours: false
})

const emit = defineEmits<Emits>()

const showPicker = ref(false)
const triggerRef = ref<HTMLElement | null>(null)
const panelStyle = ref<PanelStyle>({})
const currentDate = ref(new Date())
const currentYear = computed(() => currentDate.value.getFullYear())
const currentMonth = computed(() => currentDate.value.getMonth())
const inputValue = ref('')
const selectedDate = ref<Date | null>(null)

const weekDays = ['日', '一', '二', '三', '四', '五', '六']

const displayValue = computed(() => {
  if (!props.modelValue) return props.placeholder
  return formatDateTime(props.modelValue, props.format)
})

const calendarDays = computed(() => {
  const year = currentYear.value
  const month = currentMonth.value
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const days: CalendarDay[] = []

  // 上个月的日期
  const firstDayWeek = firstDay.getDay()
  for (let i = firstDayWeek - 1; i >= 0; i--) {
    const date = new Date(year, month, -i)
    days.push({
      date,
      dayOfMonth: date.getDate(),
      isCurrentMonth: false,
      isToday: isToday(date)
    })
  }

  // 当前月的日期
  for (let i = 1; i <= lastDay.getDate(); i++) {
    const date = new Date(year, month, i)
    days.push({
      date,
      dayOfMonth: i,
      isCurrentMonth: true,
      isToday: isToday(date)
    })
  }

  // 下个月的日期
  const remainingDays = 42 - days.length
  for (let i = 1; i <= remainingDays; i++) {
    const date = new Date(year, month + 1, i)
    days.push({
      date,
      dayOfMonth: date.getDate(),
      isCurrentMonth: false,
      isToday: isToday(date)
    })
  }

  return days
})

const timeList = computed(() => {
  const times: TimeOption[] = []
  const start = new Date()
  start.setHours(0, 0, 0, 0)
  const end = new Date()
  end.setHours(23, 59, 59, 999)

  while (start <= end) {
    const time = formatTime(start)
    if (!isTimeDisabled(time)) {
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
    if (props.modelValue) {
      selectedDate.value = new Date(props.modelValue)
      inputValue.value = formatTime(props.modelValue)
    }
  }
}

const handleIconClick = () => {
  if (showPicker.value) {
    showPicker.value = false
  } else {
    handleTriggerClick()
  }
}

const handlePrevMonth = () => {
  currentDate.value = new Date(currentYear.value, currentMonth.value - 1)
}

const handleNextMonth = () => {
  currentDate.value = new Date(currentYear.value, currentMonth.value + 1)
}

const handleDayClick = (day: Date) => {
  if (isDisabled(day)) return
  selectedDate.value = day
  if (props.modelValue) {
    const time = new Date(props.modelValue)
    selectedDate.value.setHours(time.getHours(), time.getMinutes(), time.getSeconds())
  }
}

const handleInput = () => {
  if (!selectedDate.value) return
  const time = parseTime(inputValue.value)
  if (time) {
    const [hours, minutes, seconds] = time.split(':').map(Number)
    selectedDate.value.setHours(hours, minutes, seconds)
    if (!isDisabled(selectedDate.value)) {
      emit('update:modelValue', new Date(selectedDate.value))
      emit('change', new Date(selectedDate.value))
    }
  }
}

const handleBlur = () => {
  if (!selectedDate.value) return
  const time = parseTime(inputValue.value)
  if (time && !isDisabled(selectedDate.value)) {
    const [hours, minutes, seconds] = time.split(':').map(Number)
    selectedDate.value.setHours(hours, minutes, seconds)
    emit('update:modelValue', new Date(selectedDate.value))
    emit('change', new Date(selectedDate.value))
  } else {
    inputValue.value = formatTime(selectedDate.value)
  }
}

const handleTimeSelect = (time: TimeOption) => {
  if (!selectedDate.value || isTimeDisabled(time.value)) return
  const [hours, minutes, seconds] = time.value.split(':').map(Number)
  selectedDate.value.setHours(hours, minutes, seconds)
  if (!isDisabled(selectedDate.value)) {
    emit('update:modelValue', new Date(selectedDate.value))
    emit('change', new Date(selectedDate.value))
  }
}

const handleNow = () => {
  const now = new Date()
  if (!isDisabled(now)) {
    selectedDate.value = now
    inputValue.value = formatTime(now)
    emit('update:modelValue', now)
    emit('change', now)
    showPicker.value = false
  }
}

const handleConfirm = () => {
  showPicker.value = false
}

const isSelected = (date: Date) => {
  if (!selectedDate.value) return false
  return date.getTime() === selectedDate.value.getTime()
}

const isTimeSelected = (time: string) => {
  if (!selectedDate.value) return false
  return formatTime(selectedDate.value) === time
}

const isDisabled = (date: Date) => {
  if (props.minDate && date < props.minDate) return true
  if (props.maxDate && date > props.maxDate) return true
  return false
}

const isTimeDisabled = (time: string) => {
  if (props.minTime && time < props.minTime) return true
  if (props.maxTime && time > props.maxTime) return true
  return false
}

const isToday = (date: Date) => {
  const today = new Date()
  return date.getTime() === today.getTime()
}

const formatDateTime = (date: Date, format: string) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')
  return format
    .replace('YYYY', String(year))
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds)
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
</script>

<style lang="scss" scoped>
.zx-datetime-picker {
  position: relative;
  display: inline-block;
  width: 100%;

  // 尺寸
  &--small {
    .zx-datetime-picker__trigger {
      height: 32px;
      font-size: 14px;
    }
  }

  &--medium {
    .zx-datetime-picker__trigger {
      height: 36px;
      font-size: 16px;
    }
  }

  &--large {
    .zx-datetime-picker__trigger {
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
    width: 320px;
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
    display: flex;
    align-items: center;
    gap: 8px;

    i {
      cursor: pointer;
      color: #909399;
      transition: all 0.3s;

      &:hover {
        color: var(--zx-primary-color);
      }
    }
  }

  // 面板主体
  &__panel-body {
    padding: 12px;
  }

  // 星期
  &__weekdays {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 4px;
    margin-bottom: 8px;

    span {
      text-align: center;
      color: #909399;
      font-size: 14px;
    }
  }

  // 日期
  &__days {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 4px;
    margin-bottom: 12px;
  }

  &__day {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 32px;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s;

    &:hover:not(.zx-datetime-picker__day--disabled) {
      background-color: #f5f7fa;
    }

    &--other-month {
      color: #c0c4cc;
    }

    &--today {
      color: var(--zx-primary-color);
      font-weight: 500;
    }

    &--selected {
      background-color: var(--zx-primary-color);
      color: #fff;

      &:hover {
        background-color: var(--zx-primary-color);
      }
    }

    &--disabled {
      color: #c0c4cc;
      cursor: not-allowed;

      &:hover {
        background-color: transparent;
      }
    }
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

    &:hover:not(.zx-datetime-picker__time-item--disabled) {
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
    .zx-datetime-picker__trigger {
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