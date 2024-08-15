<script setup>
import { useGlobalStore } from '@/stores/globalStore'
import { storeToRefs } from 'pinia'
import { computed, onMounted, ref, watch, watchEffect } from 'vue'
import AlertMsg from '@/components/AlertMsg.vue'
import { useAlertStore } from '@/stores/alertStore'

const alertStore = useAlertStore()
const { toggleAlert } = alertStore
const { text, displayAlert } = storeToRefs(alertStore)

const globalStore = useGlobalStore()
const { applyTheme, toggleTheme } = globalStore
const { themeTxt } = storeToRefs(globalStore)

onMounted(() => {
  applyTheme()
})
</script>

<template>
  <v-app id="main">
    <!-- <div class="alert error">
      <AlertMsg v-if="displayAlert" @showAlert="toggleAlert" />
    </div> -->
    <RouterView />
    <!-- <button @click="toggleTheme">{{ themeTxt }}</button> -->
  </v-app>
</template>

<style lang="css" scoped>
.alert {
  top: 0;
}
</style>
