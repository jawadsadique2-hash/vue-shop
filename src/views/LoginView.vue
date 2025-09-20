<template>
  <h1 class="header">Login to Vue-Shop</h1>
  <div class="login-container">
    <input type="email" v-model="email" placeholder="Email" class="input-field" /><br />
    <input type="password" v-model="password" placeholder="Password" class="input-field" /><br />
    <button @click="onSumbit" class="login-btn">Submit</button>
  </div>
</template>
<script setup>
import { ref } from 'vue'

const email = ref('')
const password = ref('')
const onSumbit = () => {
  console.log('email', email.value)
  console.log('password', password.value)
}
</script>

