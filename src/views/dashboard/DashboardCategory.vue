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
import { useCategoryStore } from '@/stores/category'
import { useForm, useField } from 'vee-validate'
import { insertCategory, updateCategory, deleteCategory } from '@/service/category'

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

const categoryStore = useCategoryStore()
const searchKeyword = ref('')
const isShowModal = ref(false)
const selectedCategory = ref(null)

const categories = computed(() => categoryStore.categories)

const onNewCategoryAdd = () => {
  selectedCategory.value = null
  isShowModal.value = true
}
const onEditCategory = (category) => {
  selectedCategory.value = category
  name.value = category.name
  slug.value = category.slug
  image.value = category.image
  isShowModal.value = true
}
const onDeleteCategory = async (category) => {
  await deleteCategory(category)
  await categoryStore.fetchAllCategories()
}
const closeModal = () => {
  isShowModal.value = false
  selectedCategory.value = null
  name.value = ''
  slug.value = ''
  image.value = ''
  nameError.value = ''
  slugError.value = ''
  imageError.value = ''
}

const submitForm = handleSubmit(async (values) => {
  if (selectedCategory.value) {
    await updateCategory(selectedCategory.value.id, values)
  } else {
    await insertCategory(values)
  }
  await categoryStore.fetchAllCategories()
  closeModal()
})
onMounted(async () => {
  categoryStore.fetchAllCategories()
})
</script>

<template>
  <div class="flex items-center justify-between gap-4 mb-10">
    <div class="flex-1">
      <FwbInput class="!max-w-full w-full" v-model="searchKeyword" placeholder="Search Category" />
    </div>
    <FwbButton @click="onNewCategoryAdd">Add New</FwbButton>
  </div>
  <fwb-table>
    <fwb-table-head>
      <fwb-table-head-cell>Image</fwb-table-head-cell>
      <fwb-table-head-cell>Name</fwb-table-head-cell>
      <fwb-table-head-cell>slug</fwb-table-head-cell>
      <fwb-table-head-cell>Action</fwb-table-head-cell>
    </fwb-table-head>
    <fwb-table-body>
      <fwb-table-row v-for="category in categories" :key="category.id">
        <fwb-table-cell>
          <img class="w-16 h-16 rounded-2xl" :src="category.image" alt="category.name" />
        </fwb-table-cell>
        <fwb-table-cell>{{ category.name }}</fwb-table-cell>
        <fwb-table-cell>{{ category.slug }}</fwb-table-cell>
        <fwb-table-cell class="flex gap-2">
          <FwbButton color="dark" @click="onEditCategory(category)">Edit</FwbButton>
          <FwbButton color="red" @click="onDeleteCategory(category)">Delete</FwbButton>
        </fwb-table-cell>
      </fwb-table-row>
    </fwb-table-body>
  </fwb-table>
  <fwb-modal size="4xl" v-if="isShowModal" @close="closeModal" persistent>
    <template #header>
      <div class="flex items-center text-lg">
        {{ selectedCategory ? 'Edit Category' : 'Add Category' }}
      </div>
    </template>
    <template #body>
      <form @submit.prevent="submitForm" class="space-y-4">
        <div>
          <label for="name" class="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
            Name
          </label>
          <FwbInput id="name" type="text" placeholder="Enter Category Name" v-model="name" />
          <p v-if="nameError" class="mt-1 text-sm text-red-600 dark:text-red-400">
            {{ nameError }}
          </p>
        </div>
        <div>
          <label for="slug" class="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
            Slug
          </label>
          <FwbInput id="slug" type="text" placeholder="Enter Category Slug" v-model="slug" />
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
          <FwbInput id="image" type="text" placeholder="Enter Category Image Url" v-model="image" />
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
