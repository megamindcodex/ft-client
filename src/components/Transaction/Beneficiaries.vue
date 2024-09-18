<script setup>
import UserCircleSvg from '../icons/UserCircleSvg.vue'

const beneficiaries = defineProps({
  beneficiaries: Array
})

// console.log(beneficiaries)

const emit = defineEmits(['useBneficiary'])

// Function to emit the event with arguments
const useBeneficiary = (accountNumber) => {
  emit('useBneficiary', accountNumber)
}
</script>

<template>
  <v-card
    v-if="beneficiaries.beneficiaries.length > 0"
    class="card d-flex flex-column mt-5"
    variant="flat"
  >
    <div class="col-1 py-5 pl-2">
      <strong> Beneficiaries </strong>
    </div>

    <div class="col-2 beneficiaries d-flex flex-column ga-2 justify-center">
      <div
        v-ripple="{ class: 'text-black' }"
        class="beneficiar-item d-flex ga-4 pl-5 pa-2"
        v-for="item in beneficiaries.beneficiaries"
        :key="item.userName"
        @click="useBeneficiary(item.accountNumber)"
      >
        <UserCircleSvg class="userCircle-svg" />
        <p>
          <span class="text-green">{{ item.userName }}</span>
          <span>{{ item.accountNumber }}</span>
        </p>
      </div>
    </div>
  </v-card>
</template>

<style lang="scss" scoped>
@import '../../styles/format';

.card {
  width: 100%;
  .col-1 {
    // border: 1px solid green;
  }

  .col-2 {
    width: 100%;
    min-height: fit-content;
    height: 150px;
    overflow-y: auto;
    border-radius: 0px;
    background-color: transparent;

    .beneficiar-item {
      .userCircle-svg {
        width: 40px;
        height: 40px;
        fill: #3f3844;
        border: 1.5px solid #3f3844;
        border-radius: 50%;
      }

      p {
        display: flex;
        flex-direction: column;
      }
    }
  }
}
</style>