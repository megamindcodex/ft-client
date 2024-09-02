<script setup>
import { onMounted, ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import { useNavigatorStore } from '@/stores/navigatorStore'
import { storeToRefs } from 'pinia'
import { DateTime } from 'luxon'

import ChevronLeftSvg from '../icons/ChevronLeftSvg.vue'

const navigateStore = useNavigatorStore()
const { navigateTo, navigateBack } = navigateStore

const userStore = useUserStore()
const { getUserData } = userStore
const { transactions } = storeToRefs(userStore)

const route = useRoute()
const router = useRouter()
const id = ref(route.params.id)
const canGoBack = ref(false)
const transactionDetail = ref(null)
const formattedAmount = ref(null)
const userTimeZone = ref(null)
const utcTimestamp = ref(null)
const clientLocalTime = ref(null)

const getTransactionDetail = async () => {
  // await getUserData()
  transactionDetail.value = transactions.value.find((item) => item.transactionId === id.value)
  utcTimestamp.value = transactionDetail.value.timestamp
  userTimeZone.value = Intl.DateTimeFormat().resolvedOptions().timeZone
  clientLocalTime.value = DateTime.fromISO(utcTimestamp.value, { zone: 'utc' })
    .setZone(userTimeZone.value)
    .toLocaleString(DateTime.DATETIME_MED)

  formattedAmount.value = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(transactionDetail.value.amount)
}

onMounted(async () => {
  await getTransactionDetail()

  // console.log(window.history.state.back)
  // console.log(transactionDetail.value)
})
</script>

<template>
  <v-container class="cont pa-0" v-motion-slide-visible-bottom>
    <header class="d-flex align-center justify-space-between py-6 px-4">
      <div class="d-flex align-center justify-center ga-2" @click="navigateBack('/home')">
        <ChevronLeftSvg class="chevronLeft-svg" />
        <span>Transaction Details</span>
      </div>
    </header>
    <div v-if="transactionDetail" class="details d-flex flex-column ga-4 pa-3">
      <v-card class="col-1 d-flex flex-column justify-center align-center pa-6 ga-2" variant="flat">
        <span v-if="transactionDetail.type === 'credit'" class="name"
          >Received From {{ transactionDetail.sender.toUpperCase() }}</span
        >
        <span v-if="transactionDetail.type === 'debit'" class="name"
          >To {{ transactionDetail.receiver.toUpperCase() }}</span
        >
        <span class="amount">{{ formattedAmount }}</span>
        <small class="status">{{ transactionDetail.status }}</small>
      </v-card>

      <!-- ******** Type credit *********  -->
      <v-card
        v-if="transactionDetail.type === 'credit'"
        class="col-2 d-flex flex-column ga-2 pa-3"
        variant="flat"
      >
        <div class="row py-2">
          <span>Sender name</span>
          <span>{{ transactionDetail.sender.toUpperCase() }}</span>
        </div>
        <div class="row py-4">
          <span>Sender Account</span>
          <span>{{ transactionDetail.senderAccount }}</span>
        </div>
        <div class="row py-4">
          <span>Description:</span>
          <span class="description">{{ transactionDetail.decription }}</span>
        </div>
        <div class="row py-4">
          <span>completion Time</span>
          <span class="">{{ clientLocalTime }}</span>
        </div>
        <div class="row py-4">
          <span>Transaction ID</span>
          <span>{{ transactionDetail.transactionId }}</span>
        </div>
      </v-card>

      <!-- ******** Type Debit *********  -->
      <v-card
        v-if="transactionDetail.type === 'debit'"
        class="col-2 d-flex flex-column ga-2 pa-3"
        variant="flat"
      >
        <div class="row py-2">
          <span>Recipient name</span>
          <span>{{ transactionDetail.receiver.toUpperCase() }}</span>
        </div>
        <div class="row py-4">
          <span>Recipient Account</span>
          <span>{{ transactionDetail.receiverAccount }}</span>
        </div>
        <div class="row py-4">
          <span>Description</span>
          <span class="description">{{ transactionDetail.decription }}</span>
        </div>
        <div class="row py-4">
          <span>completion Time</span>
          <span class="">{{ clientLocalTime }}</span>
        </div>
        <div class="row py-4">
          <span>Transaction ID</span>
          <span>{{ transactionDetail.transactionId }}</span>
        </div>
      </v-card>
    </div>
    <v-card v-else variant="flat"><span>no details here</span></v-card>
  </v-container>
</template>

<style lang="scss" scoped>
@import '../../styles/format';

.cont {
  width: 100%;
  padding: $padding_base;

  header {
    position: sticky;
    background-color: #fff;
    // box-shadow: 0px 0px 15px 0px #a7a5a5;
  }

  .details {
    widows: 100%;
    height: auto;
    // border: 1px solid red;
    margin-top: $margin_sm;

    .col-1 {
      width: 100%;
      // border: 1px solid green;

      .name {
        font-size: $font_base + 6;
        color: #000;
        font-weight: 400;
      }

      .amount {
        font-size: $font_sm;
        color: #000;
        font-weight: 500;
      }
      .status {
        color: green;
        font-size: $font_base + 3;
      }
    }

    .col-2 {
      width: 100%;
      // border: 1px solid blue;

      .row {
        width: 100%;
        // border: 1px solid red;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
        font-size: $font_base + 7;

        // .description {
        //   white-space: nowrap;
        //   text-overflow: ellipsis;
        //   overflow: hidden;
        // }
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
</style>