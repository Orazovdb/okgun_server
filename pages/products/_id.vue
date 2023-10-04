<template>
  <div class="products-id">
    <the-loader :preloader="preloader"></the-loader>
    <div class="products-id__container">
      <ProductObbi
        v-if="products && products.length > 0"
        :products="products"
        :category="categories?.find((category) => category.uuid === $route.params.id)"
      />
    </div>
  </div>
</template>

<script>
  import { GET_CATEGORIES, GET_PRODUCT } from '@/api/home.api'
  export default {
    data() {
      return {
        categories: null,
        limit: 150,
        page: 1,
        paginationCount: null,
        products: null,
        preloader: false
      }
    },
    async fetch() {
      await this.fetchCategories()
      await this.fetchCategoryProducts()
    },
    methods: {
      async fetchCategories() {
        this.preloader = true

        try {
          const { data, status } = await GET_CATEGORIES()
          if (status) {
            this.categories = data || []
            if (data && data.length > 0) {
              this.categories = data
            }
          }
        } catch (error) {
          console.log(error)
        }
      },
      async fetchCategoryProducts() {
        try {
          const { data, status } = await GET_PRODUCT({
            data: {
              uuid: this.$route.params.id,
              limit: this.limit,
              page: this.page
            }
          })
          if (status) {
            this.products = data.products || []
            this.paginationCount = Math.ceil(data.count / this.limit)
          }
        } catch (error) {
          console.log(error)
        } finally {
          setTimeout(() => {
            this.preloader = false
          }, 1500)
        }
      },
      async updatePage(p) {
        this.page = p
        await this.fetchCategoryProducts()
      }
    }
  }
</script>

<style lang="scss" scoped></style>
