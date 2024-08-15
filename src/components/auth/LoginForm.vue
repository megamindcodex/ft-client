

<script setup>
import { reactive, ref, defineEmits } from 'vue'
import { useUserStore } from '../../stores/userStore'
import { useValidator } from '@/composables/useValidator' //custom form validator composables
import { useRouter } from 'vue-router'

import EyeSvg from '../icons/EyeSvg.vue'
import EyeOfSvg from '../icons/EyeOfSvg.vue'
import LockSvg from '../icons/LockSvg.vue'
import MailSvg from '../icons/MailSvg.vue'

// const displayAlert = inject('displayAlert')

// distructure all validation function
const { validate_email, validate_password } = useValidator()
const { loginUser } = useUserStore()

const router = useRouter()
const visible = ref(false)
const isLoading = ref(false)

//***********************************************//
const emit = defineEmits(['toggleAlert'])

const toggleAlert = async (type, message, state) => {
  try {
    emit('toggleAlert', { type, message, state })
  } catch (err) {
    console.error(err.message, err)
  }
}
//***********************************************//

// All fields validation result
const emailValidation = ref({ valid: true, error: false, message: '' })
const passwordValidation = ref({ valid: true, error: false, message: '' })

// validate filed function
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

// validate all filed simultaneously
const validateForm = () => {
  validateFiled('email')
  validateFiled('password')

  // Check if all validations are valid
  return emailValidation.value.valid && passwordValidation.value.valid
}

// submit form
const submitForm = async () => {
  const isFormValid = validateForm()
  if (!isFormValid) {
    await toggleAlert('error', 'form is not valid!', true)
    return console.error('form is not valid!')
  }

  await toggleAlert('', '', false)
  console.log('form is valid')
  isLoading.value = true
  const res = await loginUser(formData)

  if (!res.success) {
    isLoading.value = false
    await toggleAlert('error', res.error, true)
    return
  }
  await toggleAlert('success', res.data, true)
  console.log(res.data)
  setTimeout(() => {
    router.push({ name: 'home' })
  }, 5000)
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
        <EyeSvg v-if="visible" @click="visible = !visible" />
        <EyeOfSvg v-if="!visible" @click="visible = !visible" />
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
      <button type="submit">
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