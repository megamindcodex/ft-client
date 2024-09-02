<script setup>
// import { defineEmits } from 'vue'
import { computed, ref, watch } from 'vue'
import { useTransferStore } from '@/stores/transferStore'
import XcloseSvg from '../icons/XcloseSvg.vue'

const transferStore = useTransferStore()
const { close_paymentError } = transferStore

const emit = defineEmits(['toggleConfirmPanel', 'transferFunds'])
const props = defineProps({
  prePaidInfo: Object,
  processingPayment: Boolean
})
// console.log(prePaidInfo)

const processing = ref(false)

const amount = computed(() => {
  const formatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(props.prePaidInfo.amount)
  return formatted
})
</script>
<template>
  <v-container class="card-cont d-flex flex-column align-end justify-end ga-2 pa-4">
    <div class="col-1 d-flex justify-center align-center flex-column mt-4">
      <strong class="text-h6">Payment</strong>
      <span class="amount-txt mt-2">{{ amount }}</span>
    </div>
    <XcloseSvg class="xClose-svg" @click="emit('toggleConfirmPanel')" />

    <!-- *********************************************** -->
    <v-card variant="flat" class="col-2 confirm-card d-flex flex-column ga-2 pa-4 mt-2">
      <p>
        <span class="text-grey-darken-3">Amount</span>
        <span class="font-weight-medium">${{ amount }}.00</span>
      </p>
      <p>
        <span class="text-grey-darken-3">Account number</span>
        <span class="font-weight-medium">{{ props.prePaidInfo.accountNumber }}</span>
      </p>
      <p>
        <span class="text-grey-darken-3">Recipient</span>
        <span class="font-weight-medium">{{ props.prePaidInfo.receiver }}</span>
      </p>
      <p>
        <span class="text-grey-darken-3">Remark</span>
        <span class="font-weight-medium">{{ props.prePaidInfo.description }}</span>
      </p>
    </v-card>
    <div class="pay-btn mt-2">
      <button type="submit" v-ripple="{ class: 'text-black' }" @click="emit('transferFunds')">
        Pay
      </button>
    </div>
    <v-dialog persistent fullscreen v-model="props.processingPayment" class="process-cont">
      <div class="process-box d-flex align-center justify-center">
        <div class="row">
          <v-progress-circular
            size="40"
            width="2"
            color="white"
            indeterminate
          ></v-progress-circular>
          <span>payment processing...</span>
        </div>
      </div>
    </v-dialog>
  </v-container>
</template>
<style lang="scss" scoped>
@import '../../styles/format';

.card-cont {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: auto;
  background-color: #e6e3e3;

  .col-1 {
    width: 100%;
    // border: 1px solid red;

    .amount-txt {
      color: #000;
      font-size: $font_sm;
      font-weight: 600;
    }
  }

  .confirm-card {
    position: relative;
    width: 100%;

    p {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-weight: 400;
    }
  }

  .xClose-svg {
    position: absolute;
    top: 1rem;
    left: 1rem;
    width: 40px;
    height: 40px;
    stroke: #696767;
    stroke-width: 1.5;
    z-index: 1;
  }

  .pay-btn {
    width: 100%;
    display: flex;
    justify-content: center;

    button {
      width: 100%;
      color: #fdfdfd;
      letter-spacing: 1.2px;
      font-weight: 400;
      font-size: $font_sub_btn;
      padding: $padding_base;
      background-color: #098b7e;
      border-radius: $bRadius_md;

      &:disabled {
        background-color: #5fa19a;
      }
    }
  }
}

.process-cont {
  background-color: none;
  .process-box {
    width: 100%;
    height: 100%;

    div {
      width: 180px;
      height: 100px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background-color: #12766c4a;
      border-radius: 10px;
      span {
        color: #ffffffcc;
        border-radius: 10px;
        padding: 0.5rem;
        font-size: 4dvw;
      }
    }
  }
  // z-index: 1;
}
</style>