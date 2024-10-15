import { useAuthStore } from '~/stores/auth';
export default defineNuxtRouteMiddleware((to, from) => {
  // signup page can be accessed by anyone
  const authStore = useAuthStore();
  if (!!authStore.token) {
    alert('You are already logged in, click to redirect to home page');
    return navigateTo('/');
  }
});
