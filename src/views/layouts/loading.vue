<script setup>
import { onMounted } from 'vue'
import { useSidePanelStore } from '@stores/side_panel/store'
import { useStorageStore } from '@stores/storage/store'
import { useUserStore } from '@stores/user/store'
import Logo from '@images/logo/logo.svg'

const storageStore = useStorageStore()
const sidePanelStore = useSidePanelStore()

onMounted(async () => {
  await storageStore.initData()

  // authenticate User
  useUserStore().authenticateUser()

  // theme
  sidePanelStore.initTheme()

  setTimeout(() => {
    sidePanelStore.loading = false
  }, 1000)
})
</script>

<template>
  <div id="loading">
    <div class="content">
      <div class="flex items-center">
        <img :src="Logo" alt="Logo" class="size-6" />
        <h1 v-t="'title'" class="text-xl font-bold ml-2 dark:text-white"></h1>
      </div>
      <div class="flex justify-center items-center">
        <div class="animate-spin">
          <svg class="size-6 text-main-color dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
        </div>
      </div>
    </div>
  </div>
</template>
