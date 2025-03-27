<template>
  <div 
    class="zx-date-picker" 
    :class="[
      `zx-date-picker--${size}`,
      { 'zx-date-picker--disabled': disabled }
    ]"
  >
    <div 
      class="zx-date-picker__trigger"
      @click="handleTriggerClick"
    >
      <div class="zx-date-picker__value">
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
          class="zx-date-picker__panel"
          :style="panelStyle"
        >
          <div class="zx-date-picker__panel-header">
            <div class="zx-date-picker__panel-title">
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

          <div class="zx-date-picker__panel-body">
            <div class="zx-date-picker__weekdays">
              <span v-for="day in weekDays" :key="day">{{ day }}</span>
            </div>
            <div class="zx-date-picker__days">
              <div 
                v-for="day in calendarDays" 
                :key="day.date.getTime()"
                class="zx-date-picker__day"
                :class="{
                  'zx-date-picker__day--other-month': !day.isCurrentMonth,
                  'zx-date-picker__day--today': day.isToday,
                  'zx-date-picker__day--selected': isSelected(day.date),
                  'zx-date-picker__day--disabled': isDisabled(day.date)
                }"
                @click="handleDayClick(day.date)"
              >
                {{ day.dayOfMonth }}
              </div>
            </div>
          </div>

          <div class="zx-date-picker__panel-footer">
            <button class="zx-button zx-button--text" @click="handleToday">今天</button>
            <button class="zx-button zx-button--primary" @click="handleConfirm">确定</button>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, onUnmounted, PropType } from 'vue'

interface CalendarDay {
  date: Date
  dayOfMonth: number
  isCurrentMonth: boolean
  isToday: boolean
}

type DatePickerSize = 'small' | 'medium' | 'large'

interface DatePickerProps {
  modelValue: Date | null
  size: DatePickerSize
  disabled: boolean
  placeholder: string
  format: string
  minDate: Date | null
  maxDate: Date | null
}

interface DatePickerEmits {
  (e: 'update:modelValue', value: Date | null): void
  (e: 'change', value: Date | null): void
}

export default defineComponent({
  name: 'ZxDatePicker',
  props: {
    modelValue: {
      type: Date as PropType<Date | null>,
      default: null
    },
    size: {
      type: String as PropType<DatePickerSize>,
      default: 'medium',
      validator: (value: DatePickerSize) => {
        return ['small', 'medium', 'large'].includes(value)
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: '请选择日期'
    },
    format: {
      type: String,
      default: 'YYYY-MM-DD'
    },
    minDate: {
      type: Date as PropType<Date | null>,
      default: null
    },
    maxDate: {
      type: Date as PropType<Date | null>,
      default: null
    }
  },
  emits: ['update:modelValue', 'change'],
  setup(props: DatePickerProps, { emit }: { emit: DatePickerEmits }) {
    const showPicker = ref(false)
    const triggerRef = ref<HTMLElement | null>(null)
    const panelStyle = ref({})
    const currentDate = ref(new Date())
    const currentYear = computed(() => currentDate.value.getFullYear())
    const currentMonth = computed(() => currentDate.value.getMonth())

    const weekDays = ['日', '一', '二', '三', '四', '五', '六']

    const displayValue = computed(() => {
      if (!props.modelValue) return props.placeholder
      return formatDate(props.modelValue, props.format)
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

    const handleTriggerClick = () => {
      if (props.disabled) return
      showPicker.value = !showPicker.value
      if (showPicker.value) {
        updatePanelPosition()
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
      currentDate.value = new Date(currentYear.value, currentMonth.value - 1, 1)
    }

    const handleNextMonth = () => {
      currentDate.value = new Date(currentYear.value, currentMonth.value + 1, 1)
    }

    const handleDayClick = (date: Date) => {
      if (isDisabled(date)) return
      emit('update:modelValue', date)
      emit('change', date)
      showPicker.value = false
    }

    const handleToday = () => {
      const today = new Date()
      if (!isDisabled(today)) {
        emit('update:modelValue', today)
        emit('change', today)
        showPicker.value = false
      }
    }

    const handleConfirm = () => {
      showPicker.value = false
    }

    const isSelected = (date: Date): boolean => {
      if (!props.modelValue) return false
      return isSameDay(date, props.modelValue)
    }

    const isDisabled = (date: Date): boolean => {
      if (props.minDate && date < props.minDate) return true
      if (props.maxDate && date > props.maxDate) return true
      return false
    }

    const isToday = (date: Date): boolean => {
      const today = new Date()
      return isSameDay(date, today)
    }

    const isSameDay = (date1: Date, date2: Date): boolean => {
      return date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
    }

    const formatDate = (date: Date, format: string): string => {
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const day = date.getDate()

      return format
        .replace('YYYY', year.toString())
        .replace('MM', month.toString().padStart(2, '0'))
        .replace('DD', day.toString().padStart(2, '0'))
    }

    const updatePanelPosition = () => {
      if (!triggerRef.value) return

      const triggerRect = triggerRef.value.getBoundingClientRect()
      const { top, left, height } = triggerRect

      panelStyle.value = {
        top: `${top + height + 8}px`,
        left: `${left}px`
      }
    }

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        !triggerRef.value?.contains(target) &&
        !target.closest('.zx-date-picker__panel')
      ) {
        showPicker.value = false
      }
    }

    onMounted(() => {
      document.addEventListener('click', handleClickOutside)
    })

    onUnmounted(() => {
      document.removeEventListener('click', handleClickOutside)
    })

    return {
      showPicker,
      triggerRef,
      panelStyle,
      currentYear,
      currentMonth,
      weekDays,
      displayValue,
      calendarDays,
      handleTriggerClick,
      handleIconClick,
      handlePrevMonth,
      handleNextMonth,
      handleDayClick,
      handleToday,
      handleConfirm,
      isSelected,
      isDisabled
    }
  }
})
</script>

<style lang="scss" scoped>
.zx-date-picker {
  position: relative;
  display: inline-block;
  width: 100%;

  // 尺寸
  &--small {
    .zx-date-picker__trigger {
      height: 32px;
      font-size: 14px;
    }
  }

  &--medium {
    .zx-date-picker__trigger {
      height: 36px;
      font-size: 16px;
    }
  }

  &--large {
    .zx-date-picker__trigger {
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
  }

  &__day {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 32px;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s;

    &:hover:not(.zx-date-picker__day--disabled) {
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
    .zx-date-picker__trigger {
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