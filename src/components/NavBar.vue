
<script setup>
import { onMounted, reactive } from 'vue'

import { useUserStore } from '@/stores/userStore'

import { useNavigatorStore } from '@/stores/navigatorStore'
import { useRoute, useRouter } from 'vue-router'

// import navigation icons
import HomeSvg from '@/components/icons/navicons/HomeSvg.vue'
import FinanceSvg from '@/components/icons/navicons/financeSvg.vue'
import MeSvg from '@/components/icons/navicons/MeSvg.vue'
import { storeToRefs } from 'pinia'

const route = useRoute()
// console.log(route.name)

const navigatorStore = useNavigatorStore()
const { navigateTo } = navigatorStore

const userStore = useUserStore()
const { isUserDataLoading } = storeToRefs(userStore)

const checkVisibility = () => {
  let isVisible
  if (route.name === 'home') {
    isVisible = true
  } else if (route.name === 'dashboard') {
    isVisible = true
  } else if (route.name === 'finance') {
    isVisible = true
  } else if (route.name === 'me') {
    isVisible = true
  }

  console.log(isVisible)
  return isVisible
}

onMounted(() => {})
</script>
<template>
  <div
    class="nav-bar pb-6 px-4 pt-2"
    v-if="
      route.name === 'home' ||
      route.name === 'dashboard' ||
      route.name === 'finance' ||
      route.name === 'me'
    "
  >
    <div
      :class="['nav-item', { 'active-nav-item': route.path === '/home/dashboard' }]"
      @click="navigateTo('/')"
    >
      <HomeSvg />
      <span>Home</span>
    </div>
    <div
      :class="['nav-item', { 'active-nav-item': route.path === '/finance' }]"
      @click="navigateTo('/finance')"
    >
      <FinanceSvg />
      <span>Finance</span>
    </div>
    <div
      :class="['nav-item', { 'active-nav-item': route.path === '/account/me' }]"
      @click="navigateTo('/account/me')"
    >
      <MeSvg />
      <span>Me</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../styles/format';

.nav-bar {
  position: fixed;
  bottom: 0;
  width: 100%;
  max-width: 500px;
  display: flex;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  background-color: #ffff;
  //   background-color: gray;
  // border: 1px solid red;

  .nav-item {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #000000;
    transition: 0.5s ease;

    span {
      font-size: $font_base + 5;
      font-weight: 500;
    }
    &:hover {
      color: red;
      stroke: red;
      transition: 0.5s ease;
    }

    &:hover svg {
      stroke: red;
      transition: 0.5s ease;
    }
  }

  .active-nav-item {
    color: red;

    svg {
      stroke: red;
    }
  }
}
</style>