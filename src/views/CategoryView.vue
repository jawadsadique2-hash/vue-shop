<template>
  <h1>Product Categories</h1>
  <div class="flex gap-5">
    <div
      class="card"
      v-for="(category, index) in categories"
      :key="index"
      @click="onCategoryNameClick(category)"
    >
      <img :src="category.image" alt="category image" class="category-image" />
      <p>{{ category.name }}</p>
    </div>
  </div>
</template>

<script setup>
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
