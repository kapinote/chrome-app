import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import { getOauthToken, getUserProfile } from '@services/kapi'
import { useStorageStore } from '@stores/storage/store'

export const useUserStore = defineStore('stores/user/store', {
  state: () => {
    return {
      router: useRouter()
    }
  },

  actions: {
    async signIn(bearerToken) {
      const userInfo = {}

      userInfo.oauthToken = {
        bearer_token: `Bearer ${bearerToken}`
      }

      const isUpdateUserProfile = await this.updateUserProfile(userInfo)
      return isUpdateUserProfile
    },

    signOut() {
      useStorageStore().clearData()
      return this.router.push('/login')
    },

    authenticateUser() {
      if (!this.isUserSignedIn) {
        return this.router.push('/login')
      }

      const userInfo = useStorageStore().userInfo
      this.updateUserProfile(userInfo)
    },

    async updateUserProfile(userInfo) {
      const userProfile = await getUserProfile(userInfo.oauthToken.bearer_token)
      if (userProfile.code) {
        useStorageStore().clearData()
        return this.router.push('/login')
      }

      userInfo.userProfile = userProfile

      const isUpdateUserInfo = await useStorageStore().assignData('userInfo', userInfo)
      return isUpdateUserInfo
    }
  },

  getters: {
    isUserSignedIn: (state) => !!useStorageStore().userInfo,
    currentUser: (state) => useStorageStore().userProfile
  }
})
