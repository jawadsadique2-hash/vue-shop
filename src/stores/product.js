import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getAllProducts,getProductDetailBySlug } from '@/service/product'

export const useProductStore = defineStore('product', () => {
  const products = ref([])
  const productDetail = ref(null)

  const fetchAllProduct = async () => {
    const data = await getAllProducts()
    products.value = data || []
  }

  const fetchProductDetailBySlug = async (slug) => {
    const data = await getProductDetailBySlug(slug)
    productDetail.value = data || null
  }

  return { products, productDetail, fetchAllProduct, fetchProductDetailBySlug }
})
