<template>
  <div class="header-container border-bottom">
    <img src="@/assets/images/logo.jpg" alt="logo" class="logo" />
    <router-link to="/" class="nav-link">Vue Shop</router-link>
    <router-link to="/category" class="nav-link">Category</router-link>
    <div class="flex gap-5 float-right">
      <router-link to="/cart" class="nav-link button-secondary">cart</router-link>
      <router-link to="/login" class="nav-link button-primary">login</router-link>
    </div>
  </div>
</template>
