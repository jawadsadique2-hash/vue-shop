import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useAppStore } from '@/stores/app'

export const useCartStore = defineStore('cart', () => {
  const appStore = useAppStore()
  const cart = ref([])

  const addToCart = (product) => {
    cart.value.push(product)
    appStore.showToast('Product added to cart', 'success')
  }
  const removeFromCart = (index) => {
    cart.value.splice(index, 1)
    appStore.showToast('Product removed from cart', 'success')
  }
  return { cart, addToCart, removeFromCart }
})
