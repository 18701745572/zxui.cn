<template>
  <div
    class="zx-progress"
    :class="[
      `zx-progress--${type}`,
      `zx-progress--${size}`,
      { 'zx-progress--striped': striped },
      { 'zx-progress--animated': animated }
    ]"
  >
    <div class="zx-progress__outer">
      <div
        class="zx-progress__inner"
        :style="{ width: `${percentage}%` }"
      >
        <div
          v-if="showText"
          class="zx-progress__text"
          :class="{ 'zx-progress__text--inside': textInside }"
        >
          {{ formatText }}
        </div>
      </div>
    </div>
    <div
      v-if="showText && !textInside"
      class="zx-progress__text"
    >
      {{ formatText }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue'

type ProgressType = 'primary' | 'success' | 'warning' | 'danger' | 'info'
type ProgressSize = 'small' | 'medium' | 'large'

interface ProgressProps {
  percentage: number
  type: ProgressType
  size: ProgressSize
  showText: boolean
  textInside: boolean
  striped: boolean
  animated: boolean
  format: (percentage: number) => string
}

export default defineComponent({
  name: 'ZxProgress',
  props: {
    percentage: {
      type: Number as PropType<number>,
      default: 0,
      validator: (value: number) => {
        return value >= 0 && value <= 100
      }
    },
    type: {
      type: String as PropType<ProgressType>,
      default: 'primary',
      validator: (value: string) => {
        return ['primary', 'success', 'warning', 'danger', 'info'].includes(value)
      }
    },
    size: {
      type: String as PropType<ProgressSize>,
      default: 'medium',
      validator: (value: string) => {
        return ['small', 'medium', 'large'].includes(value)
      }
    },
    showText: {
      type: Boolean,
      default: true
    },
    textInside: {
      type: Boolean,
      default: false
    },
    striped: {
      type: Boolean,
      default: false
    },
    animated: {
      type: Boolean,
      default: false
    },
    format: {
      type: Function as PropType<(percentage: number) => string>,
      default: (percentage: number) => `${percentage}%`
    }
  },
  setup(props: ProgressProps) {
    const formatText = computed(() => {
      return props.format(props.percentage)
    })

    return {
      formatText
    }
  }
})
</script>

<style lang="scss" scoped>
.zx-progress {
  display: flex;
  align-items: center;
  gap: 8px;

  // 尺寸
  &--small {
    .zx-progress__outer {
      height: 4px;
    }

    .zx-progress__text {
      font-size: 12px;
    }
  }

  &--medium {
    .zx-progress__outer {
      height: 8px;
    }

    .zx-progress__text {
      font-size: 14px;
    }
  }

  &--large {
    .zx-progress__outer {
      height: 12px;
    }

    .zx-progress__text {
      font-size: 16px;
    }
  }

  // 外部容器
  &__outer {
    flex: 1;
    background: #f0f0f0;
    border-radius: 4px;
    overflow: hidden;
  }

  // 内部进度条
  &__inner {
    height: 100%;
    border-radius: 4px;
    transition: width 0.3s ease;
    position: relative;
    overflow: hidden;

    // 条纹
    .zx-progress--striped & {
      background-image: linear-gradient(
        45deg,
        rgba(255, 255, 255, 0.15) 25%,
        transparent 25%,
        transparent 50%,
        rgba(255, 255, 255, 0.15) 50%,
        rgba(255, 255, 255, 0.15) 75%,
        transparent 75%,
        transparent
      );
      background-size: 20px 20px;
    }

    // 动画
    .zx-progress--animated & {
      animation: progress-stripes 1s linear infinite;
    }
  }

  // 文本
  &__text {
    min-width: 40px;
    text-align: right;
    color: #606266;

    &--inside {
      position: absolute;
      right: 8px;
      top: 50%;
      transform: translateY(-50%);
      color: #fff;
    }
  }

  // 主题样式
  &--primary {
    .zx-progress__inner {
      background: #409eff;
    }
  }

  &--success {
    .zx-progress__inner {
      background: #67c23a;
    }
  }

  &--warning {
    .zx-progress__inner {
      background: #e6a23c;
    }
  }

  &--danger {
    .zx-progress__inner {
      background: #f56c6c;
    }
  }

  &--info {
    .zx-progress__inner {
      background: #909399;
    }
  }
}

@keyframes progress-stripes {
  from {
    background-position: 0 0;
  }
  to {
    background-position: 20px 0;
  }
}
</style> 