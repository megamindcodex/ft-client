import { defineStore } from 'pinia'
import { ref } from 'vue'
import apiClient from '../api/apiConfig'

import { useChatStore } from '@/stores/sockets/chat'
import { useNewsStore } from '@/stores/sockets/news'
import { formatDate } from '@vueuse/core'

export const useUserStore = defineStore('userStore', () => {
  const userData = ref(null)
  const userDataError = ref(null)

  const { connect_to_chat_socket } = useChatStore()
  const { connect_to_news_socket } = useNewsStore()

  const registerUser = async (formData) => {
    try {
      console.log(formData)
      const response = await apiClient.post('/auth/sign-up', formData)

      if (response.status !== 201) {
        return { success: false, error: response.error }
      }
      return { success: true, data: response.data }
    } catch (err) {
      console.error('error signing in', err)
      return { success: false, error: 'Internal server error. oops...Something is wrong' }
    }
  }

  const loginUser = async (formData) => {
    try {
      // console.log(formData)
      const res = await apiClient.post('/auth/login', formData)

      if (res.status === 404 || res.status === 400 || res.status === 401) {
        throw new Error(res.error)
      } else if (res.status === 500) {
        throw new Error('Internal server Error, try again later')
      }

      // console.log(res)
      return { success: true, data: res.data }
    } catch (err) {
      console.error('error logging in', err)
      return { success: false, error: err.response.data.error }
    }
  }

  const getUserData = async (accessToken) => {
    try {
      // const accessToken = await getCookies('fintech-access-token')
      const res = await apiClient.get('/api/get_user_data', { token: accessToken })
      if (res.status === 404 || res.status === 400 || res.status === 401) {
        return { success: false, error: res.error }
      } else if (res.status === 500) {
        throw new Error('oops...Something is wrong')
      }

      userData.value = res.data
      return { success: true, data: res.data }
    } catch (err) {
      console.error('error getting user Data', err)
      return { success: false, error: err }
    }
  }

  const connect_to_websockets = async (userName) => {
    try {
      await connect_to_chat_socket(userName)
      connect_to_news_socket(userName)
    } catch (err) {
      console.error('error connecting to all or one websocket', err)
    }
  }
  return {
    userData,
    userDataError,
    registerUser,
    loginUser,
    getUserData,
    connect_to_websockets
  }
})
