<template>
  <div class="zx-table" :class="{ 'is-loading': loading }">
    <div class="zx-table__header-wrapper">
      <table class="zx-table__header">
        <colgroup>
          <col v-for="column in columns" :key="column.prop" :width="column.width">
        </colgroup>
        <thead>
          <tr>
            <th
              v-for="column in columns"
              :key="column.prop"
              :class="[
                column.className,
                {
                  'is-sortable': column.sortable,
                  'is-sorted': sortBy === column.prop,
                  [`is-sorted-${sortOrder}`]: sortBy === column.prop
                }
              ]"
              @click="handleSort(column)"
            >
              <div class="zx-table__cell">
                <span>{{ column.label }}</span>
                <span v-if="column.sortable" class="zx-table__sort">
                  <i class="zx-table__sort-icon"></i>
                </span>
              </div>
            </th>
          </tr>
        </thead>
      </table>
    </div>
    <div class="zx-table__body-wrapper">
      <table class="zx-table__body">
        <colgroup>
          <col v-for="column in columns" :key="column.prop" :width="column.width">
        </colgroup>
        <tbody>
          <tr
            v-for="(row, index) in data"
            :key="index"
            :class="{
              'is-selected': isSelected(row)
            }"
            @click="handleRowClick(row)"
          >
            <td
              v-for="column in columns"
              :key="column.prop"
              :class="column.className"
            >
              <div class="zx-table__cell">
                <slot
                  :name="column.prop"
                  :row="row"
                  :column="column"
                  :index="index"
                >
                  {{ row[column.prop] }}
                </slot>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="loading" class="zx-table__loading">
      <div class="zx-table__loading-spinner"></div>
    </div>
    <div v-if="!loading && data.length === 0" class="zx-table__empty">
      {{ emptyText }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, PropType } from 'vue'
import type { TableColumn } from '../../types/common'

type TableSortOrder = 'ascending' | 'descending'

interface TableSortChange {
  prop: string
  order: TableSortOrder
}

interface TableProps<T = any> {
  data: T[]
  columns: TableColumn[]
  loading: boolean
  emptyText: string
  selection: T[]
  border: boolean
  stripe: boolean
}

interface TableEmits<T = any> {
  (e: 'sort-change', change: TableSortChange): void
  (e: 'row-click', row: T): void
  (e: 'selection-change', selection: T[]): void
}

export default defineComponent({
  name: 'ZxTable',
  props: {
    data: {
      type: Array as PropType<any[]>,
      required: true
    },
    columns: {
      type: Array as PropType<TableColumn[]>,
      required: true
    },
    loading: {
      type: Boolean,
      default: false
    },
    emptyText: {
      type: String,
      default: '暂无数据'
    },
    selection: {
      type: Array as PropType<any[]>,
      default: () => []
    },
    border: {
      type: Boolean,
      default: false
    },
    stripe: {
      type: Boolean,
      default: false
    }
  },
  emits: ['sort-change', 'row-click', 'selection-change'],
  setup(props: TableProps, { emit }: { emit: TableEmits }) {
    const sortBy = ref('')
    const sortOrder = ref<TableSortOrder>('ascending')

    const handleSort = (column: TableColumn) => {
      if (!column.sortable) return

      if (sortBy.value === column.prop) {
        sortOrder.value = sortOrder.value === 'ascending' ? 'descending' : 'ascending'
      } else {
        sortBy.value = column.prop
        sortOrder.value = 'ascending'
      }

      emit('sort-change', {
        prop: sortBy.value,
        order: sortOrder.value
      })
    }

    const handleRowClick = (row: any) => {
      emit('row-click', row)
    }

    const isSelected = (row: any) => {
      return props.selection.some((item: any) => item === row)
    }

    return {
      sortBy,
      sortOrder,
      handleSort,
      handleRowClick,
      isSelected
    }
  }
})
</script>

<style lang="scss" scoped>
.zx-table {
  position: relative;
  width: 100%;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  overflow: hidden;

  &.is-loading {
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(255, 255, 255, 0.9);
      z-index: 1;
    }
  }

  &__header-wrapper,
  &__body-wrapper {
    overflow: auto;
  }

  &__header,
  &__body {
    width: 100%;
    border-collapse: collapse;
  }

  &__header {
    background-color: #f5f7fa;
  }

  th {
    padding: 12px 0;
    background-color: #f5f7fa;
    color: #606266;
    font-weight: 500;
    text-align: left;
    border-bottom: 1px solid #ebeef5;
    transition: background-color 0.2s ease;

    &.is-sortable {
      cursor: pointer;

      &:hover {
        background-color: #ebeef5;
      }
    }

    &.is-sorted {
      color: var(--zx-primary-color, #409eff);
    }
  }

  td {
    padding: 12px 0;
    border-bottom: 1px solid #ebeef5;
    transition: background-color 0.2s ease;
  }

  tr {
    &:hover {
      td {
        background-color: #f5f7fa;
      }
    }

    &.is-selected {
      td {
        background-color: #f0f9ff;
      }
    }
  }

  &__cell {
    padding: 0 12px;
    line-height: 20px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__sort {
    display: inline-block;
    margin-left: 4px;
    vertical-align: middle;
  }

  &__sort-icon {
    display: inline-block;
    width: 0;
    height: 0;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-bottom: 4px solid #c0c4cc;
    transition: transform 0.2s ease;

    .is-sorted-ascending & {
      transform: rotate(180deg);
    }
  }

  &__loading {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
  }

  &__loading-spinner {
    width: 32px;
    height: 32px;
    border: 3px solid #f3f3f3;
    border-top: 3px solid var(--zx-primary-color, #409eff);
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  &__empty {
    padding: 32px 0;
    text-align: center;
    color: #909399;
    font-size: 14px;
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style> 