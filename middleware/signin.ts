export default defineNuxtRouteMiddleware((to, from) => {
  const token = useCookie('token');
  // signup page can be accessed by anyone
  if (!!token) {
    alert('You are already logged in, click to redirect to home page');
    return navigateTo('/');
  }
});
