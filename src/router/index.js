import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue';

const routes = [
  { path: '/', name: 'login', component: Login },
  { path: '/signup', name: 'signup', component: () => import('../views/Signup.vue') },
  { path: '/home', name: 'home', component: () => import('../views/Home.vue') },
  { path: '/contactos', name: 'contactos', component: () => import('../views/Contactos.vue') },
  { path: '/ventas', name: 'facturas', component: () => import('../views/Facturas.vue') },
  { path: '/facturas-recurrentes', name: 'facturas-recurrentes', component: () => import('../views/Facturas_Recurrentes.vue') },
  { path: '/cotizaciones', name: 'cotizaciones', component: () => import('../views/Cotizaciones.vue') },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// Middleware global para proteger rutas
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('token'); 

  if (to.name === 'signup') {
    next();
  } else if (to.name !== 'login' && !isAuthenticated) {
    next({ name: 'login' });
  } else if (to.name === 'login' && isAuthenticated) {
    next({ name: 'home' });
  } else {
    next();
  }
});

export default router;
