import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AntojitosCentro from '../views/AntojitosCentro.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/antojitoselcentro',
      name: 'antojitoscentro',
      component: AntojitosCentro,
    },
  ],
})

export default router
