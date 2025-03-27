<template>
  <div
    class="zx-txt"
    :class="[
      `zx-txt--${size}`,
      {
        'is-disabled': disabled
      }
    ]"
  >
    <div
      class="zx-txt__preview"
      @click="handlePreview"
    >
      <pre
        v-if="content"
        class="zx-txt__content"
        :style="contentStyle"
      >{{ content }}</pre>
      <div
        v-else
        class="zx-txt__placeholder"
      >
        <i class="zx-icon-file-text" />
      </div>
    </div>
    <div
      v-if="showActions"
      class="zx-txt__actions"
    >
      <span
        class="zx-txt__action"
        @click="handlePreview"
      >
        <i class="zx-icon-zoom-in" />
      </span>
      <span
        class="zx-txt__action"
        @click="handleEdit"
      >
        <i class="zx-icon-edit" />
      </span>
      <span
        class="zx-txt__action"
        @click="handleDownload"
      >
        <i class="zx-icon-download" />
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps({
  // 文本内容
  content: {
    type: String,
    default: ''
  },
  // 文本大小
  size: {
    type: String,
    default: 'default',
    validator: (value: string) => {
      return ['large', 'default', 'small'].includes(value)
    }
  },
  // 是否禁用
  disabled: {
    type: Boolean,
    default: false
  },
  // 是否显示操作按钮
  showActions: {
    type: Boolean,
    default: true
  },
  // 是否允许编辑
  allowEdit: {
    type: Boolean,
    default: true
  },
  // 是否允许下载
  allowDownload: {
    type: Boolean,
    default: true
  },
  // 字体大小
  fontSize: {
    type: Number,
    default: 14
  },
  // 行高
  lineHeight: {
    type: Number,
    default: 1.5
  }
})

const emit = defineEmits(['preview', 'edit', 'download'])

// 计算内容样式
const contentStyle = computed(() => {
  return {
    fontSize: `${props.fontSize}px`,
    lineHeight: props.lineHeight
  }
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
.zx-txt {
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

  &__content {
    margin: 0;
    padding: 0;
    white-space: pre-wrap;
    word-wrap: break-word;
    text-align: left;
    color: #606266;
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

    .zx-txt__preview,
    .zx-txt__action {
      cursor: not-allowed;
    }
  }
}
</style> 