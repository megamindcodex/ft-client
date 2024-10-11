<!-- DahBoard Header -->
<script setup>
import { useNavigatorStore } from '@/stores/navigatorStore'
import BellSvg from '../icons/BellSvg.vue'
import HeadsetSvg from '../icons/HeadsetSvg.vue'
import { useUserStore } from '@/stores/userStore'
import { storeToRefs } from 'pinia'

const navigateStore = useNavigatorStore()
const { navigateTo } = navigateStore

const userStore = useUserStore()
const { userData } = storeToRefs(userStore)

defineProps({
  userName: String
})
</script>

<template>
  <header class="d-flex align-center justify-space-between py-5 px-3">
    <div
      class="row d-flex align-center ga-2"
      v-ripple="{ class: 'text-black' }"
      @click="navigateTo('/account/profile')"
    >
      <div class="dp bg-teal-darken-4"></div>
      <span class="font-weight-medium">Hi, {{ userData.userName }}</span>
    </div>

    <div class="row d-flex ga-5 align-center">
      <HeadsetSvg @click="navigateTo('#')" />
      <BellSvg @click="navigateTo('/notifications')" />
    </div>
  </header>
</template>

<style lang="scss" scoped>
header {
  position: sticky;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  background-color: #fff;
  // box-shadow: 0px 0px 15px 0px #a7a5a5;
  //border: 1px solid green;
}

.dp {
  width: 40px;
  height: 40px;
  border: 1px solid purple;
  border-radius: 50%;
}
</style>