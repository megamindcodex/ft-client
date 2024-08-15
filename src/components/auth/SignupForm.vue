<script setup>
import { reactive, ref, watch, inject, defineEmits } from 'vue'
import { useUserStore } from '../../stores/userStore'
import { useValidator } from '@/composables/useValidator' //custom form validator composables
import { useRouter } from 'vue-router'

import EyeSvg from '../icons/EyeSvg.vue'
import EyeOfSvg from '../icons/EyeOfSvg.vue'
import MailSvg from '../icons/MailSvg.vue'
import UserSvg from '../icons/UserSvg.vue'
import PhoneSvg from '../icons/PhoneSvg.vue'
import LockSvg from '../icons/LockSvg.vue'

const displayAlert = inject('displayAlert')

// distructure all validation function
const {
  validate_fullName,
  validate_email,
  validate_userName,
  validate_phoneNumber,
  validate_password
} = useValidator()
const { registerUser } = useUserStore()

const router = useRouter()
const visible = ref(false)
const isLoading = ref(false)
const ischecked = ref(false)
const agreeTermsErrorTxt = ref('')

//***********************************************//
const emit = defineEmits(['toggleAlert'])

const toggleAlert = async (type, message, state) => {
  try {
    emit('toggleAlert', { type, message, state })
  } catch (err) {
    console.log(err.message, err)
  }
}
//***********************************************//

const formData = reactive({
  fullName: '',
  email: '',
  userName: '',
  phoneNumber: '',
  password: ''
})

// All fields validation result
const fullnameValidation = ref({ valid: null, error: false, message: '' })
const emailValidation = ref({ valid: true, error: false, message: '' })
const usernameValidation = ref({ valid: true, error: false, message: '' })
const phonenumberValidation = ref({ valid: true, error: false, message: '' })
const passwordValidation = ref({ valid: true, error: false, message: '' })

// validate filed function
const validateFiled = async (filed) => {
  if (filed === 'fullName') {
    fullnameValidation.value = validate_fullName(formData.fullName)
  }
  if (filed === 'email') {
    emailValidation.value = validate_email(formData.email)
  }
  if (filed === 'userName') {
    usernameValidation.value = validate_userName(formData.userName)
  }
  if (filed === 'phoneNumber') {
    phonenumberValidation.value = validate_phoneNumber(formData.phoneNumber)
  }
  if (filed === 'password') {
    passwordValidation.value = validate_password(formData.password)
  }
}

// validate all filed simultaneously
const validateForm = () => {
  validateFiled('fullName')
  validateFiled('email')
  validateFiled('userName')
  validateFiled('phoneNumber')
  validateFiled('password')

  // Check if all validations are valid
  return (
    fullnameValidation.value.valid &&
    emailValidation.value.valid &&
    usernameValidation.value.valid &&
    phonenumberValidation.value.valid &&
    passwordValidation.value.valid
  )
}

// submit form
const submitForm = async () => {
  const isFormValid = validateForm()
  if (!isFormValid) {
    await toggleAlert('error', 'Form is not valid!', true)
    return console.error('form is not valid!')
  }

  await toggleAlert('', '', false)
  if (!ischecked.value) {
    await toggleAlert('error', 'Form is not valid!', true)
    agreeTermsErrorTxt.value = 'plase agree to terms'
    return
  }

  await toggleAlert('', '', false)
  console.log('form is valid')
  isLoading.value = true
  const res = await registerUser(formData)

  if (!res.success) {
    isLoading.value = false
    await toggleAlert('error', res.error, true)
    return
  }

  await toggleAlert('success', res.data, true)
  console.log(res.data.message)
  setTimeout(() => {
    router.push({ name: 'home' })
  }, 5000)
}

watch(ischecked, () => {
  if (ischecked.value) {
    agreeTermsErrorTxt.value = ''
  } else {
    agreeTermsErrorTxt.value = 'plase agree to terms'
  }
})
</script>

<template>
  <v-form @submit.prevent="submitForm" id="sigup-form" class="form">
    <!-- FullName Field -->
    <div class="form-group">
      <div class="input-field">
        <label for="fullName">Full name</label>
        <input
          type="text"
          id="fullName"
          placeholder="enter your full name"
          v-model="formData.fullName"
          @blur="validateFiled('fullName')"
        />
        <UserSvg />
      </div>
      <div class="input-details">
        <Transition name="input-error-fade">
          <span v-if="fullnameValidation.error"> {{ fullnameValidation.message }}</span>
        </Transition>
      </div>
    </div>
    <!-- Email Field -->
    <div class="form-group">
      <div class="input-field">
        <label for="email">Email</label>
        <input
          type="email"
          id="email"
          placeholder="enter your email"
          v-model="formData.email"
          @blur="validateFiled('email')"
        />
        <MailSvg />
      </div>
      <div class="input-details">
        <Transition name="input-error-fade">
          <span v-if="emailValidation.error"> {{ emailValidation.message }}</span>
        </Transition>
      </div>
    </div>

    <!-- UserName Field -->
    <div class="form-group">
      <div class="input-field">
        <label for="userName">UserName</label>
        <input
          type="text"
          id="userName"
          placeholder="enter your user name"
          v-model="formData.userName"
          @blur="validateFiled('userName')"
        />
        <UserSvg />
      </div>
      <div class="input-details">
        <Transition name="input-error-fade">
          <span v-if="usernameValidation.error"> {{ usernameValidation.message }}</span>
        </Transition>
      </div>
    </div>

    <!-- Phone number Field -->
    <div class="form-group">
      <div class="input-field">
        <label for="phoneNumber">Phone Number</label>
        <input
          type="nnumber"
          id="phoneNumber"
          placeholder="enter your phone number"
          v-model="formData.phoneNumber"
          @blur="validateFiled('phoneNumber')"
        />
        <PhoneSvg />
      </div>
      <div class="input-details">
        <Transition name="input-error-fade">
          <span v-if="phonenumberValidation.error"> {{ phonenumberValidation.message }}</span>
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
          placeholder="enter your password"
          v-model="formData.password"
          @blur="validateFiled('password')"
        />
        <LockSvg />
        <EyeSvg v-if="visible" @click="visible = !visible" />
        <EyeOfSvg v-if="!visible" @click="visible = !visible" />
      </div>
      <div class="input-details">
        <Transition name="input-error-fade">
          <span v-if="passwordValidation.error"> {{ passwordValidation.message }}</span>
        </Transition>
      </div>
    </div>

    <div class="checkbox-field">
      <!-- agree to terms and privacy -->
      <div class="input-field">
        <input type="checkbox" id="checkbox" v-model="ischecked" />
        <label for="checkbox" class="agree-span">Agree to terms</label>
        <label for="checkbox" class="check-label"></label>
      </div>
      <div class="input-details">
        <Transition name="input-error-fade">
          <span v-if="!ischecked"> {{ agreeTermsErrorTxt }}</span>
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
        <span v-else> Signup </span>
      </button>
    </div>

    <div class="base">
      <span>Already have an account?</span>
      <RouterLink to="/auth/login">Login</RouterLink>
    </div>
  </v-form>
</template>

<style lang="css" scoped>
.alert {
  top: 0;
  z-index: 999;
}
.input-error-fade-enter-from {
  opacity: 0;
  transform: translateY(-15px);
}

.input-error-fade-enter-to {
  opacity: 1;
  transform: translateY(0);
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