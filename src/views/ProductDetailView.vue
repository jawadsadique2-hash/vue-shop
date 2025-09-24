<template>
  <div
    class="max-w-6xl mx-auto my-10 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg grid grid-cols-12 gap-8 items-start"
  >
    <!-- Product Image -->
    <div class="col-span-12 md:col-span-6">
      <img
        :src="productDetail?.image"
        alt="product image"
        class="w-full h-[400px] object-cover rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
      />
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
          <p class="text-lg text-gray-600 dark:text-gray-400">
            Quantity: {{ productDetail?.quantity }}
          </p>
        </div>
      </div>

      <!-- Action Button -->
      <FwbButton
        @click="addToCart"
        class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-200"
      >
        Add to Cart
      </FwbButton>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import { useProductStore } from '@/stores/product'
import { useCategoryStore } from '@/stores/category'
import { FwbButton } from 'flowbite-vue'

const route = useRoute()
const productDetail = ref({})
const cartStore = useCartStore()
const productStore = useProductStore()
const categoryStore = useCategoryStore()

const fetchProductDetail = async () => {
  productDetail.value = productStore.products.find((product) => product.id == route.query.id)
  productDetail.value.category = categoryStore.categories.find(
    (category) => category.id == productDetail.value.category_id,
  )
}

const addToCart = () => {
  cartStore.addToCart(productDetail.value)
}

onMounted(async () => {
  await fetchProductDetail()
})
</script>
