
<script setup>
import { reactive, ref, defineEmits } from 'vue'
import { useRouter } from 'vue-router'
import { useValidator } from '@/composables/useValidator'
import { useUserStore } from '../../stores/userStore'

import MailSvg from '../icons/MailSvg.vue'
import LockSvg from '../icons/LockSvg.vue'
import EyeOfSvg from '../icons/EyeOfSvg.vue'
import EyeSvg from '../icons/EyeSvg.vue'
import InfoSvg from '../icons/InfoSvg.vue'

// distructure all validation function
const { validate_email, validate_password, validate_confirmPassword, validate_resetCode } =
  useValidator()

const { send_reset_code, reset_password } = useUserStore()

const router = useRouter()
const visible = ref(false)
const isLoading = ref(false)
const sendCodeBtnLoading = ref(false)
const sendCodeTxt = ref('send code')
const isDisabled = ref(true)
const btnDisabled = ref(true)

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

const formData = reactive({
  email: '',
  newPassword: '',
  resetCode: ''
})
const confirmPassword = ref('')

// All fields validation result
const emailValidation = ref({ valid: false, error: true, message: '' })
const resetcodeValidation = ref({ valid: true, error: false, message: '' })
const passwordValidation = ref({ valid: true, error: false, message: '' })
const confirmPasswordValidation = ref({ valid: true, error: false, message: '' })

// Validate field function
const validateFiled = async (field) => {
  if (field === 'email') {
    emailValidation.value = validate_email(formData.email)
    btnDisabled.value = !emailValidation.value.valid
  }
  if (field === 'resetCode') {
    resetcodeValidation.value = validate_resetCode(formData.resetCode)
  }
  if (field === 'password') {
    passwordValidation.value = validate_password(formData.newPassword)
  }
  if (field === 'confirmPassword') {
    confirmPasswordValidation.value = validate_confirmPassword(
      formData.newPassword,
      confirmPassword.value
    )
  }
}

// validate all filed simultaneously
const validateForm = () => {
  validateFiled('email')
  validateFiled('resetCode')
  validateFiled('password')
  validateFiled('confirmPassword')

  // Check if all validations are valid
  return (
    emailValidation.value.valid &&
    resetcodeValidation.value.valid &&
    passwordValidation.value.valid &&
    confirmPasswordValidation.value.valid
  )
}

const send_code = async () => {
  await toggleAlert('', '', false)
  sendCodeBtnLoading.value = true
  const res = await send_reset_code(formData.email)
  if (!res.success) {
    sendCodeBtnLoading.value = false
    await toggleAlert('error', res.error, true)
    console.log(res.error)
    return
  }

  sendCodeBtnLoading.value = false
  await toggleAlert('info', res.data.message, true)
  formData.email = res.data.email
  isDisabled.value = false
  sendCodeTxt.value = 'resend code'
  console.log(res.data)
}

const submitForm = async () => {
  await toggleAlert('', '', false)
  const isFormValid = validateForm()
  if (!isFormValid) {
    await toggleAlert('error', 'Form is not valid!', true)
    console.error('form is not valid')
    return
  }

  await toggleAlert('', '', false)
  console.log('form is valid')
  isLoading.value = true
  const res = await reset_password(formData)

  if (!res.success) {
    isLoading.value = false
    await toggleAlert('error', res.error, true)
    console.log(res.error)
    return
  }

  // isDisabled.value = false
  await toggleAlert('success', res.data, true)
  console.log(res.data)
  setTimeout(() => {
    router.push('/auth/login')
  }, 5000)
}
</script>

<template>
  <v-form @submit.prevent="submitForm" id="send-code-form" class="form">
    <div class="form-group">
      <div class="input-field">
        <label for="email">email</label>
        <input
          type="email"
          id="email"
          placeholder="enter email to recieve code"
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

    <div class="form-group" id="code-field">
      <div class="input-field">
        <div class="row1">
          <label for="reset-code">reset code</label>
          <input
            type="text"
            id="reset-code"
            placeholder="enter 6 character code"
            maxlength="6"
            v-model="formData.resetCode"
            @blur="validateFiled('resetCode')"
          />
          <InfoSvg />
        </div>
        <div class="row2">
          <button type="button" :disabled="btnDisabled" @click="send_code">
            <v-progress-circular
              v-if="sendCodeBtnLoading"
              :size="30"
              color="primary"
              indeterminate
            ></v-progress-circular>
            <span v-else>
              {{ sendCodeTxt }}
            </span>
          </button>
        </div>
      </div>
      <div class="code-input-details">
        <Transition name="input-error-fade">
          <span v-if="resetcodeValidation.error">{{ resetcodeValidation.message }}</span>
        </Transition>
      </div>
    </div>

    <div class="form-group">
      <div class="input-field">
        <label for="password">new password</label>
        <input
          :type="visible ? 'text' : 'password'"
          id="password"
          placeholder="enter new password"
          v-model="formData.newPassword"
          :disabled="isDisabled"
          @blur="validateFiled('password')"
        />
        <LockSvg />
        <EyeSvg v-if="visible" @click="visible = !visible" />
        <EyeOfSvg v-if="!visible" @click="visible = !visible" />
      </div>
      <div class="input-details">
        <Transition name="input-error-fade">
          <span v-if="passwordValidation.error && !isDisabled">{{
            passwordValidation.message
          }}</span>
        </Transition>
      </div>
    </div>
    <div class="form-group">
      <div class="input-field">
        <label for="confirm-password">confirm password</label>
        <input
          :type="visible ? 'text' : 'password'"
          id="confirm-password"
          placeholder="confirm new password"
          v-model="confirmPassword"
          :disabled="isDisabled"
          @blur="validateFiled('confirmPassword')"
        />
        <LockSvg />
        <EyeSvg v-if="visible" @click="visible = !visible" />
        <EyeOfSvg v-if="!visible" @click="visible = !visible" />
      </div>
      <div class="input-details">
        <Transition name="input-error-fade">
          <span v-if="confirmPasswordValidation.error && !isDisabled">{{
            confirmPasswordValidation.message
          }}</span>
        </Transition>
      </div>
    </div>
    <div class="btn">
      <button type="submit">
        <v-progress-circular
          v-if="isLoading"
          :size="30"
          color="primary"
          indeterminate
        ></v-progress-circular>
        <span v-else>Submit </span>
      </button>
    </div>
  </v-form>
</template>

<style lang="scss" scoped>
@import '../../styles/auth/_formStyle.scss';

.btn {
  margin-top: 1rem;
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