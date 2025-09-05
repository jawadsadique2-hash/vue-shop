import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/sign-up',
      name: 'signup',
      component: () => import('../views/SignupView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/product-detail',
      name: 'productDetail',
      component: () => import('../views/ProductDetailView.vue'),
    },
    {
      path: '/category-detail',
      name: 'categoryDetail',
      component: () => import('../views/CategoryDetailView.vue'),
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('../views/CartView.vue'),
    },
    {
      path: '/check-out',
      name: 'checkOut',
      component: () => import('../views/CheckOutView.vue'),
    },
    {
      path: '/category',
      name: 'category',
      component: () => import('../views/CategoryView.vue'),
    },
  ],
})

export default router
