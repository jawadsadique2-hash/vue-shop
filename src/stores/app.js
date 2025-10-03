import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', () => {
  const isToastVisible = ref(false)
  const toastMessage = ref('')
  const toastType = ref('success')
  const timeoutId = ref(null)

  const showToast = (message, type = 'success',duration = 3000) => {
    isToastVisible.value = true
    toastMessage.value = message
    toastType.value = type
    if (timeoutId.value) {
      clearTimeout(timeoutId.value)
    }
    timeoutId.value = setTimeout(() => {
      closeToast()
    }, duration)
  }
  const closeToast = () => {
    isToastVisible.value = false
    toastMessage.value = ''
    toastType.value = ''
    if (timeoutId.value) {
      clearTimeout(timeoutId.value)
    }
  }
  return { isToastVisible, toastMessage, toastType, showToast, closeToast }
})
