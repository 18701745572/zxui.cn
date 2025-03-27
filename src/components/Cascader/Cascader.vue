<template>
  <div 
    class="zx-cascader" 
    :class="[
      `zx-cascader--${size}`,
      { 'zx-cascader--disabled': disabled }
    ]"
  >
    <div 
      class="zx-cascader__trigger"
      @click="handleTriggerClick"
    >
      <div class="zx-cascader__value">
        {{ displayValue }}
      </div>
      <i 
        class="zx-icon-arrow-down"
        :class="{ 'zx-icon-close': showPicker }"
        @click.stop="handleIconClick"
      ></i>
    </div>

    <Teleport to="body">
      <Transition name="zx-fade">
        <div 
          v-if="showPicker" 
          class="zx-cascader__panel"
          :style="panelStyle"
        >
          <div class="zx-cascader__panel-header">
            <div class="zx-cascader__panel-title">
              <span>请选择</span>
            </div>
            <i 
              class="zx-icon-close"
              @click="showPicker = false"
            ></i>
          </div>

          <div class="zx-cascader__panel-body">
            <div class="zx-cascader__menu-list">
              <div 
                v-for="(menu, index) in menus" 
                :key="index"
                class="zx-cascader__menu"
              >
                <div 
                  v-for="item in menu" 
                  :key="item.value"
                  class="zx-cascader__menu-item"
                  :class="{
                    'zx-cascader__menu-item--active': isActive(item, index),
                    'zx-cascader__menu-item--disabled': item.disabled,
                    'zx-cascader__menu-item--has-children': item.children?.length
                  }"
                  @click="handleItemClick(item, index)"
                >
                  <span class="zx-cascader__menu-item-label">{{ item.label }}</span>
                  <i 
                    v-if="item.children?.length"
                    class="zx-icon-arrow-right"
                  ></i>
                </div>
              </div>
            </div>
          </div>

          <div class="zx-cascader__panel-footer">
            <button class="zx-button zx-button--text" @click="handleClear">清空</button>
            <button class="zx-button zx-button--primary" @click="handleConfirm">确定</button>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, onUnmounted, PropType } from 'vue'

interface CascaderOption {
  label: string
  value: string | number
  children?: CascaderOption[]
  disabled?: boolean
}

type CascaderSize = 'small' | 'medium' | 'large'
type FilterMethod = (query: string, option: CascaderOption) => boolean

interface CascaderProps {
  modelValue: (string | number)[]
  options: CascaderOption[]
  size: CascaderSize
  disabled: boolean
  placeholder: string
  clearable: boolean
  filterable: boolean
  filterMethod: FilterMethod | null
}

interface CascaderEmits {
  (e: 'update:modelValue', value: (string | number)[]): void
  (e: 'change', options: CascaderOption[]): void
}

export default defineComponent({
  name: 'ZxCascader',
  props: {
    modelValue: {
      type: Array as PropType<(string | number)[]>,
      default: () => []
    },
    options: {
      type: Array as PropType<CascaderOption[]>,
      required: true
    },
    size: {
      type: String as PropType<CascaderSize>,
      default: 'medium',
      validator: (value: CascaderSize) => {
        return ['small', 'medium', 'large'].includes(value)
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: '请选择'
    },
    clearable: {
      type: Boolean,
      default: true
    },
    filterable: {
      type: Boolean,
      default: false
    },
    filterMethod: {
      type: [Function, null] as PropType<FilterMethod | null>,
      default: null
    }
  },
  emits: ['update:modelValue', 'change'],
  setup(props: CascaderProps, { emit }: { emit: CascaderEmits }) {
    const showPicker = ref(false)
    const triggerRef = ref<HTMLElement | null>(null)
    const panelStyle = ref<Record<string, string>>({})
    const selectedOptions = ref<CascaderOption[]>([])
    const menus = ref<CascaderOption[][]>([])
    const searchValue = ref('')

    const displayValue = computed(() => {
      if (!props.modelValue.length) return props.placeholder
      return selectedOptions.value.map((option: CascaderOption) => option.label).join(' / ')
    })

    const handleTriggerClick = () => {
      if (props.disabled) return
      showPicker.value = !showPicker.value
      if (showPicker.value) {
        updatePanelPosition()
        initMenus()
      }
    }

    const handleIconClick = () => {
      if (showPicker.value) {
        showPicker.value = false
      } else {
        handleTriggerClick()
      }
    }

    const initMenus = () => {
      menus.value = [props.options]
      selectedOptions.value = []
      const values = [...props.modelValue]
      let currentOptions = props.options

      for (const value of values) {
        const option = currentOptions.find(opt => opt.value === value)
        if (!option) break

        selectedOptions.value.push(option)
        if (option.children?.length) {
          menus.value.push(option.children)
          currentOptions = option.children
        } else {
          break
        }
      }
    }

    const handleItemClick = (item: CascaderOption, index: number) => {
      if (item.disabled) return

      // 更新选中项
      selectedOptions.value = selectedOptions.value.slice(0, index)
      selectedOptions.value.push(item)

      // 更新菜单
      menus.value = menus.value.slice(0, index + 1)
      if (item.children?.length) {
        menus.value.push(item.children)
      }

      // 如果没有子节点，则关闭面板
      if (!item.children?.length) {
        showPicker.value = false
        emit('update:modelValue', selectedOptions.value.map((option: CascaderOption) => option.value))
        emit('change', selectedOptions.value)
      }
    }

    const handleClear = () => {
      selectedOptions.value = []
      emit('update:modelValue', [])
      emit('change', [])
      showPicker.value = false
    }

    const handleConfirm = () => {
      showPicker.value = false
      emit('update:modelValue', selectedOptions.value.map((option: CascaderOption) => option.value))
      emit('change', selectedOptions.value)
    }

    const updatePanelPosition = () => {
      if (!triggerRef.value) return
      const rect = triggerRef.value.getBoundingClientRect()
      panelStyle.value = {
        top: rect.bottom + 'px',
        left: rect.left + 'px',
        minWidth: rect.width + 'px'
      }
    }

    const isActive = (item: CascaderOption, index: number) => {
      if (index >= selectedOptions.value.length) return false
      return selectedOptions.value[index].value === item.value
    }

    onMounted(() => {
      document.addEventListener('click', handleDocumentClick)
      window.addEventListener('resize', updatePanelPosition)
      window.addEventListener('scroll', updatePanelPosition)
    })

    onUnmounted(() => {
      document.removeEventListener('click', handleDocumentClick)
      window.removeEventListener('resize', updatePanelPosition)
      window.removeEventListener('scroll', updatePanelPosition)
    })

    const handleDocumentClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!triggerRef.value?.contains(target)) {
        showPicker.value = false
      }
    }

    return {
      showPicker,
      triggerRef,
      panelStyle,
      selectedOptions,
      menus,
      searchValue,
      displayValue,
      handleTriggerClick,
      handleIconClick,
      handleItemClick,
      handleClear,
      handleConfirm,
      isActive
    }
  }
})
</script>

<style lang="scss" scoped>
.zx-cascader {
  position: relative;
  display: inline-block;
  width: 100%;

  // 尺寸
  &--small {
    .zx-cascader__trigger {
      height: 32px;
      font-size: 14px;
    }
  }

  &--medium {
    .zx-cascader__trigger {
      height: 36px;
      font-size: 16px;
    }
  }

  &--large {
    .zx-cascader__trigger {
      height: 40px;
      font-size: 18px;
    }
  }

  // 触发器
  &__trigger {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 12px;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      border-color: var(--zx-primary-color);
    }

    i {
      color: #909399;
      transition: all 0.3s;
    }
  }

  // 值
  &__value {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  // 面板
  &__panel {
    position: absolute;
    background-color: #fff;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    z-index: 2000;
    width: 320px;
  }

  // 面板头部
  &__panel-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px;
    border-bottom: 1px solid #ebeef5;
  }

  &__panel-title {
    font-size: 16px;
    font-weight: 500;
  }

  // 面板主体
  &__panel-body {
    padding: 12px;
  }

  // 菜单列表
  &__menu-list {
    display: flex;
    gap: 1px;
    background-color: #f5f7fa;
  }

  // 菜单
  &__menu {
    min-width: 160px;
    background-color: #fff;
  }

  // 菜单项
  &__menu-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 12px;
    cursor: pointer;
    transition: all 0.3s;

    &:hover:not(.zx-cascader__menu-item--disabled) {
      background-color: #f5f7fa;
    }

    &--active {
      color: var(--zx-primary-color);
      font-weight: 500;
    }

    &--disabled {
      color: #c0c4cc;
      cursor: not-allowed;

      &:hover {
        background-color: transparent;
      }
    }

    &--has-children {
      i {
        color: #909399;
      }
    }
  }

  &__menu-item-label {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  // 面板底部
  &__panel-footer {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    padding: 12px;
    border-top: 1px solid #ebeef5;
  }

  // 状态
  &--disabled {
    .zx-cascader__trigger {
      background-color: #f5f7fa;
      cursor: not-allowed;
      opacity: 0.6;
    }
  }
}

// 过渡动画
.zx-fade-enter-active,
.zx-fade-leave-active {
  transition: opacity 0.3s ease;
}

.zx-fade-enter-from,
.zx-fade-leave-to {
  opacity: 0;
}
</style> 