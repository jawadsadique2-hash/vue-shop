<script setup>
import {
  FwbInput,
  FwbButton,
  FwbTable,
  FwbTableBody,
  FwbTableCell,
  FwbTableHead,
  FwbTableHeadCell,
  FwbTableRow,
  FwbModal,
} from 'flowbite-vue'
import { onMounted, ref, computed } from 'vue'
import * as yup from 'yup'
import { useProductStore } from '@/stores/product'
import { useForm, useField } from 'vee-validate'
import { insertProduct, updateProduct, deleteProduct } from '@/service/product'

const schema = yup.object({
  name: yup.string().required('Name is required'),
  slug: yup.string().required('Slug is required'),
  image: yup.string().required('Image is required'),
})

const { handleSubmit } = useForm({
  validationSchema: schema,
})

const { value: name, errorMessage: nameError } = useField('name')
const { value: slug, errorMessage: slugError } = useField('slug')
const { value: image, errorMessage: imageError } = useField('image')

const productStore = useProductStore()
const searchKeyword = ref('')
const isShowModal = ref(false)
const selectedProduct = ref(null)

const product = computed(() => productStore.products)

const onNewProductAdd = () => {
  selectedProduct.value = null
  isShowModal.value = true
}
const onEditProduct = (product) => {
  selectedProduct.value = product
  name.value = product.name
  slug.value = product.slug
  image.value = product.image
  isShowModal.value = true
}
const onDeleteProduct = async (product) => {
  await deleteProduct(product)
  await productStore.fetchAllProducts()
}
const closeModal = () => {
  isShowModal.value = false
  selectedProduct.value = null
  name.value = ''
  slug.value = ''
  image.value = ''
  nameError.value = ''
  slugError.value = ''
  imageError.value = ''
}

const submitForm = handleSubmit(async (values) => {
  if (selectedProduct.value) {
    await updateProduct(selectedProduct.value.id, values)
  } else {
    await insertProduct(values)
  }
  await productStore.fetchAllProducts()
  closeModal()
})
onMounted(async () => {
  productsStore.fetchAllProducts()
})
</script>

<template>
  <div class="flex items-center justify-between gap-4 mb-10">
    <div class="flex-1">
      <FwbInput class="!max-w-full w-full" v-model="searchKeyword" placeholder="Search Category" />
    </div>
    <FwbButton @click="onNewProductAdd">Add New</FwbButton>
  </div>
  <fwb-table>
    <fwb-table-head>
      <fwb-table-head-cell>Image</fwb-table-head-cell>
      <fwb-table-head-cell>Name</fwb-table-head-cell>
      <fwb-table-head-cell>slug</fwb-table-head-cell>
      <fwb-table-head-cell>Action</fwb-table-head-cell>
    </fwb-table-head>
    <fwb-table-body>
      <fwb-table-row v-for="product in products" :key="product.id">
        <fwb-table-cell>
          <img class="w-16 h-16 rounded-2xl" :src="product.image" alt="product.name" />
        </fwb-table-cell>
        <fwb-table-cell>{{ product.name }}</fwb-table-cell>
        <fwb-table-cell>{{ product.slug }}</fwb-table-cell>
        <fwb-table-cell class="flex gap-2">
          <FwbButton color="dark" @click="onEditProduct(product)">Edit</FwbButton>
          <FwbButton color="red" @click="onDeleteProduct(product)">Delete</FwbButton>
        </fwb-table-cell>
      </fwb-table-row>
    </fwb-table-body>
  </fwb-table>
  <fwb-modal size="4xl" v-if="isShowModal" @close="closeModal" persistent>
    <template #header>
      <div class="flex items-center text-lg">
        {{ selectedProduct ? 'Edit Product' : 'Add Product' }}
      </div>
    </template>
    <template #body>
      <form @submit.prevent="submitForm" class="space-y-4">
        <div>
          <label for="name" class="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
            Name
          </label>
          <FwbInput id="name" type="text" placeholder="Enter Product Name" v-model="name" />
          <p v-if="nameError" class="mt-1 text-sm text-red-600 dark:text-red-400">
            {{ nameError }}
          </p>
        </div>
        <div>
          <label for="slug" class="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
            Slug
          </label>
          <FwbInput id="slug" type="text" placeholder="Enter Product Slug" v-model="slug" />
          <p v-if="slugError" class="mt-1 text-sm text-red-600 dark:text-red-400">
            {{ slugError }}
          </p>
        </div>
        <div>
          <label
            for="image"
            class="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Image Url
          </label>
          <FwbInput id="image" type="text" placeholder="Enter Product Image Url" v-model="image" />
          <p v-if="imageError" class="mt-1 text-sm text-red-600 dark:text-red-400">
            {{ imageError }}
          </p>
        </div>
      </form>
    </template>
    <template #footer>
      <div class="flex justify-end gap-2">
        <fwb-button @click="closeModal" color="alternative">Cancel</fwb-button>
        <fwb-button @click="submitForm" color="dark">Submit</fwb-button>
      </div>
    </template>
  </fwb-modal>
</template>
