<script setup>
import { reactive, ref, defineEmits } from 'vue'
import { useUserStore } from '../../stores/userStore'
import { useValidator } from '@/composables/useValidator'
import { useRoute, useRouter } from 'vue-router'

import EyeSvg from '../icons/EyeSvg.vue'
import EyeOfSvg from '../icons/EyeOfSvg.vue'
import LockSvg from '../icons/LockSvg.vue'
import MailSvg from '../icons/MailSvg.vue'

const { validate_email, validate_password } = useValidator()
const { loginUser, mutate_userData } = useUserStore()

const router = useRouter()
const route = useRoute()
const visible = ref(false)
const isLoading = ref(false)
const isDisabled = ref(false)

const emit = defineEmits(['toggleAlert'])

const toggleAlert = async (type, message, state) => {
  try {
    emit('toggleAlert', { type, message, state })
  } catch (err) {
    console.error(err.message, err)
  }
}

const emailValidation = ref({ valid: true, error: false, message: '' })
const passwordValidation = ref({ valid: true, error: false, message: '' })

const validateFiled = async (filed) => {
  if (filed === 'email') {
    emailValidation.value = validate_email(formData.email)
  }
  if (filed === 'password') {
    passwordValidation.value = validate_password(formData.password)
  }
}

const formData = reactive({
  email: '',
  password: ''
})

const validateForm = () => {
  validateFiled('email')
  validateFiled('password')

  return emailValidation.value.valid && passwordValidation.value.valid
}

const submitForm = async () => {
  try {
    const isFormValid = validateForm()
    if (!isFormValid) {
      await toggleAlert('error', 'form is not valid!', true)
      return console.error('form is not valid!')
    }

    await toggleAlert('', '', false)
    console.log('form is valid')
    isLoading.value = true
    isDisabled.value = true
    const res = await loginUser(formData)

    if (!res.success) {
      isLoading.value = false
      isDisabled.value = false
      await toggleAlert('error', res.error, true)
      return
    }

    await toggleAlert('success', res.message, true)
    // console.log(res.data)

    setTimeout(() => {
      router.push('/home')
    }, 3000)
  } catch (err) {
    console.log(err.message, err)
    isLoading.value = false
    isDisabled.value = false
    await toggleAlert('error', 'An error occurred during login', true)
  }
}
</script>


<template>
  <!-- <button @click="toggleAlert('info', 'you got a message')" class="v-btn bg-purple-accent-4 pa-2">
    toggle alert, {{ displayAlert }}
  </button> -->
  <v-form @submit.prevent="submitForm" id="login-form" class="form">
    <!-- Email Field -->
    <div class="form-group">
      <div class="input-field">
        <label for="email">Email</label>
        <input
          type="email"
          id="email"
          placeholder="your email address"
          v-model="formData.email"
          @blur="validateFiled('email')"
        />
        <MailSvg />
      </div>
      <div class="input-details">
        <Transition name="input-error-fade">
          <span v-if="emailValidation.error">{{ emailValidation.message }}</span>
        </Transition>
      </div>
    </div>

    <!-- Password Field -->
    <div class="form-group">
      <div class="input-field">
        <label for="password">Password</label>
        <input
          :type="visible ? 'text' : 'password'"
          id="password"
          placeholder="your password"
          v-model="formData.password"
          @blur="validateFiled('password')"
        />
        <LockSvg />
        <EyeSvg v-if="visible" @click="visible = !visible" class="eye-svg" />
        <EyeOfSvg v-if="!visible" @click="visible = !visible" class="eye-svg" />
      </div>
      <div class="input-details">
        <Transition name="input-error-fade">
          <span v-if="passwordValidation.error">{{ passwordValidation.message }}</span>
        </Transition>
      </div>
    </div>
    <div class="forgot-pass">
      <RouterLink to="/auth/reset">Forgot password?</RouterLink>
    </div>
    <div class="btn">
      <button type="submit" :disabled="isDisabled">
        <v-progress-circular
          v-if="isLoading"
          :size="30"
          color="primary"
          indeterminate
        ></v-progress-circular>
        <span v-else>Login</span>
      </button>
    </div>

    <div class="base">
      <span>Don't have an account? <RouterLink to="/auth/signup">Sign up</RouterLink></span>
    </div>
  </v-form>
</template>

<style lang="css" scoped>
.alert {
  top: 0;
}

.eye-svg {
  position: absolute;
  top: 2.7rem;
  right: 0.7rem;
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
</style>