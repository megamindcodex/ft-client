// transferValidator composables
import { defineStore } from 'pinia'
import { useUserStore } from '@/stores/userStore'
import { storeToRefs } from 'pinia'
import { ref, watch } from 'vue'

const userStore = useUserStore()
const { get_receiver_userName } = userStore
const { userData } = storeToRefs(userStore)

// const isUserDataLoading = ref(false)

export const useTransferValidatorStore = defineStore("transferValidator", () => {

  const isUserNameLoading = ref(false)

  const validate_accountNumber = async (accountNumber) => {
    if (accountNumber === undefined) {
      // console.error('accountNumber is Undefined')
      return { valid: false, error: true, message: 'accountNumber is Undefined' }
    } else if (accountNumber === '' || accountNumber === null) {
      // console.error('accountNumber is required')
      return { valid: false, error: true, message: 'Account number field is required' }
    } else if (accountNumber.length <= 9) {
      // console.error('Enter 10 digit account number')
      return { valid: false, error: true, message: 'Enter 10 digit account number' }
    }

    // console.log(accountNumber)
    isUserNameLoading.value = true
    // console.log("Loading start", isUserNameLoading.value)
    const result = await get_receiver_userName(accountNumber)

    if (!result.success) {
      isUserNameLoading.value = false
      // console.log("Loading stoped", isUserNameLoading.value)
      // console.error({ valid: false, message: result.error })
      return { valid: false, error: true, message: result.error }
    }

    isUserNameLoading.value = false
    // console.log("Loading stoped", isUserNameLoading.value)
    // console.log({ valid: true, meessage: result.data })
    return { valid: true, error: false, message: result.data }
  }

  const validate_amount = async (amount) => {
    const mainBalance = userData.value.finances.mainBalance

    if (amount === '' || amount === null) {
      // console.error('amount field is required')
      return { valid: false, error: true, message: 'Amount field is required' }
    } else if (Number(amount) < 10) {
      // console.log('minimum amount is $10')
      return { valid: false, error: true, message: 'Minimum amount is $10' }
    } else if (Number(mainBalance) < Number(amount)) {
      // console.error('Insufficient funds!')
      return { valid: false, error: true, message: `${mainBalance} < Insufficient Funds!` }
    }

    // console.log({ valid: true, error: false, message: null })
    return { valid: true, error: false, message: null }
  }




  return { isUserNameLoading, validate_accountNumber, validate_amount, }
})
