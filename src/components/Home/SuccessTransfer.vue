

<script setup>
import { useUserStore } from '@/stores/userStore'
import { onMounted, ref } from 'vue'

import { useNavigatorStore } from '@/stores/navigatorStore'
import { useRoute, useRouter } from 'vue-router'

import CheckCircleSvg from '../icons/CheckCircleSvg.vue'

const navigateStore = useNavigatorStore()
const { navigateTo } = navigateStore

const userStore = useUserStore()
const { getUserData } = userStore

const route = useRoute()
const router = useRouter()
const recipient = ref(route.params.recipient)
const account = ref(route.params.account)
const amount = ref(route.params.amount)

console.log(route)
onMounted(() => {
  getUserData()
})
</script>

<template>
  <v-container class="cont pa-2 d-flex flex-column justify-center ga-4">
    <v-card class="col-1 d-flex flex-column align-center justify-center py-10 ga-2" variant="flat">
      <CheckCircleSvg class="svg" />
      <span>Transaction successful</span>
      <span class="amount">${{ amount }}.00</span>
    </v-card>
    <v-card class="col-2 d-flex flex-column py-5" variant="flat">
      <div class="receiver">
        <span> Beneficiary</span>
        <span class="font-weight-medium">{{ recipient }}</span>
      </div>
      <div class="account">
        <span>Account number</span>
        <span class="font-weight-medium">{{ account }}</span>
      </div>
    </v-card>
    <div class="btn">
      <button v-ripple="{ class: 'text-black' }" @click="router.push('/home')">Done</button>
    </div>
  </v-container>
</template>

<style lang="scss" scoped>
@import '../../styles/format';

.cont {
  width: 100%;
  height: 70vh;
  // margin-top: 4rem;

  .col-1 {
    width: 100%;

    span {
      font-size: $font_base + 8;
      font-weight: 500;
    }

    .amount {
      font-size: $font_sm;
      font-weight: 600;
    }
  }

  .col-2 {
    width: 100%;

    div {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: $padding_base + 5;

      span {
        color: #000;
        font-size: $font_base + 7;
      }
    }
  }

  .btn {
    width: 100%;

    button {
      width: 100%;
      color: #fff;
      background-color: #00897b;
      padding: $padding_base;
    }
  }
}
.svg {
  width: 50px;
  height: 50px;
  fill: #00897b;
}
</style>