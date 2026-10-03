import Toast, { ToastOptions } from 'react-native-toast-message'

export type ToastVariant = 'success' | 'error' | 'info'

const DEFAULT_OPTIONS: Readonly<Partial<ToastOptions>> = {
  position: 'top',
  visibilityTime: 3000,
  autoHide: true,
}

const showToast = (
  type: ToastVariant,
  message: string,
  title?: string,
  options?: Partial<ToastOptions>,
): void => {
  Toast.show({
    ...DEFAULT_OPTIONS,
    ...options,
    type,
    text1: title,
    text2: message,
  })
}

export const toast = {
  success(
    message: string,
    title = 'Success',
    options?: Partial<ToastOptions>,
  ): void {
    showToast('success', message, title, options)
  },

  error(
    message: string,
    title = 'Error',
    options?: Partial<ToastOptions>,
  ): void {
    showToast('error', message, title, options)
  },

  info(message: string, title = 'Info', options?: Partial<ToastOptions>): void {
    showToast('info', message, title, options)
  },

  hide(): void {
    Toast.hide()
  },
} as const
