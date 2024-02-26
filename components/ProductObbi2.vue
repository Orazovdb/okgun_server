<template>
  <div class="product-id">
    <div class="product-id__title"></div>
    <div class="product-id__row">
      <div
        class="product-id__item"
        v-for="product in products"
        :key="product.uuid"
        :product="product"
      >
        <div class="product-id__image">
          <!-- <img loading="lazy" :data-src="`${baseURL}/${product.image_path}`" /> -->
          <img :src="`${baseURL}/${product.image_path}`" alt="" />
        </div>
        <h4>{{ translateTitle(product) }}</h4>
        <h5>{{ translateDescription(product) }}</h5>
        <div class="product-id__item-about">
          <span class="bold">{{ $t("weight") }}:</span>
          <span>{{ product.weight }}</span>
        </div>
        <div class="product-id__item-about">
          <span class="bold">{{ $t("srok") }}:</span>
          <span>{{ product.srok }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import observer from "@/mixins/observer";
import translate from "@/mixins/translate";

import { mapGetters } from "vuex";
export default {
  mixins: [translate, observer],
  props: {
    products: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    ...mapGetters(["baseURL"]),
  },
};
</script>

<style lang="scss" scoped>
.product-id {
  margin: 40px 0 100px;
  h2 {
    color: var(--text);
    font-size: 60px;
    font-weight: 900;
    line-height: 120%;
    @media (max-width: 767px) {
      font-size: 30px;
    }
  }
  span {
    color: var(--text);
    font-size: 40px;
    font-weight: 500;
    line-height: 120%;
    @media (max-width: 767px) {
      font-size: 24px;
    }
  }

  &__title {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    margin-bottom: 50px;
    @media (max-width: 767px) {
      margin-bottom: 30px;
      gap: 10px;
    }
  }

  &__row {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 40px;
    @media (max-width: 767px) {
      grid-template-columns: repeat(2, 1fr);
      gap: 20px;
    }
    @media (max-width: 479px) {
      grid-template-columns: repeat(1, 1fr);
      gap: 20px;
    }
  }

  &__item {
    background: #f7f7f7;
    border-radius: 16px;
    padding: 0;
    display: flex;
    flex-direction: column;
    h4 {
      color: var(--text);
      font-size: 19px;
      font-weight: 900;
      line-height: 111%;
      margin-bottom: 4px;
    }
    h5 {
      color: var(--text);
      font-size: 16px;
      font-weight: 400;
      line-height: 120%;
      margin-bottom: 10px;
      flex: 1 1 auto;
    }
    @media (max-width: 767px) {
      padding: 4px;
      h4 {
        font-size: 20px;
      }
      h5 {
        margin-bottom: 14px;
        font-size: 16px;
      }
    }
  }

  &__image {
    width: 90%;
    height: 260px;
    margin: 0 auto;
    margin-bottom: 10px;
    background-size: 180px;
    position: relative;
    z-index: 30;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      position: absolute;
      z-index: 3;
    }
    @media (max-width: 767px) {
      margin-bottom: 20px;
      width: 100%;
    }
  }

  &__item-about {
    display: flex;
    gap: 6px;
    span {
      color: #3e3e3e;
      font-size: 18px;
      line-height: 120%;
      font-weight: 600;
      font-family: Arial, Helvetica, sans-serif !important;
      &:first-child {
        font-weight: 500;
        font-size: 18px;
      }
      @media (max-width: 767px) {
        font-size: 15px;
        &:first-child {
          font-size: 16px;
        }
      }
    }
  }
}
</style>
