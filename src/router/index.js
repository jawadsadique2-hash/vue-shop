import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useUserStore } from '../stores/user'

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
    {
      path: '/dashboard',
      name: 'dashboard',
      redirect: '/dashboard/admin-dashboard',
      component: () => import('../layouts/adminDashboard.vue'),
      meta: { requiresAuth: true },
      children: [
        {
          path: 'admin-dashboard',
          name: 'adminDashboard',
          component: () => import('../views/dashboard/AdminDashboard.vue'),
        },
        {
          path: 'category',
          name: 'dashboardCategory',
          component: () => import('../views/dashboard/DashboardCategory.vue'),
        },
      ],
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()
  if (!userStore.isLoggedIn) {
    await userStore.fetchSession()
  }
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)

  if (requiresAuth && !userStore.isLoggedIn) {
    next({ name: 'login' })
  } else if (to.name === 'login' && userStore.isLoggedIn) {
    next({ name: 'dashboard' })
  } else {
    next()
  }
})

export default router
