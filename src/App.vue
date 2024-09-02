<script setup>
import { useGlobalStore } from '@/stores/globalStore'
import { storeToRefs } from 'pinia'
import { computed, onMounted, ref, watch, watchEffect } from 'vue'
import { useAlertStore } from '@/stores/alertStore'
import { useNotificationStore } from './stores/sockets/notification'
import { useUserStore } from '@/stores/userStore'
import { cookieName } from '@/constant/cookieName'
import axios from 'axios'

import SplashScreen from '@/components/Loaders/Splash.vue'
import NavBar from '@/components/NavBar.vue'
import NotifyMsg from './components/NotifyMsg.vue'
// import AlertMsg from '@/components/AlertMsg.vue'
import { useRoute, useRouter } from 'vue-router'

const alertStore = useAlertStore()
const { toggleAlert } = alertStore
const { text, displayAlert } = storeToRefs(alertStore)

const globalStore = useGlobalStore()
const { applyTheme, toggleTheme } = globalStore
const { themeTxt } = storeToRefs(globalStore)

const userStore = useUserStore()
const { load_user_data, connect_to_websockets } = userStore
const { userData, isUserDataLoading } = storeToRefs(userStore)

const notificationStore = useNotificationStore()
const { filter_new_notifications, remove_notification_item } = notificationStore
const { newNotifications, notifyQueue } = storeToRefs(notificationStore)

const router = useRouter()
const route = useRoute()
const isLoading = ref(false)

// console.log(route)

onMounted(async () => {
  await load_user_data()
  await connect_to_websockets(userData.value.userName)
  await filter_new_notifications()
  applyTheme()
})
</script>

<template>
  <v-app id="main">
    <Teleport to="#notify">
      <div class="notify d-flex justify-center" v-if="notifyQueue.length > 0">
        <NotifyMsg :data="notifyQueue" />
      </div>
    </Teleport>

    <!-- <button @click="toggleTheme">{{ themeTxt }}</button> -->
    <!-- <v-btn @click="isLoading = !isLoading">toggle Loading</v-btn> -->
    <!-- <RouterView v-if="!isLoading" v-motion-slide-visible-bottom /> -->
    <!-- <NavBar v-if="!isLoading" /> -->
    <RouterView v-if="!isUserDataLoading" />
    <NavBar v-if="!isUserDataLoading" />
    <SplashScreen v-if="isUserDataLoading" />
  </v-app>
</template>

<style lang="scss" scoped>
.notify {
  position: fixed;
  top: 1rem;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1rem;
  z-index: 1;
}
</style>
