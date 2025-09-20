<template>
  <fwb-navbar>
    <template #logo>
      <fwb-navbar-logo class="" alt="Flowbite logo" image-url="/logo.jpg" link="/" />
    </template>
    <template #default="{ isShowMenu }">
      <fwb-navbar-collapse :is-show-menu="isShowMenu">
        <fwb-navbar-link link="/category"> Category </fwb-navbar-link>
        <fwb-navbar-link link="/cart"> Cart </fwb-navbar-link>
        <fwb-navbar-link link="/login"> Login </fwb-navbar-link>
      </fwb-navbar-collapse>
    </template>
  </fwb-navbar>
</template>
<script setup>
import { FwbNavbar, FwbNavbarCollapse, FwbNavbarLink, FwbNavbarLogo } from 'flowbite-vue'
</script>
