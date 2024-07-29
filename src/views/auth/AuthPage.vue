<script setup>
// import SignupForm from '@/components/auth/SignupForm.vue'
// import LoginForm from '@/components/auth/LoginForm.vue'
import { ref, onMounted, watch, watchEffect, shallowRef, defineAsyncComponent } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const LoginForm = defineAsyncComponent({
  loader: async () => import('../../components/auth/LoginForm.vue'),
  suspensible: false
})
const SignupForm = defineAsyncComponent({
  loader: async () => import('../../components/auth/SignupForm.vue'),
  suspensible: false
})
const SendCode = defineAsyncComponent({
  loader: async () => import('../../components/auth/SendCode.vue'),
  suspensible: false
})

const ResetForm = defineAsyncComponent({
  loader: async () => import('../../components/auth/ResetForm.vue'),
  suspensible: false
})

const route = useRoute()
const router = useRouter()
const currentHash = ref(null)
const currentComponent = shallowRef(null)
const panelName = ref(null)

const navigateTo = async (hashName) => {
  currentHash.value = hashName
  await router.push({ path: '/auth', hash: hashName })
  switchPanel()
  // console.log(route.hash)
}

const switchPanel = async () => {
  if (currentHash.value === '#login') {
    currentComponent.value = LoginForm
    panelName.value = 'Login to your account'
  } else if (currentHash.value === '#signup') {
    currentComponent.value = SignupForm
    panelName.value = 'Sign up'
  } else if (currentHash.value === '#send-code') {
    panelName.value = 'Send reset code'
    currentComponent.value = SendCode
  } else if (currentHash.value === '#reset') {
    currentComponent.value = ResetForm
    panelName.value = 'Reset password'
  }
}

watchEffect(() => {
  currentHash.value = route.hash
  switchPanel()
})

onMounted(async () => {
  await navigateTo({ path: '/auth', hash: currentHash.value })
  currentHash.value = route.hash
})
</script>

<template>
  <div>
    <span>{{ panelName }}</span>
    <component :is="currentComponent"></component>
  </div>

  <!-- <suspense> -->
  <!-- </suspense> -->
</template>
<style lang="scss" scoped>
@import '../../styles//format';
div {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: $margin_md;
  // border: 1px solid red;
}
</style>