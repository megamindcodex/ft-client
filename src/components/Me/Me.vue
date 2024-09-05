<script setup>
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/userStore'
import { useNavigatorStore } from '@/stores/navigatorStore'
import { cookieName } from '@/constant/cookieName'
import { useGlobalStore } from '@/stores/globalStore'

import EyeSvg from '../icons/EyeSvg.vue'
import EyeOfSvg from '../icons/EyeOfSvg.vue'
import ChevronRightSvg from '../icons/ChevronRightSvg.vue'
import CardSvg from '../icons/CardSvg.vue'
import MoonSvg from '../icons/MoonSvg.vue'
import HeadsetSvg from '../icons/HeadsetSvg.vue'

const globalStore = useGlobalStore()
const { toggleTheme } = globalStore

const navigatorStore = useNavigatorStore()
const { navigateTo } = navigatorStore

const userStore = useUserStore()
const { userData, finances, recentTransactions } = storeToRefs(userStore)

const isBalanceVisible = ref(true)
const overlay = ref(false)

const latestTransactions = computed(() => {
  return recentTransactions.value[0]
})

const balance = computed(() => {
  if (isBalanceVisible.value && finances.value) {
    if (!finances.value.mainBalance) {
      return 0
    } else {
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(finances.value.mainBalance)
      return formatted
    }
  } else {
    return '****'
  }
})

const log_out = async () => {
  document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`
  navigateTo('/auth/login')
}
</script>

<template>
  <v-container class="cont pa-0">
    <header class="d-flex align-center justify-space-between py-5 px-3">
      <div
        class="row d-flex align-center ga-2"
        v-ripple="{ class: 'text-black' }"
        @click="navigateTo('/account/profile')"
      >
        <div class="dp bg-teal-darken-4"></div>
        <span class="font-weight-medium">{{ userData.userName }}</span>
      </div>

      <!-- <div class="row d-flex ga-5 align-center">
        <HeadsetSvg @click="navigateTo('#')" />
        <BellSvg @click="navigateTo('/notifications')" />
      </div> -->
    </header>

    <div class="card-cont pa-2">
      <v-card class="row balance-section" variant="flat">
        <div class="w-100 d-flex align-center justify-center ga-2">
          <span>Total Assets</span>
          <EyeSvg
            v-if="isBalanceVisible"
            class="eye-svg"
            @click="isBalanceVisible = !isBalanceVisible"
          />
          <EyeOfSvg v-else class="eye-svg" @click="isBalanceVisible = !isBalanceVisible" />
        </div>

        <div class="balance">
          <span>{{ balance }}</span>
        </div>
      </v-card>

      <v-card
        class="transaction-history-section"
        @click="navigateTo('/transactions')"
        variant="flat"
      >
        <div class="d-flex w-100 justify-space-between">
          <span>Transaction history</span> <ChevronRightSvg class="chevronRight-svg" />
        </div>
        <div class="w-100 d-flex flex-column">
          <span>+{{ latestTransactions.amount }} </span>
          <span>{{ latestTransactions.subject }}</span>
        </div>
      </v-card>

      <v-card class="row banks-and-cards" variant="flat" @click="navigateTo('#')">
        <CardSvg class="card-svg" /><span>Banks And Cards</span>
        <ChevronRightSvg class="chevronRight-svg" />
      </v-card>

      <v-card
        class="row theme-switch"
        variant="flat"
        v-ripple="{ class: 'text-black' }"
        @click="toggleTheme"
      >
        <MoonSvg class="moon-svg" />
        <span>Theme</span>
        <ChevronRightSvg class="chevronRight-svg" />
      </v-card>

      <v-card class="row customer-service" variant="flat" v-ripple="{ class: 'text-black' }">
        <HeadsetSvg />
        <span>Customer Service</span>
        <ChevronRightSvg class="chevronRight-svg" />
      </v-card>
    </div>
    <div class="sign-out-btn px-5">
      <button @click="overlay = true" v-ripple="{ class: 'text-black' }">Log Out</button>
    </div>

    <v-dialog persistent v-model="overlay" class="logout-dialog">
      <v-card class="logout-card pa-4 d-flex ga-4">
        <div class="col-1 d-flex flex-column justify-center align-center">
          <span class="font-weight-bold">Log Out</span>
          <p>Are you sure you want to log out?</p>
        </div>
        <div class="col-2 d-flex justify-space-around ga-4">
          <button
            v-ripple="{ class: 'text-indigo' }"
            class="cancel px-4 py-2"
            @click="overlay = false"
          >
            Cancel
          </button>
          <button v-ripple="{ class: 'text-white' }" class="ok px-4 py-2" @click="log_out">
            Ok
          </button>
        </div>
      </v-card>
    </v-dialog>
  </v-container>
</template>  

<style lang="scss" scoped>
@import '../../styles/format';

.cont {
  width: 100%;
  height: 100dvh;
  margin-bottom: 10rem;
  header {
    position: sticky;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    background-color: transparent;
    //   box-shadow: 0px 0px 15px 0px #a7a5a5;
    //border: 1px solid green;

    .row {
      width: 100%;
      .dp {
        width: 40px;
        height: 40px;
        border: 1px solid purple;
        border-radius: 50%;
      }
    }
  }

  .card-cont {
    width: 100%;
    // height: 100vw;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .row {
      width: 100%;
      padding: 1.2rem;
      position: relative;
      display: flex;
      gap: 0.7rem;
      align-items: center;

      //   justify-content:
      //   border: 1px solid green;

      .chevronRight-svg {
        position: absolute;
        right: 1rem;
        justify-self: end;
      }
      span {
        color: #000000;
      }
    }

    .balance-section {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;

      span {
        color: #000;
      }

      .eye-svg {
        position: relative;
        stroke: #000000;
        justify-self: end;
        stroke-width: 2;
        width: 18px;
        height: 18px;
      }

      .balance {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        span {
          color: #000;
          font-size: $font_xs;
          font-weight: 500;
        }
      }
    }

    .banks-and-cards {
      //   justify-content: start;
      //   background-color: red;
    }
  }

  .transaction-history-section {
    width: 100%;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    color: #000;
  }

  .sign-out-btn {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 2rem;

    button {
      width: 100%;
      padding: 0.8rem;
      background-color: #fdfdfd;
      border-radius: $bRadius_sm;
      border: 1px solid red;
      font-size: $font_xs;
      font-weight: 500;
    }
  }
}

.logout-dialog {
  width: 100%;

  .logout-card {
    width: 100%;

    .col-2 {
      width: 100%;

      button {
        width: 100%;
        background-color: purple;
        font-size: $font_xs;
        font-weight: 500;
        color: #fff;
        border-radius: $bRadius_sm;
      }

      .cancel {
        color: #0000ffa1;
        background-color: #0000ff15;
      }
      .ok {
        color: #e1e1fc;
        background-color: #0e0efbcc;
      }
    }
  }
}

.chevronRight-svg {
  width: 25px;
  height: 25px;
  stroke: #000;
  stroke-width: 1.5px;
  align-self: center;
}

.card-svg {
  width: 28px;
  height: 28px;
  stroke: #000;
  stroke-width: 1.5;
}

.moon-svg {
  width: 28px;
  height: 28px;
  stroke: #000;
  stroke-width: 1.5;
}
</style>