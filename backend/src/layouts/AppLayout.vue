<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { SidebarAdmin, NavbarAdmin } from '@/components'
import { useUserStore } from '../stores/userStore'

const user = useUserStore()
const sidebarOpened = ref(true)
const currentUser = computed(() => user.data)

onMounted(() => {
  user.getUser()
  updateSidebarState()
  window.addEventListener('resize', updateSidebarState)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateSidebarState)
})

function toggleSidebar () {
  sidebarOpened.value = !sidebarOpened.value
}
function updateSidebarState () {
  sidebarOpened.value = window.outerWidth >= 768
}
</script>

<template>
  <div
    class="flex min-h-full sm:p-3 transition-all max-w-[1620px] mx-auto overflow-hidden"
    v-if='currentUser.id'
  >
    <!-- Sidebar -->
    <Transition name="fade" mode="out-in">
      <SidebarAdmin v-if="sidebarOpened" />
    </Transition>
    <!-- / Sidebar -->
    <div class="flex-1 flex flex-col z-1">
      <NavbarAdmin
        @toggle-sidebar="toggleSidebar"
        :class="!sidebarOpened && 'sm:rounded-tl-xl'"
      />
      <!-- Content -->
      <main
        :class="[
          !sidebarOpened && 'sm:rounded-bl-xl',
          'dark:bg-black/50 bg-white flex-1 sm:rounded-br-xl'
        ]"
      >
        <RouterView />
      </main>
      <!-- / Content -->
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s, width 0.6s, padding 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
  width: 0;
  padding: 0;
}
</style>
