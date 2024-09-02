<script setup>
</script>

<template>
  <v-container class="cont bg-black">
    <!-- <h1>Splash page</h1> -->
    <v-progress-circular width="6" size="80" color="gray" indeterminate></v-progress-circular>
    <span>Loading Data...</span>
  </v-container>
</template>
<style lang="css" scoped>
.cont {
  width: 100%;
  display: flex;
  gap: 1rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100dvh;
}

span {
  font-size: 24px;
}
</style>