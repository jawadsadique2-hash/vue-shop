import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getAllCategories } from '@/service/category'

export const useCategoryStore = defineStore('category', () => {
  const categories = ref([])

  const fetchAllCategories = async () => {
    const data = await getAllCategories()
    categories.value = data || []
  }

  return { categories, fetchAllCategories }
})
