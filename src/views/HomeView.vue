
<script setup>
import { useUserStore } from '@/stores/userStore'
import { useCookies } from '@/composables/useCookies'
import { useRoute, useRouter } from 'vue-router'
import { defineAsyncComponent, onBeforeMount, onMounted, ref, shallowRef } from 'vue'
import { cookieName } from '@/constant/cookieName'
// import { storeToRefs } from 'pinia'

// const router = useRouter()
const route = useRoute()

// const currentParams = ref(null)
// const currentComponent = ref(null)
</script>


<template>
  <div>
    <RouterView v-motion-slide-visible-bottom />
    <!-- {{ route.name }} -->
  </div>
</template>
<style lang="scss" scoped>
</style>