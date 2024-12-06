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
  const isAuthenticated = localStorage.getItem('token'); // Verifica si el usuario tiene un token válido

  if (to.name === 'signup') {
    // Permitir siempre el acceso a la página de registro
    next();
  } else if (to.name !== 'login' && !isAuthenticated) {
    // Si no está autenticado y no está en login, redirige al login
    next({ name: 'login' });
  } else if (to.name === 'login' && isAuthenticated) {
    // Si está autenticado y quiere ir al login, redirige al home
    next({ name: 'home' });
  } else {
    // Permitir la navegación
    next();
  }
});

export default router;
