import router from './router'
import axios from 'axios'
// import { useUserStore } from '@/stores/userStore.js'
// const user = useUserStore()

const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`
})
// axiosClient.interceptors.request.use(config => {
//   config.headers.Authorization = `Bearer ${sessionStorage.getItem('TOKEN')}`
//   return config
// })

// axiosClient.interceptors.response.use(response => {
//   return response
// }, error => {
//   if (error.response.status === 401) {
//     sessionStorage.removeItem('TOKEN')
//     router.push({ name: 'login' })
//   }
//   throw error
// })

export default axiosClient
