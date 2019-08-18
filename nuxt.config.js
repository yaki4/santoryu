const pkg = require('./package')


module.exports = {
  mode: 'spa',
  webfontloader: {
    google: {
      families: ['M PLUS 1p:900'] //Loads Lato font with weights 400 and 700
    },
    active() {
      window._fontsAreLoaded = true
    },
    loading: () => {
      window._fontsAreLoading = true
    }
  },
  /*
  ** Headers of the page
  */
  head: {
    title: 'Renaud ROHLINGER',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { theme_color: '#111111' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/png', size: '16x16', href: '/oni.ico' },
      { rel: 'icon', type: 'image/png', size: '32x32', href: '/oni.ico' }
    ],
    script: [
      { async: true, src: '/js/anime.min.js'},
      { async: true, src: 'https://www.googletagmanager.com/gtag/js?id=UA-52019876-2'},
      { src: '/js/ga.js' }
    ]
  },
  loadingIndicator: {
    name: 'loading.html'
  },
  /*
  ** Customize the progress-bar color
  */
  manifest: {
    name: 'Portfolio Renaud',
    short_name: 'Renaud',
    display: 'standalone',
    theme_color: '#111',
    background_color: '#FFF',
    lang: 'en',
    icons: [
      // {
      //   "src": "/img/icon-192x192.png",
      //   "sizes": "192x192",
      //   "type": "image/png"
      // },
      // {
      //   "src": "/img/icon-512x512.png",
      //   "sizes": "512x512",
      //   "type": "image/png"
      // }
    ]
  },
  /*
  ** Global CSS
  */
  css: [
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/pwa',
    'nuxt-webfontloader',
    ['@nuxtjs/google-analytics', {
      id: 'UA-XXXXXXXX-X'
    }]
  ],
  googleAnalytics: {
    id: 'UA-XXXXXXXX-X',
    autoTracking: {
      screenview: true
    }
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      config.module.rules.push(
        {
          test: /\.(glsl|vs|fs|vert|frag)$/,
          exclude: /node_modules/,
          use: [
            'raw-loader',
            'glslify-loader'
          ]
        }
      )
    }
  }
}
