import { createVNode, render, App } from 'vue'
import Message from './Message.vue'

export interface MessageOptions {
  message: string
  type?: 'success' | 'warning' | 'info' | 'error'
  size?: 'small' | 'medium' | 'large'
  center?: boolean
  showIcon?: boolean
  showClose?: boolean
  duration?: number
  onClose?: () => void
}

let messageInstance: any = null
let messageCount = 0

const MessageService = {
  install(app: App) {
    app.config.globalProperties.$message = this
  },

  show(options: MessageOptions) {
    const container = document.createElement('div')
    document.body.appendChild(container)

    const vm = createVNode(Message, {
      ...options,
      onClose: () => {
        render(null, container)
        messageCount--
        if (messageCount === 0) {
          messageInstance = null
        }
        options.onClose?.()
      }
    })

    render(vm, container)
    messageCount++
    messageInstance = vm
  },

  success(message: string, options?: Omit<MessageOptions, 'message' | 'type'>) {
    this.show({
      message,
      type: 'success',
      ...options
    })
  },

  warning(message: string, options?: Omit<MessageOptions, 'message' | 'type'>) {
    this.show({
      message,
      type: 'warning',
      ...options
    })
  },

  info(message: string, options?: Omit<MessageOptions, 'message' | 'type'>) {
    this.show({
      message,
      type: 'info',
      ...options
    })
  },

  error(message: string, options?: Omit<MessageOptions, 'message' | 'type'>) {
    this.show({
      message,
      type: 'error',
      ...options
    })
  },

  close() {
    if (messageInstance) {
      messageInstance.component.exposed.handleClose()
    }
  }
}

export default MessageService 