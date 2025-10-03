<template>
  <HeaderComponent />
  <div class="container mx-auto p-4">
    <RouterView />
  </div>
  <div class="fixed top-5 right-5 z-50">
    <fwb-toast v-if="appStore.isToastVisible" closable  :type="appStore.toastType">
      {{ appStore.toastMessage }}
    </fwb-toast>
  </div>
</template>
<script setup>
import HeaderComponent from '@/components/HeaderComponent.vue'
import { FwbToast } from 'flowbite-vue'
import { useAppStore } from '@/stores/app'
const appStore = useAppStore()
</script>
<style></style>
