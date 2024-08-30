import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import apiClient from '../api/apiConfig'
import { useRouter } from 'vue-router'
import { useCookies } from "../composables/useCookies"

export const useTransferStore = defineStore('transferStore', () => {


  const { getCookie } = useCookies()
  const accessToken = ref(null)


  const transactions = ref([])
  const router = useRouter()


  const transfer_funds = async (formData, invoice) => {
    try {

      console.log(formData)

      accessToken.value = await getCookie()
      // console.log(accessToken)

      if (!accessToken.value) {
        console.log("Access token is required")
        return { success: fasle, error: "Access token is required" }
      }

      const { recipient, account, amount } = invoice

      // Set the Authorization header with the access token
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken.value}`
        }
      }
      const res = await apiClient.post('/api/transfer_funds', formData, config)

      if (res.status !== 200) {
        return { success: false, error: res.error }
      }

      // router.push({name: "success-transfer"})
      router.push({ name: "success-transfer", params: { recipient: recipient, account: account, amount: amount } })
      return { success: true, data: res.data }
    } catch (err) {
      console.error('Failed to transfer funds', err, err.response.data.error)
      return { success: false, error: err.response.data.error }
    }
  }

  // const get_user_transactions = async () => {
  //   try {

  //     const userStore = useUserStore()
  //     const { getUserData } = userStore

  //     // const res = await apiClient.get('/api/get_user_transactions')
  //     // if (res.status !== 200) {
  //     //   return { success: false, error: res.error }
  //     // }
  //     const res = await getUserData()

  //     if (!res.success) {
  //       return { success: false, error: res.error }
  //     }
  //     userData.value = res.data
  //     return { success: true, data: res.data }
  //   } catch (err) {
  //     console.error('error getting user transactions', err)
  //     return { success: false, error: err.response.data.error }
  //   }
  // }


  return {
    transactions,
    transfer_funds,
  }
})
