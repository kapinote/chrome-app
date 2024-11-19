import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { crx } from '@crxjs/vite-plugin'
import manifest from './manifest.config.mjs'
import resolve from './config/vite/resolve_alias.js'

// https://vitejs.dev/config/
export default defineConfig({
  resolve,
  plugins: [crx({ manifest }), vue()],
  server: {
    port: 5173,
    strictPort: true,
    hmr: { port: 5173 }
  },
  css: {
    preprocessorOptions: {
      scss: { charset: false, api: 'modern' }
    }
  }
})
