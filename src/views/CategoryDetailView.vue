<template>
  <fwb-card class="!max-w-full mb-10">
    <div class="grid grid-cols-12 gap-4 items-center">
      <div class="col-span-12 md:col-span-4">
        <img :src="categoryDetails.image" class="w-full h-[300px] object-cover" alt="category image" />
      </div>
      <div class="col-span-12 md:col-span-8">
        <h2 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {{ categoryDetails.name }}
        </h2>
      </div>
    </div>
  </fwb-card>
  <div class="grid grid-cols-12 gap-4">
    <fwb-card
      v-for="product in products"
      :key="product.id"
      @click="onProductClick(product)"
      class="!max-w-full col-span-12 md:col-span-6 cursor-pointer"
    >
      <div class="grid grid-cols-12 gap-10 items-center">
        <div class="col-span-12 md:col-span-4">
          <img :src="product.images[0]" alt="product image" class="w-full h-[300px] object-cover" />
        </div>
        <div class="col-span-12 md:col-span-8 pr-5">
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {{ product.title }}
          </h5>
          <p class="font-normal text-gray-700 dark:text-gray-400">
            {{ product.description }}
          </p>
        </div>
      </div>
    </fwb-card>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { axiosInstance } from '@/service/axiosClient'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'
import { FwbCard } from 'flowbite-vue'

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
