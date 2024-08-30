import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import apiClient from '../api/apiConfig'

import { useChatStore } from '@/stores/sockets/chat'
import { useNewsStore } from '@/stores/sockets/news'
import { useNotificationStore } from './sockets/notification'
import { useRouter } from 'vue-router'
import { errorMessages } from 'vue/compiler-sfc'
import { useCookies } from '@/composables/useCookies'
import { formatDate } from '@vueuse/core'

export const useUserStore = defineStore('userStore', () => {

  const { getCookie, setCookie } = useCookies()


  const accessToken = ref(null)
  const userData = ref({})
  const isLoading = ref(false)
  const isUserNameLoaing = ref(false)
  const router = useRouter()

  const finances = ref({})
  const transactions = ref([])
  const notifications = ref([])

  const recentTransactions = computed(() => {
    if (transactions.value.length < 1) {
      return []
    }
    return transactions.value.slice(0, 15)
  })
  // const { connect_to_chat_socket } = useChatStore()
  // const { connect_to_news_socket } = useNewsStore()



  // ******************Register user code functions****************//
  const registerUser = async (formData) => {
    try {
      // console.log(formData)
      const res = await apiClient.post('/auth/sign-up', formData)

      if (res.status !== 201) {
        // console.log(response)
        return { success: false, error: res.error }
      }

      await setCookie(res.data.cookie)
      accessToken.value = await getCookie()

      if (!accessToken.value) {
        return { success: false, error: "Access token is required" }
      }
      // console.log(accessToken.value)
      await mutate_userData(res.data.userData)
      return { success: true, message: res.data.message }
    } catch (err) {
      console.error('error signing in', err.response.data.error)
      return { success: false, error: err.response.data.error }
    }
  }
  // ************************************************************* //


  // ********************Login user code function****************//
  const loginUser = async (formData) => {
    try {
      // console.log(formData)
      const res = await apiClient.post('/auth/login', formData)

      if (res.status !== 200) {
        return { success: false, error: res.error }
      }

      await setCookie(res.data.cookie)
      accessToken.value = await getCookie()

      if (!accessToken.value) {
        return { success: false, error: "Access token is required" }
      }
      // console.log(accessToken.value)

      await mutate_userData(res.data.userData)
      return { success: true, data: res.data.userData, message: res.data.message }
    } catch (err) {
      console.error('error logging in', err)
      return { success: false, error: err.response.data.error }
    }
  }
  // ************************************************************* //

  // *********************send reset code Function*************** //
  const send_reset_code = async (email) => {
    try {
      const res = await apiClient.post('/auth/send_reset_code', { email: email })

      if (res.status !== 200) {
        console.log(res)
        return { success: false, error: res.error }
      }

      return { success: true, data: res.data }
    } catch (err) {
      console.error('error Sending Reset code', err)
      return { success: false, error: err.response.data.errors }
    }
  }

  //**************reset passowrd code Function*****************//
  const reset_password = async (formatDate) => {
    try {
      const res = await apiClient.post('/auth/reset_password', formatDate)

      if (res.status === 200) {
        return { success: true, data: res.data }
      }
    } catch (err) {
      console.error('error reset password', err)
      console.log(err.response.data.error)
      return { success: false, error: err.response.data.error }
    }
  }
  // *************************************************** //

  // *************connect to websocket code function
  const connect_to_websockets = async (userName) => {
    try {
      // await connect_to_chat_socket(userName)
      // await connect_to_news_socket(userName)
      const notificationStore = useNotificationStore()
      const { connect_to_notification_socket } = notificationStore
      await connect_to_notification_socket(userName)

    } catch (err) {
      console.error('error connecting to all or one websocket', err)
    }
  }
  // **************************************************** //

  //*************get user data code function**************//
  const getUserData = async () => {
    try {
      accessToken.value = await getCookie()
      if (!accessToken.value) {
        console.error("Access token required")
        return { success: false, error: "Access token required" }
      }

      // Set the Authorization header with the access token
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken.value}`
        }
      }

      const res = await apiClient.get('/api/get_user_data', config)
      if (res.status !== 200) {
        return { success: false, error: res.error }
      } else if (res.status === 500) {
        throw new Error('oops...Something is wrong')
      }
      userData.value = res.data
      finances.value = userData.value.finances
      transactions.value = userData.value.transactions.messages.reverse()
      notifications.value = userData.value.notification.messages.reverse()
      // console.log(userData.value)
      return { success: true, data: res.data }
    } catch (err) {
      console.error('error getting user Data', err)
      return { success: false, error: err.response.data.error }
    }
  }
  // ******************************************************** //


  // **************Mutate userData************//

  const mutate_userData = async (data) => {
    try {
      console.log("userData mutation")

      if (!userData.value) {
        return console.log("userData is empty")
      }
      userData.value = data

      if (!userData.value.finances) {
        console.log("userData response finance is null ")
      }
      finances.value = userData.value.finances

      if (userData.value.transactions.messages.length > 0) {
        transactions.value = userData.value.transactions.messages.reverse()
      } else {
        console.log("userData transactions messages is empty")
      }

      if (userData.value.notification.length > 0) {
        notifications.value = userData.value.notifications.messages.reverse()
      } else {
        console.log("userData notifications messages is empty")
      }
      console.log("tried mutating userDATA: ", userData.value)
      return
    } catch (err) {
      console.error("Error mutating user data", err.message, err,)
    }
  }

  // *************************************************** //


  // **************validate Receiver Account Number************//
  const get_receiver_userName = async (accountNumber) => {
    try {

      accessToken.value = await getCookie()
      if (!accessToken) {
        console.error("Access token required")
        return { success: false, error: "Access token required" }
      }

      const config = {
        headers: {
          Authorization: `Bearer ${accessToken.value}`
        },
        params: {
          accountNumber
        }
      }

      isUserNameLoaing.value = true
      const res = await apiClient.get('/api/get_receiver_userName', config)

      if (res.status !== 200) {
        isUserNameLoaing.value = false
        return { success: false, error: res.error }
      }

      isLoading.value = false
      return { success: true, data: res.data }
    } catch (err) {
      isLoading.value = false
      console.log('Error getting receiver User name', err.response.data.error)
      return { success: false, error: err.response.data.error }
    }
  }

  return {
    userData,
    finances,
    isLoading,
    isUserNameLoaing,
    transactions,
    notifications,
    recentTransactions,
    registerUser,
    loginUser,
    getUserData,
    mutate_userData,
    connect_to_websockets,
    send_reset_code,
    reset_password,
    get_receiver_userName
  }
})
