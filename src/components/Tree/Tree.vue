<template>
  <div class="zx-tree" :class="[`zx-tree--${size}`]">
    <div class="zx-tree__content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { provide, ref } from 'vue'

type TreeSize = 'small' | 'medium' | 'large'

interface TreeNode {
  id: string | number
  label: string
  children?: TreeNode[]
  disabled?: boolean
}

interface Props {
  data: TreeNode[]
  size?: TreeSize
  checkable?: boolean
  selectable?: boolean
  defaultExpandAll?: boolean
  defaultCheckedKeys?: (string | number)[]
  defaultSelectedKeys?: (string | number)[]
}

const props = withDefaults(defineProps<Props>(), {
  size: 'medium',
  checkable: false,
  selectable: true,
  defaultExpandAll: false,
  defaultCheckedKeys: () => [],
  defaultSelectedKeys: () => []
})

interface Emits {
  (e: 'check', node: TreeNode, checked: boolean): void
  (e: 'select', node: TreeNode): void
  (e: 'expand', node: TreeNode): void
}

const emit = defineEmits<Emits>()

const expandedKeys = ref<(string | number)[]>(props.defaultExpandAll ? props.data.map((node: TreeNode) => node.id) : [])
const checkedKeys = ref<(string | number)[]>(props.defaultCheckedKeys)
const selectedKeys = ref<(string | number)[]>(props.defaultSelectedKeys)

const onCheck = (node: TreeNode) => {
  const index = checkedKeys.value.indexOf(node.id)
  if (index === -1) {
    checkedKeys.value.push(node.id)
  } else {
    checkedKeys.value.splice(index, 1)
  }
  emit('check', node, checkedKeys.value.includes(node.id))
}

const onSelect = (node: TreeNode) => {
  const index = selectedKeys.value.indexOf(node.id)
  if (index === -1) {
    selectedKeys.value = [node.id]
  } else {
    selectedKeys.value = []
  }
  emit('select', node)
}

const onExpand = (node: TreeNode) => {
  const index = expandedKeys.value.indexOf(node.id)
  if (index === -1) {
    expandedKeys.value.push(node.id)
  } else {
    expandedKeys.value.splice(index, 1)
  }
  emit('expand', node)
}

provide('tree', {
  checkable: props.checkable,
  selectable: props.selectable,
  checkedKeys,
  selectedKeys,
  expandedKeys,
  onCheck,
  onSelect,
  onExpand
})
</script>

<style lang="scss" scoped>
.zx-tree {
  // 尺寸
  &--small {
    .zx-tree-node {
      padding: 4px 0;
    }

    .zx-tree-node__content {
      height: 24px;
    }

    .zx-tree-node__label {
      font-size: 14px;
    }
  }

  &--medium {
    .zx-tree-node {
      padding: 6px 0;
    }

    .zx-tree-node__content {
      height: 32px;
    }

    .zx-tree-node__label {
      font-size: 16px;
    }
  }

  &--large {
    .zx-tree-node {
      padding: 8px 0;
    }

    .zx-tree-node__content {
      height: 40px;
    }

    .zx-tree-node__label {
      font-size: 18px;
    }
  }

  // 内容
  &__content {
    padding: 8px 0;
  }
}
</style> 