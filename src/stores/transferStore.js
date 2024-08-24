import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import apiClient from '../api/apiConfig'
import { useRouter } from 'vue-router'

export const useTransferStore = defineStore('transferStore', () => {
  const transactions = ref([])
  const router = useRouter()

  const recentTransactions = computed(() => {
    if (transactions.value.length < 1) {
      return []
    }
    return transactions.value.slice(0, 15)
  })

  const transfer_funds = async (formData, invoice) => {
    try {
      const {recipient, account, amount} = invoice

      const res = await apiClient.post('/api/transfer_funds', formData)

      if (res.status !== 200) {
        return { success: false, error: res.error }
      }

      
      // router.push({name: "success-transfer"})
      router.push({name: "success-transfer", params: {recipient: recipient, account: account, amount: amount}})
      return { success: true, data: res.data }
    } catch (err) {
      console.error('Failed to transfer funds', err, err.response.data.error)
      return { success: false, error: err.response.data.error }
    }
  }

  const get_user_transactions = async () => {
    try {
      const res = await apiClient.get('/api/get_user_transactions')

      if (res.status !== 200) {
        return { success: false, error: res.error }
      }


      transactions.value = res.data
      // console.log(res)

      return { success: true, data: res.data }
    } catch (err) {
      console.error('error getting user transactions', err)
      return { success: false, error: err.response.data.error }
    }
  }

  return {
    transactions,
    recentTransactions,
    transfer_funds,
    get_user_transactions
  }
})
