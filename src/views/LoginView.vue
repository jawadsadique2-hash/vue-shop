<template>
  <div
    class="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
  >
    <div
      class="w-full max-w-md p-6 bg-white rounded-2xl shadow-lg border border-gray-100 dark:bg-gray-800 dark:border-gray-700"
    >
      <h1 class="text-2xl font-bold text-center text-gray-800 dark:text-gray-100 mb-6">
        Login to <span class="text-blue-600 dark:text-blue-400">Vue-Shop</span>
      </h1>

      <form @submit.prevent="submitForm" class="space-y-5">
        <!-- Email Input -->
        <div>
          <label
            for="email"
            class="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Email
          </label>
          <FwbInput id="email" type="email" placeholder="you@example.com" v-model="email" />
          <p v-if="emailError" class="mt-1 text-sm text-red-600 dark:text-red-400">
            {{ emailError }}
          </p>
        </div>

        <!-- Password Input -->
        <div>
          <label
            for="password"
            class="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Password
          </label>
          <FwbInput id="password" type="password" placeholder="••••••••" v-model="password" />
          <p v-if="passwordError" class="mt-1 text-sm text-red-600 dark:text-red-400">
            {{ passwordError }}
          </p>
        </div>

        <!-- Submit Button -->
        <FwbButton type="submit" class="w-full" color="blue"> Sign In </FwbButton>
      </form>

      <!-- Footer Links -->
      <p class="mt-5 text-sm text-center text-gray-600 dark:text-gray-400">
        Don’t have an account?
        <router-link class="text-blue-500 font-semibold hover:underline" to="/sign-up">
          Sign up
        </router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { FwbInput, FwbButton } from 'flowbite-vue'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import { useUserStore } from '../stores/user'

const userStore = useUserStore()

// Define Yup validation schema
const schema = yup.object({
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
})

// Connect the form context with the schema
const { handleSubmit } = useForm({
  validationSchema: schema,
})

// Individual fields (connected to the form)
const { value: email, errorMessage: emailError } = useField('email')
const { value: password, errorMessage: passwordError } = useField('password')

// ✅ Proper submission handler
const submitForm = handleSubmit(async (values) => {
  await userStore.loginWithEmail(values.email, values.password)
})
</script>

<style scoped>
.login-card {
  animation: fadeIn 0.6s ease-in-out;
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
