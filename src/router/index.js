import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AntojitosCentro from '../views/MenuViews/AntojitosCentro.vue'
import prueba from '@/views/MenuViews/prueba.vue'
import Flip from '@/components/Flip.vue'
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
    {
      path: '/prueba',
      name: 'prueba',
      component: prueba,
    },
    {
      path: '/flip',
      name: 'flip',
      component: Flip,
    },
  ],
})

export default router
