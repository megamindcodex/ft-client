import apiClient from './apiConfig'

export const fetchUserData = async (accessToken) => {
  try {
    const response = await apiClient.get('/api/get_user_data', { token: accessToken })
    if (response.status !== 200) {
      return { success: false, error: response.error }
    }

    return { success: true, data: response.data }
  } catch (err) {
    console.error(err)
  }
}
