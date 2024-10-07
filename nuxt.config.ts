// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint'],
  ssr: false,
  runtimeConfig: {
    backendProxyUrl: process.env.NUXT_BACKEND_PROXY_URL,
  },
  css: ['@/assets/css/global.css', 'bootstrap-icons/font/bootstrap-icons.css'],
});
