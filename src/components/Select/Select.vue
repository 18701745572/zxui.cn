<template>
  <div 
    class="zx-select" 
    :class="[
      `zx-select--${size}`,
      { 'zx-select--disabled': disabled },
      { 'zx-select--multiple': multiple }
    ]"
  >
    <div 
      class="zx-select__trigger"
      @click="handleTriggerClick"
    >
      <div class="zx-select__value">
        <template v-if="multiple">
          <span 
            v-for="value in selectedValues" 
            :key="value"
            class="zx-select__tag"
          >
            {{ getOptionLabel(value) }}
            <i 
              class="zx-icon-close" 
              @click.stop="handleRemoveTag(value)"
            ></i>
          </span>
        </template>
        <template v-else>
          {{ getOptionLabel(modelValue) }}
        </template>
      </div>
      <i 
        class="zx-icon-arrow-down"
        :class="{ 'zx-icon-arrow-up': showDropdown }"
      ></i>
    </div>

    <Teleport to="body">
      <Transition name="zx-fade">
        <div 
          v-if="showDropdown" 
          class="zx-select__dropdown"
          :style="dropdownStyle"
        >
          <div class="zx-select__search" v-if="filterable">
            <input 
              type="text"
              v-model="searchQuery"
              :placeholder="placeholder"
              @input="handleSearch"
            >
          </div>
          <div class="zx-select__options">
            <div 
              v-for="option in options"
              :key="option.value"
              class="zx-select__option"
              :class="{
                'is-selected': modelValue === option.value,
                'is-disabled': option.disabled
              }"
              @click="handleOptionClick(option)"
            >
              <span class="zx-select__option-label">{{ option.label }}</span>
              <i 
                v-if="isSelected(option.value)"
                class="zx-icon-check"
              ></i>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, onUnmounted, PropType } from 'vue'

type SelectSize = 'small' | 'medium' | 'large'
type SelectSingleValue = string | number | boolean
type SelectValue = SelectSingleValue | SelectSingleValue[]

interface Option {
  label: string
  value: SelectSingleValue
  disabled?: boolean
}

interface SelectProps {
  modelValue: SelectValue
  size: SelectSize
  disabled: boolean
  multiple: boolean
  filterable: boolean
  placeholder: string
}

interface SelectEmits {
  (e: 'update:modelValue', value: SelectValue): void
  (e: 'change', value: SelectValue): void
}

interface DropdownStyle {
  top?: string
  left?: string
  width?: string
}

export default defineComponent({
  name: 'ZxSelect',
  props: {
    modelValue: {
      type: [String, Number, Boolean, Array] as PropType<SelectValue>,
      default: ''
    },
    size: {
      type: String as PropType<SelectSize>,
      default: 'medium',
      validator: (value: string) => {
        return ['small', 'medium', 'large'].includes(value)
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    },
    filterable: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: '请选择'
    }
  },
  emits: ['update:modelValue', 'change'],
  setup(props: SelectProps, { emit }: { emit: SelectEmits }) {
    const showDropdown = ref(false)
    const searchQuery = ref('')
    const triggerRef = ref<HTMLElement | null>(null)
    const dropdownStyle = ref<DropdownStyle>({})

    const options = ref<Option[]>([])

    const selectedValues = computed(() => {
      if (props.multiple) {
        return Array.isArray(props.modelValue) ? props.modelValue : []
      }
      return []
    })

    const filteredOptions = computed(() => {
      if (!props.filterable || !searchQuery.value) {
        return options.value
      }
      return options.value.filter((option: Option) => 
        option.label.toLowerCase().includes(searchQuery.value.toLowerCase())
      )
    })

    const getOptionLabel = (value: SelectSingleValue) => {
      const option = options.value.find((opt: Option) => opt.value === value)
      return option ? option.label : ''
    }

    const isSelected = (value: SelectSingleValue) => {
      if (props.multiple) {
        return selectedValues.value.includes(value)
      }
      return props.modelValue === value
    }

    const handleTriggerClick = () => {
      if (props.disabled) return
      showDropdown.value = !showDropdown.value
      if (showDropdown.value) {
        updateDropdownPosition()
      }
    }

    const handleOptionClick = (option: Option) => {
      if (option.disabled) return
      if (props.multiple) {
        const newValue = [...selectedValues.value]
        const index = newValue.indexOf(option.value)
        if (index === -1) {
          newValue.push(option.value)
        } else {
          newValue.splice(index, 1)
        }
        emit('update:modelValue', newValue)
        emit('change', newValue)
      } else {
        emit('update:modelValue', option.value)
        emit('change', option.value)
        showDropdown.value = false
      }
    }

    const handleRemoveTag = (value: SelectSingleValue) => {
      const newValue = selectedValues.value.filter((v: SelectSingleValue) => v !== value)
      emit('update:modelValue', newValue)
      emit('change', newValue)
    }

    const handleSearch = () => {
      // 搜索逻辑已通过计算属性实现
    }

    const updateDropdownPosition = () => {
      if (!triggerRef.value) return
      const rect = triggerRef.value.getBoundingClientRect()
      dropdownStyle.value = {
        top: `${rect.bottom + window.scrollY}px`,
        left: `${rect.left}px`,
        width: `${rect.width}px`
      }
    }

    const handleClickOutside = (e: MouseEvent) => {
      if (showDropdown.value && triggerRef.value) {
        const target = e.target as HTMLElement
        if (!triggerRef.value.contains(target)) {
          showDropdown.value = false
        }
      }
    }

    onMounted(() => {
      document.addEventListener('click', handleClickOutside)
      window.addEventListener('scroll', updateDropdownPosition)
      window.addEventListener('resize', updateDropdownPosition)
    })

    onUnmounted(() => {
      document.removeEventListener('click', handleClickOutside)
      window.removeEventListener('scroll', updateDropdownPosition)
      window.removeEventListener('resize', updateDropdownPosition)
    })

    return {
      showDropdown,
      searchQuery,
      triggerRef,
      dropdownStyle,
      options,
      selectedValues,
      filteredOptions,
      getOptionLabel,
      isSelected,
      handleTriggerClick,
      handleOptionClick,
      handleRemoveTag,
      handleSearch
    }
  }
})
</script>

<style lang="scss" scoped>
.zx-select {
  position: relative;
  display: inline-block;
  width: 100%;

  // 尺寸
  &--small {
    .zx-select__trigger {
      height: 32px;
      font-size: 14px;
    }

    .zx-select__tag {
      height: 20px;
      padding: 0 6px;
      font-size: 12px;
    }
  }

  &--medium {
    .zx-select__trigger {
      height: 36px;
      font-size: 16px;
    }

    .zx-select__tag {
      height: 24px;
      padding: 0 8px;
      font-size: 14px;
    }
  }

  &--large {
    .zx-select__trigger {
      height: 40px;
      font-size: 18px;
    }

    .zx-select__tag {
      height: 28px;
      padding: 0 10px;
      font-size: 16px;
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

  // 标签
  &__tag {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    margin: 2px;
    background-color: #f0f2f5;
    border-radius: 4px;

    i {
      cursor: pointer;
      font-size: 12px;

      &:hover {
        color: var(--zx-danger-color);
      }
    }
  }

  // 下拉框
  &__dropdown {
    position: absolute;
    background-color: #fff;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    z-index: 2000;
  }

  // 搜索框
  &__search {
    padding: 8px;

    input {
      width: 100%;
      height: 32px;
      padding: 0 8px;
      border: 1px solid #dcdfe6;
      border-radius: 4px;
      transition: all 0.3s;

      &:focus {
        border-color: var(--zx-primary-color);
        outline: none;
      }
    }
  }

  // 选项
  &__options {
    max-height: 300px;
    overflow-y: auto;
  }

  &__option {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 12px;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      background-color: #f5f7fa;
    }

    &--selected {
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
  }

  &__option-label {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  // 状态
  &--disabled {
    .zx-select__trigger {
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