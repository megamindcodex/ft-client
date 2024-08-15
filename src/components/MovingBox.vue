  
  <script setup>
import { ref } from 'vue'

const motionConfig = ref({
  keyframes: [
    { transform: 'scale(1) rotate(0deg)', backgroundColor: 'red' },
    { transform: 'scale(1.5) rotate(180deg)', backgroundColor: 'green', duration: 1000 },
    { transform: 'scale(1) rotate(360deg)', backgroundColor: 'blue', duration: 1000 }
  ],
  repeat: 2, // Repeat the animation twice
  direction: 'normal', // Play animation in normal direction
  easing: 'linear' // No easing, constant speed
})

console.log(motionConfig.value)
</script>

<template>
  <div class="cont"></div>
  <div class="box" v-motion="motionConfig"></div>
  <!-- <v-btn>start</v-btn> -->
</template>
  
  <style lang="scss" scoped>
.cont {
  width: 200px;
  height: 200px;
  border: 1px solid #000;
}

.box {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: purple; /* Initial color */
}
</style>
  