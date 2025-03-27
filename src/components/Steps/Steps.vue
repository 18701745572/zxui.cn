<template>
  <div
    class="zx-steps"
    :class="{
      'is-vertical': direction === 'vertical',
      'is-center': alignCenter,
      'is-simple': simple
    }"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { provide, ref } from 'vue'

type Direction = 'horizontal' | 'vertical'
type FinishStatus = 'wait' | 'process' | 'finish' | 'error'

interface Props {
  active?: number
  direction?: Direction
  alignCenter?: boolean
  simple?: boolean
  finishStatus?: FinishStatus
}

const props = withDefaults(defineProps<Props>(), {
  active: 0,
  direction: 'horizontal',
  alignCenter: false,
  simple: false,
  finishStatus: 'finish'
})

interface Step {
  title: string
  description: string
  status: FinishStatus
}

const steps = ref<Step[]>([])
const stepOffset = ref(0)

provide('steps', {
  steps,
  stepOffset,
  active: props.active,
  direction: props.direction,
  finishStatus: props.finishStatus
})
</script>

<style lang="scss" scoped>
.zx-steps {
  display: flex;
  width: 100%;
  padding: 20px 0;

  &.is-vertical {
    flex-direction: column;
    padding: 0 20px;
  }

  &.is-center {
    justify-content: center;
  }

  &.is-simple {
    background: transparent;
    padding: 13px 8%;
  }
}
</style> 