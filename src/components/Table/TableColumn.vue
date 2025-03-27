<template>
  <div class="zx-table-column">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { inject, onMounted } from 'vue'

interface Props {
  prop: string
  label: string
  width?: string | number
  align?: 'left' | 'center' | 'right'
  sortable?: boolean
  fixed?: 'left' | 'right' | false
}

const props = withDefaults(defineProps<Props>(), {
  width: 'auto',
  align: 'left',
  sortable: false,
  fixed: false
})

interface TableContext {
  addColumn: (column: Props) => void
}

const table = inject<TableContext>('table')

onMounted(() => {
  if (table) {
    table.addColumn({
      prop: props.prop,
      label: props.label,
      width: props.width,
      align: props.align,
      sortable: props.sortable,
      fixed: props.fixed
    })
  }
})
</script>

<style lang="scss" scoped>
.zx-table-column {
  display: none;
}
</style> 