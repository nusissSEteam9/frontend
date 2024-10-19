export default defineNuxtRouteMiddleware((to, from) => {
  const token = useCookie('token');
  // signup page can be accessed by anyone
  if (to.path === '/user/login' || to.path === '/user/register') {
    if (token.value) {
      alert('You are already logged in');
      return navigateTo('/');
    }
  }
  // Redirect to login if not authenticated, home page can be accessed by anyone
  else if (!token.value && to.path !== '/') {
    alert('You need to login to access this page');
    return navigateTo('/user/login');
  }
});
