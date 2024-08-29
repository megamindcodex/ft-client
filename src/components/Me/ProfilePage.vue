

<script setup>
import { useNavigatorStore } from '@/stores/navigatorStore'
import { useUserStore } from '@/stores/userStore'

import UserCircleSvg from '../icons/UserCircleSvg.vue'
import ChevronLeftSvg from '../icons/ChevronLeftSvg.vue'
import ChevronRightSvg from '../icons/ChevronRightSvg.vue'
import CopySvg from '../icons/CopySvg.vue'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

const navigateStore = useNavigatorStore()
const { navigateBack } = navigateStore

const userStore = useUserStore()
const { userData } = storeToRefs(userStore)
const isCopied = ref(false)

const copy_account_to_clipboard = async (text) => {
  try {
    // Copy the account number to the clipboard
    await navigator.clipboard.writeText(text)
    isCopied.value = true
    console.log(isCopied.value)

    setTimeout(() => {
      isCopied.value = false
      console.log(isCopied.value)
    }, 2000)
  } catch (err) {
    console.error('Failed to copy text: ', err)
  }
}
</script>

<template>
  <v-container class="cont pa-0 d-flex flex-column ga-4">
    <header class="d-flex align-center justify-space-between py-5 px-3">
      <div class="d-flex align-center justify-center ga-2" @click="navigateBack('/home')">
        <ChevronLeftSvg class="chevronLeft-svg" />
        <span>My Profile</span>
      </div>
    </header>
    <div class="profile-info d-flex flex-column pa-2 ga-3">
      <v-card class="col col-1" variant="flat">
        <div class="top d-flex align-center justify-start ga-2 py-3">
          <UserCircleSvg class="dp" />
          <p>
            <span class="font-weight-bold">Hi, {{ userData.userName }}</span>
            <span class="d-flex align-center justify-center ga-1"
              >{{ userData.accountNumber }}
              <CopySvg class="copy" @click="copy_account_to_clipboard(userData.accountNumber)"
            /></span>
            <span v-if="isCopied" class="tooltip" v-motion-fade>Copied to clipboard</span>
          </p>
        </div>
        <div class="account-number">
          <span class="font-weight-medium">Account Number</span>
          <span>{{ userData.accountNumber }}</span>
        </div>
        <div class="email">
          <span class="font-weight-medium">Email</span>
          <span class="d-flex justify-center align-center"
            >{{ userData.email }}<ChevronRightSvg class="chevronRight-svg"
          /></span>
        </div>
        <div class="username">
          <span class="font-weight-medium">User name</span>
          <span class="d-flex justify-center align-center"
            >{{ userData.userName.toUpperCase() }} <ChevronRightSvg class="chevronRight-svg"
          /></span>
        </div>
      </v-card>
      <v-card class="col col-2" variant="flat">
        <div class="fullname">
          <span class="font-weight-medium">Full Name</span>
          <span>{{ userData.fullName.toUpperCase() }}</span>
        </div>
        <div class="gender font-weight-medium"><span>Gender</span> <span>****</span></div>
        <div class="phone-number">
          <span class="font-weight-medium">Phone Number</span>
          <span class="d-flex justify-center align-center"
            >{{ userData.phoneNumber }}<ChevronRightSvg class="chevronRight-svg"
          /></span>
        </div>
      </v-card>
    </div>
  </v-container>
</template>

<style lang="scss" scoped>
@import '../../styles/format';

.cont {
  width: 100%;

  header {
    position: sticky;
    top: 0;
    left: 0;
    width: 100%;
    background-color: #fff;

    span {
      font-size: $font_xs;
      font-weight: 500;
    }
  }

  .profile-info {
    width: 100%;
    // border: 1px solid red;

    .top {
      width: 100%;
      // border: 1px solid blue;

      p {
        // position: relative;
        display: flex;
        flex-direction: column;
        gap: 5px;

        .tooltip {
          position: absolute;
          top: 2.5rem;
          left: 57%;
          font-size: $font_base + 2;
          letter-spacing: 0.7px;
          white-space: nowrap;
          color: #fff;
          padding: 8px 12px;
          border-radius: $bRadius_base + 3;
          background-color: #000000b7;
        }
      }
    }

    .col {
      width: 100%;
      display: flex;
      flex-direction: column;
      padding: $padding_base;

      div {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: $padding_xs + 2 0px;
      }

      .account-number,
      .email,
      .fullname,
      .gender {
        position: relative;
        border-bottom: 1px solid grey;
      }
    }
  }
}

.dp {
  width: 70px;
  height: 70px;
  fill: indigo;
  border: 1.5px solid indigo;
  border-radius: 50%;
}
.chevronLeft-svg {
  stroke: #000;
  width: 25px;
  height: 25px;
  stroke-width: 1.7;
}

.chevronRight-svg {
  width: 30px;
  height: 30px;
  stroke: #000;
}

.copy {
  width: 23px;
  height: 23px;
  stroke: blue;
}
</style>