<template>
  <div
    class="zx-form-item"
    :class="{
      'is-error': validateState === 'error',
      'is-success': validateState === 'success',
      'is-required': isRequired
    }"
  >
    <label
      v-if="label"
      class="zx-form-item__label"
      :style="{ width: labelWidth }"
    >
      {{ label }}
      <span v-if="isRequired" class="zx-form-item__required">*</span>
    </label>
    <div class="zx-form-item__content">
      <slot></slot>
      <div v-if="validateState === 'error'" class="zx-form-item__error">
        {{ validateMessage }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, ref, computed, onMounted, PropType } from 'vue'

type ValidateState = '' | 'error' | 'success'

interface FormRule {
  required?: boolean
  message?: string
  trigger?: string | string[]
  min?: number
  max?: number
  pattern?: RegExp
  validator?: (rule: FormRule, value: any, model: Record<string, any>) => Promise<boolean> | boolean
}

interface FormInstance {
  model: Record<string, any>
  rules: Record<string, FormRule[]>
  labelWidth: string
  formItems: FormItem[]
}

interface FormItem {
  validate: () => Promise<boolean>
  resetField: () => void
  clearValidate: (props?: string[]) => void
}

interface FormItemProps {
  prop: string
  label: string
  rules: FormRule | FormRule[]
  required: boolean
}

export default defineComponent({
  name: 'ZxFormItem',
  props: {
    prop: {
      type: String,
      required: true
    },
    label: {
      type: String,
      default: ''
    },
    rules: {
      type: [Object, Array] as PropType<FormRule | FormRule[]>,
      default: () => []
    },
    required: {
      type: Boolean,
      default: false
    }
  },
  setup(props: FormItemProps) {
    const form = inject<FormInstance>('form', {} as FormInstance)
    const validateState = ref<ValidateState>('')
    const validateMessage = ref('')

    const isRequired = computed(() => {
      if (props.required) return true
      if (!props.rules) return false
      const rules = Array.isArray(props.rules) ? props.rules : [props.rules]
      return rules.some((rule: FormRule) => rule.required)
    })

    const validate = async (): Promise<boolean> => {
      if (!form?.rules[props.prop]) {
        validateState.value = ''
        validateMessage.value = ''
        return true
      }

      const rules = Array.isArray(props.rules) ? props.rules : [props.rules]
      const value = form.model[props.prop]

      for (const rule of rules) {
        if (rule.required && !value) {
          validateState.value = 'error'
          validateMessage.value = rule.message || `${props.label}不能为空`
          return false
        }

        if (rule.validator) {
          const result = await rule.validator(rule, value, form.model)
          if (!result) {
            validateState.value = 'error'
            validateMessage.value = rule.message || `${props.label}验证失败`
            return false
          }
        }

        if (rule.pattern && !rule.pattern.test(value)) {
          validateState.value = 'error'
          validateMessage.value = rule.message || `${props.label}格式不正确`
          return false
        }
      }

      validateState.value = 'success'
      validateMessage.value = ''
      return true
    }

    const resetField = () => {
      validateState.value = ''
      validateMessage.value = ''
      form.model[props.prop] = ''
    }

    const clearValidate = (fieldProps?: string | string[]) => {
      if (!fieldProps) {
        validateState.value = ''
        validateMessage.value = ''
        return
      }
      if (Array.isArray(fieldProps)) {
        if (fieldProps.includes(props.prop)) {
          validateState.value = ''
          validateMessage.value = ''
        }
      } else if (fieldProps === props.prop) {
        validateState.value = ''
        validateMessage.value = ''
      }
    }

    onMounted(() => {
      if (form) {
        form.formItems.push({
          validate,
          resetField,
          clearValidate
        })
      }
    })

    return {
      validateState,
      validateMessage,
      isRequired,
      labelWidth: computed(() => form?.labelWidth),
      validate,
      resetField,
      clearValidate
    }
  }
})
</script>

<style lang="scss" scoped>
.zx-form-item {
  margin-bottom: 22px;

  &__label {
    display: inline-block;
    font-size: 14px;
    color: #606266;
    line-height: 32px;
  }

  &__required {
    color: var(--zx-danger-color, #f56c6c);
    margin-left: 4px;
  }

  &__content {
    display: inline-block;
    position: relative;
    width: calc(100% - 120px);
  }

  &.is-error {
    .zx-form-item__label {
      color: var(--zx-danger-color, #f56c6c);
    }
  }

  &.is-success {
    .zx-form-item__label {
      color: var(--zx-success-color, #67c23a);
    }
  }

  &__error {
    position: absolute;
    top: 100%;
    left: 0;
    padding-top: 4px;
    font-size: 12px;
    color: var(--zx-danger-color, #f56c6c);
    line-height: 1;
  }
}
</style> 