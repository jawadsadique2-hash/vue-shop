<script setup>
import { ref } from 'vue'

const email = ref('')
const password = ref('')
const username = ref('')
const signup = () => {
  console.log('email', email.value)
  console.log('password', password.value)
  console.log('username', username.value)
}
</script>
<template>
  <h1>Signup to Vue Shop</h1>
  <div class="container">
    <input type="text" v-model="email" placeholder="E-Mail" />
    <input type="password" v-model="password" placeholder="Password" />
    <input type="text" v-model="username" placeholder="User Name" />
    <button class="hulk" @click="signup">Signup</button>
  </div>
</template>
