import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Input from '../../src/components/Input/Input.vue'

describe('Input 组件', () => {
  it('正确渲染输入框', () => {
    const wrapper = mount(Input)
    expect(wrapper.find('input').exists()).toBe(true)
  })

  it('正确绑定输入值', async () => {
    const wrapper = mount(Input, {
      props: {
        modelValue: 'test'
      }
    })
    expect(wrapper.find('input').element.value).toBe('test')

    await wrapper.find('input').setValue('new value')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['new value'])
  })

  it('禁用状态正常工作', () => {
    const wrapper = mount(Input, {
      props: {
        disabled: true
      }
    })
    expect(wrapper.find('input').element.disabled).toBe(true)
  })

  it('占位符正确显示', () => {
    const placeholder = '请输入'
    const wrapper = mount(Input, {
      props: {
        placeholder
      }
    })
    expect(wrapper.find('input').element.placeholder).toBe(placeholder)
  })

  it('清除按钮功能正常工作', async () => {
    const wrapper = mount(Input, {
      props: {
        modelValue: 'test',
        clearable: true
      }
    })
    
    // 鼠标悬停时显示清除按钮
    await wrapper.trigger('mouseenter')
    expect(wrapper.find('.z-input__clear').exists()).toBe(true)

    // 点击清除按钮
    await wrapper.find('.z-input__clear').trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([''])
    expect(wrapper.emitted('clear')).toBeTruthy()
  })

  it('正确渲染前缀和后缀图标', () => {
    const wrapper = mount(Input, {
      props: {
        prefixIcon: 'search',
        suffixIcon: 'calendar'
      }
    })
    expect(wrapper.find('.z-input__prefix-icon').exists()).toBe(true)
    expect(wrapper.find('.z-input__suffix-icon').exists()).toBe(true)
  })

  it('支持不同尺寸', () => {
    const sizes = ['small', 'medium', 'large']
    sizes.forEach(size => {
      const wrapper = mount(Input, {
        props: { size }
      })
      expect(wrapper.classes()).toContain(`z-input--${size}`)
    })
  })
}) 