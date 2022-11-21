<script setup>
import { ref } from 'vue'
import { LockClosedIcon } from '@heroicons/vue/20/solid'
import { GuestLayout } from '@/layouts'
import { useUserStore } from '@/stores/userStore.js'
import router from '../router'

const userStore = useUserStore()
const loading = ref(false)
const errorMsg = ref('')

const user = {
  email: '',
  password: '',
  remember: false
}

function login () {
  loading.value = true
  userStore
    .login(user)
    .then(() => {
      loading.value = false
      router.push({ name: 'app.dashboard' })
    })
    .catch(({ response }) => {
      loading.value = false
      errorMsg.value = response.data.message
    })
}
</script>
<template>
  <GuestLayout title="Sign in to your account">
    <form class="mt-8 space-y-6" method="POST" @submit.prevent="login">
      <p
        class="bg-rose-300 p-2 rounded-md font-bold text-red-900 text-center"
        v-if="errorMsg"
      >
        {{ errorMsg }}
      </p>
      <input type="hidden" name="remember" value="true" />
      <div class="-space-y-px rounded-md shadow-sm">
        <div>
          <label for="email-address" class="sr-only">Email address</label>
          <input
            id="email-address"
            name="email"
            type="email"
            autocomplete="email"
            required=""
            v-model="user.email"
            class="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            placeholder="Email address"
          />
        </div>
        <div>
          <label for="password" class="sr-only">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            autocomplete="current-password"
            required=""
            v-model="user.password"
            class="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            placeholder="Password"
          />
        </div>
      </div>

      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            v-model="user.remember"
            class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:text-indigo-400"
          />
          <label
            for="remember-me"
            class="ml-2 block text-sm text-gray-900 dark:text-white"
            >Remember me</label
          >
        </div>

        <div class="text-sm">
          <RouterLink
            :to="{ name: 'requestPassword' }"
            class="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
            >Forgot your password?
          </RouterLink>
        </div>
      </div>

      <div>
        <button
          type="submit"
          :disabled="loading"
          class="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          :class="{ 'opacity-50 cursor-not-allowed': loading }"
        >
          <svg
            v-if='loading'
            class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <span class="absolute inset-y-0 left-0 flex items-center pl-3">
            <LockClosedIcon
              class="h-5 w-5 text-indigo-400 group-hover:text-indigo-300"
              aria-hidden="true"
            />
          </span>
          Sign in
        </button>
      </div>
    </form>
  </GuestLayout>
</template>

<style lang="scss" scoped></style>
