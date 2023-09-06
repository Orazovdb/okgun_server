<template>
  <div class="product-id">
    <div class="product-id__title">
      <h2>{{ translateTitle(category) }}</h2>
      <span>{{ $t("productsCatalog") }}</span>
    </div>
    <div class="product-id__row">
      <div
        class="product-id__item"
        v-for="product in products"
        :key="product.uuid"
        :product="product"
      >
        <div class="product-id__image">
          <img
            :src="`${baseURL}/uploads/products/${product.image_path}`"
            alt="img"
          />
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
import translate from "@/mixins/translate";
import { mapGetters } from "vuex";
export default {
  mixins: [translate],
  props: {
    products: {
      type: Array,
      default: () => [],
    },
    category: {
      type: Object,
      default: () => null,
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
    padding: 30px;
    h4 {
      color: var(--text);
      font-size: 22px;
      font-weight: 900;
      line-height: 120%;
    }
    h5 {
      color: var(--text);
      font-size: 18px;
      font-weight: 400;
      line-height: 120%;
      margin-bottom: 18px;
    }
    @media (max-width: 767px) {
      padding: 20px;
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
    margin: 0 auto;
    margin-bottom: 16px;
    img {
      width: 100%;
      height: 100%;
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
      font-size: 22px;
      line-height: 120%;
      font-weight: 600;
      &:first-child {
        font-weight: 400;
        font-size: 20px;
      }
      @media (max-width: 767px) {
        font-size: 18px;
        &:first-child {
          font-size: 16px;
        }
      }
    }
  }
}
</style>
