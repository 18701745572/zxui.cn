/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'vue' {
  export interface GlobalComponents {
    RouterLink: typeof import('vue-router')['RouterLink']
    RouterView: typeof import('vue-router')['RouterView']
  }
}

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $router: Router
    $route: RouteLocationNormalizedLoaded
  }
}

declare module '@popperjs/core' {
  export interface Instance {
    destroy: () => void
    update: () => void
  }
}

declare module 'marked' {
  export function marked(text: string): string
}

declare module 'xml-formatter' {
  export default function format(xml: string, options?: any): string
} 