

<script setup>
import { useNavigatorStore } from '@/stores/navigatorStore'
import { useTransferStore } from '@/stores/transferStore'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import AngleLeftASvg from '../icons/AngleLeftASvg.vue'

const navigateStore = useNavigatorStore()
const { navigateTo } = navigateStore

const transferStore = useTransferStore()
const { get_user_transactions } = transferStore
const { transactions } = storeToRefs(transferStore)

onMounted(() => {
  get_user_transactions()
  console.log(transactions.value)
})
</script>

<template>
  <v-container class="cont d-flex justify-center">
    <header class="d-flex align-center justify-space-between pa-2 py-4">
      <div class="row-1 d-flex align-center justify-center ga-2" @click="navigateTo('/home')">
        <AngleLeftASvg class="angleLeft-svg" />
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
        class="item px-0 py-3"
        v-ripple="{ class: 'text-black' }"
        @click="navigateTo(`/transactions/${item.transactionId}`)"
      >
        <!-- <div class="row "></div> -->
        <div class="row row-2">
          <span class="subject">{{ item.subject }}</span>
          <span>{{ item.date }}</span>
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
    // border: 1px solid green;
    border-bottom: 1px solid #8c8989;
  }

  .transaction-list {
    width: 100%;
    // border: 1px solid blue;
    border-radius: 0px;
    background-color: transparent;

    .item {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      border-bottom: 1px solid #8c8989;
      .row {
        display: flex;
        width: 100%;
        // border: 1px solid orangered;

        span {
          overflow: hidden;
          white-space: nowrap;
          font-size: $font_base + 4;
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

  .no-transactions {
    width: 100%;
    height: 300px;

    span {
      color: #8c8989;
      font-size: $font_xs;
    }
  }
}

.angleLeft-svg {
  stroke: #000;
  width: 25px;
  height: 25px;
  stroke-width: 1.5;
}
</style>