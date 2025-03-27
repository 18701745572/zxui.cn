<template>
  <div
    class="zx-skeleton"
    :class="[
      `zx-skeleton--${type}`,
      `zx-skeleton--${size}`,
      { 'zx-skeleton--animated': animated },
      { 'zx-skeleton--rounded': rounded }
    ]"
  >
    <template v-if="rows === 1">
      <div
        class="zx-skeleton__item"
        :style="{
          width: width,
          height: height
        }"
      ></div>
    </template>
    <template v-else>
      <div
        v-for="i in rows"
        :key="i"
        class="zx-skeleton__item"
        :style="{
          width: width,
          height: height,
          marginBottom: i === rows ? 0 : gap + 'px'
        }"
      ></div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ZxSkeleton',
  props: {
    type: {
      type: String,
      default: 'text',
      validator: (value: string) => {
        return ['text', 'image', 'avatar', 'button'].includes(value)
      }
    },
    size: {
      type: String,
      default: 'medium',
      validator: (value: string) => {
        return ['small', 'medium', 'large'].includes(value)
      }
    },
    rows: {
      type: Number,
      default: 1,
      validator: (value: number) => {
        return value > 0
      }
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '16px'
    },
    gap: {
      type: Number,
      default: 8
    },
    animated: {
      type: Boolean,
      default: true
    },
    rounded: {
      type: Boolean,
      default: false
    }
  }
})
</script>

<style lang="scss" scoped>
.zx-skeleton {
  display: flex;
  flex-direction: column;

  // 尺寸
  &--small {
    .zx-skeleton__item {
      height: 12px;
    }
  }

  &--medium {
    .zx-skeleton__item {
      height: 16px;
    }
  }

  &--large {
    .zx-skeleton__item {
      height: 20px;
    }
  }

  // 类型
  &--text {
    .zx-skeleton__item {
      width: 100%;
    }
  }

  &--image {
    .zx-skeleton__item {
      width: 100%;
      height: 200px;
    }
  }

  &--avatar {
    .zx-skeleton__item {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }

  &--button {
    .zx-skeleton__item {
      width: 80px;
      height: 32px;
      border-radius: 4px;
    }
  }

  // 项目
  &__item {
    background: #f0f0f0;
    position: relative;
    overflow: hidden;

    // 圆角
    .zx-skeleton--rounded & {
      border-radius: 4px;
    }

    // 动画
    .zx-skeleton--animated &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(
        90deg,
        rgba(255, 255, 255, 0) 0%,
        rgba(255, 255, 255, 0.3) 50%,
        rgba(255, 255, 255, 0) 100%
      );
      animation: skeleton-shimmer 1.5s infinite;
    }
  }
}

@keyframes skeleton-shimmer {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(100%);
  }
}
</style> 