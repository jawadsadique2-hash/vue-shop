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
      <div class="col-span-12 md:col-span-8">
        <h2 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {{ categoryDetails.name }}
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
import { onMounted } from 'vue'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { FwbCard } from 'flowbite-vue'
import { useCategoryStore } from '@/stores/category'
import { useProductStore } from '@/stores/product'
import ProductCard from '@/components/ProductCard.vue'

const route = useRoute()

const categoryStore = useCategoryStore()
const productStore = useProductStore()

const categoryDetails = ref({})
const products = ref([])

const fetchCategoryDetails = async () => {
  categoryDetails.value = categoryStore.categories.find(
    (category) => category.id == route.query.slug,
  )
}
const fetchProductByCategorySlug = async () => {
  products.value = productStore.products.filter(
    (product) => product.category_id == route.query.slug,
  )
  console.log(products.value)
}

onMounted(async () => {
  await fetchCategoryDetails()
  await fetchProductByCategorySlug()
})
</script>
