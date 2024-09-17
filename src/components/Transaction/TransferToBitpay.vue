
<script setup>
import { useRouter } from 'vue-router'
import { useTransferValidatorStore } from '@/stores/useTransferValidatorStore'
import { useNavigatorStore } from '@/stores/navigatorStore'
import { useTransferStore } from '@/stores/transferStore'
import { computed, reactive, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'

import InvoicePanel from '../Home/Invoice.vue'
import ChevronLeftSvg from '../icons/ChevronLeftSvg.vue'
import XcloseSvg from '../icons/XcloseSvg.vue'

const navigateStore = useNavigatorStore()
const { navigateTo } = navigateStore

const transferValidatorStore = useTransferValidatorStore()
const { validate_accountNumber, validate_amount } = transferValidatorStore
const { isUserNameLoading } = storeToRefs(transferValidatorStore)
// const {isLoading} =

const transferStore = useTransferStore()
const { transfer_funds, close_paymentError } = transferStore
const { processingPayment, transferErrorInfo } = storeToRefs(transferStore)

const router = useRouter()
const displayInvoice = ref(false)
const overlay = ref(false)
const receiver = ref(null)
const isInvoiceLoading = ref(false)

const toggleConfirmPanel = () => {
  if (overlay.value === false) {
    overlay.value = true
    setTimeout(() => {
      displayInvoice.value = true
    }, 200)
  } else {
    displayInvoice.value = false
    overlay.value = false
  }
}

// const formattedAmount = ref('')
const formData = ref({
  accountNumber: '',
  amount: '',
  description: ''
})

// All fields validation result
const accountNumberValidation = ref({ valid: false, error: false, message: '' })
const amountValidation = ref({ valid: false, error: false, message: '' })

// Validate field function
const validateFiled = async (field) => {
  if (field === 'account-number') {
    accountNumberValidation.value = await validate_accountNumber(formData.value.accountNumber)

    if (accountNumberValidation.value.valid === true) {
      receiver.value = accountNumberValidation.value.message
    }
  }
  if (field === 'amount') {
    amountValidation.value = await validate_amount(formData.value.amount)
  }
}

const invoice = computed(() => {
  return {
    receiver: receiver.value.toUpperCase(),
    accountNumber: formData.value.accountNumber,
    amount: formData.value.amount,
    description: formData.value.description
  }
})

// validate all fields simultaneously
const validateForm = async () => {
  await validateFiled('account-number')
  await validateFiled('amount')

  // check if validations are valid

  return accountNumberValidation.value.valid && amountValidation.value.valid
}

const isDisabled = computed(() => {
  return accountNumberValidation.value.valid && amountValidation.value.valid
})

// submit form
const submitForm = async () => {
  isInvoiceLoading.value = true
  const isFormValid = await validateForm()

  if (!isFormValid) {
    isInvoiceLoading.value = false
    return console.error('Transafer Form is not vaid!')
  }

  isInvoiceLoading.value = false
  console.log('Transafer Form is vad!')
  return toggleConfirmPanel()
}
</script> 
<template>
  <v-container class="cont pa-0 bg-grey-lighten-2">
    <!-- ********* Header section ************ -->
    <header class="d-flex align-center justify-space-between py-6 px-2">
      <div
        class="row-1 d-flex align-center justify-center"
        v-ripple="{ class: 'text-black' }"
        @click="navigateTo('/home')"
      >
        <ChevronLeftSvg class="chevronLeft-svg" />
        <span>Transfer to Bitpay Account</span>
      </div>
      <div class="row-2" @click="'#'"><span>History</span></div>
    </header>

    <!-- ************ Recepient Account Number and Amount Section -->
    <v-container class="">
      <v-card class="form-cont pa-4 mt-5" variant="flat">
        <v-form
          @submit.prevent="submitForm"
          class="trans-form d-flex flex-column justify-center align-center ga-2"
        >
          <div class="col-1 form-group ga-2">
            <div class="input-field">
              <label for="account-number" class="account-label py-4">Recipient Account</label>
              <input
                type="text"
                id="account-number"
                placeholder="Enter 7-digit Account Number"
                v-model="formData.accountNumber"
                @input="validateFiled('account-number')"
              />
            </div>
            <div class="input-details">
              <v-progress-circular
                v-if="isUserNameLoading"
                size="20"
                width="2"
                color="success"
                indeterminate
              ></v-progress-circular>
              <span
                v-if="accountNumberValidation.error"
                v-show="!isUserNameLoading"
                class="error-msg"
                >{{ accountNumberValidation.message }}</span
              >
              <span class="info-msg" v-else>{{
                accountNumberValidation.message.toUpperCase()
              }}</span>
            </div>
          </div>

          <div class="divider mt-3"></div>

          <div class="col-2 form-group ga-2">
            <div class="input-field">
              <label for="amount" class="amount-label py-4">Amount</label>
              <input
                type="text"
                id="amount"
                v-model="formData.amount"
                placeholder="Enter Amount "
                class="pl-6"
                @input="validateFiled('amount')"
              />
            </div>
            <div class="input-details">
              <span v-if="amountValidation.error" class="error-msg">{{
                amountValidation.message
              }}</span>
            </div>
          </div>

          <div class="divider mt-2"></div>

          <div class="col-3 form-group">
            <div class="input-field">
              <label for="remark" class="remark-label py-1">Remark</label>
              <input
                type="text"
                id="remark"
                placeholder="What's this for?(optional)"
                v-model="formData.description"
              />
            </div>
          </div>

          <div class="confirm-btn mt-4">
            <button type="submit" v-ripple="{ class: 'text-black' }" :disabled="!isDisabled">
              Confirm
            </button>
          </div>
        </v-form>
      </v-card>
    </v-container>

    <!--************ Confirm payment/Invoice Dialog **************-->
    <v-dialog
      v-model="overlay"
      persistent
      transition="dialog-bottom-transition"
      fullscreen
      class="d-flex align-end justify-end pa-0"
    >
      <InvoicePanel
        v-if="displayInvoice"
        :prePaidInfo="invoice"
        :processingPayment="processingPayment"
        @toggleConfirmPanel="toggleConfirmPanel"
        @transferFunds="
          transfer_funds(formData, {
            recipient: invoice.receiver,
            account: invoice.accountNumber,
            amount: invoice.amount
          })
        "
      />

      <v-dialog persistent v-model="transferErrorInfo.error" class="payment-error-dialog">
        <div class="payment-error-cont">
          <XcloseSvg class="xClose-svg" @click="close_paymentError" />
          <span class="font-weight-medium">{{ transferErrorInfo.errorMsg }}</span>
          <span class="try-again" @click="close_paymentError">Try again</span>
        </div>
      </v-dialog>
    </v-dialog>

    <v-dialog v-model="isInvoiceLoading" class="InvoicePanel-dialog" v-if="isInvoiceLoading">
      <div class="w-100 d-flex flex-column justify-center align-center ga-4">
        <v-progress-circular size="60" width="4" color="info" indeterminate></v-progress-circular>
        <span class="text-white text-h5">Initializing payment...</span>
      </div>
    </v-dialog>
  </v-container>
</template> 

<style lang="scss" scoped>
@import '../../styles/format';
.cont {
  width: 100%;
  height: 100dvh;

  header {
    background-color: #fff;
    .row-1 {
      span {
        font-size: $font_base + 4;
        font-weight: 500;
      }
    }

    .row-2 {
      font-size: $font_base + 5;
      color: #43a047;
    }
  }

  .form-cont {
    width: 100%;
    height: auto;
    display: flex;
    justify-items: center;
    align-items: center;
    border-radius: $bRadius_md;

    .trans-form {
      width: 100%;
      .form-group {
        width: 100%;
        display: flex;
        flex-direction: column;

        .input-field {
          position: inherit;
          width: 100%;
          display: flex;
          flex-direction: column;

          label {
            font-size: $font_base + 7;
            font-weight: 500;
          }

          input {
            position: relative;
            font-size: $font_xs;
            padding: $padding_base + 2;
            color: #000;
            // background-color: #e0e0e0;
            background-color: #e8f0fe;
            border-radius: $bRadius_md;
            box-sizing: border-box;
            border: 2px solid transparent;

            &:focus {
              border: 2px solid #00897b;
              outline: none;
            }

            &::placeholder {
              font-size: $font_base + 7;
            }
          }

          #remark {
            color: #000;
            font-size: $font_base + 5;
            padding: $padding_base;
            background-color: #e8f0fe;
            border-radius: 0px;
            border: 2px solid transparent;

            &::placeholder {
              font-size: $font_base + 7;
            }

            &:focus {
              border-bottom: 2px solid #00897b;
              outline: none;
            }
          }
        }

        .input-details {
          font-size: $font_base + 4;
          padding-left: 0.7rem;
          width: 100%;
          height: 20px;

          .error-msg {
            color: red;
          }
          .info-msg {
            color: rgb(26, 180, 26);
          }
        }
      }

      .col-2 {
        position: relative;

        &::before {
          position: absolute;
          content: '$';
          top: 71px;
          left: 10px;
          font-size: $font_xs;
          font-weight: 500;
          z-index: 1;
        }
      }

      .confirm-btn {
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
  }
}

.account-label {
  //   color: red;
  &::after {
    position: absolute;
    content: 'Credited in 60s';
    font-size: $font_base + 2;
    margin-left: 1rem;
    color: #00897b;
    background-color: #1de9b669;
    padding: 4px;
    border-radius: 6px;
  }
}

.chevronLeft-svg {
  stroke: #000;
  width: 25px;
  height: 25px;
  stroke-width: 1.5;
}

.divider {
  width: 100%;
  height: 1px;
  background-color: #8c8989;
}

.InvoicePanel-dialog {
  background-color: #ffffff00;
}

.payment-error-dialog {
  width: 100%;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  .payment-error-cont {
    position: relative;
    align-self: center;
    justify-self: center;
    width: 80%;
    display: flex;
    flex-direction: column;
    gap: 5px;
    align-items: center;
    justify-content: space-between;
    font-size: $font_base + 8;
    color: #c51723;
    background-color: #eaeaea;
    border: 2px solid #c51723;
    border-radius: $bRadius_sm + 2;
    padding: 1rem;

    span {
      text-align: center;
    }

    .try-again {
      color: black;
      border-radius: 3px;
      background-color: #dad5d5;
      padding: 3px;
    }
  }
}

.xClose-svg {
  position: absolute;
  top: 0.5rem;
  left: 0;
  width: 30px;
  height: 30px;
  stroke: #696767;
  stroke-width: 1.8;
  z-index: 1;
}
</style> 