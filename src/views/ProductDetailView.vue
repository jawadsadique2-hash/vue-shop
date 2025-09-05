<template>
  <div>
    <p class="product-title">{{ productDetail?.title }}</p>
    <img :src="productDetail?.images?.[0]" alt="product image" class="product-detail-image" />
    <p>Category : {{ productDetail?.category?.name }}</p>
    <p>Description : {{ productDetail?.description }}</p>
    <p>Price : {{ productDetail?.price }}</p>
    <button class="button-primary">Add to Cart</button>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { axiosInstance } from '@/service/axiosClient'

const route = useRoute()
const productDetail = ref({})

const fetchProductDetail = async () => {
  await axiosInstance.get(`/products/${route.query.id}`).then((response) => {
    productDetail.value = response.data
  })
}

onMounted(async () => {
  await fetchProductDetail()
})
</script>
