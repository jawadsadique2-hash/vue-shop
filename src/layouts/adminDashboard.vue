<template>
  <div class="grid grid-cols-12 gap-4">
    <div class="col-span-3 p-4 bg-gray-100 h-screen rounded-lg">
      <ul>
        <li v-for="item in sidebarItems" :key="item.title" class="mb-2 text-sm">
          <RouterLink
            active-class="bg-gray-200"
            :to="item.link"
            class="block p-2 hover:bg-gray-200 rounded-lg text-center"
          >
            {{ item.title }}
          </RouterLink>
        </li>
        <FwbButton class="w-full text-sm" size="sm" color="dark" @click="onLogout"
          >Logout</FwbButton
        >
      </ul>
    </div>
    <div class="col-span-9 container mx-auto p-4 bg-gray-100 h-screen rounded-lg">
      <RouterView />
    </div>
  </div>
</template>
<script setup>
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
const router = useRouter()
const userStore = useUserStore()
import { FwbButton } from 'flowbite-vue'
const sidebarItems = [
  {
    title: 'Dashboard',
    icon: 'home',
    link: '/dashboard/admin-dashboard',
  },

  {
    title: 'Categories',
    icon: 'list',
    link: '/dashboard/category',
  },
  //   {
  //     title: 'Products',
  //     icon: 'box',
  //     link: '/dashboard/products',
  //   },
  //   {
  //     title: 'Orders',
  //     icon: 'shopping-cart',
  //     link: '/dashboard/orders',
  //   },
  //   {
  //     title: 'Users',
  //     icon: 'users',
  //     link: '/dashboard/users',
  //   },
]
const onLogout = async () => {
  await userStore.logout()
  
}
</script>
