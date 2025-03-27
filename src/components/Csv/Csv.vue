<template>
  <div
    class="zx-csv"
    :class="[
      `zx-csv--${size}`,
      {
        'is-disabled': disabled
      }
    ]"
  >
    <div
      class="zx-csv__preview"
      @click="handlePreview"
    >
      <table
        v-if="content"
        class="zx-csv__table"
        :style="tableStyle"
      >
        <thead>
          <tr>
            <th
              v-for="(header, index) in headers"
              :key="index"
              class="zx-csv__header"
            >
              {{ header }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(row, rowIndex) in rows"
            :key="rowIndex"
            class="zx-csv__row"
          >
            <td
              v-for="(cell, cellIndex) in row"
              :key="cellIndex"
              class="zx-csv__cell"
            >
              {{ cell }}
            </td>
          </tr>
        </tbody>
      </table>
      <div
        v-else
        class="zx-csv__placeholder"
      >
        <i class="zx-icon-file-csv" />
      </div>
    </div>
    <div
      v-if="showActions"
      class="zx-csv__actions"
    >
      <span
        class="zx-csv__action"
        @click="handlePreview"
      >
        <i class="zx-icon-zoom-in" />
      </span>
      <span
        class="zx-csv__action"
        @click="handleEdit"
      >
        <i class="zx-icon-edit" />
      </span>
      <span
        class="zx-csv__action"
        @click="handleDownload"
      >
        <i class="zx-icon-download" />
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

type CsvSize = 'large' | 'default' | 'small'

interface Props {
  content?: string
  size?: CsvSize
  disabled?: boolean
  showActions?: boolean
  allowEdit?: boolean
  allowDownload?: boolean
  fontSize?: number
  lineHeight?: number
  delimiter?: string
}

const props = withDefaults(defineProps<Props>(), {
  content: '',
  size: 'default',
  disabled: false,
  showActions: true,
  allowEdit: true,
  allowDownload: true,
  fontSize: 14,
  lineHeight: 1.6,
  delimiter: ','
})

interface Emits {
  (e: 'preview'): void
  (e: 'edit'): void
  (e: 'download'): void
}

const emit = defineEmits<Emits>()

// 计算表格样式
const tableStyle = computed(() => {
  return {
    fontSize: `${props.fontSize}px`,
    lineHeight: props.lineHeight
  }
})

// 解析CSV内容
const headers = computed(() => {
  if (!props.content) return []
  const lines = props.content.split('\n')
  if (lines.length === 0) return []
  return lines[0].split(props.delimiter)
})

// 解析CSV内容
const rows = computed(() => {
  if (!props.content) return []
  const lines = props.content.split('\n')
  if (lines.length <= 1) return []
  return lines.slice(1).map((line: string) => line.split(props.delimiter))
})

// 处理预览
const handlePreview = () => {
  if (props.disabled) return
  emit('preview')
}

// 处理编辑
const handleEdit = () => {
  if (props.disabled || !props.allowEdit) return
  emit('edit')
}

// 处理下载
const handleDownload = () => {
  if (props.disabled || !props.allowDownload) return
  emit('download')
}
</script>

<style lang="scss" scoped>
.zx-csv {
  position: relative;
  display: inline-block;
  width: 400px;
  height: 500px;
  line-height: 500px;
  text-align: center;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  overflow: hidden;
  background-color: #f5f7fa;

  &--large {
    width: 480px;
    height: 600px;
    line-height: 600px;
  }

  &--small {
    width: 320px;
    height: 400px;
    line-height: 400px;
  }

  &__preview {
    width: 100%;
    height: 100%;
    cursor: pointer;
    padding: 16px;
    box-sizing: border-box;
    overflow: auto;
  }

  &__table {
    width: 100%;
    border-collapse: collapse;
    margin: 0;
    padding: 0;
  }

  &__header {
    background-color: #f5f7fa;
    color: #606266;
    font-weight: bold;
    text-align: left;
    padding: 8px;
    border: 1px solid #dcdfe6;
    white-space: nowrap;
  }

  &__row {
    &:nth-child(even) {
      background-color: #fafafa;
    }

    &:hover {
      background-color: #f5f7fa;
    }
  }

  &__cell {
    color: #606266;
    text-align: left;
    padding: 8px;
    border: 1px solid #dcdfe6;
    white-space: nowrap;
  }

  &__placeholder {
    width: 100%;
    height: 100%;
    color: #909399;
    font-size: 24px;
  }

  &__actions {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
    opacity: 0;
    transition: opacity 0.3s;

    &:hover {
      opacity: 1;
    }
  }

  &__action {
    margin: 0 8px;
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    transition: transform 0.3s;

    &:hover {
      transform: scale(1.1);
    }
  }

  &.is-disabled {
    cursor: not-allowed;
    opacity: 0.6;

    .zx-csv__preview,
    .zx-csv__action {
      cursor: not-allowed;
    }
  }
}
</style> 