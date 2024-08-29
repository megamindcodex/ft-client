import { defineStore } from 'pinia'
import { useRoute, useRouter } from 'vue-router'

export const useNavigatorStore = defineStore('navigatorStore', () => {
  const router = useRouter()

  const navigateTo = async (path) => {
    console.log(path)
    router.push(path)
  }

  const navigateBack = (path) => {
    if (window.history.state.back === null) {
      router.push(path)
    } else {
      router.go(-1)
    }
  }

  
  return { navigateTo, navigateBack }
})
