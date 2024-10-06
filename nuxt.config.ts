// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint'],
  ssr: false,
  runtimeConfig: {
    backendProxyUrl: 'http://localhost:8080/api/'
  },
  css: [
    '@/assets/css/global.css',
    'bootstrap-icons/font/bootstrap-icons.css'
  ]
})