import { createRouter, createWebHistory } from 'vue-router'
import { useCookies } from '@/composables/useCookies'
import { cookieName } from '@/constant/cookieName'
import { ref } from 'vue'
import SuccessTransfer from '@/components/Home/SuccessTransfer.vue'

import TransactionsHistoryView from '@/views/TransactionsHistoryView.vue'
import TransactionHistory from '@/components/Transaction/TransactionHistory.vue'
import TransactionDetail from '@/components/Transaction/TransactionDetail.vue'

import Me from "@/components/Me/Me.vue"

import TransferToBank from "@/components/Transaction/TransferToBank.vue"
import TransferCrypto from '@/components/Transaction/TransferCrypto.vue'

import AuthPage from '@/views/auth/AuthPage.vue'

const { getCookie } = useCookies()

// import HomeView from '@/views/HomeView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      default: 'dashboard',
      component: () => import('../views/HomeView.vue'),
      children: [
        {
          path: 'dashboard',
          name: 'dashboard',
          component: () => import('../components/Home/Dashboard.vue')
        },
        {
          path: '/',
          redirect: '/home/dashboard'
        },
        {
          path: '/home',
          redirect: '/home/dashboard'
        },
        {
          path: 'transfer-to-bitpay',
          component: () => import('../components/Transaction/TransferToBitpay.vue')
        },
        {
          path: "transfer-to-bank",
          component: TransferToBank
        },
        {
          path: "transfer-crypto",
          component: TransferCrypto
        },
        {
          path: "/notifications",
          component: () => import("../components/Home/Notifications.vue")
        }
      ]
    },
    {
      path: '/finance',
      name: 'finance',
      component: () => import('@/views/FinanceView.vue')
    },
    {
      path: '/account',
      name: 'account',
      default: () => import("@/views/AccountView.vue"),
      component: () => import('../views/AccountView.vue'),
      children: [
        {
          path: "profile",
          name: 'profile',
          component: () => import("@/components/Me/ProfilePage.vue")
        },
        {
          path: "me",
          name: "me",
          component: Me
        }
      ]
    },
    {
      path: '/transactions',
      name: 'transactions',
      component: TransactionHistory
    },
    {
      path: '/transactions/:id',
      name: 'transaction-detail',
      component: TransactionDetail
    },
    {
      path: '/success-transfer/:recipient/:account/:amount',
      name: "success-transfer",
      component: SuccessTransfer
    },
    {
      path: '/auth/:panel',
      name: 'auth',
      component: AuthPage
    }
  ]
})

// Define the beforeEach method
router.beforeEach(async (to, from, next) => {
  const accessToken = await getCookie(cookieName)
  // console.log(`accessToken: ${accessToken}`)
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
      // console.log(`is authenticated: ${isAuthenticated}`)
      next('/auth/login')
    } else {
      next()
    }
  }

  if (to.name === 'auth') {
    next()
  }
})

export default router
