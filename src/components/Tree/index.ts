import { App } from 'vue'
import Tree from './Tree.vue'
import TreeNode from './TreeNode.vue'

Tree.install = (app: App) => {
  app.component('ZxTree', Tree)
  app.component('ZxTreeNode', TreeNode)
}

export default Tree
export { Tree, TreeNode } 