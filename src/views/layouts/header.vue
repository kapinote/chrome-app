<script setup>
import { useI18n } from 'vue-i18n'
import DarkToggle from '@components/dark-toggle.vue'
import { useUserStore } from '@stores/user/store'
import Logo from '@images/logo/logo.svg'

const userStore = useUserStore()

const locale = useI18n().locale.value.includes('zh') ? 'zh/' : ''
// const closeSidePanel = () => {
//   window.close()
// }

// chrome.runtime.onMessage.addListener((request) => {
//   if (request.action === 'closeSidePanel') {
//     closeSidePanel()
//   }
// })
</script>

<template>
  <header class="header">
    <nav class="nav">
      <template v-if="userStore.isUserSignedIn">
        <router-link to="/" class="logo" aria-label="Logo">
          <div class="flex items-center justify-between gap-2">
            <img class="w-6 h-auto" :src="Logo" alt="logo">
            <span v-t="'title'"></span>
          </div>
        </router-link>
      </template>
      <template v-else>
        <a href="javascript:;" class="logo">
          <div class="flex items-center justify-between gap-2">
            <img class="w-6 h-auto" :src="Logo" alt="logo">
            <span v-t="'title'"></span>
          </div>
        </a>
      </template>

      <div class="flex flex-row items-center gap-1 justify-end">
        <!-- dark toggle -->
        <DarkToggle></DarkToggle>

        <!-- document -->
        <a :href="`https://docs.kapinote.co/${locale}overview`" target="_blank" class="link ">
          <span class="group inline-flex shrink-0 justify-center items-center size-9">
            <svg class="lucide lucide-book-marked size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 2v8l3-3 3 3V2"/><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"/></svg>
          </span>
        </a>

        <!-- settings -->
        <router-link v-if="userStore.isUserSignedIn" to="/settings" class="link ">
          <span class="group inline-flex shrink-0 justify-center items-center size-9">
            <svg class="lucide lucide-settings size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
          </span>
        </router-link>

        <!-- close side-panel -->
        <!-- <a @click="closeSidePanel" class="link cursor-pointer">
          <span class="group inline-flex shrink-0 justify-center items-center size-9">
            <svg class="w-4 h-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </span>
        </a> -->
      </div>
    </nav>
  </header>
</template>
