import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import apiClient from '../api/apiConfig'

import { useChatStore } from '@/stores/sockets/chat'
import { useNewsStore } from '@/stores/sockets/news'
import { useRouter } from 'vue-router'

export const useUserStore = defineStore('userStore', () => {
  const userData = ref({})
  const isLoading = ref(false)
  const isUserNameLoaing = ref(false)
  const router = useRouter()

  const finances = computed(() => {
    if (userData.value === null || userData.value === undefined || userData.value == {}) {
      return null
    } else {
      return userData.value.finances
    }
  })

  const { connect_to_chat_socket } = useChatStore()
  const { connect_to_news_socket } = useNewsStore()

  // ******************Register user code functions****************//
  const registerUser = async (formData) => {
    try {
      // console.log(formData)
      const res = await apiClient.post('/auth/sign-up', formData)

      if (res.status !== 201) {
        // console.log(response)
        return { success: false, error: res.error }
      }
      console.log(res)
      return { success: true, data: res.data.message }
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
      console.log(res)
      return { success: true, data: res.data.message }
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
      await connect_to_chat_socket(userName)
      connect_to_news_socket(userName)
    } catch (err) {
      console.error('error connecting to all or one websocket', err)
    }
  }
  // **************************************************** //

  //*************get user data code function**************//
  const getUserData = async (accessToken) => {
    try {
      // const accessToken = await getCookies('fintech-access-token')
      const res = await apiClient.get('/api/get_user_data')
      if (res.status !== 200) {
        return { success: false, error: res.error }
      } else if (res.status === 500) {
        throw new Error('oops...Something is wrong')
      }
      userData.value = res.data
      return { success: true, data: res.data }
    } catch (err) {
      console.error('error getting user Data', err)
      return { success: false, error: err.response.data.error }
    }
  }
  // ******************************************************** //

  // **************validate Receiver Account Number************//
  const get_receiver_userName = async (accountNumber) => {
    try {
      // console.log(accountNumber)
      isUserNameLoaing.value = true
      const res = await apiClient.get('/api/get_receiver_userName', { params: { accountNumber } })

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
    registerUser,
    loginUser,
    getUserData,
    connect_to_websockets,
    send_reset_code,
    reset_password,
    get_receiver_userName
  }
})
