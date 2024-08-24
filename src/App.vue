<script setup>
import { useGlobalStore } from '@/stores/globalStore'
import { storeToRefs } from 'pinia'
import { computed, onMounted, ref, watch, watchEffect } from 'vue'
import { useAlertStore } from '@/stores/alertStore'
import { useUserStore } from '@/stores/userStore'
import { useCookies } from '@/composables/useCookies'
import { cookieName } from '@/constant/cookieName'

import SplashScreen from '@/components/Loaders/Splash.vue'
import NavBar from '@/components/NavBar.vue'
import AlertMsg from '@/components/AlertMsg.vue'
import { useRoute, useRouter } from 'vue-router'

const { getCookies } = useCookies()

const alertStore = useAlertStore()
const { toggleAlert } = alertStore
const { text, displayAlert } = storeToRefs(alertStore)

const globalStore = useGlobalStore()
const { applyTheme, toggleTheme } = globalStore
const { themeTxt } = storeToRefs(globalStore)

const userStore = useUserStore()
const { getUserData, connect_to_websockets } = userStore
const { userData } = storeToRefs(userStore)

const router = useRouter()
const route = useRoute()
const isLoading = ref(false)

const load_user_data = async () => {
  isLoading.value = true
  const accessToken = await getCookies(cookieName)
  const res = await getUserData(accessToken)

  if (res.success === false) {
    isLoading.value = false
  }
  isLoading.value = false
}

// console.log(route)

onMounted(async () => {
  await load_user_data()
  await connect_to_websockets(userData.value.userName)
  applyTheme()
})
</script>

<template>
  <v-app id="main">
    <!-- <button @click="toggleTheme">{{ themeTxt }}</button> -->
    <!-- <v-btn @click="isLoading = !isLoading">toggle Loading</v-btn> -->
    <!-- <RouterView v-if="!isLoading" v-motion-slide-visible-bottom /> -->
    <!-- <NavBar v-if="!isLoading" /> -->
    <RouterView v-motion-slide-visible-bottom />
    <NavBar />
    <!-- <SplashScreen v-if="isLoading" /> -->
  </v-app>
</template>

<style lang="scss" scoped>
.alert {
  top: 0;
}
</style>
