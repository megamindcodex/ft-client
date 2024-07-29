<script setup>
import { useGlobalStore } from '@/stores/globalStore'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'

const { applyTheme, toggleTheme } = useGlobalStore()
const globalStore = useGlobalStore()
const { themeTxt } = storeToRefs(globalStore)

onMounted(() => {
  applyTheme()
})
</script>

<template>
  <v-app id="main">
    <button @click="toggleTheme">{{ themeTxt }}</button>
    <RouterView />
  </v-app>
</template>

<style scoped>
</style>
