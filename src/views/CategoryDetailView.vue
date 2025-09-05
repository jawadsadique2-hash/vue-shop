<template>
  <h1>Category Detail:</h1>
  <div class="mb-5">
    <p>Category Name : {{ categoryDetails.name }}</p>
    <img :src="categoryDetails.image" class="category-detail-image" alt="category image" />
  </div>
  <div>
    <h2>Products</h2>
    <div
      class="card"
      @click="onProductClick(product)"
      v-for="product in products"
      :key="product.id"
    >
      <img :src="product.images[0]" alt="product image" class="product-card-image" />
      <p>{{ product.title }}</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { axiosInstance } from '@/service/axiosClient'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

const categoryDetails = ref({})
const products = ref([])

const fetchCategoryDetails = async () => {
  await axiosInstance.get(`/categories/slug/${route.query.slug}`).then((response) => {
    categoryDetails.value = response.data
  })
}
const fetchProductByCategorySlug = async () => {
  await axiosInstance.get(`/products/?categorySlug=${route.query.slug}`).then((response) => {
    products.value = response.data
  })
}

const onProductClick = (product) => {
  router.push({ name: 'productDetail', query: { id: product.id } })
}

onMounted(async () => {
  await fetchCategoryDetails()
  await fetchProductByCategorySlug()
})
</script>
