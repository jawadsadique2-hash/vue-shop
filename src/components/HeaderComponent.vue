<template>
  <fwb-navbar>
    <template #logo>
      <fwb-navbar-logo class="" alt="Flowbite logo" image-url="/logo.jpg"  />
    </template>
    <template #default="{ isShowMenu }">
      <fwb-navbar-collapse :is-show-menu="isShowMenu">
        <router-link to="/category"> Category </router-link>
        <router-link to="/cart"> Cart ({{ cartStore.cart.length }}) </router-link>
        <router-link to="/login"> Login </router-link>
      </fwb-navbar-collapse>
    </template>
  </fwb-navbar>
</template>
<script setup>
import { useCartStore } from '@/stores/cart'
import { FwbNavbar, FwbNavbarCollapse, FwbNavbarLogo } from 'flowbite-vue'
const cartStore = useCartStore()
</script>
