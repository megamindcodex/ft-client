import axios from 'axios'

// Create an Axios Instance
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_ENDPOINT_URL, //base url,  vuejs way of using .env
  timeout: 10000, // timeout in milliseconds
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
  // cridentials: 'same-origin'
})

export default apiClient
