<template>
  <div class="products-id">
    <the-loader :preloader="preloader"></the-loader>
    <div class="products-id__container">
      <ProductObbi :products="products" />
    </div>
  </div>
</template>

<script>
import { GET_ALL_PRODUCTS } from "@/api/home.api";
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
    await this.fetchCategoryProducts();
    setTimeout(() => {
      this.preloader = false;
    }, 1000);
  },
  methods: {
    async fetchCategoryProducts() {
      try {
        const { data, status } = await GET_ALL_PRODUCTS({
          data: {
            limit: this.limit,
            page: this.page,
          },
        });
        console.log(data);
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
      await this.fetchCategoryProducts();
    },
  },
};
</script>

<style lang="scss" scoped></style>
