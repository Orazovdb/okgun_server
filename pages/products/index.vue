<template>
  <div class="products">
    <the-loader :preloader="preloader"></the-loader>
    <div class="products__container">
      <the-products-page
        :categories="categories"
        :products="products"
        @categoryProducts="getCategoryProducts"
        :catalogs="catalogs"
      />
      <base-pagination
        v-if="paginationCount > 1"
        :modelValue="page"
        @clickPage="(pagination) => updatePage(pagination)"
        :pageCount="paginationCount"
      ></base-pagination>
    </div>
  </div>
</template>

<script>
import {
  GET_CATALOG,
  GET_CATEGORIES,
  GET_CATEGORIES_PRODUCTS,
} from "@/api/home.api";
import translate from "@/mixins/translate";
import { mapGetters } from "vuex";
export default {
  mixins: [translate],
  head() {
    return {
      title: this.$t("products"),
      meta: [
        {
          name: "content-type",
          content: "products",
        },
        {
          name: "keywords",
          content: this.$t("keywords"),
        },
      ],
    };
  },
  data() {
    return {
      selectedId: null,
      categories: null,
      products: null,
      catalogs: null,
      limit: 10,
      page: 1,
      paginationCount: 0,
      preloader: false,
    };
  },
  async fetch() {
    await Promise.all([this.fetchCatalog(), this.fetchCategories()]);
  },
  computed: {
    ...mapGetters(["baseURL"]),
  },
  mounted() {
    setTimeout(() => {
      this.preloader = false;
    }, 1000);
  },
  methods: {
    async fetchCatalog() {
      this.preloader = true;
      try {
        const { data, status } = await GET_CATALOG();
        if (status) {
          this.catalogs = data || [];
        }
      } catch (error) {
        console.log(error);
      } finally {
        setTimeout(() => {
          this.preloader = false;
        }, 1000);
      }
    },
    async fetchCategories() {
      try {
        const { data, status } = await GET_CATEGORIES();
        if (status) {
          this.categories = data || [];
          if (data && data.length > 0) {
            await this.getCategoryProducts(data[0].uuid);
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
    async getCategoryProducts(id) {
      try {
        const { data, status } = await GET_CATEGORIES_PRODUCTS({
          params: {
            id: id,
            l: this.limit,
            p: this.page,
          },
        });
        if (status) {
          this.paginationCount = Math.ceil(data.count / this.limit);
          this.products = data.products || [];
        }
      } catch (error) {
        console.log(error);
      }
    },
    async categoryProducts(item) {
      this.selectedId = item.uuid;
      await this.getCategoryProducts(item.uuid);
    },
    async updatePage(p) {
      this.page = p;
      await this.getCategoryProducts(this.selectedId);
    },
  },
};
</script>

<style lang="scss" scoped>
.products {
  margin: 70px 0 100px 0;
  @media (max-width: 767px) {
    margin-top: 40px;
    margin-bottom: 40px;
  }
  &__container {
  }

  &__row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 150px;
    @media (max-width: 767px) {
      grid-template-columns: repeat(2, 1fr);
      gap: 20px;
    }
  }
}
.product {
  margin-bottom: 20px;
  p {
    margin-top: 20px;
    color: var(--text);
    text-align: center;
    font-size: 22px;
    font-weight: 600;
    line-height: 120%;
    letter-spacing: 1px;
    @media (max-width: 767px) {
      font-size: 14px;
      margin-top: 16px;
      font-weight: 700;
    }
  }

  &__image {
    width: calc(100% - 30%);
    height: 350px;
    transform: translateY(-10%);
    margin: auto auto;
    position: relative;
    display: flex;
    justify-content: center;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      object-position: center;
    }
    &:before {
      content: "";
      position: absolute;
      left: -65%;
      top: 10%;
      background-color: #f5f5f5;
      width: calc(100% + 30%);
      height: 100%;
      border-radius: 50%;
      z-index: -1;
      box-shadow: 0.1px 0.1px 10px #d5d5d5;
      transform: translateX(38%);
    }
    @media (max-width: 767px) {
      height: 180px;
    }
  }
}
.products-title-block {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
  h1 {
    color: var(--text);
    font-size: 50px;
    font-weight: 900;
    line-height: 120%;
    transition: 0.1s ease 0s;
  }
  span {
    color: var(--text);
    font-size: 16px;
    font-weight: 800;
    line-height: 120%;
    transition: 0.1s ease 0s;

    &:deep(svg) {
      width: 24px;
      height: 24px;
      color: var(--text);
    }
  }
  @media (max-width: 767px) {
    margin-bottom: 15px;
    h1 {
      font-size: 30px;
    }
    span {
      font-size: 12px;
      &:deep(svg) {
        width: 18px;
        height: 18px;
      }
    }
  }
}
.products-buttons-block {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 60px;
  @media (max-width: 767px) {
    margin-bottom: 50px;
  }
  &__button {
    text-align: center;
    font-size: 18px;
    font-weight: 900;
    line-height: 33.6px;
    letter-spacing: 1px;
    padding: 6px 30px;
    border-radius: 30px;
    background-color: transparent;
    transition: 0.1s ease 0s;
    cursor: pointer;
    &:hover {
      transform: scale(1.04);
    }
    &:active {
      background: var(--primary);
      color: #fff;
    }
    &.active {
      background: var(--primary);
      color: #fff;
      transform: scale(1);
    }
  }
  @media (max-width: 767px) {
    width: 100%;
    overflow-x: auto;
    padding-bottom: 6px;
    gap: 0;
    &::-webkit-scrollbar {
      width: 3px;
      height: 3px;
    }

    &::-webkit-scrollbar-track {
      background-color: #d5d5d5;
    }

    &::-webkit-scrollbar-thumb {
      background: var(--primary);
      border-radius: 3px;
    }
    &__button {
      padding: 2px 12px;
      font-size: 12px;
      white-space: nowrap;
    }
  }
}
</style>
