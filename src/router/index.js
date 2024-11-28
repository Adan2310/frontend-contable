import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue';

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login,
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('../views/Signup.vue'),
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/Home.vue'), // Home en lugar de Dashboard
  },
  {
    path: '/contactos',
    name: 'contactos',
    component: () => import('../views/Contactos.vue'),
  },
  {
    path: '/cotizaciones',
    name: 'cotizaciones',
    component: () => import('../views/Cotizaciones.vue'),
  },
  {
    path: '/facturas',
    name: 'facturas',
    component: () => import('../views/Facturas.vue'),
  },
  {
    path: '/facturas-recurrentes',
    name: 'facturas-recurrentes',
    component: () => import('../views/Facturas_Recurrentes.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
