<template>
  <div
    class="zx-markdown"
    :class="[
      `zx-markdown--${size}`,
      {
        'is-disabled': disabled
      }
    ]"
  >
    <div
      class="zx-markdown__preview"
      @click="handlePreview"
    >
      <div
        v-if="content"
        class="zx-markdown__content"
        :style="contentStyle"
        v-html="renderedContent"
      />
      <div
        v-else
        class="zx-markdown__placeholder"
      >
        <i class="zx-icon-file-markdown" />
      </div>
    </div>
    <div
      v-if="showActions"
      class="zx-markdown__actions"
    >
      <span
        class="zx-markdown__action"
        @click="handlePreview"
      >
        <i class="zx-icon-zoom-in" />
      </span>
      <span
        class="zx-markdown__action"
        @click="handleEdit"
      >
        <i class="zx-icon-edit" />
      </span>
      <span
        class="zx-markdown__action"
        @click="handleDownload"
      >
        <i class="zx-icon-download" />
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { marked } from 'marked'

const props = defineProps({
  // Markdown内容
  content: {
    type: String,
    default: ''
  },
  // 组件大小
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
    default: 1.6
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

// 渲染Markdown内容
const renderedContent = computed(() => {
  if (!props.content) return ''
  return marked(props.content)
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
.zx-markdown {
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
    text-align: left;
    color: #606266;

    :deep(h1) {
      font-size: 2em;
      margin: 0.67em 0;
      font-weight: bold;
    }

    :deep(h2) {
      font-size: 1.5em;
      margin: 0.83em 0;
      font-weight: bold;
    }

    :deep(h3) {
      font-size: 1.17em;
      margin: 1em 0;
      font-weight: bold;
    }

    :deep(p) {
      margin: 1em 0;
    }

    :deep(ul), :deep(ol) {
      margin: 1em 0;
      padding-left: 2em;
    }

    :deep(li) {
      margin: 0.5em 0;
    }

    :deep(code) {
      background-color: #f5f7fa;
      padding: 0.2em 0.4em;
      border-radius: 3px;
      font-family: monospace;
    }

    :deep(pre) {
      background-color: #f5f7fa;
      padding: 1em;
      border-radius: 4px;
      overflow: auto;
    }

    :deep(blockquote) {
      margin: 1em 0;
      padding-left: 1em;
      border-left: 4px solid #dcdfe6;
      color: #909399;
    }

    :deep(table) {
      border-collapse: collapse;
      width: 100%;
      margin: 1em 0;
    }

    :deep(th), :deep(td) {
      border: 1px solid #dcdfe6;
      padding: 0.5em;
      text-align: left;
    }

    :deep(th) {
      background-color: #f5f7fa;
      font-weight: bold;
    }

    :deep(img) {
      max-width: 100%;
      height: auto;
    }

    :deep(a) {
      color: #409eff;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
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

    .zx-markdown__preview,
    .zx-markdown__action {
      cursor: not-allowed;
    }
  }
}
</style> 