<template>
  <div class="zx-timeline-item">
    <div class="zx-timeline-item__dot"></div>
    <div class="zx-timeline-item__line"></div>
    <div class="zx-timeline-item__content">
      <div v-if="$slots.timestamp" class="zx-timeline-item__timestamp">
        <slot name="timestamp"></slot>
      </div>
      <div class="zx-timeline-item__title">
        <slot name="title"></slot>
      </div>
      <div class="zx-timeline-item__body">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ZxTimelineItem'
})
</script>

<style lang="scss" scoped>
.zx-timeline-item {
  position: relative;
  padding-left: 32px;
  padding-bottom: 24px;

  &:last-child {
    padding-bottom: 0;

    .zx-timeline-item__line {
      display: none;
    }
  }

  // 点
  &__dot {
    position: absolute;
    left: 0;
    top: 4px;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: var(--zx-primary-color);
    z-index: 1;
  }

  // 线
  &__line {
    position: absolute;
    left: 5px;
    top: 16px;
    bottom: 0;
    width: 2px;
    background-color: #e4e7ed;
  }

  // 内容
  &__content {
    position: relative;
  }

  // 时间戳
  &__timestamp {
    font-size: 14px;
    color: #909399;
    margin-bottom: 8px;
  }

  // 标题
  &__title {
    font-size: 16px;
    font-weight: 500;
    color: #303133;
    margin-bottom: 8px;
  }

  // 主体
  &__body {
    font-size: 14px;
    color: #606266;
    line-height: 1.5;
  }
}
</style> 