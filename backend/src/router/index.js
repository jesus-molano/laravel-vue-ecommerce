import { createRouter, createWebHistory } from 'vue-router'
import { DashboardView, LoginView, RequestPassword, ResetPassword, ProductsView, ReportsView, UsersView, NotFoundView } from '@/views'
import { AppLayout } from '@/layouts'
import { useUserStore } from '../stores/userStore'

const routes = [
  {
    path: '/app',
    name: 'app',
    component: AppLayout,
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: 'dashboard',
        name: 'app.dashboard',
        component: DashboardView
      },
      {
        path: 'products',
        name: 'app.products',
        component: ProductsView
      },
      {
        path: 'users',
        name: 'app.users',
        component: UsersView
      },
      {
        path: 'reports',
        name: 'app.reports',
        component: ReportsView
      }
    ]

  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: {
      requiresGuest: true
    }
  },
  {
    path: '/request-password',
    name: 'requestPassword',
    component: RequestPassword,
    meta: {
      requiresGuest: true
    }
  },
  {
    path: '/reset-password/:token',
    name: 'resetPassword',
    component: ResetPassword,
    meta: {
      requiresGuest: true
    }
  },
  {
    path: '/:pathMatch(.*)',
    name: 'notFound',
    component: NotFoundView
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const user = useUserStore()

  if (to.meta.requiresAuth && !user.token) {
    next({ name: 'login' })
  } else if (to.meta.requiresGuest && user.token) {
    next({ name: 'app.dashboard' })
  } else {
    next()
  }
})

export default router
