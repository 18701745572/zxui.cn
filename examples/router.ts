import { createRouter, createWebHistory } from 'vue-router'
import Basic from './basic/index.vue'
import Theme from './theme/index.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/basic'
    },
    {
      path: '/basic',
      component: Basic
    },
    {
      path: '/theme',
      component: Theme
    }
  ]
})

export default router 