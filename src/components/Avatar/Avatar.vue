<template>
  <div 
    class="z-avatar"
    :class="[
      `z-avatar--${size}`,
      `z-avatar--${shape}`,
      { 'z-avatar--fit': fit }
    ]"
    :style="style"
  >
    <img
      v-if="src && !hasError"
      :src="src"
      @error="handleError"
      :alt="alt"
    >
    <span v-else-if="$slots.default" class="z-avatar__text">
      <slot></slot>
    </span>
    <i v-else class="z-icon-user"></i>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

interface Props {
  size?: string | number
  shape?: 'circle' | 'square'
  src?: string
  alt?: string
  fit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down'
}

const props = withDefaults(defineProps<Props>(), {
  size: 'default',
  shape: 'circle',
  fit: 'cover'
})

const hasError = ref(false)

const style = computed(() => {
  if (typeof props.size === 'number') {
    return {
      width: props.size + 'px',
      height: props.size + 'px',
      lineHeight: props.size + 'px'
    }
  }
  return {}
})

const handleError = () => {
  hasError.value = true
}
</script>

<style lang="scss" scoped>
.z-avatar {
  display: inline-block;
  box-sizing: border-box;
  text-align: center;
  overflow: hidden;
  color: var(--z-text-color-regular);
  background: var(--z-bg-color-page);
  border: 1px solid var(--z-border-color);

  img {
    display: block;
    width: 100%;
    height: 100%;
  }

  &--fit {
    img {
      object-fit: v-bind('props.fit');
    }
  }

  &--circle {
    border-radius: 50%;
  }

  &--square {
    border-radius: var(--z-border-radius-base);
  }

  &--small {
    width: 32px;
    height: 32px;
    line-height: 32px;
    font-size: var(--z-font-size-small);
  }

  &--default {
    width: 40px;
    height: 40px;
    line-height: 40px;
    font-size: var(--z-font-size-base);
  }

  &--large {
    width: 48px;
    height: 48px;
    line-height: 48px;
    font-size: var(--z-font-size-large);
  }
}

.z-avatar__text {
  display: inline-block;
  width: 100%;
  height: 100%;
  text-align: center;
}
</style> 