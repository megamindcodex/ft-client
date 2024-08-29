<script setup>
import { onMounted, ref, watch, defineEmits } from 'vue'
import { storeToRefs } from 'pinia'

import { useNotificationStore } from '@/stores/sockets/notification'
import { useNavigatorStore } from '@/stores/navigatorStore'

import XcloseSvg from './icons/XcloseSvg.vue'

const navigatorStore = useNavigatorStore()
const { navigateTo } = navigatorStore

const notificationStore = useNotificationStore()
const { remove_notification_item } = notificationStore

const notifyProps = defineProps({
  data: Array
})

const emit = defineEmits(['remove_item'])

const notifyQueue = ref(notifyProps.data)

// console.log(notifyQueue.value)
// console.log(type.value)
// console.log(message.value)
</script>

<template v-if="">
  <div
    class="black"
    v-for="(notifyItem, index) in notifyQueue"
    :key="index"
    v-motion-slide-left
    @click="navigateTo(`/transactions`)"
  >
    <XcloseSvg class="svg" @click="remove_notification_item(index)" />
    <span class="title">{{ notifyItem.title }}</span>
    <span class="subject">{{ notifyItem.subject }}</span>
  </div>
  <!-- <div class="box black">notification testing</div> -->
</template> 

<style lang="scss" scoped>
@import '../styles/format';

.svg {
  position: absolute;
  top: 50%;
  right: 0.8rem;
  transform: translateY(-50%);
  width: 32px;
  height: 32px;
  stroke-width: 4;
  stroke: #fff;
}
</style>