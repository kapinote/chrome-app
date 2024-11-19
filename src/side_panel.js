import '@stylesheets/side_panel.tailwind.scss'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from '@config/routes'
import I18n from '@commons/i18n'
import SidePanelApp from './sidePanelApp.vue'

createApp(SidePanelApp).use(createPinia()).use(router).use(I18n).mount('#app')
