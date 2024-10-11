
<script setup>
import { computed, onMounted, ref } from 'vue'
import { useTransferStore } from '@/stores/transferStore'
import { useUserStore } from '@/stores/userStore'
import { useNavigatorStore } from '@/stores/navigatorStore'
import { storeToRefs } from 'pinia'

import ArrowUpSvg from '../icons/ArrowUpSvg.vue'
import ArrowDownSvg from '../icons/ArrowDownSvg.vue'

const navigateStore = useNavigatorStore()
const { navigateTo } = navigateStore

const userStore = useUserStore()
const { recentTransactions } = storeToRefs(userStore)

// const transferStore = useTransferStore()
// const { get_user_transactions } = transferStore
// const { transactions, recentTransactions } = storeToRefs(transferStore)

const reversedRecentTransactions = computed(() => {
  return recentTransactions.value.reverse()
})

onMounted(async () => {
  // console.log(recentTransactions.value)
})
</script>

<template>
  <v-card class="recent-trans-section mt-4 d-flex flex-column" variant="flat">
    <div class="col-1 py-5 pl-2">
      <strong>Recent Transaction</strong>
    </div>
    <div class="transaction-list col-2 d-flex flex-column" v-if="reversedRecentTransactions.length">
      <div
        v-for="item in reversedRecentTransactions.reverse()"
        :key="item.transactionId"
        class="item px-2 py-3"
        v-ripple="{ class: 'text-black' }"
        @click="navigateTo(`/transactions/${item.transactionId}`)"
      >
        <div class="row row-1">
          <div :class="['icon-box', item.type]">
            <ArrowUpSvg v-if="item.type === 'debit'" class="arrowup-svg" />
            <ArrowDownSvg v-if="item.type === 'credit'" class="arrowdown-svg" />
          </div>
        </div>
        <div class="row row-2">
          <span class="subject">{{ item.subject }}</span>
          <span>{{ item.date }}</span>
        </div>
        <div class="row row-3">
          <span class="amount">${{ item.amount }}</span>
          <span class="status">{{ item.status }}</span>
        </div>
      </div>
    </div>
    <div v-else class="col-3 d-flex justify-center align-center">
      <span>No Recent Transactions</span>
    </div>
  </v-card>
</template>



<style lang="scss" scoped>
@import '../../styles/_format.scss';
// *******Recent Transaction section******* //
.recent-trans-section {
  padding-bottom: 100px;
  // background-color: transparent;
  .col-1 {
    border-bottom: 1px solid #a7a5a5;
    // box-shadow: 0px 0px 8px 0px #a7a5a5;
  }

  // trans-list

  .transaction-list {
    width: 100%;
    height: 40vh;
    overflow-y: auto;
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
  .col-3 {
    width: 100%;
    height: 215px;

    span {
      font-size: $font_xs;
      color: #888787;
    }
  }
}

//**********************************************//
</style>