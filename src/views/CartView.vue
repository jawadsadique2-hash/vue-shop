<template>
  <h1>Cart</h1>
  <div v-for="(product, index) in cartStore.cart" :key="index">
    <p>Product Title: {{ product?.title }}</p>
    <p>Price : {{ product.price }}</p>
    <button @click="onRemoveFromCart(index)">Remove from cart</button>
  </div>
</template>

<script setup>
import { useCartStore } from '@/stores/cart'
const cartStore = useCartStore()
const onRemoveFromCart = (index) => {
  cartStore.removeFromCart(index)
}
</script>
