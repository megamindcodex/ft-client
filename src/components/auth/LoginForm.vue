

<script setup>
import { ref } from 'vue'
import { useUserStore } from '../../stores/userStore'
import { useRouter } from 'vue-router'

const router = useRouter()
const error = ref(false)
const errorTxt = ref(null)

const { loginUser } = useUserStore()
const formData = {
  email: 'emmanvictor71@gmail.com',
  password: 'Asperden10'
}

const submit = async () => {
  const res = await loginUser(formData)
  if (res.success === false) {
    errorTxt.value = res.error
    error.value = true
  } else {
    console.log(res.data)
    router.push({ name: 'home' })
  }
}

// const updateCurrentAlertComponent = () => {}
</script>

<template>
  <div class="cont">
    <span v-if="error">{{ errorTxt }}</span>
    <v-btn @click="submit">Login</v-btn>

    <div>
      <router-link to="/auth/#signup">signup</router-link>
      <router-link to="/auth/#send-code">forgot password?</router-link>
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>