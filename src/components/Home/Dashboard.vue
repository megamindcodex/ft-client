<script setup>
import { storeToRefs } from 'pinia'
import { useUserStore } from '../../stores/userStore'
import { computed, defineAsyncComponent, onMounted, ref } from 'vue'
import { useNavigatorStore } from '@/stores/navigatorStore'
import Header from '@/components/Home/Header.vue'
import RecentTransaction from '@/components/Home/RecentTransaction.vue'

import EyeSvg from '../icons/EyeSvg.vue'
import EyeOfSvg from '../icons/EyeOfSvg.vue'
import ChevronRightSvg from '@/components/icons/ChevronRightSvg.vue'
import DollarSvg from '../icons/DollarSvg.vue'
import ShieldSvg from '../icons/ShieldSvg.vue'
import PersonPinSvg from '../icons/PersonPinSvg.vue'
import BankSvg from '../icons/BankSvg.vue'
import CryptoSvg from '../icons/CryptoSvg.vue'

const userStore = useUserStore()
const { userData } = userStore
const { finances } = storeToRefs(userStore)
const isBalanceVisible = ref(true)

const navigateStore = useNavigatorStore()
const { navigateTo } = navigateStore

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

//
onMounted(() => {
  // console.log(finances.value.mainBalance.toString().length)
})
</script>
<template>
  <v-container class="cont pa-0 bg-grey-lighten-2 d-flex flex-column justify-center">
    <Header :user-name="userData.userName" />

    <div class="col d-flex d-flex flex-column justify-center pa-3 mt-1">
      <!-- *******Balance display section******* -->
      <v-card class="balance-section py-3 px-5 d-flex flex-column ga-5" variant="flat">
        <div class="col-1 col d-flex flex-row justify-space-between">
          <p class="d-flex align-center">
            <ShieldSvg />
            <span>Available Balance</span>
            <EyeSvg
              v-if="isBalanceVisible"
              class="eye-svg ml-1"
              @click="isBalanceVisible = !isBalanceVisible"
            />
            <EyeOfSvg v-else class="eye-svg ml-1" @click="isBalanceVisible = !isBalanceVisible" />
          </p>
          <p
            class="d-flex align-center justify-center"
            v-ripple="{ class: 'text-black' }"
            @click="navigateTo('/transactions')"
          >
            <span>Transaction History</span>
            <ChevronRightSvg class="chevronRight-svg" />
          </p>
        </div>

        <div class="col-2 col d-flex flex-row justify-space-between align-center ga-2">
          <p
            class="d-flex bal-txt align-center justify-start"
            :class="{
              _3figure: finances.mainBalance.toString().length <= 3,
              _4figure: finances.mainBalance.toString().length === 4,
              _5figure: finances.mainBalance.toString().length === 5,
              _6figure: finances.mainBalance.toString().length === 6,
              _7figure: finances.mainBalance.toString().length >= 9
            }"
          >
            {{ balance }}
          </p>

          <button
            variant="flat"
            v-ripple="{ class: 'text-black' }"
            class="add-btn px-3 py-1"
            @click="navigateTo('#')"
          >
            Add Money
          </button>
        </div>
      </v-card>
      <!-- **************************************************** -->

      <!-- *******Transfer section******* -->
      <v-card class="transfer-section d-flex flex-column pa-3 mt-4" variant="flat">
        <strong class="col-1">Money Transfer</strong>

        <div class="col-2 d-flex justify-center ga-11 mt-2">
          <div
            v-ripple="{ class: 'text-black' }"
            class="row"
            @click="navigateTo('/home/transfer-to-bitpay')"
          >
            <div class="icon-box">
              <PersonPinSvg class="svg" />
            </div>
            <span>To BitPay</span>
          </div>
          <div v-ripple="{ class: 'text-black' }" class="row" @click="navigateTo('#')">
            <div class="icon-box">
              <BankSvg class="svg" />
            </div>
            <span>To bank</span>
          </div>
          <div v-ripple="{ class: 'text-black' }" class="row" @click="navigateTo('#')">
            <div class="icon-box">
              <CryptoSvg class="svg" />
            </div>
            <span>Crypto</span>
          </div>
        </div>
      </v-card>
      <!-- **************************************************** -->

      <!-- *******Recent Transaction section******* -->
      <RecentTransaction />
    </div>
  </v-container>
</template>
<style lang="scss" scoped>
@import '../../styles/_format.scss';

// *******Balance display section******* ///
.cont {
  width: 100%;
  height: auto;

  .col {
    width: 100%;
    .balance-section {
      .col-1 {
        font-size: $font_base + 0.8;
        font-weight: 500;
        max-height: 200px;

        .eye-svg {
          position: relative;
          stroke: #000000;
          justify-self: end;
          stroke-width: 2;
          width: 18px;
          height: 18px;
        }
      }

      .col-2 {
        .bal-txt {
          display: flex;
          font-weight: 500;
          // font-size: $font_sm;

          // justify-self: end;
        }
        p {
          width: 100%;
        }

        ._3figure {
          font-size: 2rem;
          color: red;
        }
        ._4figure {
          font-size: 1.5rem;
        }
        ._5figure {
          font-size: 1.6rem;
        }
        ._6figure {
          font-size: 1.3rem;
        }
        ._7figure {
          font-size: 1.3rem;
        }

        .add-btn {
          position: relative;
          display: flex;
          justify-content: start;
          align-items: start;
          border: 1px solid black;
          border-radius: $bRadius_xl;
          font-size: $font_base + 4;
          font-weight: 600;
          width: 60%;

          &::before {
            content: '+';
            font-size: $font_base + 4;
            margin-right: 5px;
          }
        }
      }
    }
  }
}

//**********************************************//

// *******Transfer section******* //
.transfer-section {
  width: 100%;
  .col-2 {
    // border: 1px solid purple;

    .row {
      // width: 100%;
      // height: 80px;
      display: flex;
      gap: 3px;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      // padding: 6px;

      .icon-box {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10px;
        width: 52px;
        height: 52px;
        border-radius: 50%;
        background-color: #012b6a36;
        .svg {
          // border: 1px solid blue;
          width: 35px;
          height: 35px;
          stroke: #000;
          // padding: 1rem;
        }
      }
      span {
        display: flex;
        justify-content: center;
        width: 100%;
        font-size: $font_base + 4;
        font-weight: 500;
        // border: 1px solid red;
      }
    }
  }
}

.chevronRight-svg {
  width: 20px;
  height: 20px;
  stroke: #000;
  stroke-width: 1.5px;
}
//**********************************************//
</style>