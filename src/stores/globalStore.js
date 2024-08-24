import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import { useDark } from '@vueuse/core'
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'

export const useGlobalStore = defineStore('globalStore', () => {
  const isDarkTheme = useStorage('theme', useDark())
  const theme = ref(null)
  const themeTxt = ref(null)
  const router = useRouter()

  const applyTheme = () => {
    theme.value = isDarkTheme.value ? 'dark-theme' : 'light-theme'
    themeTxt.value = isDarkTheme.value ? 'light-theme' : 'dark-theme'

    const el = document.getElementById('main')

    el.classList.remove('dark-theme', 'light-theme')

    el.classList.add(theme.value)
  }

  const toggleTheme = () => {
    isDarkTheme.value = !isDarkTheme.value
    applyTheme()
  }

  return {
    applyTheme,
    toggleTheme,
    themeTxt
  }
})
