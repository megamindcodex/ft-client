import { defineStore } from 'pinia'
import { reactive, ref, watchEffect } from 'vue'

export const useAlertStore =
  ('alertStore',
    () => {
      const displayAlert = ref(false)
      const alertData = reactive({
        type: '',
        message: ''
      })

      const toggleAlert = async (type, message, state) => {
        try {
          // console.log(`parameters: ${type},  ${message}, ${state}`)

          displayAlert.value = state
          alertData.type = type
          alertData.message = message
          // console.log(`after alertData mutation: ${alertData.type}, ${alertData.message}`)
          // console.log(displayAlert.value)
        } catch (err) {
          console.error(err.message, err)
        }
      }
      return { alertData, displayAlert, toggleAlert }
    })
