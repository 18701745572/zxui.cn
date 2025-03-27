/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'vue' {
  import type { ComponentCustomProperties } from 'vue'
  import type { Router, RouteLocationNormalizedLoaded } from 'vue-router'

  interface ComponentCustomProperties {
    $router: Router
    $route: RouteLocationNormalizedLoaded
  }

  export {
    App,
    Component,
    ComponentCustomProperties,
    ComponentPublicInstance,
    ComputedRef,
    InjectionKey,
    PropType,
    Ref,
    VNode,
    computed,
    createVNode,
    defineComponent,
    getCurrentInstance,
    h,
    inject,
    nextTick,
    onBeforeMount,
    onBeforeUnmount,
    onMounted,
    onUnmounted,
    provide,
    reactive,
    ref,
    render,
    toRef,
    toRefs,
    watch,
    watchEffect
  } from '@vue/runtime-core'
}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    RouterLink: typeof import('vue-router')['RouterLink']
    RouterView: typeof import('vue-router')['RouterView']
  }
}