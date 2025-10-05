<template>
  <div class="mt-4">
    <fwb-file-input v-model="file" dropzone />
    <fwb-button
      class="w-full mt-4 flex items-center justify-center text-center"
      :loading="loading"
      @click="onUpload"
      >Upload</fwb-button
    >
    <div class="grid grid-cols-12 gap-4 mt-4">
      <div
        v-for="fileInstance in files"
        :key="fileInstance.id"
        class="col-span-12 sm:col-span-6 md:col-span-3 relative"
      >
        <img
          :src="fileInstance.publicUrl"
          alt=""
          class="h-[250px] w-full object-cover rounded-xl"
        />
        <fwb-button
          class="absolute top-2 right-15"
          size="xs"
          color="dark"
          @click="onRemove(fileInstance)"
          >Remove</fwb-button
        >
        <fwb-button
          class="absolute top-2 right-2"
          size="xs"
          color="dark"
          @click="onCopy(fileInstance)"
          >Copy</fwb-button
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { FwbFileInput, FwbButton } from 'flowbite-vue'
import { useAppStore } from '@/stores/app'
import { uploadFile, getAllFiles, deleteFile } from '@/service/file'

const appStore = useAppStore()

const props = defineProps({
  type: {
    type: String,
    default: 'product',
  },
})

const maximumFileSize = 2 * 1024 * 1024

const file = ref(null)
const loading = ref(false)
const files = ref([])

const fetchFiles = async () => {
  const response = await getAllFiles(props.type)
  files.value = response
}

const onUpload = async () => {
  if (!file.value) return
  if (file.value.size > maximumFileSize) {
    appStore.showToast('File size is too large', 'error')
    return
  }
  try {
    loading.value = true
    const response = await uploadFile(file.value, props.type)
    if (response?.id) {
      appStore.showToast('File uploaded successfully', 'success')
      file.value = null
      fetchFiles()
    }

    loading.value = false
  } catch (error) {
    loading.value = false
    appStore.showToast(error, 'error')
  }
}
const onRemove = async (fileInstance) => {
  await deleteFile(fileInstance.name, props.type)
  await fetchFiles()
}
const onCopy = (fileInstance) => {
  window.navigator.clipboard.writeText(fileInstance.publicUrl)
  appStore.showToast('File copied to clipboard', 'success')
}
onMounted(async () => {
  await fetchFiles()
})
</script>
