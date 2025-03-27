declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'vue' {
  import type { Router, RouteLocationNormalizedLoaded } from 'vue-router'
  
  export * from '@vue/runtime-dom'
  export * from '@vue/runtime-core'
  
  export interface GlobalComponents {
    RouterLink: typeof import('vue-router')['RouterLink']
    RouterView: typeof import('vue-router')['RouterView']
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $router: Router
    $route: RouteLocationNormalizedLoaded
  }
}

declare module '@popperjs/core' {
  export interface Instance {
    destroy: () => void
    update: () => void
  }
  export function createPopper(
    referenceElement: Element | VirtualElement,
    popperElement: HTMLElement,
    options?: Partial<Options>
  ): Instance
}

declare module 'marked' {
  export function marked(text: string): string
}

declare module 'xml-formatter' {
  export default function format(xml: string, options?: any): string
}

declare module 'js-yaml' {
  export function load(str: string): any
  export function dump(obj: any, options?: any): string
}

declare module '*.svg' {
  const content: string
  export default content
}

declare module '*.png' {
  const content: string
  export default content
}

declare module '*.jpg' {
  const content: string
  export default content
}

declare module '*.jpeg' {
  const content: string
  export default content
}

declare module '*.gif' {
  const content: string
  export default content
}

declare module '*.webp' {
  const content: string
  export default content
}

declare module '*.ico' {
  const content: string
  export default content
}

declare module '*.bmp' {
  const content: string
  export default content
}

declare module '*.tiff' {
  const content: string
  export default content
}

declare module '*.mp4' {
  const content: string
  export default content
}

declare module '*.webm' {
  const content: string
  export default content
}

declare module '*.ogg' {
  const content: string
  export default content
}

declare module '*.mp3' {
  const content: string
  export default content
}

declare module '*.wav' {
  const content: string
  export default content
}

declare module '*.flac' {
  const content: string
  export default content
}

declare module '*.aac' {
  const content: string
  export default content
}

declare module '*.woff' {
  const content: string
  export default content
}

declare module '*.woff2' {
  const content: string
  export default content
}

declare module '*.eot' {
  const content: string
  export default content
}

declare module '*.ttf' {
  const content: string
  export default content
}

declare module '*.otf' {
  const content: string
  export default content
}

declare module '*.pdf' {
  const content: string
  export default content
}

declare module '*.doc' {
  const content: string
  export default content
}

declare module '*.docx' {
  const content: string
  export default content
}

declare module '*.xls' {
  const content: string
  export default content
}

declare module '*.xlsx' {
  const content: string
  export default content
}

declare module '*.ppt' {
  const content: string
  export default content
}

declare module '*.pptx' {
  const content: string
  export default content
}

declare module '*.txt' {
  const content: string
  export default content
}

declare module '*.csv' {
  const content: string
  export default content
}

declare module '*.json' {
  const content: any
  export default content
}

declare module '*.yaml' {
  const content: any
  export default content
}

declare module '*.yml' {
  const content: any
  export default content
}

declare module '*.md' {
  const content: string
  export default content
}

declare module '*.markdown' {
  const content: string
  export default content
}

declare module '*.html' {
  const content: string
  export default content
}

declare module '*.htm' {
  const content: string
  export default content
}

declare module '*.xml' {
  const content: string
  export default content
}

declare module '*.css' {
  const content: string
  export default content
}

declare module '*.scss' {
  const content: string
  export default content
}

declare module '*.sass' {
  const content: string
  export default content
}

declare module '*.less' {
  const content: string
  export default content
}

declare module '*.styl' {
  const content: string
  export default content
}

declare module '*.stylus' {
  const content: string
  export default content
}

declare module '*.postcss' {
  const content: string
  export default content
}

declare module '*.pcss' {
  const content: string
  export default content
}

declare module '*.js' {
  const content: any
  export default content
}

declare module '*.jsx' {
  const content: any
  export default content
}

declare module '*.ts' {
  const content: any
  export default content
}

declare module '*.tsx' {
  const content: any
  export default content
}

declare module '*.mjs' {
  const content: any
  export default content
}

declare module '*.cjs' {
  const content: any
  export default content
}

declare module '*.mts' {
  const content: any
  export default content
}

declare module '*.cts' {
  const content: any
  export default content
} 