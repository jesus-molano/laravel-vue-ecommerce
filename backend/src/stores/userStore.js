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

  function getUser (user) {
    return axiosClient.get('/user', user)
      .then(({ data }) => {
        setUser(data)
        return data
      })
  }

  function login (user) {
    return axiosClient.post('/login', user).then(({ data }) => {
      setUser(data.user)
      setToken(data.token)
      return data
    })
  }

  function logout () {
    return axiosClient.post('/logout')
      .then((response) => {
        setToken(null)
        return response
      })
  }

  return { token, data, login, logout, getUser }
})
