import { defineStore } from 'pinia'
import { dataState } from '@services/storages/data'

export const useStorageStore = defineStore('stores/storage/store', {
  state: () => {
    return {
      data: null
    }
  },

  actions: {
    async initData() {
      const storageData = await dataState.get()
      this.data = storageData || {}
    },

    async assignData(key, value) {
      this.data[key] = value
      await dataState.update({ [key]: value })
      return !!(await dataState.get())[key]
    },

    async clearData() {
      this.data = {}
      await dataState.set({})
    }
  },

  getters: {
    userInfo: (state) => state.data?.userInfo,
    userProfile: (state) => state.data?.userInfo?.userProfile,
    oauthToken: (state) => state.data?.userInfo?.oauthToken,
    hsTheme: (state) => state.data?.hsTheme || 'light',
    editorContent: (state) => state.data?.editorContent || ''
  }
})
