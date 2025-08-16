import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const user = ref({ email: '', password: '' })

  function setUser(email, password) {
    user.value.email = email
    user.value.password = password
  }
  function getUser() {
    return user.value
  }
  return { user, setUser, getUser }
})
