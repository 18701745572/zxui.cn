<template>
  <div class="zx-upload" :class="[`zx-upload--${size}`]">
    <div
      class="zx-upload__trigger"
      :class="{
        'zx-upload__trigger--disabled': disabled,
        'zx-upload__trigger--dragover': isDragover
      }"
      @click="handleClick"
      @dragenter.prevent="handleDragEnter"
      @dragover.prevent="handleDragOver"
      @dragleave.prevent="handleDragLeave"
      @drop.prevent="handleDrop"
    >
      <input
        ref="input"
        type="file"
        class="zx-upload__input"
        :accept="accept"
        :multiple="multiple"
        :disabled="disabled"
        @change="handleChange"
      >
      <div class="zx-upload__content">
        <i class="zx-icon-upload"></i>
        <div class="zx-upload__text">
          <slot>
            <span>点击或拖拽文件到此处上传</span>
          </slot>
        </div>
        <div v-if="tip" class="zx-upload__tip">{{ tip }}</div>
      </div>
    </div>
    <div v-if="fileList.length" class="zx-upload__list">
      <div
        v-for="file in fileList"
        :key="file.uid"
        class="zx-upload__item"
        :class="{
          'zx-upload__item--success': file.status === 'success',
          'zx-upload__item--error': file.status === 'error'
        }"
      >
        <div class="zx-upload__item-content">
          <i class="zx-icon-file"></i>
          <span class="zx-upload__item-name">{{ file.name }}</span>
          <span class="zx-upload__item-size">{{ formatSize(file.size) }}</span>
        </div>
        <div class="zx-upload__item-actions">
          <button
            v-if="file.status === 'success'"
            class="zx-upload__item-preview"
            @click="handlePreview(file)"
          >
            <i class="zx-icon-view"></i>
          </button>
          <button
            class="zx-upload__item-delete"
            @click="handleRemove(file)"
          >
            <i class="zx-icon-delete"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { UploadFile } from '../../types/common'

interface Props {
  value: UploadFile[]
  size?: 'small' | 'medium' | 'large'
  accept?: string
  multiple?: boolean
  disabled?: boolean
  tip?: string
  maxSize?: number
}

const props = withDefaults(defineProps<Props>(), {
  value: () => [],
  size: 'medium',
  accept: '',
  multiple: false,
  disabled: false,
  tip: '',
  maxSize: 10 * 1024 * 1024 // 10MB
})

const emit = defineEmits<{
  'update:value': [value: UploadFile[]]
  'change': [files: UploadFile[]]
  'preview': [file: UploadFile]
  'remove': [file: UploadFile]
}>()

const input = ref<HTMLInputElement | null>(null)
const isDragover = ref(false)
const fileList = computed(() => props.value)

const handleClick = () => {
  if (props.disabled) return
  input.value?.click()
}

const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (!target.files?.length) return
  handleFiles([...target.files])
  target.value = ''
}

const handleDragEnter = () => {
  if (props.disabled) return
  isDragover.value = true
}

const handleDragOver = () => {
  if (props.disabled) return
  isDragover.value = true
}

const handleDragLeave = () => {
  isDragover.value = false
}

const handleDrop = (event: DragEvent) => {
  isDragover.value = false
  if (props.disabled) return
  const files = event.dataTransfer?.files
  if (!files?.length) return
  handleFiles([...files])
}

const handleFiles = (files: File[]) => {
  const validFiles = files.filter(file => {
    if (file.size > props.maxSize) {
      console.warn(`文件 ${file.name} 超过最大限制 ${props.maxSize / 1024 / 1024}MB`)
      return false
    }
    return true
  })

  const newFiles = validFiles.map(file => ({
    uid: Date.now() + Math.random().toString(36).slice(2),
    name: file.name,
    size: file.size,
    type: file.type,
    status: 'success' as const,
    raw: file
  }))

  const newValue = props.multiple
    ? [...props.value, ...newFiles]
    : newFiles

  emit('update:value', newValue)
  emit('change', newFiles)
}

const handlePreview = (file: UploadFile) => {
  emit('preview', file)
}

const handleRemove = (file: UploadFile) => {
  const index = props.value.findIndex((item: UploadFile) => item.uid === file.uid)
  if (index === -1) return
  const newValue = [...props.value]
  newValue.splice(index, 1)
  emit('update:value', newValue)
  emit('remove', file)
}

const formatSize = (size: number) => {
  if (size < 1024) return size + 'B'
  if (size < 1024 * 1024) return (size / 1024).toFixed(2) + 'KB'
  if (size < 1024 * 1024 * 1024) return (size / 1024 / 1024).toFixed(2) + 'MB'
  return (size / 1024 / 1024 / 1024).toFixed(2) + 'GB'
}
</script>

<style lang="scss" scoped>
.zx-upload {
  // 尺寸
  &--small {
    .zx-upload__trigger {
      height: 120px;
    }

    .zx-upload__text {
      font-size: 14px;
    }

    .zx-upload__tip {
      font-size: 12px;
    }

    .zx-upload__item {
      height: 32px;
      font-size: 14px;
    }
  }

  &--medium {
    .zx-upload__trigger {
      height: 160px;
    }

    .zx-upload__text {
      font-size: 16px;
    }

    .zx-upload__tip {
      font-size: 14px;
    }

    .zx-upload__item {
      height: 40px;
      font-size: 14px;
    }
  }

  &--large {
    .zx-upload__trigger {
      height: 200px;
    }

    .zx-upload__text {
      font-size: 18px;
    }

    .zx-upload__tip {
      font-size: 16px;
    }

    .zx-upload__item {
      height: 48px;
      font-size: 16px;
    }
  }

  // 触发器
  &__trigger {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 160px;
    border: 2px dashed #dcdfe6;
    border-radius: 4px;
    background-color: #fafafa;
    cursor: pointer;
    transition: all 0.3s;

    &:hover:not(.zx-upload__trigger--disabled) {
      border-color: var(--zx-primary-color);
    }

    &--disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }

    &--dragover {
      border-color: var(--zx-primary-color);
      background-color: #f0f9ff;
    }
  }

  // 输入框
  &__input {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
  }

  // 内容
  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }

  // 图标
  .zx-icon-upload {
    font-size: 32px;
    color: #909399;
  }

  // 文本
  &__text {
    color: #606266;
    text-align: center;
  }

  // 提示
  &__tip {
    color: #909399;
    text-align: center;
  }

  // 列表
  &__list {
    margin-top: 16px;
  }

  // 项目
  &__item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 40px;
    padding: 0 12px;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    background-color: #fff;
    transition: all 0.3s;

    &:hover {
      border-color: var(--zx-primary-color);
    }

    &--success {
      border-color: var(--zx-success-color);
    }

    &--error {
      border-color: var(--zx-danger-color);
    }
  }

  // 项目内容
  &__item-content {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  // 项目名称
  &__item-name {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  // 项目大小
  &__item-size {
    color: #909399;
  }

  // 项目操作
  &__item-actions {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  // 预览按钮
  &__item-preview {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    border: none;
    background: none;
    color: var(--zx-primary-color);
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      color: var(--zx-primary-color-light);
    }
  }

  // 删除按钮
  &__item-delete {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    border: none;
    background: none;
    color: #909399;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      color: var(--zx-danger-color);
    }
  }
}
</style> 