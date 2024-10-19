// middleware/auth.ts
import { defineNuxtRouteMiddleware } from 'nuxt/app';
import { useAuthStore } from '~/stores/auth';

export default defineNuxtRouteMiddleware((to, from) => {
  // Redirect to login if not authenticated, home page can be accessed by anyone
  const noAuthRoutes = ['/', '/user/login', '/user/register'];
  const authStore = useAuthStore();
  if (!authStore.token && !noAuthRoutes.includes(to.path)) {
    return navigateTo('/user/login');
  }
});
