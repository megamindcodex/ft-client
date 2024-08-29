<script setup>
import {
  ref,
  onMounted,
  watch,
  watchEffect,
  shallowRef,
  defineAsyncComponent,
  reactive,
  provide
} from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ChevronLeftSvg from '@/components/icons/ChevronLeftSvg.vue'
import AlertMsg from '@/components/AlertMsg.vue'
import { useAlertStore } from '@/stores/alertStore'
import { storeToRefs } from 'pinia'

const route = useRoute()
const router = useRouter()
const currentParams = ref(null)
const currentComponent = shallowRef(null)
const panelName = ref(null)
const title = ref(null)
const subtitle = ref(null)

const alertStore = useAlertStore()
const { toggleAlert } = alertStore
const { alertData, displayAlert } = storeToRefs(alertStore)

const LoginForm = defineAsyncComponent({
  loader: async () => import('../../components/auth/LoginForm.vue'),
  suspensible: false
})
const SignupForm = defineAsyncComponent({
  loader: async () => import('../../components/auth/SignupForm.vue'),
  suspensible: false
})
const ResetForm = defineAsyncComponent({
  loader: async () => import('../../components/auth/ResetForm.vue'),
  suspensible: false
})

const alertDataProps = ref(null)
watch(displayAlert, () => {
  alertDataProps.value = alertData.value
  // console.log(alertDataProps.value)
})

provide('displayAlert', displayAlert)
provide('alertDataProps', alertDataProps)

const handleToggle = (data) => {
  toggleAlert(data.type, data.message, data.state)
}

// const navigateTo = async () => {
//   currentHash.value = hashName
//   // await router.push({ path: '/auth', hash: hashName })
//   await router.push({ path: '/auth', hash: currentHash.value })
//   switchPanel()
//   // console.log(route.hash
// }

const switchPanel = async () => {
  if (currentParams.value === 'login') {
    currentComponent.value = LoginForm
    panelName.value = 'Login'
    title.value = 'Welcome back,'
    subtitle.value = 'Login to access your account'
  } else if (currentParams.value === 'signup') {
    currentComponent.value = SignupForm
    panelName.value = 'Sign up'
    title.value = 'Create an account'
    subtitle.value = 'Welcome!, enter your details'
  } else if (currentParams.value === 'reset') {
    currentComponent.value = ResetForm
    panelName.value = 'Reset password'
    title.value = 'create new password'
  }
}

watch(route, () => {
  currentParams.value = route.params.panel
  switchPanel()
  toggleAlert('', '', false)
})

onMounted(async () => {
  currentParams.value = route.params.panel
  switchPanel()
  // console.log(route.name)
  // toggleAlert('success', 'test', true)
})
</script>

<template>
  <div class="cont">
    <div class="header-cont">
      <header>
        <ChevronLeftSvg @click="router.go(-1)" class="chevronLeft-svg" />
        <span> {{ panelName }}</span>
      </header>

      <Teleport to="#alert">
        <AlertMsg v-if="displayAlert" :data="alertDataProps" v-motion-slide-top />
      </Teleport>

      <span class="title">{{ title }}</span>
      <span class="subtitle" v-show="subtitle != null">{{ subtitle }}</span>
    </div>
    <component
      :is="currentComponent"
      @toggleAlert="handleToggle"
      v-motion-slide-visible-top
    ></component>
  </div>

  <!-- <suspense> -->
  <!-- </suspense> -->
</template>
<style lang="scss" scoped>
@import '../../styles//format';
.cont {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: $padding_base + 8;
  // margin-top: $margin_md;
  // border: 1px solid red;
}

.header-cont {
  width: 100%;
  display: flex;
  flex-direction: column;

  header {
    display: flex;
    width: 100%;
    align-items: center;
    gap: 0.7rem;
    span {
      font-size: 1.2rem;
      margin: 0;
    }
  }
}

.title {
  font-size: 2em;
  margin-top: $margin_xs + 5;
}

.subtitle {
  font-size: $font_xs;
}

.input-error-fade-enter-from {
  opacity: 0;
  transform: translateY(-15px);
}

.input-error-fade-enter-to {
  opacity: 1;
  transform: translateX(0);
}

.input-error-fade-enter-active {
  transition: 0.1s ease-in;
}

.input-error-fade-leave-to {
  opacity: 0;
  transform: translateY(-15px);
}

.input-error-fade-leave-active {
  transition: 0.1s ease-in;
}

.chevronLeft-svg {
  stroke: #000;
  width: 25px;
  height: 25px;
  stroke-width: 1.7;
}
</style>