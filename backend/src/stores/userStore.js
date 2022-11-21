import { ref } from 'vue'
import { defineStore } from 'pinia'
import axiosClient from '../axios'

export const useUserStore = defineStore('user', () => {
  // State
  const token = ref(sessionStorage.getItem('TOKEN'))
  const data = ref({})

  // Actions
  const setUser = user => {
    data.value = user
  }

  const setToken = newToken => {
    token.value = newToken
    newToken
      ? sessionStorage.setItem('TOKEN', newToken)
      : sessionStorage.removeItem('TOKEN')
  }

  async function getUser (user) {
    const { data } = await axiosClient.get('/user', user)
    setUser(data)
    return data
  }

  async function login (user) {
    const { data } = await axiosClient.post('/login', user)
    setUser(data.user)
    setToken(data.token)
    return data
  }

  async function logout () {
    const response = await axiosClient.post('/logout')
    setToken(null)
    return response
  }

  return { token, data, login, logout, getUser }
})
