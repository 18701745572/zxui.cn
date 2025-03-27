import type { Component } from 'vue'
import Input from './Input.vue'

Input.install = (app: { component: (name: string, component: Component) => void }) => {
  app.component('ZxInput', Input)
}

export default Input
export { Input } 