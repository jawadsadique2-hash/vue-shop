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
<style lang="scss" scoped>
.login-container {
  max-width: 400px;
  margin: 100px auto;
  padding: 2rem;
  background: #232121;
  border-radius: 12px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.input-field {
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  transition: 0.2s;
}
.login-btn {
  background-color: red;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  font-weight: bold;
}
.header {
  color: rgb(16, 212, 146);
}
</style>
