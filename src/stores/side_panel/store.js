import { defineStore } from 'pinia'
import { useStorageStore } from '@stores/storage/store'

export const useSidePanelStore = defineStore('stores/side_panel/store', {
  state: () => {
    return {
      themeEl: null,
      theme: 'light',
      loading: true
    }
  },

  actions: {
    initTheme() {
      const hsTheme = useStorageStore().hsTheme
      this.theme = hsTheme || 'light'

      this.themeEl = document.documentElement
      this.applyTheme()
    },

    toggleThemeMode() {
      this.theme = this.theme === 'dark' ? 'light' : 'dark'

      useStorageStore().assignData('hsTheme', this.theme)
      this.applyTheme()
    },

    applyTheme() {
      const isLightOrAuto = this.theme === 'light' || (this.theme === 'auto' && !window.matchMedia('(prefers-color-scheme: dark)').matches)
      const isDarkOrAuto = this.theme === 'dark' || (this.theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches)

      if (isLightOrAuto) {
        this.themeEl.classList.remove('dark')
        this.themeEl.classList.add('light')
      } else if (isDarkOrAuto) {
        this.themeEl.classList.remove('light')
        this.themeEl.classList.add('dark')
      }
    }
  },

  getters: {
    isLoading: (state) => !!state.loading
  }
})
