import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', () => {
  const cart = ref([])

  const addToCart = (product) => {
    cart.value.push(product)
  }
  const removeFromCart = (index) => {
    cart.value.splice(index, 1)
  }
  return { cart, addToCart, removeFromCart }
})
