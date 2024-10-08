// middleware/auth.ts
import { defineNuxtRouteMiddleware, navigateTo } from 'nuxt/app';
import { useAuthStore } from '~/stores/auth';

export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();
  // Redirect to login if not authenticated, home page can be accessed by anyone
  const noAuthRoutes = ['/login', '/', '/register'];
  if (
    noAuthRoutes.includes(to.path) ||
    to.path.startsWith('/recipe/detail/') ||
    to.path.startsWith('/user/profile/')
  ) {
    return;
  }
  if (!authStore || !authStore.token) {
    return navigateTo('/login');
  }
});
