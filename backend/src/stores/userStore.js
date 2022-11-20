import { ref } from 'vue'
import { defineStore } from 'pinia'
import axiosClient from '../axios'

export const useUserStore = defineStore('user', () => {
  // State
  const token = ref(sessionStorage.getItem('TOKEN'))
  const data = ref({})

  // Actions
  const setUser = (user) => {
    data.value = user
  }

  const setToken = (newToken) => {
    token.value = newToken
    newToken
      ? sessionStorage.setItem('TOKEN', newToken)
      : sessionStorage.removeItem('TOKEN')
  }

  async function login (user) {
    try {
      const data = axiosClient.post('/login', user)
        .then(response => {
          const { data } = response
          return data
        })
      console.log(data)
      setUser(data.user)
      setToken(data.token)
      return data
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async function logout () {
    try {
      const { data } = await axiosClient.post('/logout')
      setToken(null)
      return data
    } catch (error) {
      throw new Error(error.message)
    }
  }

  return { token, data, login, logout }
})
