import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import apiClient from '../api/apiConfig'
import { useRouter } from 'vue-router'
import { useCookies } from "../composables/useCookies"

export const useTransferStore = defineStore('transferStore', () => {


  const { getCookie } = useCookies()
  const accessToken = ref(null)


  const transactions = ref([])
  const processingPayment = ref(false)
  const transferErrorInfo = ref({
    error: false,
    errorMsg: "",
  })
  const router = useRouter()


  const transfer_funds = async (formData, invoice) => {
    try {
      processingPayment.value = true
      console.log(`processingPayment ${processingPayment.value}`)
      console.log(formData)

      accessToken.value = await getCookie()
      // console.log(accessToken)

      if (!accessToken.value) {
        processingPayment.value = false
        console.log(`processingPayment ${processingPayment.value}`)
        console.log("Access token is required")
        transferErrorInfo.value.error = true
        transferErrorInfo.value.errorMsg = "Access token is required"
        return { success: fasle, error: "Access token is required" }
      }


      transferErrorInfo.value.error = false
      transferErrorInfo.value.errorMsg = ""
      const { recipient, account, amount } = invoice

      // Set the Authorization header with the access token
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken.value}`
        }
      }

      const res = await apiClient.post('/api/transfer_funds', formData, config)

      if (res.status !== 200) {
        transferErrorInfo.value.error = true
        transferErrorInfo.value.errorMsg = res.error
        processingPayment.value = false
        return { success: false, error: res.error }
      }

      // transferErrorInfo.value.error = false
      // transferErrorInfo.value.message = ""
      // if (res.message === "locationMismatch") {
      //   transferErrorInfo.value.error = true
      //   transferErrorInfo.value.message = "payment could not process due to account location mismatch"
      //   console.error("payment could not process due to account location mismatch")
      //   return { success: false, error: "payment could not process due to account location mismatch" }
      // }



      // router.push({name: "success-transfer"})
      transferErrorInfo.value.error = false
      transferErrorInfo.value.errorMsg = ""
      processingPayment.value = false
      console.log(`processingPayment ${processingPayment.value}`)
      router.push({ name: "success-transfer", params: { recipient: recipient, account: account, amount: amount } })
      return { success: true, data: res.data }
    } catch (err) {
      transferErrorInfo.value.error = true
      transferErrorInfo.value.errorMsg = err.response.data.error
      processingPayment.value = false
      console.error('Failed to transfer funds', err, err.response.data.error)
      return { success: false, error: err.response.data.error }
    }
  }


  const close_paymentError = () => {
    transferErrorInfo.value.error = false
    transferErrorInfo.value.errorMsg = ""
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
    processingPayment,
    transactions,
    transferErrorInfo,
    transfer_funds,
    close_paymentError
  }
})
