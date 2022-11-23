<script setup>
defineProps({
  field: {
    type: String
  },
  sortField: {
    type: String
  },
  sortDirection: {
    type: String
  }
})
const emit = defineEmits(['click'])
</script>

<template>
  <th
    @click="emit('click', field)"
    class="border-b-2 p-2 text-left cursor-pointer bg-gray-100"
    :class="field === sortField && 'bg-blue-50'"
  >
    <div class="flex justify-between">
      <slot></slot>
      <div v-if="sortField === field" class="ml-2">
        <svg
          v-if="sortDirection === 'asc'"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M4.5 15.75l7.5-7.5 7.5 7.5"
          />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
          />
        </svg>
      </div>
    </div>
  </th>
</template>

<style lang="scss" scoped></style>
