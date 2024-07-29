<script setup>
import { ref } from 'vue'
import { useUserStore } from '../../stores/userStore'
import { useRouter } from 'vue-router'

const router = useRouter()
const error = ref(false)
const errorTxt = ref(null)

const { registerUser } = useUserStore()
const formData = {
  email: 'emmanvictor71@gmail.com'
}

const submit = async () => {
  const res = await registerUser(formData)
  if (res.success === false) {
    errorTxt.value = res.error
    error.value = true
  } else {
    console.log(res.data)
    router.push({ name: 'home' })
  }
}
</script>

<template>
  <v-form @submit.prevent="submit" class="form">
    <div class="form-group">
      <v-text-field v-model="fullName" label="Full name" variant="outlined"></v-text-field>
    </div>
    <div class="form-group">
      <v-text-field v-model="email" label="Email" variant="outlined"></v-text-field>
    </div>
    <div class="form-group">
      <v-text-field v-model="userName" label="User name" variant="outlined"></v-text-field>
    </div>
    <div class="form-group">
      <v-text-field v-model="phoneNumber" label="phone number" variant="outlined"></v-text-field>
    </div>
    <div class="form-group" id="birth-gender">
      <section></section>
      <v-text-field variant="outlined"></v-text-field>
    </div>
    <div class="form-group">
      <v-text-field v-model="password" label="password" variant="outlined"></v-text-field>
    </div>
  </v-form>
</template>

<style lang="css" scoped>
</style>