
<script setup>
import { useUserStore } from '@/stores/userStore'
import { useCookies } from '@/composables/useCookies'
import { useRouter } from 'vue-router'
import { defineAsyncComponent, onMounted, ref } from 'vue'
import { cookieName } from '@/constant/cookieName'
import { storeToRefs } from 'pinia'
import HomeLoader from '../components/Loaders/HomeLoder.vue'

const router = useRouter()
const { getCookies } = useCookies()
const userStore = useUserStore()
const { getUserData } = userStore
const { userData } = storeToRefs(userStore)

const error = ref(null)

const HomeComponent = defineAsyncComponent({
  loader: async () => {
    const accessToken = await getCookies(cookieName)
    // if (!accessToken) {
    //   router.push({ name: 'auth', hash: '#login' })
    // }
    await getUserData(accessToken)

    if (!userData) {
      throw err
    }
    return import('../components/Home.vue')
  },
  loadingComponent: HomeLoader,
  suspensible: false,
  // errorComponent: () => import('#'),
  delay: 0,
  timeout: 5000
})
</script>


<template>
  <div>
    <h1>Home page</h1>
    <suspense>
      <component :is="HomeComponent"></component>
    </suspense>
  </div>
</template>
<style lang="scss" scoped>
</style>