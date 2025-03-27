<template>
  <div class="zx-tabs" :class="[`zx-tabs--${type}`, `zx-tabs--${size}`]">
    <div class="zx-tabs__header">
      <div class="zx-tabs__nav">
        <div
          v-for="tab in tabs"
          :key="tab.name"
          class="zx-tabs__item"
          :class="{
            'zx-tabs__item--active': modelValue === tab.name,
            'zx-tabs__item--disabled': tab.disabled
          }"
          @click="handleClick(tab)"
        >
          <span class="zx-tabs__label">{{ tab.label }}</span>
          <span v-if="tab.closable" class="zx-tabs__close" @click.stop="handleClose(tab)">
            <i class="zx-icon-close"></i>
          </span>
        </div>
      </div>
      <div
        v-if="type === 'line'"
        class="zx-tabs__line"
        :style="{
          left: lineLeft + 'px',
          width: lineWidth + 'px'
        }"
      ></div>
    </div>
    <div class="zx-tabs__content">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch, nextTick, PropType } from 'vue'

type TabsType = 'line' | 'card'
type TabsSize = 'small' | 'medium' | 'large'
type TabName = string | number

interface Tab {
  name: TabName
  label: string
  disabled?: boolean
  closable?: boolean
}

interface TabsProps {
  modelValue: TabName
  type: TabsType
  size: TabsSize
}

interface TabsEmits {
  (e: 'update:modelValue', name: TabName): void
  (e: 'tab-click', tab: Tab): void
  (e: 'tab-remove', tab: Tab): void
}

export default defineComponent({
  name: 'ZxTabs',
  props: {
    modelValue: {
      type: [String, Number] as PropType<TabName>,
      required: true
    },
    type: {
      type: String as PropType<TabsType>,
      default: 'line',
      validator: (value: string) => {
        return ['line', 'card'].includes(value)
      }
    },
    size: {
      type: String as PropType<TabsSize>,
      default: 'medium',
      validator: (value: string) => {
        return ['small', 'medium', 'large'].includes(value)
      }
    }
  },
  emits: ['update:modelValue', 'tab-click', 'tab-remove'],
  setup(props: TabsProps, { emit }: { emit: TabsEmits }) {
    const tabs = ref<Tab[]>([])
    const lineLeft = ref(0)
    const lineWidth = ref(0)

    const updateLine = async () => {
      const activeTab = tabs.value.find((tab: Tab) => tab.name === props.modelValue)
      if (!activeTab) return

      await nextTick()
      const tabEl = document.querySelector('.zx-tabs__item--active')
      if (!tabEl) return

      const rect = tabEl.getBoundingClientRect()
      const navEl = document.querySelector('.zx-tabs__nav')
      if (!navEl) return

      const navRect = navEl.getBoundingClientRect()
      lineLeft.value = rect.left - navRect.left
      lineWidth.value = rect.width
    }

    const handleClick = (tab: Tab) => {
      if (tab.disabled) return
      emit('update:modelValue', tab.name)
      emit('tab-click', tab)
    }

    const handleClose = (tab: Tab) => {
      emit('tab-remove', tab)
    }

    const addTab = (tab: Tab) => {
      tabs.value.push(tab)
    }

    const removeTab = (name: TabName) => {
      const index = tabs.value.findIndex((tab: Tab) => tab.name === name)
      if (index > -1) {
        tabs.value.splice(index, 1)
      }
    }

    watch(() => props.modelValue, updateLine)
    onMounted(updateLine)

    return {
      tabs,
      lineLeft,
      lineWidth,
      handleClick,
      handleClose,
      addTab,
      removeTab
    }
  }
})
</script>

<style lang="scss" scoped>
.zx-tabs {
  // 类型
  &--line {
    .zx-tabs__header {
      border-bottom: 1px solid #e4e7ed;
    }

    .zx-tabs__item {
      border: none;
      background: none;

      &--active {
        color: var(--zx-primary-color);
      }
    }

    .zx-tabs__line {
      position: absolute;
      bottom: 0;
      left: 0;
      height: 2px;
      background-color: var(--zx-primary-color);
      transition: all 0.3s;
    }
  }

  &--card {
    .zx-tabs__header {
      border: 1px solid #e4e7ed;
      border-radius: 4px;
      padding: 4px;
    }

    .zx-tabs__item {
      border: 1px solid transparent;
      border-radius: 4px;
      margin-right: 4px;

      &--active {
        background-color: var(--zx-primary-color);
        border-color: var(--zx-primary-color);
        color: #fff;
      }
    }
  }

  // 尺寸
  &--small {
    .zx-tabs__item {
      padding: 0 12px;
      height: 32px;
      font-size: 14px;
    }
  }

  &--medium {
    .zx-tabs__item {
      padding: 0 16px;
      height: 40px;
      font-size: 16px;
    }
  }

  &--large {
    .zx-tabs__item {
      padding: 0 20px;
      height: 48px;
      font-size: 18px;
    }
  }

  // 头部
  &__header {
    position: relative;
    margin-bottom: 16px;
  }

  // 导航
  &__nav {
    display: flex;
    align-items: center;
  }

  // 项目
  &__item {
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: all 0.3s;
    color: #606266;

    &:hover {
      color: var(--zx-primary-color);
    }

    &--disabled {
      cursor: not-allowed;
      color: #c0c4cc;
      opacity: 0.6;

      &:hover {
        color: #c0c4cc;
      }
    }
  }

  // 标签
  &__label {
    flex: 1;
    text-align: center;
  }

  // 关闭按钮
  &__close {
    margin-left: 8px;
    font-size: 12px;
    opacity: 0.6;
    transition: opacity 0.3s;

    &:hover {
      opacity: 1;
    }
  }

  // 内容
  &__content {
    position: relative;
  }
}
</style> 