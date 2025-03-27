<template>
  <div class="zx-rate" :class="{ 'is-disabled': disabled }">
    <div class="zx-rate__stars">
      <span
        v-for="i in count"
        :key="i"
        class="zx-rate__star"
        :class="{
          'is-active': modelValue >= i,
          'is-half': modelValue + 0.5 >= i && modelValue < i
        }"
        @click="handleClick(i)"
        @mousemove="handleMouseMove(i)"
        @mouseleave="handleMouseLeave"
      >
        <i class="zx-rate__icon" :style="{ color: getStarColor(i) }">
          <svg viewBox="0 0 24 24" width="1em" height="1em">
            <path
              fill="currentColor"
              d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
            />
          </svg>
        </i>
      </span>
    </div>
    <span v-if="showText" class="zx-rate__text">{{ modelValue }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  modelValue?: number
  count?: number
  disabled?: boolean
  showText?: boolean
  colors?: string[]
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: 0,
  count: 5,
  disabled: false,
  showText: false,
  colors: () => ['#F7BA2A', '#F7BA2A', '#F7BA2A']
})

interface Emits {
  (e: 'update:modelValue', value: number): void
  (e: 'change', value: number): void
}

const emit = defineEmits<Emits>()

const getStarColor = (index: number): string => {
  if (props.modelValue >= index) {
    return props.colors[0]
  } else if (props.modelValue + 0.5 >= index) {
    return props.colors[1]
  }
  return props.colors[2]
}

const handleClick = (value: number) => {
  if (props.disabled) return
  emit('update:modelValue', value)
  emit('change', value)
}

const handleMouseMove = (value: number) => {
  if (props.disabled) return
  // 可以在这里添加hover效果
}

const handleMouseLeave = () => {
  if (props.disabled) return
  // 可以在这里添加leave效果
}
</script>

<style lang="scss" scoped>
.zx-rate {
  display: inline-flex;
  align-items: center;
  font-size: 20px;
  line-height: 1;
  vertical-align: middle;

  &.is-disabled {
    cursor: not-allowed;
  }

  &__stars {
    display: inline-flex;
    align-items: center;
  }

  &__star {
    position: relative;
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    transition: transform 0.2s ease;

    &:hover {
      transform: scale(1.1);
    }

    &.is-disabled {
      cursor: not-allowed;
    }
  }

  &__icon {
    font-size: 1em;
    transition: color 0.2s ease;
  }

  &__text {
    margin-left: 8px;
    font-size: 14px;
    color: #606266;
  }
}
</style> 