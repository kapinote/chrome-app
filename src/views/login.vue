<script setup>
import { useRouter } from 'vue-router'
import { useUserStore } from '@stores/user/store'
import Logo from '@images/logo/logo.svg'
const kapiOAuthUrl = import.meta.env.VITE_KAPI_CONSOLE_URL
const kapiClientId = import.meta.env.VITE_KAPI_CLIENT_ID

const userStore = useUserStore()
const router = useRouter()

const onLogin = async () => {
  const token = await authenticate()
  if (token) {
    const isSignIn = await userStore.signIn(token)
    if (isSignIn) router.push('/')
  }
}

const authenticate = async () => {
  const redirect_uri = chrome.identity.getRedirectURL('/oauth/callback')

  const authURL = `${kapiOAuthUrl}/oauth/authorize?client_id=${kapiClientId}&redirect_uri=${encodeURIComponent(redirect_uri)}&response_type=token&scope=read write`

  try {
    const redirectURL = await chrome.identity.launchWebAuthFlow({ url: authURL, interactive: true })

    const url = new URL(redirectURL)
    const hash = url.hash.substring(1)
    const params = new URLSearchParams(hash)
    return params.get('access_token')
  } catch (error) {
    console.error('launchWebAuthFlow failed:', error)
    // throw error;
  }
}
</script>

<template>
  <div id="login">
    <div class="content">
      <!-- Logo -->
      <div class="flex justify-center items-center mb-4">
        <img :src="Logo" alt="Logo" class="size-6" />
        <h1 v-t="'title'" class="text-xl font-bold ml-2 dark:text-white"></h1>
      </div>

      <div class="card mx-4">
        <div class="card-body text-center">
          <h1 v-t="'login.welcome'" class="text-xl font-bold mb-2 dark:text-white"></h1>
          <h3 v-t="'login.description'" class="text-sm text-gray-500"></h3>

          <!-- google login -->
          <button @click="onLogin" class="btn-google mt-6" type="button">
            <img :src="Logo" alt="Logo" class="size-6" />
            <span v-t="'login.sign_in_with_kapi_note'"></span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
