<template>
  <h1>Product Categories</h1>
  <div v-for="(category, index) in categories" :key="index">
    <button @click="onCategoryNameClick(category)">{{ category.name }}</button>
  </div>
  <div>
    <p>selected Category</p>
    {{ selectedCategory }}
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { axiosInstance } from '@/service/axiosClient'

const categories = ref([])
const selectedCategory = ref(null)

const fetchCategories = async () => {
  await axiosInstance.get('/categories').then((response) => {
    categories.value = response.data
  })
}
const onCategoryNameClick = async (category) => {
  selectedCategory.value = category
  const slug = selectedCategory.value.slug
  await axiosInstance.get(`/products/?categorySlug=${slug}`).then((response) => {
    console.log(response.data)
  })
}

onMounted(() => {
  fetchCategories()
})
</script>
