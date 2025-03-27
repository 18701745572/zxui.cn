<template>
  <div
    v-show="active"
    class="zx-tab-pane"
    :class="{ 'zx-tab-pane--active': active }"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { inject, onMounted } from 'vue'

interface Props {
  label: string
  name: string
  disabled?: boolean
  lazy?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  lazy: false
})

interface TabsContext {
  addPane: (pane: Props) => void
  activeTab: {
    value: string
  }
}

const tabs = inject<TabsContext>('tabs')

onMounted(() => {
  if (tabs) {
    tabs.addPane({
      label: props.label,
      name: props.name,
      disabled: props.disabled,
      lazy: props.lazy
    })
  }
})
</script>

<style lang="scss" scoped>
.zx-tab-pane {
  display: none;

  &--active {
    display: block;
  }
}
</style> 