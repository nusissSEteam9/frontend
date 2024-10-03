// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint'],
  ssr: false,
  runtimeConfig: {
    backendProxyUrl: 'http://localhost:8090/api/'
  },
  /* bootstrap css */
  css: ['~/assets/scss/styles.scss'],
  build: {
    transpile: ['bootstrap']
  },
  plugins: ['~/plugins/bootstrap.client.ts'],
  devServer: {
    port: 3333
  },

})