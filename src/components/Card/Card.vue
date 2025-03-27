<template>
  <div class="zx-card" :class="[
    `zx-card--${type}`,
    { 'zx-card--hover': hover },
    { 'zx-card--bordered': bordered }
  ]">
    <div v-if="$slots.header" class="zx-card__header">
      <slot name="header"></slot>
    </div>
    <div class="zx-card__body">
      <slot></slot>
    </div>
    <div v-if="$slots.footer" class="zx-card__footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ZxCard',
  props: {
    type: {
      type: String,
      default: 'default',
      validator: (value: string) => {
        return ['default', 'primary', 'success', 'warning', 'danger'].includes(value)
      }
    },
    hover: {
      type: Boolean,
      default: false
    },
    bordered: {
      type: Boolean,
      default: true
    }
  }
})
</script>

<style lang="scss" scoped>
.zx-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  transition: all 0.3s ease;
  overflow: hidden;
  position: relative;

  &--hover {
    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
    }
  }

  &--bordered {
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  &__header {
    padding: 16px 20px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    font-size: 16px;
    font-weight: 500;
  }

  &__body {
    padding: 20px;
  }

  &__footer {
    padding: 16px 20px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }

  // 主题样式
  &--default {
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
  }

  &--primary {
    background: linear-gradient(135deg, rgba(64, 158, 255, 0.1), rgba(64, 158, 255, 0.05));
    border-color: rgba(64, 158, 255, 0.2);
  }

  &--success {
    background: linear-gradient(135deg, rgba(103, 194, 58, 0.1), rgba(103, 194, 58, 0.05));
    border-color: rgba(103, 194, 58, 0.2);
  }

  &--warning {
    background: linear-gradient(135deg, rgba(230, 162, 60, 0.1), rgba(230, 162, 60, 0.05));
    border-color: rgba(230, 162, 60, 0.2);
  }

  &--danger {
    background: linear-gradient(135deg, rgba(245, 108, 108, 0.1), rgba(245, 108, 108, 0.05));
    border-color: rgba(245, 108, 108, 0.2);
  }
}
</style> 