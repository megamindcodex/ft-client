

<script setup>
import { useNavigatorStore } from '@/stores/navigatorStore'
import { useUserStore } from '@/stores/userStore'
import { storeToRefs } from 'pinia'
import { computed, onMounted } from 'vue'
import ChevronLeftSvg from '../icons/ChevronLeftSvg.vue'
import ArrowUpSvg from '../icons/ArrowUpSvg.vue'
import ArrowDownSvg from '../icons/ArrowDownSvg.vue'

const navigateStore = useNavigatorStore()
const { navigateTo } = navigateStore

const userStore = useUserStore()
const { getUserData } = userStore
const { userData, transactions } = storeToRefs(userStore)

onMounted(async () => {
  // await getUserData()
  // console.log(userData.value)
})
</script>

<template>
  <v-container class="cont d-flex justify-center pa-0 pb-10" v-motion-slide-visible-bottom>
    <header class="lign-center d-flex justify-space-between py-6 px-4">
      <div class="row-1 d-flex align-center justify-center ga-2" @click="navigateTo('/home')">
        <ChevronLeftSvg class="chevronLeft-svg" />
        <span>Transactions</span>
      </div>
    </header>

    <v-card
      v-if="transactions.length > 0"
      class="transaction-list d-flex flex-column"
      variant="flat"
    >
      <div
        v-for="item in transactions"
        :key="item.transactionId"
        class="item px-2 py-3"
        v-ripple="{ class: 'text-black' }"
        @click="navigateTo(`/transactions/${item.transactionId}`)"
      >
        <div class="row row-1">
          <div :class="['icon-box', item.type]">
            <ArrowUpSvg v-if="item.type === 'credit'" class="arrowup-svg" />
            <ArrowDownSvg v-if="item.type === 'debit'" class="arrowdown-svg" />
          </div>
        </div>
        <div class="row row-2">
          <span class="subject">{{ item.subject }}</span>
          <span>{{ item.timestamp }}</span>
        </div>
        <div class="row row-3">
          <span class="amount">${{ item.amount }}</span>
          <span class="status">{{ item.status }}</span>
        </div>
      </div>
    </v-card>
    <v-card v-else class="d-flex align-center justify-center mt-16 no-transactions" variant="flat">
      <span>Transactions Appear Here</span>
    </v-card>
  </v-container>
</template>

<style lang="scss" scoped>
@import '../../styles/format';
.cont {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  padding: $padding_base - 2;

  header {
    position: sticky;
    top: 0;
    z-index: 1;
    background-color: #fff;
    border-bottom: 1px solid #8c8989;
    box-shadow: 0px 0px 15px 0px #a7a5a5;
  }

  .transaction-list {
    width: 100%;
    border-radius: 0px;
    background-color: transparent;

    .item {
      width: 100%;
      display: flex;
      gap: 0.7rem;
      align-items: center;
      border-bottom: 1px solid #8c8989;
      .row {
        width: 100%;
        span {
          overflow: hidden;
          white-space: nowrap;
          font-size: $font_base + 4;
        }
      }

      .row-1 {
        width: fit-content;
        display: flex;
        justify-content: center;
        align-items: center;

        .icon-box {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          // border: 1px solid red;

          .arrowup-svg .arrowdown-svg {
            width: 30px;
            height: 30px;
            stroke-width: 1.5;
          }
        }
        .credit {
          stroke: green;
          background-color: rgba(0, 128, 81, 0.199);
        }
        .debit {
          stroke: red;
          background-color: rgba(255, 42, 0, 0.23);
        }
      }

      .row-2 {
        display: flex;
        flex-direction: column;
        gap: 5px;

        .subject {
          text-overflow: ellipsis;
          justify-self: start;
          color: #000;
          font-weight: 500;
        }
        // border: 1px solid red;
      }

      .row-3 {
        display: flex;
        flex-direction: column;
        align-self: end;
        gap: 5px;
        justify-content: center;
        align-items: end;
        width: fit-content;

        .amount {
          font-size: $font_base + 5;
          font-weight: 500;
        }

        .status {
          padding: 0px 6px;
          color: #3ea074d6;
          font-size: $font_base;
          font-weight: 500;
          border-radius: 6px;
          letter-spacing: 0.8px;
          background-color: #4db6a339;
        }
      }
    }
  }

  .no-transactions {
    width: 100%;
    height: 300px;

    span {
      color: #8c8989;
      font-size: $font_xs;
    }
  }
}

.chevronLeft-svg {
  stroke: #000;
  width: 25px;
  height: 25px;
  stroke-width: 1.5;
}
</style>