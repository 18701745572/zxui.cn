import type { Ref } from 'vue'

export interface FormRule {
  required?: boolean
  message?: string
  trigger?: string | string[]
  validator?: (rule: any, value: any, callback: any) => void
}

export interface FormInstance {
  validate: (callback?: (valid: boolean) => void) => void
  resetFields: () => void
  clearValidate: (props?: string | string[]) => void
  model: Record<string, any>
  rules: Record<string, FormRule[]>
  labelWidth: string
  formItems: any[]
}

export interface TableColumn {
  prop: string
  label: string
  width?: string | number
  sortable?: boolean
  className?: string
}

export interface TableInstance {
  columns: TableColumn[]
  addColumn: (column: TableColumn) => void
}

export interface TreeOption {
  id: string | number
  label: string
  children?: TreeOption[]
  disabled?: boolean
}

export interface TreeInstance {
  expandedKeys: Ref<(string | number)[]>
  checkedKeys: Ref<(string | number)[]>
  showCheckbox: boolean
  handleNodeClick: (node: TreeOption) => void
  handleCheck: (node: TreeOption, checked: boolean) => void
  handleExpand: (node: TreeOption) => void
  $slots: {
    children?: any
  }
}

export interface UploadFile {
  uid: string
  name: string
  status: 'ready' | 'uploading' | 'success' | 'error'
  size: number
  type: string
  url?: string
}

export interface TransferOption {
  key: string
  label: string
  disabled?: boolean
}

export interface SelectOption {
  value: string | number | boolean
  label: string
  disabled?: boolean
}

export interface SelectInstance {
  options: SelectOption[]
  addOption: (option: SelectOption) => void
}

export interface CheckboxGroupInstance {
  modelValue: (string | number | boolean)[]
  updateModelValue: (value: (string | number | boolean)[]) => void
}

export interface RadioGroupInstance {
  modelValue: string | number | boolean
  updateModelValue: (value: string | number | boolean) => void
}

export interface StepsInstance {
  active: number
  steps: Ref<any[]>
  addStep: (step: any) => void
}

export interface TabsInstance {
  modelValue: string | number
  addTab: (tab: any) => void
}

export interface SliderProps {
  modelValue: number | number[]
  min: number
  max: number
  step: number
  disabled: boolean
  vertical: boolean
  range: boolean
  marks: Record<number, string>
  showInput: boolean
  showInputControls: boolean
  inputSize: string
  debounce: number
  tooltipClass: string
  tooltipPlacement: string
  tooltipVisible: boolean
  tooltipFormatter: (value: number) => string
} 