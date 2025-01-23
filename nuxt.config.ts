// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  nitro: {
    preset: 'vercel',
    experimental: {
      database: true
    }
  },

  runtimeConfig: {
    public: {
      DEFAULT_CHANNEL: process.env.DEFAULT_CHANNEL,
    },
  },

  modules: ['@pinia/nuxt'],
})