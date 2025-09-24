<template>
  <fwb-card class="!max-w-full cursor-pointer">
    <div class="grid grid-cols-12 gap-4 items-center">
      <div class="col-span-12 md:col-span-4">
        <img :src="product?.image" alt="product image" class="w-full h-[300px] object-cover" />
      </div>
      <div class="col-span-12 md:col-span-8 p-4">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {{ product.name }}
        </h5>
        <p class="font-normal text-gray-700 dark:text-gray-400">
          {{ product.description }}
        </p>
        <p class="font-bold text-gray-700 dark:text-gray-400">price : {{ product.price }}</p>
        <div class="flex flex-wrap items-center gap-2">
          <FwbButton
            color="alternative"
            size="sm"
            class="mt-2"
            @click="cartStore.addToCart(product)"
            >Add to cart</FwbButton
          >
          <FwbButton size="sm" class="mt-2" @click="onProductClick">See details -></FwbButton>
        </div>
      </div>
    </div>
  </fwb-card>
</template>

<script setup>
import { FwbCard } from 'flowbite-vue'
import { useCartStore } from '@/stores/cart'
import { useRouter } from 'vue-router'
import { FwbButton } from 'flowbite-vue'
const cartStore = useCartStore()
const router = useRouter()
const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
})
const onProductClick = () => {
  router.push({ name: 'productDetail', query: { id: props.product.id } })
}
</script>
