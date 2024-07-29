import apiClient from './apiConfig'

export const register = async (formData) => {
  try {
    console.log(formData)
    const response = await apiClient.post('/auth/sign-up', formData)

    if (response.status !== 201) {
      return { success: false, error: response.error }
    }
    return { success: true, data: response.data }
  } catch (err) {
    throw err
  }
}

export const login = async (formData) => {
  try {
    // console.log(formData)
    const response = await apiClient.post('/auth/login', formData)

    if (response.status !== 200) {
      return { success: false, error: response.error }
    }

    console.log(response)
    return { success: true, data: response.data }
  } catch (err) {
    throw err
  }
}
