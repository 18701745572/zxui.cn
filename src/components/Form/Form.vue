<template>
  <form
    class="zx-form"
    :class="{
      'is-inline': inline,
      'is-label-top': labelPosition === 'top',
      'is-label-left': labelPosition === 'left',
      'is-label-right': labelPosition === 'right'
    }"
    @submit.prevent
  >
    <slot></slot>
  </form>
</template>

<script lang="ts">
import { defineComponent, provide, ref, PropType } from 'vue'

type FormLabelPosition = 'left' | 'right' | 'top'

interface FormRule {
  required?: boolean
  message?: string
  trigger?: string | string[]
  min?: number
  max?: number
  pattern?: RegExp
  validator?: (rule: FormRule, value: any) => Promise<void> | void
}

interface FormRules {
  [key: string]: FormRule | FormRule[]
}

interface FormItem {
  validate: () => Promise<boolean>
  resetField: () => void
  clearValidate: (props?: string[]) => void
}

interface FormContext {
  model: Record<string, any>
  rules: FormRules
  labelPosition: FormLabelPosition
  labelWidth: string
  formItems: FormItem[]
  validate: () => Promise<boolean>
  resetFields: () => void
  clearValidate: (props?: string[]) => void
}

interface FormProps {
  model: Record<string, any>
  rules: FormRules
  labelPosition: FormLabelPosition
  labelWidth: string
  inline: boolean
}

interface FormEmits {
  (e: 'validate', valid: boolean): void
}

export default defineComponent({
  name: 'ZxForm',
  props: {
    model: {
      type: Object as PropType<Record<string, any>>,
      required: true
    },
    rules: {
      type: Object as PropType<FormRules>,
      default: () => ({})
    },
    labelPosition: {
      type: String as PropType<FormLabelPosition>,
      default: 'right',
      validator: (value: FormLabelPosition) => ['left', 'right', 'top'].includes(value)
    },
    labelWidth: {
      type: String,
      default: ''
    },
    inline: {
      type: Boolean,
      default: false
    }
  },
  emits: ['validate'],
  setup(props: FormProps, { emit }: { emit: FormEmits }) {
    const formItems = ref<FormItem[]>([])

    const validate = async (): Promise<boolean> => {
      const results = await Promise.all(
        formItems.value.map((item: FormItem) => item.validate())
      )
      const valid = results.every((result: boolean) => result)
      emit('validate', valid)
      return valid
    }

    const resetFields = () => {
      formItems.value.forEach((item: FormItem) => item.resetField())
    }

    const clearValidate = (props?: string[]) => {
      formItems.value.forEach((item: FormItem) => item.clearValidate(props))
    }

    const formContext: FormContext = {
      model: props.model,
      rules: props.rules,
      labelPosition: props.labelPosition,
      labelWidth: props.labelWidth,
      formItems: formItems.value,
      validate,
      resetFields,
      clearValidate
    }

    provide('form', formContext)

    return {
      validate,
      resetFields,
      clearValidate
    }
  }
})
</script>

<style lang="scss" scoped>
.zx-form {
  &--inline {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
  }

  &--label-top {
    .zx-form-item {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }

    .zx-form-item__label {
      padding-bottom: 8px;
      line-height: 1.5;
    }
  }

  &--label-left {
    .zx-form-item {
      display: flex;
      align-items: flex-start;
    }

    .zx-form-item__label {
      text-align: left;
      padding-right: 12px;
    }
  }

  &--label-right {
    .zx-form-item {
      display: flex;
      align-items: flex-start;
    }

    .zx-form-item__label {
      text-align: right;
      padding-right: 12px;
    }
  }
}
</style> 