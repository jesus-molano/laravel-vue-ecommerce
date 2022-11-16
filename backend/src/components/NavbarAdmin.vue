<script setup>
import {
  Bars3Icon,
  ArrowLeftOnRectangleIcon,
  UserIcon
} from '@heroicons/vue/24/outline'
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { ChevronDownIcon } from '@heroicons/vue/20/solid'

const emit = defineEmits(['toggle-sidebar'])
</script>

<template>
  <header
    class="h-16 shadow bg-indigo-200 dark:bg-indigo-900/80 flex justify-between items-center sm:rounded-tr-xl px-2"
  >
    <button @click="emit('toggle-sidebar')" class="p-2 hover:bg-black/20 rounded transition-colors" >
      <Bars3Icon class="w-7 text-indigo-900 dark:text-white" />
    </button>

    <Menu as="div" class="relative inline-block text-left">
      <div>
        <MenuButton class="flex items-center gap-1">
          <img
            src="https://randomuser.me/api/portraits/men/22.jpg"
            alt="user_image"
            class="rounded-full w-10"
          />
          <small class="font-semibold text-indigo-900 dark:text-white"
            >John Doe</small
          >
          <ChevronDownIcon
            class="h-5 w-5 dark:text-indigo-300 text-white hover:text-indigo-100"
            aria-hidden="true"
          />
        </MenuButton>
      </div>

      <transition
        enter-active-class="transition duration-100 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-75 ease-in"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
      >
        <MenuItems
          class="absolute right-0 mt-2 w-36 origin-top-right divide-y divide-gray-100 rounded-md bg-indigo-100 dark:bg-indigo-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
          <div class="px-1 py-1">
            <MenuItem v-slot="{ active }">
              <button
                :class="[
                  active ? 'bg-indigo-600 text-white' : 'text-indigo-900',
                  'group flex w-full items-center rounded-md px-2 py-2 text-sm dark:text-white font-semibold'
                ]"
              >
                <UserIcon
                  :active="active"
                  :class="[
                    active ? 'text-white' : 'text-indigo-900 dark:text-white',
                    'mr-2 h-5 w-5'
                  ]"
                  aria-hidden="true"
                />
                Profile
              </button>
            </MenuItem>
            <MenuItem v-slot="{ active }">
              <button
                :class="[
                  active ? 'bg-rose-700 text-white' : 'text-indigo-900',
                  'group flex w-full items-center rounded-md px-2 py-2 text-sm dark:text-white font-semibold'
                ]"
              >
                <ArrowLeftOnRectangleIcon
                  :active="active"
                  :class="[
                    active ? 'text-white' : 'text-indigo-900 dark:text-white',
                    'mr-2 h-5 w-5'
                  ]"
                  aria-hidden="true"
                />
                Logout
              </button>
            </MenuItem>
          </div>
        </MenuItems>
      </transition>
    </Menu>
  </header>
</template>

<style lang="scss" scoped></style>
