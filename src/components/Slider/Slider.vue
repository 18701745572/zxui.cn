<template>
  <div
    class="zx-slider"
    :class="{
      'is-disabled': disabled,
      'is-vertical': vertical,
      'has-marks': showMarks
    }"
  >
    <div
      class="zx-slider__runway"
      :style="runwayStyle"
      @click="handleRunwayClick"
    >
      <div class="zx-slider__bar" :style="barStyle"></div>
      <div
        v-for="(value, index) in modelValue"
        :key="index"
        class="zx-slider__button"
        :class="{ 'is-active': dragging === index }"
        :style="getButtonStyle(index)"
        @mousedown="startDragging($event, index)"
        @touchstart="startDragging($event, index)"
      >
        <div class="zx-slider__button-wrapper">
          <div class="zx-slider__tooltip" v-if="showTooltip">
            {{ value }}
          </div>
        </div>
      </div>
      <div v-if="showMarks" class="zx-slider__marks">
        <div
          v-for="(mark, key) in marks"
          :key="key"
          class="zx-slider__mark"
          :style="getMarkStyle(Number(key))"
        >
          <span class="zx-slider__mark-text">{{ mark }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

interface Props {
  modelValue: number | number[]
  min?: number
  max?: number
  step?: number
  disabled?: boolean
  vertical?: boolean
  showTooltip?: boolean
  showMarks?: boolean
  marks?: Record<string, string>
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: 0,
  min: 0,
  max: 100,
  step: 1,
  disabled: false,
  vertical: false,
  showTooltip: true,
  showMarks: false,
  marks: () => ({})
})

interface Emits {
  (e: 'update:modelValue', value: number | number[]): void
  (e: 'change', value: number | number[]): void
}

const emit = defineEmits<Emits>()

const dragging = ref(-1)
const startX = ref(0)
const startY = ref(0)
const startValue = ref<number | number[]>(0)
const runway = ref<HTMLElement | null>(null)

const isRange = computed(() => Array.isArray(props.modelValue))

const runwayStyle = computed(() => ({
  height: props.vertical ? '100%' : '4px',
  width: props.vertical ? '4px' : '100%'
}))

const barStyle = computed(() => {
  if (isRange.value) {
    const [min, max] = props.modelValue as number[]
    const left = ((min - props.min) / (props.max - props.min)) * 100
    const width = ((max - min) / (props.max - props.min)) * 100
    return props.vertical
      ? {
          bottom: `${left}%`,
          height: `${width}%`
        }
      : {
          left: `${left}%`,
          width: `${width}%`
        }
  }
  const width = ((props.modelValue as number - props.min) / (props.max - props.min)) * 100
  return props.vertical
    ? {
        height: `${width}%`
      }
    : {
        width: `${width}%`
      }
})

const getButtonStyle = (index: number) => {
  const value = isRange.value ? (props.modelValue as number[])[index] : props.modelValue as number
  const percentage = ((value - props.min) / (props.max - props.min)) * 100
  return props.vertical
    ? {
        bottom: `${percentage}%`
      }
    : {
        left: `${percentage}%`
      }
}

const getMarkStyle = (value: number) => {
  const percentage = ((value - props.min) / (props.max - props.min)) * 100
  return props.vertical
    ? {
        bottom: `${percentage}%`
      }
    : {
        left: `${percentage}%`
      }
}

const handleRunwayClick = (event: MouseEvent) => {
  if (props.disabled) return
  const rect = runway.value?.getBoundingClientRect()
  if (!rect) return

  const percentage = props.vertical
    ? (rect.bottom - event.clientY) / rect.height
    : (event.clientX - rect.left) / rect.width

  const value = props.min + percentage * (props.max - props.min)
  const newValue = Math.round(value / props.step) * props.step

  if (isRange.value) {
    const [min, max] = props.modelValue as number[]
    if (Math.abs(newValue - min) < Math.abs(newValue - max)) {
      emit('update:modelValue', [newValue, max])
      emit('change', [newValue, max])
    } else {
      emit('update:modelValue', [min, newValue])
      emit('change', [min, newValue])
    }
  } else {
    emit('update:modelValue', newValue)
    emit('change', newValue)
  }
}

const startDragging = (event: MouseEvent | TouchEvent, index: number) => {
  if (props.disabled) return
  dragging.value = index
  startX.value = 'touches' in event ? event.touches[0].clientX : event.clientX
  startY.value = 'touches' in event ? event.touches[0].clientY : event.clientY
  startValue.value = isRange.value ? (props.modelValue as number[])[index] : props.modelValue as number
}

const handleDragging = (event: MouseEvent | TouchEvent) => {
  if (dragging.value === -1) return

  const rect = runway.value?.getBoundingClientRect()
  if (!rect) return

  const currentX = 'touches' in event ? event.touches[0].clientX : event.clientX
  const currentY = 'touches' in event ? event.touches[0].clientY : event.clientY

  const delta = props.vertical
    ? startY.value - currentY
    : currentX - startX.value

  const percentage = delta / (props.vertical ? rect.height : rect.width)
  const deltaValue = percentage * (props.max - props.min)
  let newValue = (startValue.value as number) + deltaValue

  newValue = Math.max(props.min, Math.min(props.max, newValue))
  newValue = Math.round(newValue / props.step) * props.step

  if (isRange.value) {
    const values = [...(props.modelValue as number[])]
    values[dragging.value] = newValue
    emit('update:modelValue', values)
    emit('change', values)
  } else {
    emit('update:modelValue', newValue)
    emit('change', newValue)
  }
}

const stopDragging = () => {
  dragging.value = -1
}

onMounted(() => {
  document.addEventListener('mousemove', handleDragging)
  document.addEventListener('mouseup', stopDragging)
  document.addEventListener('touchmove', handleDragging)
  document.addEventListener('touchend', stopDragging)
})

onBeforeUnmount(() => {
  document.removeEventListener('mousemove', handleDragging)
  document.removeEventListener('mouseup', stopDragging)
  document.removeEventListener('touchmove', handleDragging)
  document.removeEventListener('touchend', stopDragging)
})
</script>

<style lang="scss" scoped>
.zx-slider {
  position: relative;
  width: 100%;
  height: 40px;

  &.is-vertical {
    height: 100%;
    width: 40px;
  }

  &.is-disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  &__runway {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: #e4e7ed;
    border-radius: 2px;
    cursor: pointer;
  }

  &__bar {
    position: absolute;
    background-color: var(--zx-primary-color, #409eff);
    border-radius: 2px;
    transition: all 0.2s ease;
  }

  &__button {
    position: absolute;
    width: 16px;
    height: 16px;
    background-color: #fff;
    border: 2px solid var(--zx-primary-color, #409eff);
    border-radius: 50%;
    cursor: pointer;
    transform: translate(-50%, -50%);
    transition: all 0.2s ease;

    &.is-active {
      transform: translate(-50%, -50%) scale(1.2);
    }

    &:hover {
      transform: translate(-50%, -50%) scale(1.1);
    }
  }

  &__button-wrapper {
    position: relative;
  }

  &__tooltip {
    position: absolute;
    top: -30px;
    left: 50%;
    transform: translateX(-50%);
    padding: 4px 8px;
    background-color: rgba(0, 0, 0, 0.8);
    color: #fff;
    border-radius: 4px;
    font-size: 12px;
    white-space: nowrap;
    pointer-events: none;
  }

  &__marks {
    position: absolute;
    width: 100%;
    height: 100%;
  }

  &__mark {
    position: absolute;
    transform: translateX(-50%);
    width: 2px;
    height: 8px;
    background-color: #c0c4cc;
  }

  &__mark-text {
    position: absolute;
    top: 16px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 12px;
    color: #909399;
  }
}
</style> 