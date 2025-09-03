<template>
  <div class="header-container">
    <img src="@/assets/images/logo.jpg" alt="logo" class="logo" />
    <router-link to="/" class="nav-link">Vue Shop</router-link>
    <router-link to="/category" class="nav-link">Category</router-link>
    <div class="header-container float-right">
      <router-link to="/cart" class="nav-link">cart</router-link>
      <router-link to="/login" class="nav-link">login</router-link>
    </div>
  </div>
</template>
