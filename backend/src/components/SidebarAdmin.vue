<template>
  <div
    class="w-[200px] bg-indigo-700 text-white py-12 px-2 sm:rounded-l-xl flex flex-col gap-2"
  >
    <RouterLink
      :to="{ name: 'app.dashboard' }"
      class="flex items-center gap-2 hover:bg-black/25 py-1 px-3 rounded transition-colors"
    >
      <span>
        <HomeIcon class="w-5 text-gray-300" />
      </span>
      <span>Dashboard</span>
    </RouterLink>
    <RouterLink
      :to="{ name: 'app.products' }"
      class="flex items-center gap-2 hover:bg-black/25 py-1 px-3 rounded transition-colors"
    >
      <span>
        <ListBulletIcon class="w-5 text-gray-300" />
      </span>
      <span>Products</span>
    </RouterLink>
    <RouterLink
      :to="{ name: 'app.users' }"
      class="flex items-center gap-2 hover:bg-black/25 py-1 px-3 rounded transition-colors"
    >
      <span>
        <UsersIcon class="w-5 text-gray-300" />
      </span>
      <span>Users</span>
    </RouterLink>
    <RouterLink
      :to="{ name: 'app.reports' }"
      class="flex items-center gap-2 hover:bg-black/25 py-1 px-3 rounded transition-colors"
    >
      <span>
        <ChartBarIcon class="w-5 text-gray-300" />
      </span>
      <span>Reports</span>
    </RouterLink>
  </div>
</template>

<script setup>
import {
  HomeIcon,
  UsersIcon,
  ListBulletIcon,
  ChartBarIcon
} from '@heroicons/vue/24/outline'
</script>

<style lang="scss" scoped></style>
