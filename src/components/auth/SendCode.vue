
<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div>
    <button @click="router.go(-1)">back</button>
  </div>
</template>

<style lang="css" scoped>
</style>