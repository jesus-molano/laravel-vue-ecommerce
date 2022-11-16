<template>
  <div class=" flex min-h-full min-w-full justify-center items-center ">
    <div
      class="relative flex flex-col sm:flex-row justify-center sm:items-center content-center bg-white min-h-[300px] p-2 rounded-3xl flex-wrap sm:flex-nowrap transition-all"
    >
      <div
        class="text-indigo-700 sm:text-5xl text-3xl sm:px-8 font-bold sm:border-r-2 border-gray-400 sm:w-auto w-full text-center transition-all"
      >
        404
      </div>
      <div class="sm:px-8 transition-all flex flex-col">
        <h1
          class="font-semibold sm:text-5xl text-3xl mb-2 text-black/80 text-center sm:text-left transition-all"
        >
          Page Not Found
        </h1>
        <p
          class="text-gray-600 sm:text-xl text-center sm:text-left transition-all"
        >
          Please check the url in address bar and try again
        </p>
      </div>
      <div class="sm:absolute sm:bottom-4 sm:right-6 bottom-4 mx-auto pt-3">
        <RouterLink
          :to='{ name: "app.dashboard" }'
          class="w-auto rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Go back home
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
