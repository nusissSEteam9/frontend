// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint'],
  ssr: false,
  runtimeConfig: {
    backendProxyUrl: 'http://localhost:8090/api/'
  },
  css: [
    '@/assets/css/global.css',
    '@/assets/css/button.css',
    '@/assets/css/form.css',
    '@/assets/css/navbar.css',
    '@/assets/css/table-columns.css',
    '@/assets/css/user-rating.css',
    'bootstrap-icons/font/bootstrap-icons.css'
  ]
})