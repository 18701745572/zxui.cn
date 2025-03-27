<template>
  <div class="zx-transfer" :class="[`zx-transfer--${size}`]">
    <div class="zx-transfer__panel zx-transfer__panel--source">
      <div class="zx-transfer__header">
        <div class="zx-transfer__title">
          <slot name="source-title">源列表</slot>
        </div>
        <div class="zx-transfer__count">
          {{ sourceChecked.length }}/{{ sourceData.length }}
        </div>
      </div>
      <div class="zx-transfer__body">
        <div class="zx-transfer__search" v-if="filterable">
          <input
            v-model="sourceQuery"
            type="text"
            class="zx-transfer__input"
            :placeholder="sourcePlaceholder"
            @input="handleSourceSearch"
          >
        </div>
        <div class="zx-transfer__list">
          <div
            v-for="item in filteredSourceData"
            :key="item.key"
            class="zx-transfer__item"
            :class="{
              'zx-transfer__item--checked': sourceChecked.includes(item.key),
              'zx-transfer__item--disabled': item.disabled
            }"
            @click="handleSourceSelect(item)"
          >
            <span class="zx-transfer__checkbox">
              <i class="zx-icon-check"></i>
            </span>
            <span class="zx-transfer__label">{{ item.label }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="zx-transfer__buttons">
      <button
        class="zx-transfer__button"
        :class="{ 'zx-transfer__button--disabled': !sourceChecked.length }"
        @click="handleToTarget"
      >
        <i class="zx-icon-arrow-right"></i>
      </button>
      <button
        class="zx-transfer__button"
        :class="{ 'zx-transfer__button--disabled': !targetChecked.length }"
        @click="handleToSource"
      >
        <i class="zx-icon-arrow-left"></i>
      </button>
    </div>
    <div class="zx-transfer__panel zx-transfer__panel--target">
      <div class="zx-transfer__header">
        <div class="zx-transfer__title">
          <slot name="target-title">目标列表</slot>
        </div>
        <div class="zx-transfer__count">
          {{ targetChecked.length }}/{{ targetData.length }}
        </div>
      </div>
      <div class="zx-transfer__body">
        <div class="zx-transfer__search" v-if="filterable">
          <input
            v-model="targetQuery"
            type="text"
            class="zx-transfer__input"
            :placeholder="targetPlaceholder"
            @input="handleTargetSearch"
          >
        </div>
        <div class="zx-transfer__list">
          <div
            v-for="item in filteredTargetData"
            :key="item.key"
            class="zx-transfer__item"
            :class="{
              'zx-transfer__item--checked': targetChecked.includes(item.key),
              'zx-transfer__item--disabled': item.disabled
            }"
            @click="handleTargetSelect(item)"
          >
            <span class="zx-transfer__checkbox">
              <i class="zx-icon-check"></i>
            </span>
            <span class="zx-transfer__label">{{ item.label }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

type TransferSize = 'small' | 'medium' | 'large'

interface TransferItem {
  key: string | number
  label: string
  disabled?: boolean
}

interface Props {
  data: TransferItem[]
  value: (string | number)[]
  size?: TransferSize
  filterable?: boolean
  filterPlaceholder?: string
  titles?: [string, string]
  buttonTexts?: [string, string]
}

const props = withDefaults(defineProps<Props>(), {
  size: 'medium',
  filterable: false,
  filterPlaceholder: '请输入搜索内容',
  titles: () => ['列表 1', '列表 2'],
  buttonTexts: () => ['向右', '向左']
})

interface Emits {
  (e: 'update:value', value: (string | number)[]): void
  (e: 'change', value: (string | number)[], direction: 'left' | 'right'): void
}

const emit = defineEmits<Emits>()

const sourceFilter = ref('')
const targetFilter = ref('')
const sourceChecked = ref<(string | number)[]>([])
const targetChecked = ref<(string | number)[]>([])

// 源数据列表
const sourceData = computed(() => {
  return props.data.filter((item: TransferItem) => !props.value.includes(item.key))
})

// 目标数据列表
const targetData = computed(() => {
  return props.data.filter((item: TransferItem) => props.value.includes(item.key))
})

// 过滤后的源数据列表
const filteredSourceData = computed(() => {
  if (!sourceFilter.value) return sourceData.value
  return sourceData.value.filter((item: TransferItem) =>
    item.label.toLowerCase().includes(sourceFilter.value.toLowerCase())
  )
})

// 过滤后的目标数据列表
const filteredTargetData = computed(() => {
  if (!targetFilter.value) return targetData.value
  return targetData.value.filter((item: TransferItem) =>
    item.label.toLowerCase().includes(targetFilter.value.toLowerCase())
  )
})

// 处理源数据选中
const handleSourceSelect = (item: TransferItem) => {
  if (item.disabled) return
  const index = sourceChecked.value.indexOf(item.key)
  if (index === -1) {
    sourceChecked.value.push(item.key)
  } else {
    sourceChecked.value.splice(index, 1)
  }
}

// 处理目标数据选中
const handleTargetSelect = (item: TransferItem) => {
  if (item.disabled) return
  const index = targetChecked.value.indexOf(item.key)
  if (index === -1) {
    targetChecked.value.push(item.key)
  } else {
    targetChecked.value.splice(index, 1)
  }
}

// 向右移动
const handleToTarget = () => {
  if (!sourceChecked.value.length) return
  const newValue = [...props.value, ...sourceChecked.value]
  emit('update:value', newValue)
  emit('change', newValue, 'right')
  sourceChecked.value = []
}

// 向左移动
const handleToSource = () => {
  if (!targetChecked.value.length) return
  const newValue = props.value.filter((key: string | number) => !targetChecked.value.includes(key))
  emit('update:value', newValue)
  emit('change', newValue, 'left')
  targetChecked.value = []
}

// 处理源数据搜索
const handleSourceSearch = () => {
  sourceChecked.value = []
}

// 处理目标数据搜索
const handleTargetSearch = () => {
  targetChecked.value = []
}
</script>

<style lang="scss" scoped>
.zx-transfer {
  display: flex;
  align-items: stretch;
  gap: 16px;

  // 尺寸
  &--small {
    .zx-transfer__panel {
      width: 200px;
    }

    .zx-transfer__header {
      height: 32px;
    }

    .zx-transfer__input {
      height: 28px;
      font-size: 14px;
    }

    .zx-transfer__item {
      height: 28px;
      font-size: 14px;
    }
  }

  &--medium {
    .zx-transfer__panel {
      width: 240px;
    }

    .zx-transfer__header {
      height: 40px;
    }

    .zx-transfer__input {
      height: 32px;
      font-size: 14px;
    }

    .zx-transfer__item {
      height: 32px;
      font-size: 14px;
    }
  }

  &--large {
    .zx-transfer__panel {
      width: 280px;
    }

    .zx-transfer__header {
      height: 48px;
    }

    .zx-transfer__input {
      height: 36px;
      font-size: 16px;
    }

    .zx-transfer__item {
      height: 36px;
      font-size: 16px;
    }
  }

  // 面板
  &__panel {
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    overflow: hidden;
  }

  // 头部
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 12px;
    background-color: #f5f7fa;
    border-bottom: 1px solid #dcdfe6;
  }

  // 标题
  &__title {
    font-size: 14px;
    font-weight: 500;
    color: #303133;
  }

  // 计数
  &__count {
    font-size: 12px;
    color: #909399;
  }

  // 主体
  &__body {
    height: 300px;
    overflow: hidden;
  }

  // 搜索
  &__search {
    padding: 8px;
  }

  // 输入框
  &__input {
    width: 100%;
    height: 32px;
    padding: 0 8px;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    font-size: 14px;
    transition: all 0.3s;

    &:focus {
      border-color: var(--zx-primary-color);
      outline: none;
    }
  }

  // 列表
  &__list {
    height: calc(100% - 48px);
    overflow-y: auto;
  }

  // 项目
  &__item {
    display: flex;
    align-items: center;
    padding: 0 12px;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      background-color: #f5f7fa;
    }

    &--checked {
      background-color: #f0f9ff;
      color: var(--zx-primary-color);
    }

    &--disabled {
      cursor: not-allowed;
      color: #c0c4cc;
      opacity: 0.6;

      &:hover {
        background-color: transparent;
      }
    }
  }

  // 复选框
  &__checkbox {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    margin-right: 8px;
    border: 1px solid #dcdfe6;
    border-radius: 2px;
    color: #fff;
    transition: all 0.3s;

    .zx-transfer__item--checked & {
      background-color: var(--zx-primary-color);
      border-color: var(--zx-primary-color);
    }
  }

  // 标签
  &__label {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  // 按钮
  &__buttons {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 8px;
  }

  &__button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    background-color: #fff;
    color: #606266;
    cursor: pointer;
    transition: all 0.3s;

    &:hover:not(.zx-transfer__button--disabled) {
      border-color: var(--zx-primary-color);
      color: var(--zx-primary-color);
    }

    &--disabled {
      cursor: not-allowed;
      color: #c0c4cc;
      opacity: 0.6;

      &:hover {
        border-color: #dcdfe6;
      }
    }
  }
}
</style> 