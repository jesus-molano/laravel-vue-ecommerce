<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { SidebarAdmin, NavbarAdmin } from '@/components'

const sidebarOpened = ref(true)

onMounted(() => {
  handleSidebarOpened()
  window.addEventListener('resize', handleSidebarOpened)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleSidebarOpened)
})

function toggleSidebar () {
  sidebarOpened.value = !sidebarOpened.value
}
function handleSidebarOpened () {
  sidebarOpened.value = window.outerWidth >= 768
}
</script>

<template>
  <div
    class="flex min-h-full sm:p-3 transition-all max-w-[1620px] mx-auto overflow-hidden"
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
