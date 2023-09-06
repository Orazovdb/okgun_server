import tm from './locales/tm'
import ru from './locales/ru'
import en from './locales/en'
export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head() {
    const i18nHead = this.$nuxtI18nHead({ addSeoAttributes: true })
    return {
      titleTemplate: '%s | Okgun',
      title: 'Okgun',
      htmlAttrs: {
        lang: 'en',
        myAttribute: 'okgun',
        ...i18nHead.htmlAttrs
      },
      meta: [
        { charset: 'utf-8' },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0'
        },
        { property: 'og:title', content: 'Okgun' },
        {
          name: 'author',
          content: 'Salam H.J developers: Esenmyradov Dayanc, Durdyyev Oraz, Bayramov Muhammetmyrat, designer: Illiyeva Tavus'
        },
        {
          itemprop: 'og:image:width',
          content: `1350`
        },
        {
          itemprop: 'og:image:height',
          content: `1000`
        },
        { name: 'format-detection', content: 'telephone=no' },
        //  { name: "yandex-verification", content: "a375551a12b0183c" },
        //  {
        //    name: "google-site-verification",
        //    content: "q1L3TpCQFxZhbxjqCJX41Xvod0DiuZI0ElTHiF3Vh7A",
        //  },
        { name: 'theme-color', content: '#F00' },
        { name: 'msapplication-navbutton-color', content: '#F00' },
        { name: 'apple-mobile-web-app-status-bar-style', content: '#F00' },
        { name: 'msapplication-TileColor', content: '#F00' },
        { name: 'application-name', content: 'Okgun' },
        { name: 'msapplication-tooltip', content: 'Okgun' },
        { name: 'mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-title', content: 'Okgun' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        ...i18nHead.meta
      ],
      link: [
        { rel: 'icon', type: '/logo.svg', href: '/logo.svg' },
        { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/@ajusa/lit@1.0.0/dist/lit.css' },
        ...i18nHead.link
      ]
    }
  },

  server: {
    port: 3030,
    host: '0.0.0.0'
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/css/style.css', '@/assets/css/style.scss', '@/assets/css/grid.scss', 'aos/dist/aos.css'],

  loading: {
    color: 'red',
    height: '2px'
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '@/plugins/vue-awesome-swiper', mode: 'client' },
    { src: '@/plugins/aos.client', ssr: false }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: {
    dirs: ['@/components', '@/components/base']
  },
  ssr: true,
  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/i18n',
    'cookie-universal-nuxt'
  ],

  i18n: {
    locales: [
      {
        code: 'tm',
        lang: 'TM',
        name: 'TM',
        iso: 'tm-TM',
        file: 'tm',
        isCatchallLocale: true
      },
      { code: 'ru', lang: 'RU', name: 'RU', iso: 'ru-RU', file: 'ru' },
      { code: 'en', lang: 'EN', name: 'EN', iso: 'en-EN', file: 'en' }
    ],
    defaultLocale: 'tm',
    seo: true,
    vueI18n: {
      fallbackLocale: 'tm',
      messages: { tm, ru, en }
    }
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  env: {
    baseURL: process.env.baseURL
  },
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: process.env.baseURL,
    retry: true
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    vendor: ['aos']
  }
}
