<template>
  <div class="flex justify-end mb-4">
    <FwbSelect
      class="w-64"
      v-model="selectedCategory"
      @update:model-value="onCategoryChange"
      :options="categories"
    />
  </div>
  <div class="grid grid-cols-12 gap-4">
    <div class="col-span-12">
      <p>Found {{ filteredProducts.length }} products</p>
    </div>
    <div class="col-span-12 lg:col-span-4" v-for="product in filteredProducts" :key="product.id">
      <ProductCard :product="product" />
    </div>
  </div>
</template>
<script setup>
import { useProductStore } from '@/stores/product'
import ProductCard from '@/components/ProductCard.vue'
import { FwbSelect } from 'flowbite-vue'
import { useCategoryStore } from '@/stores/category'
import { ref } from 'vue'
import { onMounted } from 'vue'

const categoryStore = useCategoryStore()
const productStore = useProductStore()

const categories = ref([])
const products = ref([])
const filteredProducts = ref([])
const selectedCategory = ref('')

const onCategoryChange = () => {
  filteredProducts.value = products.value.filter((product) => {
    return product.category_id === selectedCategory.value
  })
}

onMounted(() => {
  categories.value = categoryStore.categories.map((category) => {
    return {
      ...category,
      value: category.id,
    }
  })
  products.value = productStore.products
  filteredProducts.value = products.value
})
</script>
