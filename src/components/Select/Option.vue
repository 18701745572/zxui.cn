<template>
  <div 
    class="zx-option"
    :class="{
      'zx-option--disabled': disabled
    }"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { inject, computed } from 'vue'

interface Props {
  value: string | number
  label?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  label: '',
  disabled: false
})

interface SelectContext {
  selectedValue: {
    value: string | number | (string | number)[]
  }
  handleOptionClick: (value: string | number) => void
}

const select = inject<SelectContext>('select')

const isSelected = computed(() => {
  if (Array.isArray(select?.selectedValue.value)) {
    return select?.selectedValue.value.includes(props.value)
  }
  return select?.selectedValue.value === props.value
})

const handleClick = () => {
  if (props.disabled) return
  select?.handleOptionClick(props.value)
}
</script>

<style lang="scss" scoped>
.zx-option {
  display: none;
}
</style> 