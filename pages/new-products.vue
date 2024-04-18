<template>
  <div class="products-id">
    <the-loader :preloader="preloader"></the-loader>
    <div class="products-id__container">
      <ProductObbi
        v-if="products && products.length > 0"
        :products="products"
      />
    </div>
  </div>
</template>

<script>
import {} from "../api/admin.api";
import { GET_PRODUCT_NEW } from "../api/home.api";
export default {
  data() {
    return {
      categories: null,
      limit: 150,
      page: 1,
      paginationCount: null,
      products: null,
      preloader: false,
    };
  },
  async mounted() {
    await this.fetchProductsNew();
    setTimeout(() => {
      this.preloader = false;
    }, 1000);
  },

  methods: {
    async fetchProductsNew() {
      try {
        const { data, status } = await GET_PRODUCT_NEW({
          data: {
            limit: this.limit,
            page: this.page,
          },
        });
        if (status) {
          this.products = data || [];
          this.paginationCount = Math.ceil(data.count / this.limit);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setTimeout(() => {
          this.preloader = false;
        }, 1000);
      }
    },
    async updatePage(p) {
      this.page = p;
      await this.fetchProductsNew();
    },
  },
};
</script>

<style lang="scss" scoped>
.products-id {
  position: relative;
  z-index: 41;
  background-color: #fff;
}
</style>
