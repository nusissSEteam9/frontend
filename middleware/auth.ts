// middleware/auth.ts
import { defineNuxtRouteMiddleware, navigateTo } from 'nuxt/app';
import { useAuthStore } from '~/stores/auth';

export default defineNuxtRouteMiddleware((to, from) => {
  // Redirect to login if not authenticated, home page can be accessed by anyone
  const noAuthRoutes = ['/user/login', '/', '/user/register'];
  if (
    noAuthRoutes.includes(to.path) ||
    to.path.startsWith('/recipe/detail/') ||
    to.path.startsWith('/user/profile/')
  ) {
    return;
  }
  const authStore = useAuthStore();
  console.log('authStore', authStore);
  if (!authStore || !authStore.token) {
    return navigateTo('/login');
  }
});
