<script setup>
import { onMounted, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
// import { useAlertStore } from '@/stores/alertStore'

// const alertStore = useAlertStore()
// const { displayAlert } = storeToRefs(alertStore)

const alertData = defineProps({
  data: Object
})

const type = ref(alertData.data.type)
const message = ref(alertData.data.message)

// console.log(type.value)
// console.log(message.value)
</script>

<template>
  <div :class="['box', type]">
    <span>{{ message }}</span>
    <!-- <button @click="$emit('showAlert')">close</button> -->
    <!-- <button @click="toggleAlert">close</button> -->
  </div>
</template> 

<style lang="scss" scoped>
@import '../styles/format';

.box {
  // position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  border-radius: $bRadius_base + 5;
}
</style>