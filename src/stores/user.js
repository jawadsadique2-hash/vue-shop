import { ref } from 'vue'
import { defineStore } from 'pinia'
import { computed } from 'vue'
import { supabase } from '../service/supabaseClient'
import { useRouter } from 'vue-router'

export const useUserStore = defineStore('user', () => {
  const router = useRouter()
  const user = ref({ email: '', password: '' })

  const token = ref(null)
  const authUser = ref(null)
  const isLoggedIn = computed(() => !!authUser.value)

  function setUser(email, password) {
    user.value.email = email
    user.value.password = password
  }
  const fetchSession = async () => {
    const { data, error } = await supabase.auth.getSession()
    
    if (!data?.session || error) {
      authUser.value = null
      token.value = null
    } else {
      authUser.value = data.session?.user || null
      token.value = data.session?.access_token || null
    }
  }
  const loginWithEmail = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) throw error
    token.value = data.session?.access_token || null
    authUser.value = data.session?.user || null
    await router.push({ name: 'dashboard' })
  }
  async function logout() {
    await supabase.auth.signOut()
    await fetchSession()
    router.replace('/')
  }

  function getUser() {
    return user.value
  }
  return { user, setUser, getUser, authUser, isLoggedIn, fetchSession, loginWithEmail, logout }
})
