<template>
  <div class="zx-color-picker" :class="[`zx-color-picker--${size}`]">
    <div class="zx-color-picker__trigger" @click="showPicker = !showPicker">
      <div class="zx-color-picker__color" :style="{ backgroundColor: modelValue }"></div>
      <div class="zx-color-picker__value">{{ modelValue }}</div>
    </div>

    <Teleport to="body">
      <Transition name="zx-fade">
        <div v-if="showPicker" class="zx-color-picker__panel">
          <div class="zx-color-picker__panel-header">
            <span>选择颜色</span>
            <i class="zx-icon-close" @click="showPicker = false"></i>
          </div>
          
          <div class="zx-color-picker__panel-body">
            <div class="zx-color-picker__saturation" ref="saturationRef">
              <div class="zx-color-picker__saturation-white"></div>
              <div class="zx-color-picker__saturation-black"></div>
              <div 
                class="zx-color-picker__saturation-handle"
                :style="{ 
                  left: `${saturation.x}%`,
                  top: `${saturation.y}%`
                }"
                @mousedown="startSaturationDrag"
              ></div>
            </div>

            <div class="zx-color-picker__hue" ref="hueRef">
              <div 
                class="zx-color-picker__hue-handle"
                :style="{ left: `${hue}%` }"
                @mousedown="startHueDrag"
              ></div>
            </div>

            <div class="zx-color-picker__alpha" ref="alphaRef">
              <div class="zx-color-picker__alpha-bg"></div>
              <div 
                class="zx-color-picker__alpha-handle"
                :style="{ left: `${alpha}%` }"
                @mousedown="startAlphaDrag"
              ></div>
            </div>

            <div class="zx-color-picker__inputs">
              <div class="zx-color-picker__input-group">
                <span>HEX</span>
                <input 
                  type="text" 
                  v-model="hexValue"
                  @input="handleHexInput"
                >
              </div>
              <div class="zx-color-picker__input-group">
                <span>RGB</span>
                <input 
                  type="number" 
                  v-model="rgb.r"
                  min="0"
                  max="255"
                  @input="handleRgbInput"
                >
                <input 
                  type="number" 
                  v-model="rgb.g"
                  min="0"
                  max="255"
                  @input="handleRgbInput"
                >
                <input 
                  type="number" 
                  v-model="rgb.b"
                  min="0"
                  max="255"
                  @input="handleRgbInput"
                >
              </div>
              <div class="zx-color-picker__input-group">
                <span>HSL</span>
                <input 
                  type="number" 
                  v-model="hsl.h"
                  min="0"
                  max="360"
                  @input="handleHslInput"
                >
                <input 
                  type="number" 
                  v-model="hsl.s"
                  min="0"
                  max="100"
                  @input="handleHslInput"
                >
                <input 
                  type="number" 
                  v-model="hsl.l"
                  min="0"
                  max="100"
                  @input="handleHslInput"
                >
              </div>
            </div>
          </div>

          <div class="zx-color-picker__panel-footer">
            <button class="zx-button zx-button--text" @click="showPicker = false">取消</button>
            <button class="zx-button zx-button--primary" @click="handleConfirm">确定</button>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch, onMounted, onUnmounted, PropType } from 'vue'

interface RGB {
  r: number
  g: number
  b: number
}

interface HSL {
  h: number
  s: number
  l: number
}

type ColorPickerSize = 'small' | 'medium' | 'large'
type DragType = 'saturation' | 'hue' | 'alpha' | null

interface ColorPickerProps {
  modelValue: string
  size: ColorPickerSize
  disabled: boolean
}

interface ColorPickerEmits {
  (e: 'update:modelValue', value: string): void
  (e: 'change', value: string): void
}

export default defineComponent({
  name: 'ZxColorPicker',
  props: {
    modelValue: {
      type: String,
      default: '#000000'
    },
    size: {
      type: String as PropType<ColorPickerSize>,
      default: 'medium',
      validator: (value: ColorPickerSize) => {
        return ['small', 'medium', 'large'].includes(value)
      }
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue', 'change'],
  setup(props: ColorPickerProps, { emit }: { emit: ColorPickerEmits }) {
    const showPicker = ref(false)
    const saturation = ref({ x: 0, y: 0 })
    const hue = ref(0)
    const alpha = ref(100)
    const hexValue = ref(props.modelValue)
    const rgb = ref<RGB>({ r: 0, g: 0, b: 0 })
    const hsl = ref<HSL>({ h: 0, s: 0, l: 0 })

    const saturationRef = ref<HTMLElement | null>(null)
    const hueRef = ref<HTMLElement | null>(null)
    const alphaRef = ref<HTMLElement | null>(null)

    let isDragging = false
    let currentDragType: DragType = null

    // 颜色转换函数
    const hexToRgb = (hex: string): RGB => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : { r: 0, g: 0, b: 0 }
    }

    const rgbToHsl = (rgb: RGB): HSL => {
      const r = rgb.r / 255
      const g = rgb.g / 255
      const b = rgb.b / 255

      const max = Math.max(r, g, b)
      const min = Math.min(r, g, b)
      let h = 0
      let s = 0
      const l = (max + min) / 2

      if (max !== min) {
        const d = max - min
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

        switch (max) {
          case r:
            h = (g - b) / d + (g < b ? 6 : 0)
            break
          case g:
            h = (b - r) / d + 2
            break
          case b:
            h = (r - g) / d + 4
            break
        }

        h /= 6
      }

      return {
        h: Math.round(h * 360),
        s: Math.round(s * 100),
        l: Math.round(l * 100)
      }
    }

    const hslToRgb = (hsl: HSL): RGB => {
      const h = hsl.h / 360
      const s = hsl.s / 100
      const l = hsl.l / 100

      let r: number, g: number, b: number

      if (s === 0) {
        r = g = b = l
      } else {
        const hue2rgb = (p: number, q: number, t: number): number => {
          if (t < 0) t += 1
          if (t > 1) t -= 1
          if (t < 1/6) return p + (q - p) * 6 * t
          if (t < 1/2) return q
          if (t < 2/3) return p + (q - p) * (2/3 - t) * 6
          return p
        }

        const q = l < 0.5 ? l * (1 + s) : l + s - l * s
        const p = 2 * l - q

        r = hue2rgb(p, q, h + 1/3)
        g = hue2rgb(p, q, h)
        b = hue2rgb(p, q, h - 1/3)
      }

      return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
      }
    }

    const rgbToHex = (rgb: RGB): string => {
      const toHex = (n: number): string => {
        const hex = n.toString(16)
        return hex.length === 1 ? '0' + hex : hex
      }
      return `#${toHex(rgb.r)}${toHex(rgb.g)}${toHex(rgb.b)}`
    }

    // 事件处理函数
    const startSaturationDrag = (e: MouseEvent) => {
      isDragging = true
      currentDragType = 'saturation'
      handleSaturationDrag(e)
      document.addEventListener('mousemove', handleSaturationDrag)
      document.addEventListener('mouseup', stopDrag)
    }

    const handleSaturationDrag = (e: MouseEvent) => {
      if (!isDragging || currentDragType !== 'saturation' || !saturationRef.value) return

      const rect = saturationRef.value.getBoundingClientRect()
      let x = (e.clientX - rect.left) / rect.width * 100
      let y = (e.clientY - rect.top) / rect.height * 100

      x = Math.min(Math.max(0, x), 100)
      y = Math.min(Math.max(0, y), 100)

      saturation.value = { x, y }
      updateColor()
    }

    const startHueDrag = (e: MouseEvent) => {
      isDragging = true
      currentDragType = 'hue'
      handleHueDrag(e)
      document.addEventListener('mousemove', handleHueDrag)
      document.addEventListener('mouseup', stopDrag)
    }

    const handleHueDrag = (e: MouseEvent) => {
      if (!isDragging || currentDragType !== 'hue' || !hueRef.value) return

      const rect = hueRef.value.getBoundingClientRect()
      let x = (e.clientX - rect.left) / rect.width * 100

      x = Math.min(Math.max(0, x), 100)
      hue.value = x
      updateColor()
    }

    const startAlphaDrag = (e: MouseEvent) => {
      isDragging = true
      currentDragType = 'alpha'
      handleAlphaDrag(e)
      document.addEventListener('mousemove', handleAlphaDrag)
      document.addEventListener('mouseup', stopDrag)
    }

    const handleAlphaDrag = (e: MouseEvent) => {
      if (!isDragging || currentDragType !== 'alpha' || !alphaRef.value) return

      const rect = alphaRef.value.getBoundingClientRect()
      let x = (e.clientX - rect.left) / rect.width * 100

      x = Math.min(Math.max(0, x), 100)
      alpha.value = x
      updateColor()
    }

    const stopDrag = () => {
      isDragging = false
      currentDragType = null
      document.removeEventListener('mousemove', handleSaturationDrag)
      document.removeEventListener('mousemove', handleHueDrag)
      document.removeEventListener('mousemove', handleAlphaDrag)
      document.removeEventListener('mouseup', stopDrag)
    }

    const updateColor = () => {
      const newRgb = hslToRgb({
        h: Math.round(hue.value * 3.6),
        s: Math.round(saturation.value.x),
        l: Math.round(100 - saturation.value.y)
      })
      rgb.value = newRgb
      hexValue.value = rgbToHex(newRgb)
    }

    const handleHexInput = () => {
      if (/^#[0-9A-Fa-f]{6}$/.test(hexValue.value)) {
        rgb.value = hexToRgb(hexValue.value)
        hsl.value = rgbToHsl(rgb.value)
        updateFromHsl()
      }
    }

    const handleRgbInput = () => {
      rgb.value.r = Math.min(Math.max(0, rgb.value.r), 255)
      rgb.value.g = Math.min(Math.max(0, rgb.value.g), 255)
      rgb.value.b = Math.min(Math.max(0, rgb.value.b), 255)
      hexValue.value = rgbToHex(rgb.value)
      hsl.value = rgbToHsl(rgb.value)
      updateFromHsl()
    }

    const handleHslInput = () => {
      hsl.value.h = Math.min(Math.max(0, hsl.value.h), 360)
      hsl.value.s = Math.min(Math.max(0, hsl.value.s), 100)
      hsl.value.l = Math.min(Math.max(0, hsl.value.l), 100)
      rgb.value = hslToRgb(hsl.value)
      hexValue.value = rgbToHex(rgb.value)
      updateFromHsl()
    }

    const updateFromHsl = () => {
      hue.value = hsl.value.h / 3.6
      saturation.value = {
        x: hsl.value.s,
        y: 100 - hsl.value.l
      }
    }

    const handleConfirm = () => {
      emit('update:modelValue', hexValue.value)
      emit('change', hexValue.value)
      showPicker.value = false
    }

    watch(() => props.modelValue, (newValue: string) => {
      hexValue.value = newValue
      rgb.value = hexToRgb(newValue)
      hsl.value = rgbToHsl(rgb.value)
      updateFromHsl()
    })

    onMounted(() => {
      rgb.value = hexToRgb(props.modelValue)
      hsl.value = rgbToHsl(rgb.value)
      updateFromHsl()
    })

    onUnmounted(() => {
      stopDrag()
    })

    return {
      showPicker,
      saturation,
      hue,
      alpha,
      hexValue,
      rgb,
      hsl,
      saturationRef,
      hueRef,
      alphaRef,
      startSaturationDrag,
      startHueDrag,
      startAlphaDrag,
      handleHexInput,
      handleRgbInput,
      handleHslInput,
      handleConfirm
    }
  }
})
</script>

<style lang="scss" scoped>
.zx-color-picker {
  display: inline-flex;
  align-items: center;
  gap: 8px;

  // 尺寸
  &--small {
    .zx-color-picker__color {
      width: 24px;
      height: 24px;
    }

    .zx-color-picker__value {
      font-size: 14px;
    }
  }

  &--medium {
    .zx-color-picker__color {
      width: 32px;
      height: 32px;
    }

    .zx-color-picker__value {
      font-size: 16px;
    }
  }

  &--large {
    .zx-color-picker__color {
      width: 40px;
      height: 40px;
    }

    .zx-color-picker__value {
      font-size: 18px;
    }
  }

  // 触发器
  &__trigger {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    padding: 4px 8px;
    border-radius: 4px;
    transition: all 0.3s;

    &:hover {
      background-color: rgba(0, 0, 0, 0.05);
    }
  }

  &__color {
    border-radius: 4px;
    border: 1px solid #dcdfe6;
  }

  &__value {
    color: #606266;
  }

  // 面板
  &__panel {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    z-index: 2000;
    width: 320px;
  }

  &__panel-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px;
    border-bottom: 1px solid #ebeef5;

    i {
      cursor: pointer;
      color: #909399;
      transition: all 0.3s;

      &:hover {
        color: #409eff;
      }
    }
  }

  &__panel-body {
    padding: 16px;
  }

  // 饱和度选择器
  &__saturation {
    position: relative;
    width: 100%;
    height: 200px;
    border-radius: 4px;
    margin-bottom: 16px;
    cursor: crosshair;

    &-white {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(to right, #fff, transparent);
    }

    &-black {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(to top, #000, transparent);
    }

    &-handle {
      position: absolute;
      width: 12px;
      height: 12px;
      border: 2px solid #fff;
      border-radius: 50%;
      transform: translate(-50%, -50%);
      cursor: crosshair;
      box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
    }
  }

  // 色相选择器
  &__hue {
    position: relative;
    width: 100%;
    height: 12px;
    border-radius: 6px;
    margin-bottom: 16px;
    cursor: pointer;
    background: linear-gradient(to right, 
      #ff0000,
      #ffff00,
      #00ff00,
      #00ffff,
      #0000ff,
      #ff00ff,
      #ff0000
    );

    &-handle {
      position: absolute;
      width: 12px;
      height: 12px;
      border: 2px solid #fff;
      border-radius: 50%;
      transform: translate(-50%, -50%);
      cursor: pointer;
      box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
    }
  }

  // 透明度选择器
  &__alpha {
    position: relative;
    width: 100%;
    height: 12px;
    border-radius: 6px;
    margin-bottom: 16px;
    cursor: pointer;

    &-bg {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(to right, transparent, #000);
    }

    &-handle {
      position: absolute;
      width: 12px;
      height: 12px;
      border: 2px solid #fff;
      border-radius: 50%;
      transform: translate(-50%, -50%);
      cursor: pointer;
      box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
    }
  }

  // 输入框
  &__inputs {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  &__input-group {
    display: flex;
    align-items: center;
    gap: 8px;

    span {
      width: 40px;
      color: #606266;
    }

    input {
      flex: 1;
      padding: 4px 8px;
      border: 1px solid #dcdfe6;
      border-radius: 4px;
      transition: all 0.3s;

      &:focus {
        border-color: var(--zx-primary-color);
        outline: none;
      }

      &[type="number"] {
        width: 60px;
      }
    }
  }

  // 底部按钮
  &__panel-footer {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    padding: 16px;
    border-top: 1px solid #ebeef5;
  }
}

// 过渡动画
.zx-fade-enter-active,
.zx-fade-leave-active {
  transition: opacity 0.3s ease;
}

.zx-fade-enter-from,
.zx-fade-leave-to {
  opacity: 0;
}
</style> 