<template>
  <h1 class="mb-4">Product Categories</h1>
  <div class="grid grid-cols-12 gap-4">
    <fwb-card
      v-for="(category, index) in categoryStore.categories"
      :key="index"
      @click="onCategoryNameClick(category)"
      class="!max-w-full col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-2 cursor-pointer"
    >
      <img :src="category.image" alt="category image" class="h-[200px] w-full object-cover" />
      <div class="p-5">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {{ category.name }}
        </h5>
      </div>
    </fwb-card>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { FwbCard } from 'flowbite-vue'
import { useRouter } from 'vue-router'
import { useCategoryStore } from '@/stores/category'

const categoryStore = useCategoryStore()

const router = useRouter()

const onCategoryNameClick = async (category) => {
  router.push({ name: 'categoryDetail', query: { slug: category.slug } })
}

onMounted(async () => {
  await categoryStore.fetchAllCategories()
})
</script>
