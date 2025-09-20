<template>
  <div>
    <p class="product-title">{{ productDetail?.title }}</p>
    <FwbCarousel :slide="true" animation :pictures="productDetail?.images" />
    <p>Category : {{ productDetail?.category?.name }}</p>
    <p>Description : {{ productDetail?.description }}</p>
    <p>Price : {{ productDetail?.price }}</p>
    <button class="button-primary" @click="addToCart">Add to Cart</button>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { axiosInstance } from '@/service/axiosClient'
import { useCartStore } from '@/stores/cart'
import { FwbCarousel } from 'flowbite-vue'

const route = useRoute()
const productDetail = ref({})
const cartStore = useCartStore()

const fetchProductDetail = async () => {
  await axiosInstance.get(`/products/${route.query.id}`).then((response) => {
    productDetail.value = response.data
    productDetail.value.images.forEach((image, index) => {
      productDetail.value.images[index] = {
        src: image,
        alt: 'product image',
      }
    })
  })
}

const addToCart = () => {
  cartStore.addToCart(productDetail.value)
}

onMounted(async () => {
  await fetchProductDetail()
})
</script>
