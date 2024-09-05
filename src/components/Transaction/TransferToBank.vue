<script setup>
import { useNavigatorStore } from '@/stores/navigatorStore'
import { onMounted, ref } from 'vue'

import ChevronLeftSvg from '../icons/ChevronLeftSvg.vue'
import AlertTriangleSvg from '../icons/AlertTriangleSvg.vue'

const navigateStore = useNavigatorStore()
const { navigateTo } = navigateStore

const isLoading = ref(true)

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false
  }, 2000)
})
</script>

<template>
  <v-container class="cont pa-0">
    <header class="d-flex align-center justify-space-between py-6 px-2">
      <div
        class="row-1 d-flex align-center justify-center"
        v-ripple="{ class: 'text-black' }"
        @click="navigateTo('/home')"
      >
        <ChevronLeftSvg class="chevronLeft-svg" />
        <span>Transfer to Bank</span>
      </div>
      <!-- <div class="row-2" @click="'#'"><span>History</span></div> -->
    </header>
    <div v-if="!isLoading" class="card-cont d-flex flex-aling-center pa-8" v-motion-pop>
      <v-card class="card mt-10 pt-8 px-1" variant="flat">
        <AlertTriangleSvg class="alertTriangle-svg" />
        <p>Bank Tranfer Feature Is Not Aailable In Your Region For The Time Being !</p>
        <p>Try Again Later</p>
      </v-card>
    </div>
    <div v-else class="card-cont">
      <v-progress-circular size="50" width="4" color="black" indeterminate></v-progress-circular>
    </div>
  </v-container>
</template>

<style lang="scss" scoped>
@import '../../styles/format';

.cont {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .card-cont {
    width: 100%;
    height: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
    .card {
      width: 100%;
      height: 300px;
      display: flex;
      gap: 1rem;
      flex-direction: column;
      align-items: center;
      border-radius: $bRadius_sm;
      border: 2px solid red;
      // justify-content: center;

      p {
        color: #ee1212;
        font-size: $font_base + 8;
        text-align: center;
        // font-weight: 500;
      }
    }
  }
}

.chevronLeft-svg {
  stroke: #000;
  width: 25px;
  height: 25px;
  stroke-width: 1.5;
}

.alertTriangle-svg {
  width: 80px;
  height: 80px;
  stroke: #4e4e4e;
  stroke-width: 1.3;
}
</style>