<!-- DahBoard Header -->
<script setup>
import { useNavigatorStore } from '@/stores/navigatorStore'
import BellSvg from '../icons/BellSvg.vue'
import HeadsetSvg from '../icons/HeadsetSvg.vue'

const navigateStore = useNavigatorStore()
const { navigateTo } = navigateStore

defineProps({
  userName: String
})
</script>

<template>
  <header class="d-flex align-center justify-space-between mt-2">
    <div class="row d-flex align-center ga-2">
      <div class="dp bg-teal-darken-4"></div>
      <span class="font-weight-medium">Hi, {{ userName }}</span>
    </div>

    <div class="row d-flex ga-5 align-center">
      <HeadsetSvg @click="navigateTo('#')" />
      <BellSvg @click="navigateTo('#')" />
    </div>
  </header>
</template>

<style lang="scss" scoped>
header {
  width: 100%;
  //border: 1px solid green;
}

.dp {
  width: 40px;
  height: 40px;
  border: 1px solid purple;
  border-radius: 50%;
}
</style>