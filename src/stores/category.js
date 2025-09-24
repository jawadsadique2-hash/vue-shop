import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCategoryStore = defineStore('category', () => {
  const initialCategories = [
    {
      id: 1,
      name: 'Laptop',
      slug: 'laptop',
      image:
        'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bGFwdG9wfGVufDB8fDB8fHww',
    },
    {
      id: 2,
      name: 'Monitor',
      slug: 'monitor',
      image:
        'https://images.unsplash.com/photo-1591370874773-6702e8f12fd8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fG1vbml0b3J8ZW58MHx8MHx8fDA%3D',
    },
    {
      id: 3,
      name: 'Smart Phone',
      slug: 'smart-phone',
      image:
        'https://plus.unsplash.com/premium_photo-1680985551009-05107cd2752c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c21hcnRwaG9uZXxlbnwwfHwwfHx8MA%3D%3D',
    },
    {
      id: 4,
      name: 'Camera',
      slug: 'camera',
      image:
        'http://images.unsplash.com/photo-1552168324-d612d77725e3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGNhbWVyYXxlbnwwfHwwfHx8MA%3D%3D',
    },
  ]

  const categories = ref(initialCategories)

  return { categories }
})
