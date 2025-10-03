import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getAllCategories, getCategoryBySlug, getProductByCategoryId } from '@/service/category'

export const useCategoryStore = defineStore('category', () => {
  const categories = ref([])
  const categoryDetails = ref(null)
  const productsByCategoryId = ref([])

  const fetchAllCategories = async () => {
    const data = await getAllCategories()
    categories.value = data || []
  }

  const fetchCategoryDetails = async (slug) => {
    console.log(slug)
    const data = await getCategoryBySlug(slug)
    categoryDetails.value = data || null
  }
  const fetchProductsByCategoryId = async (id) => {
    const data = await getProductByCategoryId(id)
    productsByCategoryId.value = data || []
  }

  return {
    categories,
    categoryDetails,
    productsByCategoryId,
    fetchAllCategories,
    fetchCategoryDetails,
    fetchProductsByCategoryId,
  }
})
