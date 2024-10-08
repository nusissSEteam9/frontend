// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@pinia/nuxt'],
  ssr: false,
  runtimeConfig: {
    public: {
      backendProxyUrl: process.env.NUXT_BACKEND_PROXY_URL,
    },
  },
  pinia: {
    storesDirs: ['~/stores/**'],
  },
  css: ['@/assets/css/global.css', 'bootstrap-icons/font/bootstrap-icons.css'],
});
