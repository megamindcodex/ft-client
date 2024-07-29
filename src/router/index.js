import { createRouter, createWebHistory } from 'vue-router'
import AuthPage from '@/views/auth/AuthPage.vue'
import { useCookies } from '@/composables/useCookies'
import { cookieName } from '@/constant/cookieName'
import { ref } from 'vue'
const { getCookies } = useCookies()

// import HomeView from '@/views/HomeView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      // component: HomeView
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/auth',
      name: 'auth',
      component: AuthPage
    }
  ]
})

// Define the beforeEach method
router.beforeEach(async (to, from, next) => {
  const accessToken = await getCookies(cookieName)
  const checkForCookie = () => {
    if (!accessToken) {
      return false
    } else {
      return true
    }
  }

  const isAuthenticated = checkForCookie()
  // console.log(`is authenticated: ${isAuthenticated}`)
  // console.log(`to: ${to.path}`)
  // console.log(`to: ${from.path}`)

  if (to.name !== 'auth') {
    if (!isAuthenticated) {
      next({ name: 'auth' })
    } else {
      next()
    }
  }

  if (to.name === 'auth') {
    next()
  }
})

export default router
