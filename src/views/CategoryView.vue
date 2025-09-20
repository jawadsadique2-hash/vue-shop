<template>
  <h1 class="mb-4">Product Categories</h1>
  <div class="grid grid-cols-12 gap-4">
    <fwb-card
      v-for="(category, index) in categories"
      :key="index"
      @click="onCategoryNameClick(category)"
      class="!max-w-full col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-2 cursor-pointer"
    >
      <img :src="category.image" alt="category image" class="h-[200px] w-full object-cover" />
      <div class="p-5">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {{ category.name }}
        </h5>
      </div>
    </fwb-card>
  </div>
</template>

<script setup>
import { FwbCard } from 'flowbite-vue'
import { onMounted, ref } from 'vue'
import { axiosInstance } from '@/service/axiosClient'
import { useRouter } from 'vue-router'

const categories = ref([])
const router = useRouter()

const fetchCategories = async () => {
  await axiosInstance.get('/categories').then((response) => {
    categories.value = response.data
  })
}
const onCategoryNameClick = async (category) => {
  router.push({ name: 'categoryDetail', query: { slug: category.slug } })
}

onMounted(() => {
  fetchCategories()
})
</script>
