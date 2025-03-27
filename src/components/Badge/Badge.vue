<template>
  <div class="zx-badge">
    <slot></slot>
    <div
      v-if="value !== undefined && value !== null"
      class="zx-badge__content"
      :class="[
        `zx-badge--${type}`,
        `zx-badge--${size}`,
        { 'zx-badge--dot': dot },
        { 'zx-badge--is-fixed': isFixed }
      ]"
    >
      <template v-if="!dot">
        {{ formatValue }}
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue'

type BadgeType = 'primary' | 'success' | 'warning' | 'danger' | 'info'
type BadgeSize = 'small' | 'medium' | 'large'

interface BadgeProps {
  value: string | number
  max: number
  type: BadgeType
  size: BadgeSize
  dot: boolean
  isFixed: boolean
}

export default defineComponent({
  name: 'ZxBadge',
  props: {
    value: {
      type: [String, Number] as PropType<string | number>,
      default: ''
    },
    max: {
      type: Number,
      default: 99
    },
    type: {
      type: String as PropType<BadgeType>,
      default: 'danger',
      validator: (value: BadgeType) => {
        return ['primary', 'success', 'warning', 'danger', 'info'].includes(value)
      }
    },
    size: {
      type: String as PropType<BadgeSize>,
      default: 'medium',
      validator: (value: BadgeSize) => {
        return ['small', 'medium', 'large'].includes(value)
      }
    },
    dot: {
      type: Boolean,
      default: false
    },
    isFixed: {
      type: Boolean,
      default: true
    }
  },
  setup(props: BadgeProps) {
    const formatValue = computed(() => {
      if (typeof props.value === 'number' && props.value > props.max) {
        return `${props.max}+`
      }
      return props.value
    })

    return {
      formatValue
    }
  }
})
</script>

<style lang="scss" scoped>
.zx-badge {
  position: relative;
  display: inline-block;
  line-height: 1;

  &__content {
    position: absolute;
    top: -10px;
    right: -10px;
    z-index: 1;
    height: 20px;
    padding: 0 6px;
    font-size: 12px;
    line-height: 20px;
    white-space: nowrap;
    text-align: center;
    border: 2px solid #fff;
    border-radius: 10px;
    transition: all 0.3s ease;
    background: #f56c6c;
    color: #fff;
    box-shadow: 0 0 0 1px #fff;

    // 尺寸
    &--small {
      height: 16px;
      padding: 0 4px;
      font-size: 10px;
      line-height: 16px;
      border-radius: 8px;
    }

    &--large {
      height: 24px;
      padding: 0 8px;
      font-size: 14px;
      line-height: 24px;
      border-radius: 12px;
    }

    // 点状
    &--dot {
      width: 8px;
      height: 8px;
      padding: 0;
      border-radius: 50%;
      border: none;
      box-shadow: none;

      &.zx-badge--small {
        width: 6px;
        height: 6px;
      }

      &.zx-badge--large {
        width: 10px;
        height: 10px;
      }
    }

    // 固定定位
    &--is-fixed {
      position: fixed;
      transform: translate(50%, -50%);
    }

    // 主题样式
    &--primary {
      background: #409eff;
    }

    &--success {
      background: #67c23a;
    }

    &--warning {
      background: #e6a23c;
    }

    &--danger {
      background: #f56c6c;
    }

    &--info {
      background: #909399;
    }
  }
}
</style> 