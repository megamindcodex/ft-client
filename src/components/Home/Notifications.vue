<script setup>
import { useNavigatorStore } from '@/stores/navigatorStore'
import { useUserStore } from '@/stores/userStore'
import ChevronLeftSvg from '../icons/ChevronLeftSvg.vue'
import ChevronRightSvg from '../icons/ChevronRightSvg.vue'
import { storeToRefs } from 'pinia'

const navigateStore = useNavigatorStore()
const { navigateTo } = navigateStore

const userStore = useUserStore()
const { notifications } = storeToRefs(userStore)
</script>
<template>
  <v-container class="cont pa-0 pb-10">
    <header class="lign-center d-flex justify-space-between py-6 px-4">
      <div class="row-1 d-flex align-center justify-center ga-2" @click="navigateTo('/home')">
        <ChevronLeftSvg class="chevronLeft-svg" />
        <span>Notifications</span>
      </div>
    </header>

    <div v-if="notifications.length > 0" class="notifications-section d-flex flex-column ga-4 pa-3">
      <v-card
        v-for="(item, index) in notifications"
        :key="index"
        variant="flat"
        class="bg-white pa-3 notification-item"
        @click="navigateTo(`/transactions/${item.subjectId}`)"
      >
        <div class="col col-1">
          <span class="title font-weight-medium">{{ item.title }}</span>
        </div>
        <div class="col col-2">
          <p class="subject">{{ item.subject }}</p>
        </div>
        <div class="col col-3">
          <small class="date">Aug 28, 2024, 1:45 PM</small>
          <small class="d-flex align-center ga-1"
            >View <ChevronRightSvg class="chevronRight-svg"
          /></small>
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
    width: 100%;
    position: sticky;
    top: 0;
    z-index: 1;
    background-color: #fff;
    border-bottom: 1px solid #8c8989;
    box-shadow: 0px 0px 15px 0px #a7a5a5;
  }

  .notifications-section {
    width: 100%;
    // border: 1px solid red;

    .notification-item {
      width: 100%;
      display: flex;
      gap: 0.5rem;
      flex-direction: column;
      justify-content: center;
      // border: 1px solid blue;

      .col-1 {
        // border: 1px solid green;
        span {
          font-size: $font_base + 6;
        }
      }

      .col-2 {
        // border: 1px solid red;
        p {
          font-size: $font_base + 3.5;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
      }

      .col-3 {
        // border: 1px solid orangered;
        display: flex;
        justify-content: space-between;
        align-items: center;
        small {
          font-size: $font_base + 2;
        }
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

.chevronRight-svg {
  width: 20px;
  height: 20px;
  stroke: #000;
  stroke-width: 1px;
}
</style>