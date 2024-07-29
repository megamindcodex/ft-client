<!-- 

<script setup>
import { useCookies } from '../composables/useCookies'
import { useRoute, useRouter } from 'vue-router'
import { onMounted } from 'vue'
import { useUserStore } from '../stores/userStore'
import { storeToRefs } from 'pinia'

const { getCookies } = useCookies()
const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

const { userData } = storeToRefs(userStore)
const { getUserData } = userStore

onMounted(async () => {
  const accessToken = await getCookies('fintech-access-token')
  console.log(accessToken)

  if (!accessToken) {
    router.push('/auth#login')
  }

  await getUserData(accessToken)

  if (!userData) {
    console.log('Error Loading user data')
  } else {
    router.push({ name: 'home' })
  }
})
</script>

<template>
  <div></div>
</template>

<style lang="scss" scoped>
</style> -->