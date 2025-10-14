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
  FwbSelect,
  FwbTextarea,
} from 'flowbite-vue'
import { onMounted, ref, computed } from 'vue'
import * as yup from 'yup'
import { useProductStore } from '@/stores/product'
import { useCategoryStore } from '@/stores/category'
import { useForm, useField, useFieldArray } from 'vee-validate'
import { insertProduct, updateProduct, deleteProduct } from '@/service/product'

const schema = yup.object({
  name: yup.string().required('Name is required'),
  slug: yup.string().required('Slug is required'),
  category: yup.number().required('Category is required'),
  description: yup.string().required('Description is required'),
  price: yup.number().required('Price is required'),
  images: yup
    .array()
    .of(yup.string().required('Image URL is required').min(1, 'Image URL is required')),
  videos: yup.array(),
})

const { handleSubmit, errors, setValues } = useForm({
  validationSchema: schema,
})

const { value: name, errorMessage: nameError } = useField('name')
const { value: slug, errorMessage: slugError } = useField('slug')
const { value: category, errorMessage: categoryError } = useField('category')
const { value: description, errorMessage: descriptionError } = useField('description')
const { value: price, errorMessage: priceError } = useField('price')
const { fields: images, push: addImage, remove: removeImage } = useFieldArray('images')
const { fields: videos, push: addVideo, remove: removeVideo } = useFieldArray('videos')
// const { value: specification, errorMessage: specificationError } = useField('specification')

const productStore = useProductStore()
const categoryStore = useCategoryStore()
const searchKeyword = ref('')
const isShowModal = ref(false)
const selectedProduct = ref(null)

const products = computed(() => productStore.products)
const categoriesList = computed(
  () =>
    categoryStore.categories?.map((category) => ({
      name: category.name,
      value: Number(category.id),
    })) || [],
)

const onNewProductAdd = () => {
  selectedProduct.value = null
  isShowModal.value = true
}
const onEditProduct = (product) => {
  selectedProduct.value = product
  setValues({
    name: product.name,
    slug: product.slug,
    category: product.category,
    description: product.description,
    price: product.price,
    images: product.images,
    videos: product.videos,
  })

  // image.value = product.image
  isShowModal.value = true
}
const onDeleteProduct = async (product) => {
  await deleteProduct(product)
  await productStore.fetchAllProduct()
}
const closeModal = () => {
  isShowModal.value = false
  selectedProduct.value = null
  name.value = ''
  slug.value = ''
  category.value = ''
  description.value = ''
  price.value = ''
  images.value = []
  videos.value = []
  // specification.value = ''
}

const submitForm = handleSubmit(async (values) => {
  if (selectedProduct.value) {
    await updateProduct(selectedProduct.value.id, values)
  } else {
    await insertProduct(values)
  }
  await productStore.fetchAllProduct()
  closeModal()
})
onMounted(async () => {
  categoryStore.fetchAllCategories()
  productStore.fetchAllProduct()
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
          <img class="w-16 h-16 rounded-2xl" :src="product.images?.[0]" alt="product.name" />
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
            for="category"
            class="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Category
          </label>
          <FwbSelect
            id="category"
            placeholder="Select Product Category"
            v-model="category"
            :options="categoriesList"
          />
          <p v-if="categoryError" class="mt-1 text-sm text-red-600 dark:text-red-400">
            {{ categoryError }}
          </p>
        </div>
        <div>
          <label
            for="description"
            class="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Description
          </label>
          <FwbTextarea
            id="description"
            placeholder="Enter Product Description"
            v-model="description"
          />
          <p v-if="descriptionError" class="mt-1 text-sm text-red-600 dark:text-red-400">
            {{ descriptionError }}
          </p>
        </div>
        <div>
          <label
            for="price"
            class="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Price
          </label>
          <FwbInput id="price" placeholder="Enter Product Price" v-model="price" />
          <p v-if="priceError" class="mt-1 text-sm text-red-600 dark:text-red-400">
            {{ priceError }}
          </p>
        </div>
        <div>
          <label class="block mb-1">Images</label>
          <div v-for="(img, index) in images" :key="index" class="flex items-center mb-2">
            <input
              v-model="img.value"
              type="text"
              placeholder="Enter image URL"
              class="border rounded px-2 py-1 flex-1"
            />
            <button type="button" @click="removeImage(index)" class="ml-2 text-red-500">
              Delete
            </button>
            <p v-if="errors.images?.[index]" class="text-red-500">{{ errors.images[index] }}</p>
          </div>
          <button type="button" @click="addImage('')" class="mt-2 text-blue-500">Add Image</button>
        </div>
        <div>
          <label class="block mb-1">Videos</label>
          <div v-for="(vid, index) in videos" :key="index" class="flex items-center mb-2">
            <input
              v-model="vid.value"
              type="text"
              placeholder="Enter video URL"
              class="border rounded px-2 py-1 flex-1"
            />
            <button type="button" @click="removeVideo(index)" class="ml-2 text-red-500">
              Delete
            </button>
            <p v-if="errors.videos?.[index]" class="text-red-500">{{ errors.videos[index] }}</p>
          </div>
          <button type="button" @click="addVideo('')" class="mt-2 text-blue-500">Add Video</button>
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
