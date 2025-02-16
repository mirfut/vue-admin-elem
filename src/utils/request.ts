import axios from 'axios'
import { ElMessage } from 'element-plus'
import { getCookie } from '.'

const request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  withCredentials: true,
  timeout: 60000
})

const token = getCookie('token')

request.interceptors.request.use(
  config => {
    if (config.headers && token) {
      config.headers['Authorization'] = token
    }
    return config
  },
  error => {
    console.error(error)
    return Promise.reject(error)
  }
)

request.interceptors.response.use(
  response => {
    const { code, msg } = response.data
    if (code !== 200) {
      ElMessage({
        message: `error code${code}: ${msg || 'unknown mistake'}`,
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(new Error(msg || 'unknown mistake'))
    } else {
      return response
    }
  },
  error => {
    ElMessage({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    ElMessage.error(error.message)
    return Promise.reject(error)
  }
)

export default request