const path = require('path');

module.exports = {
  mode: 'spa',
  css: ['~/assets/css/tailwind.css'],
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    // '@nuxtjs/eslint-module'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/modules/tree/master/packages/bulma
    // '@nuxtjs/bulma',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/auth'
  ],
  build: {
    postcss: {
      tailwindcss: path.resolve(__dirname, './tailwind.js')
      // preset: {
      //   features: {
      //     customProperties: false
      //   }
      // }
    },
    watch: ['api']
  },
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: '/api/auth/login', method: 'post', propertyName: 'token' }
        }
      }
    }
  },
  serverMiddleware: ['~/api/v1/app.js'],
  "plugins": [
    { src: '~/plugins/notifications', mode: 'client' },
    { src: '~/plugins/axios' }
  ]
}
