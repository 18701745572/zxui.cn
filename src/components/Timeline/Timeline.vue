<template>
  <div class="zx-timeline" :class="[`zx-timeline--${type}`, `zx-timeline--${size}`]">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ZxTimeline',
  props: {
    type: {
      type: String,
      default: 'primary',
      validator: (value: string) => {
        return ['primary', 'success', 'warning', 'danger', 'info'].includes(value)
      }
    },
    size: {
      type: String,
      default: 'medium',
      validator: (value: string) => {
        return ['small', 'medium', 'large'].includes(value)
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.zx-timeline {
  position: relative;
  padding: 16px 0;

  // 类型
  &--primary {
    .zx-timeline-item__dot {
      background-color: var(--zx-primary-color);
    }
  }

  &--success {
    .zx-timeline-item__dot {
      background-color: var(--zx-success-color);
    }
  }

  &--warning {
    .zx-timeline-item__dot {
      background-color: var(--zx-warning-color);
    }
  }

  &--danger {
    .zx-timeline-item__dot {
      background-color: var(--zx-danger-color);
    }
  }

  &--info {
    .zx-timeline-item__dot {
      background-color: var(--zx-info-color);
    }
  }

  // 尺寸
  &--small {
    .zx-timeline-item {
      padding-left: 24px;
    }

    .zx-timeline-item__dot {
      width: 8px;
      height: 8px;
    }

    .zx-timeline-item__line {
      left: 3px;
    }
  }

  &--medium {
    .zx-timeline-item {
      padding-left: 32px;
    }

    .zx-timeline-item__dot {
      width: 12px;
      height: 12px;
    }

    .zx-timeline-item__line {
      left: 5px;
    }
  }

  &--large {
    .zx-timeline-item {
      padding-left: 40px;
    }

    .zx-timeline-item__dot {
      width: 16px;
      height: 16px;
    }

    .zx-timeline-item__line {
      left: 7px;
    }
  }
}
</style> 