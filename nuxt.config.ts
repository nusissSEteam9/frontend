// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@pinia/nuxt'],
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Healthy Recipe',
    },
  },
  ssr: false,
  runtimeConfig: {
    public: {
      backendProxyUrl: process.env.NUXT_BACKEND_PROXY_URL,
    },
  },
  pinia: {
    storesDirs: ['~/stores/**'],
  },
  plugins: ['~/plugins/imageSelector.js'],
  css: ['@/assets/css/global.css', 'bootstrap-icons/font/bootstrap-icons.css'],
});
