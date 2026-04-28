import axios from 'axios'
import { ElMessage } from 'element-plus'

const api = axios.create({
  baseURL: '/api',
  timeout: 5000
})

api.interceptors.request.use(
  config => {
    const user = localStorage.getItem('user')
    if (user) {
      config.headers.Authorization = `Bearer ${user}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  response => response.data,
  error => {
    ElMessage.error('网络请求失败')
    return Promise.reject(error)
  }
)

export default api
