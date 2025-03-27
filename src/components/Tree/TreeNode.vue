<template>
  <div class="zx-tree-node">
    <div
      class="zx-tree-node__content"
      :class="{
        'zx-tree-node__content--expanded': isExpanded,
        'zx-tree-node__content--checked': isChecked
      }"
      @click="handleClick"
    >
      <span
        v-if="hasChildren"
        class="zx-tree-node__expand"
        :class="{ 'zx-tree-node__expand--expanded': isExpanded }"
        @click.stop="handleExpand"
      >
        <i class="zx-icon-arrow-right"></i>
      </span>
      <span
        v-if="showCheckbox"
        class="zx-tree-node__checkbox"
        :class="{ 'zx-tree-node__checkbox--checked': isChecked }"
        @click.stop="handleCheck"
      >
        <i class="zx-icon-check"></i>
      </span>
      <span class="zx-tree-node__label">
        <slot></slot>
      </span>
    </div>
    <div v-if="hasChildren && isExpanded" class="zx-tree-node__children">
      <slot name="children"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject, computed } from 'vue'

interface TreeNode {
  id: string | number
  label: string
  children?: TreeNode[]
  disabled?: boolean
  expanded?: boolean
  selected?: boolean
}

interface Props {
  node: TreeNode
  level?: number
}

const props = withDefaults(defineProps<Props>(), {
  level: 0
})

interface TreeContext {
  checkable: boolean
  selectable: boolean
  checkedKeys: {
    value: (string | number)[]
  }
  selectedKeys: {
    value: (string | number)[]
  }
  expandedKeys: {
    value: (string | number)[]
  }
  onCheck: (node: TreeNode) => void
  onSelect: (node: TreeNode) => void
  onExpand: (node: TreeNode) => void
}

const tree = inject<TreeContext>('tree')

const isChecked = computed(() => tree?.checkedKeys.value.includes(props.node.id))
const isSelected = computed(() => tree?.selectedKeys.value.includes(props.node.id))
const isExpanded = computed(() => tree?.expandedKeys.value.includes(props.node.id))

const handleCheck = () => {
  if (props.node.disabled) return
  tree?.onCheck(props.node)
}

const handleSelect = () => {
  if (props.node.disabled) return
  tree?.onSelect(props.node)
}

const handleExpand = () => {
  if (!props.node.children?.length) return
  tree?.onExpand(props.node)
}
</script>

<style lang="scss" scoped>
.zx-tree-node {
  // 内容
  &__content {
    display: flex;
    align-items: center;
    height: 32px;
    padding: 0 8px;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      background-color: #f5f7fa;
    }

    &--expanded {
      color: var(--zx-primary-color);
    }

    &--checked {
      color: var(--zx-primary-color);
    }
  }

  // 展开图标
  &__expand {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    margin-right: 4px;
    color: #909399;
    transition: transform 0.3s;

    &--expanded {
      transform: rotate(90deg);
    }
  }

  // 复选框
  &__checkbox {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    margin-right: 4px;
    border: 1px solid #dcdfe6;
    border-radius: 2px;
    color: #fff;
    transition: all 0.3s;

    &--checked {
      background-color: var(--zx-primary-color);
      border-color: var(--zx-primary-color);
    }
  }

  // 标签
  &__label {
    flex: 1;
    font-size: 16px;
  }

  // 子节点
  &__children {
    padding-left: 24px;
  }
}
</style> 