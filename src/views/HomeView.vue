<template>
  <div>
    <input type="email" v-model="email" />
    <input type="password" v-model="password" />
    <button @click="onSumbit">Submit</button>
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
<style lang="scss" scoped></style>
