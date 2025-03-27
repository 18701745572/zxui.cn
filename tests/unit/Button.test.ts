import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Button from '../../src/components/Button/Button.vue'

describe('Button 组件', () => {
  it('正确渲染默认插槽内容', () => {
    const wrapper = mount(Button, {
      slots: {
        default: '按钮'
      }
    })
    expect(wrapper.text()).toBe('按钮')
  })

  it('点击时触发 click 事件', async () => {
    const wrapper = mount(Button)
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })

  it('禁用状态下不触发点击事件', async () => {
    const wrapper = mount(Button, {
      props: {
        disabled: true
      }
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeFalsy()
  })

  it('正确渲染不同类型的按钮', () => {
    const types = ['primary', 'success', 'warning', 'danger']
    types.forEach(type => {
      const wrapper = mount(Button, {
        props: { type }
      })
      expect(wrapper.classes()).toContain(`z-button--${type}`)
    })
  })

  it('正确渲染不同尺寸的按钮', () => {
    const sizes = ['small', 'medium', 'large']
    sizes.forEach(size => {
      const wrapper = mount(Button, {
        props: { size }
      })
      expect(wrapper.classes()).toContain(`z-button--${size}`)
    })
  })
}) 