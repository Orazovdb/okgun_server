<template>
  <client-only>
    <div>
      <the-loader :preloader="preloader"></the-loader>
      <the-banner :sliders="sliders" />
      <the-products :categories="categories" :products="products" @categoryProducts="getCategoryProducts" :catalogs="catalogs" />
      <the-about :aboutUs="aboutUs && aboutUs[0]" />
      <the-partners :services="services" />
    </div>
  </client-only>
</template>

<script>
  import { GET_SLIDER, GET_CATALOG, GET_SERVICES, GET_CATEGORIES, GET_ABOUTUS, GET_CATEGORIES_PRODUCTS } from '@/api/home.api'
  export default {
    name: 'IndexPage',
    head() {
      return {
        title: this.$t('home'),
        meta: [
          {
            name: 'content-type',
            content: 'homepage'
          },
          {
            name: 'keywords',
            content: this.$t('keywords')
          }
        ]
      }
    },
    data() {
      return {
        sliders: null,
        catalogs: null,
        aboutUs: null,
        services: null,
        categories: null,
        products: null,
        limit: 10,
        page: 1,
        preloader: false
      }
    },

    async fetch() {
      await this.fetchSlider()
      await this.fetchCatalog()
      await this.fetchServices()
      await this.fetchCategories()
      await this.fetchAboutUs()
    },
    methods: {
      async fetchSlider() {
        this.preloader = true
        try {
          const { data, status } = await GET_SLIDER()

          if (status) {
            this.sliders = data || []
          }
        } catch (error) {
          console.log(error)
        }
      },
      async fetchCatalog() {
        try {
          const { data, status } = await GET_CATALOG()
          if (status) {
            this.catalogs = data || []
          }
        } catch (error) {
          console.log(error)
        }
      },
      async fetchAboutUs() {
        try {
          const { data, status } = await GET_ABOUTUS()
          if (status) {
            this.aboutUs = data || []
          }
        } catch (error) {
          console.log(error)
        } finally {
          setTimeout(() => {
            this.preloader = false
          }, 1000)
        }
      },
      async fetchServices() {
        try {
          const { data, status } = await GET_SERVICES()
          if (status) {
            this.services = data || []
          }
        } catch (error) {
          console.log(error)
        }
      },
      async fetchCategories() {
        try {
          const { data, status } = await GET_CATEGORIES()
          if (status) {
            this.categories = data || []
            if (data && data.length > 0) {
              await this.getCategoryProducts(data[0].uuid)
            }
          }
        } catch (error) {
          console.log(error)
        }
      },
      async getCategoryProducts(id) {
        try {
          const { data, status } = await GET_CATEGORIES_PRODUCTS({
            params: {
              id: id,
              l: this.limit,
              p: this.page
            }
          })
          if (status) {
            this.products = data.products || []
          }
        } catch (error) {
          console.log(error)
        }
      }
    }
  }
</script>
