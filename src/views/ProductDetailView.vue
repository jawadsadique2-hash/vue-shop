<template>
  <div
    class="max-w-6xl mx-auto my-10 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg grid grid-cols-12 gap-8 items-start"
  >
    <!-- Product Image -->
    <div class="col-span-12 md:col-span-6">
      <!-- <fwb-carousel :pictures="pictures" /> -->
      <img :src="productDetail?.images?.[0]" alt="" />
      <FwbButton
        @click="addToCart"
        class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-200 w-full"
      >
        Add to Cart
      </FwbButton>
    </div>

    <!-- Product Info -->
    <div class="col-span-12 md:col-span-6 flex flex-col justify-between space-y-6">
      <div>
        <h1 class="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">
          {{ productDetail?.name }}
        </h1>
        <p class="text-gray-500 dark:text-gray-400 mb-4">
          Category:
          <span class="font-semibold text-gray-700 dark:text-gray-200">{{
            productDetail?.category?.name
          }}</span>
        </p>
        <p class="text-gray-700 dark:text-gray-300 mb-4">
          {{ productDetail?.description }}
        </p>
        <div class="flex flex-wrap gap-6 mt-4">
          <p class="text-xl font-semibold text-gray-900 dark:text-white">
            Price: ${{ productDetail?.price }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import { useProductStore } from '@/stores/product'
import { FwbButton } from 'flowbite-vue'

const route = useRoute()
const cartStore = useCartStore()
const productStore = useProductStore()

const productDetail = computed(() => productStore.productDetail)

const fetchProductDetail = async () => {
  await productStore.fetchProductDetailBySlug(route.query.slug)
}

const addToCart = () => {
  cartStore.addToCart(productDetail.value)
}

onMounted(async () => {
  await fetchProductDetail()
})
</script>
