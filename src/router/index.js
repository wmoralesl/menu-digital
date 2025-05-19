import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import menu from '../views/AboutView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/menu',
      name: 'menu',
      component: menu,
    },
  ],
})

export default router
