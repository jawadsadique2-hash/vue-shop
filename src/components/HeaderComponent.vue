<template>
  <div class="p-6 text-center">
    <h2 class="text-3xl font-bold mb-4">Welcome to MyShop 🛍️</h2>
    <p class="text-gray-700">Browse categories and add your favorite products to the cart.</p>
  </div>
  <ul>
    <li><router-link to="/">home</router-link></li>
    <li><router-link to="/category">Category</router-link></li>
    <li><router-link to="/cart">cart</router-link></li>
    <li><router-link to="/login">login</router-link></li>
    <li><router-link to="/sign-up">signup</router-link></li>
    <li><router-link to="/check-out">checkout</router-link></li>
    <li><router-link :to="{ name: 'productDetail' }">product-detail</router-link></li>
  </ul>
</template>

<script setup>
// Simple home page, no extra logic yet
</script>

<style scoped>
/* You can add custom styles */
</style>
