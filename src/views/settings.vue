<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useUserStore } from '@stores/user/store'
import packageJson from '@root/package.json'
const { version } = packageJson

const userProfile = computed(() => useUserStore().currentUser)
const locale = useI18n().locale.value.includes('zh') ? 'zh/' : ''

const onSignOut = () => {
  useUserStore().signOut()
}
</script>

<template>
  <div class="max-w-md mx-auto p-4 flex flex-col min-h-[calc(100vh-64px)] space-y-4">
    <div v-if="userProfile" class="flex-grow">
      <div class="w-full py-0 px-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-neutral-800 dark:border-none">
        <div class="flow-root">
          <ul role="list">
            <li class="py-3 sm:py-4">
              <div class="flex items-center">
                <span class="mr-4">
                  <svg class="size-10" viewBox="0 0 36 36" fill="none" role="img" xmlns="http://www.w3.org/2000/svg" width="80" height="80"><mask id=":rjp:" maskUnits="userSpaceOnUse" x="0" y="0" width="36" height="36"><rect width="36" height="36" rx="72" fill="#FFFFFF"></rect></mask><g mask="url(#:rjp:)"><rect width="36" height="36" fill="#ff005b"></rect><rect x="0" y="0" width="36" height="36" transform="translate(-5 9) rotate(189 18 18) scale(1)" fill="#ffb238" rx="36"></rect><g transform="translate(-5 4.5) rotate(-9 18 18)"><path d="M13,19 a1,0.75 0 0,0 10,0" fill="#000000"></path><rect x="10" y="14" width="1.5" height="2" rx="1" stroke="none" fill="#000000"></rect><rect x="24" y="14" width="1.5" height="2" rx="1" stroke="none" fill="#000000"></rect></g></g></svg>
                </span>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                    {{ userProfile.name }}
                  </p>
                  <p class="text-sm text-gray-500 truncate font-mono dark:text-gray-400">
                    {{ userProfile.email }}
                  </p>
                </div>
                <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                  <template v-if="userProfile.role === 'premium'">
                    <div class="badge badge-violet font-mono">{{ $t('setup.roles.premium') }}</div>
                  </template>
                  <template v-else-if="userProfile.role === 'basic'">
                    <div class="badge badge font-mono">{{ $t('setup.roles.basic') }}</div>
                  </template>
                  <template v-else-if="userProfile.role === 'whitelist'">
                    <div class="badge badge font-mono">{{ $t('setup.roles.whitelist') }}</div>
                  </template>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="space-y-4">
      <button @click="onSignOut" v-t="'setup.sign_out'" class="btn w-full"></button>

      <div class="flex items-center justify-end text-neutral-600 dark:text-neutral-400">
        <a :href="`https://docs.kapinote.co/${locale}versions#v${version}`" class="font-mono" target="_blank">v{{ version }}</a>
      </div>
    </div>
  </div>
</template>
