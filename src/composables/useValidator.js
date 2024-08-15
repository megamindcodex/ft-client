// Validator composables
export const useValidator = () => {
  //######## full name Validator ######## //
  const validate_fullName = (data) => {
    if (data === '' || data === null) {
      return { valid: false, error: true, message: 'full name is required' }
    } else if (data.length < 4) {
      return { valid: false, error: true, message: 'name must be at least 4 letter' }
    }

    return { valid: true, error: false, message: null }
  }

  //######## Emial Validator ######## //
  const validate_email = (data) => {
    if (data === '' || data === null) {
      return { valid: false, error: true, message: 'email is required' }
    }
    return { valid: true, error: false, message: null }
  }

  //######## User name Validator ######## //
  const validate_userName = (data) => {
    if (data === '' || data === null) {
      return { valid: false, error: true, message: 'user name is required' }
    } else if (data.length < 4) {
      return { valid: false, error: true, message: 'user name must be at leaset 4 letters' }
    }
    return { valid: true, error: false, message: null }
  }
  //######## Phone number Validator ######## //
  const validate_phoneNumber = (data) => {
    if (data === '' || data === null)
      return { valid: false, error: true, message: 'phone number is required' }
    return { valid: true, error: false, message: null }
  }

  //######## Passwod Validator ######## //
  const validate_password = (data) => {
    if (data === '' || data === null) {
      return { valid: false, error: true, message: 'password is required' }
    } else if (data.length < 8) {
      return {
        valid: false,
        error: true,
        message: 'password needs to be at least 8 characters long'
      }
    }
    return { valid: true, error: false, message: null }
  }

  //######## Confirm password Validator ######## //
  const validate_confirmPassword = (passowrd, confirmPassword) => {
    if (!confirmPassword || confirmPassword === null) {
      return { valid: false, error: true, message: 'please confirm your password' }
    } else if (confirmPassword != passowrd) {
      // console.log(`password ${passowrd}`)
      // console.log(`confirmPasssword ${confirmPassword}`)
      return { valid: false, error: true, message: 'password does not match' }
    }

    return { valid: true, error: false, message: null }
  }

  //######## Reset code Validator ######## //
  const validate_resetCode = (data) => {
    if (!data || data === null) {
      return { valid: false, error: true, message: 'please enter reset code' }
    }

    return { valid: true, error: false, message: null }
  }

  //######## Terms Validator ######## //
  //   const validate_terms = (data) => {
  //     if (data === '' || data === null)
  //       return { valid: false, error: true, message: 'field is required' }
  //     return { valid: true, error: false, message: null }
  //   }

  return {
    validate_fullName,
    validate_email,
    validate_userName,
    validate_phoneNumber,
    validate_password,
    validate_confirmPassword,
    validate_resetCode
    // validate_terms
  }
}
