import { defineStore } from 'pinia'
import { useRoute, useRouter } from 'vue-router'

export const useNavigatorStore = defineStore('navigatorStore', () => {
  const router = useRouter()

  const navigateTo = async (path) => {
    console.log(path)
    router.push(path)
  }

  return { navigateTo }
})
