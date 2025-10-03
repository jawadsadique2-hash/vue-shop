<template>
  <fwb-card class="!max-w-full mb-10">
    <div class="grid grid-cols-12 gap-4 items-center">
      <div class="col-span-12 md:col-span-4">
        <img
          :src="categoryDetails?.image"
          class="w-full h-[300px] object-cover"
          alt="category image"
        />
      </div>
      <div class="col-span-12 md:col-span-8 p-4">
        <h2 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {{ categoryDetails?.name }}
        </h2>
      </div>
    </div>
  </fwb-card>
  <div class="grid grid-cols-12 gap-4">
    <div class="col-span-12 md:col-span-6" v-for="product in products" :key="product.id">
      <ProductCard :product="product" />
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { FwbCard } from 'flowbite-vue'
import { useCategoryStore } from '@/stores/category'
import ProductCard from '@/components/ProductCard.vue'

const route = useRoute()

const categoryStore = useCategoryStore()

const products = computed(() => categoryStore.productsByCategoryId)
const categoryDetails = computed(() => categoryStore.categoryDetails)

const fetchCategoryDetails = async () => {
  await categoryStore.fetchCategoryDetails(route.query.slug)
}
const fetchProductByCategoryId = async () => {
  await categoryStore.fetchProductsByCategoryId(categoryDetails.value.id)
}

onMounted(async () => {
  await fetchCategoryDetails()
  await fetchProductByCategoryId()
})
</script>
