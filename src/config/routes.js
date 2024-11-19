import { createMemoryHistory, createRouter } from 'vue-router'

import Home from '@views/home.vue'
import Login from '@views/login.vue'
import Settings from '@views/settings.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/settings', component: Settings }
]

const router = createRouter({
  history: createMemoryHistory(),
  routes
})

export default router
