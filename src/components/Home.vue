<script setup>
import { storeToRefs } from 'pinia'
import { useUserStore } from '../stores/userStore'
import { onMounted } from 'vue'

const userStore = useUserStore()
const { connect_to_websockets } = userStore

const { userData } = storeToRefs(userStore)

onMounted(async () => {
  await connect_to_websockets(userData.value.userName)
})
</script>
<template>
  <div>
    <h3>async component</h3>
    <span>User data</span>
    <div>{{ userData }}</div>
  </div>
</template>
<style lang="css" scoped>
</style>