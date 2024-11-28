import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue';

const routes = [
  { path: '/', name: 'login', component: Login },
  { path: '/signup', name: 'signup', component: () => import('../views/Signup.vue') },
  { path: '/home', name: 'home', component: () => import('../views/Home.vue') },
  { path: '/contactos', name: 'contactos', component: () => import('../views/Contactos.vue') },
  { path: '/ventas', name: 'ventas', component: () => import('../views/Ventas.vue') },
];


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
