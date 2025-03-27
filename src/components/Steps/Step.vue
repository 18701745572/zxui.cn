<template>
  <div class="zx-step" :class="{ 'zx-step--active': isActive }">
    <div class="zx-step__icon" :class="{ 'zx-step__icon--active': isActive }">
      <slot name="icon">
        <span class="zx-step__number">{{ index + 1 }}</span>
      </slot>
    </div>
    <div class="zx-step__content">
      <div class="zx-step__title">
        <slot name="title"></slot>
      </div>
      <div class="zx-step__description">
        <slot name="description"></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject, ref, computed, onMounted } from 'vue'

type FinishStatus = 'wait' | 'process' | 'finish' | 'error'

interface Props {
  title: string
  description?: string
  status?: FinishStatus
}

const props = withDefaults(defineProps<Props>(), {
  description: '',
  status: 'wait'
})

interface StepsContext {
  steps: {
    value: {
      title: string
      description: string
      status: FinishStatus
    }[]
  }
  stepOffset: {
    value: number
  }
  active: number
  direction: 'horizontal' | 'vertical'
  finishStatus: FinishStatus
}

const steps = inject<StepsContext>('steps')
const index = ref(0)

const isActive = computed(() => index.value <= (steps?.active ?? 0))

onMounted(() => {
  if (steps) {
    index.value = steps.steps.value.length
    steps.steps.value.push({
      title: props.title,
      description: props.description,
      status: props.status
    })
  }
})
</script>

<style lang="scss" scoped>
.zx-step {
  flex: 1;
  text-align: center;
  position: relative;

  &:not(:last-child)::after {
    content: '';
    position: absolute;
    top: 16px;
    left: 50%;
    width: 100%;
    height: 2px;
    background-color: #e4e7ed;
    z-index: 0;
  }

  // 图标
  &__icon {
    position: relative;
    z-index: 1;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border: 2px solid #e4e7ed;
    border-radius: 50%;
    background-color: #fff;
    color: #909399;
    font-size: 16px;
    transition: all 0.3s;

    &--active {
      background-color: var(--zx-primary-color);
      border-color: var(--zx-primary-color);
      color: #fff;
    }
  }

  // 内容
  &__content {
    position: relative;
    z-index: 1;
    margin-top: 12px;
  }

  // 标题
  &__title {
    font-size: 16px;
    font-weight: 500;
    color: #303133;
    margin-bottom: 8px;
  }

  // 描述
  &__description {
    font-size: 14px;
    color: #909399;
    line-height: 1.5;
  }
}
</style> 