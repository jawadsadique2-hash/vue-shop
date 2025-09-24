<template>
  <FwbTable>
    <FwbTableHead>
      <FwbTableHeadCell>Product Title</FwbTableHeadCell>
      <FwbTableHeadCell>Price</FwbTableHeadCell>
      <FwbTableHeadCell>Actions</FwbTableHeadCell>
    </FwbTableHead>
    <FwbTableBody>
      <FwbTableRow v-for="(product, index) in cartStore.cart" :key="index">
        <FwbTableCell>{{ product?.name }}</FwbTableCell>
        <FwbTableCell>{{ product.price }}</FwbTableCell>
        <FwbTableCell>
          <FwbButton color="alternative" @click="onRemoveFromCart(index)">Remove from cart</FwbButton>
        </FwbTableCell>
      </FwbTableRow>
    </FwbTableBody>
  </FwbTable>
</template>

<script setup>
import {
  FwbTable,
  FwbTableBody,
  FwbTableCell,
  FwbTableHead,
  FwbTableHeadCell,
  FwbTableRow,
  FwbButton,
} from 'flowbite-vue'
import { useCartStore } from '@/stores/cart'
const cartStore = useCartStore()
console.log(cartStore.cart)
const onRemoveFromCart = (index) => {
  cartStore.removeFromCart(index)
}
</script>
