<template>
  <div class="product-id">
    <div class="product-id__row">
      <div
        :class="[`product-id__item`, { active: isImage }]"
        v-for="product in products"
        :key="product.uuid"
        :product="product"
      >
        <div class="popup-product" @click="isImage = false">
          <div class="popup-product__image" @click.prevent.stop>
            <img
              loading="lazy"
              :data-src="`${baseURL}/${product.image_path}`"
            />
          </div>
        </div>
        <div class="product-id__circle">
          <div class="product-id__info">
            <base-icon icon="info"></base-icon>
          </div>
          <div class="product-id__content-abs">
            <h4>{{ translateTitle(product) }}</h4>
            <h5>{{ translateDescription(product) }}</h5>
            <div class="product-id__content-abs-item-about">
              <span class="bold">{{ $t("weight") }}:</span>
              <span>{{ product.weight }}</span>
            </div>
            <div class="product-id__content-abs-item-about">
              <span class="bold">{{ $t("srok") }}:</span>
              <span>{{ product.srok }}</span>
            </div>
          </div>
        </div>
        <div class="product-id__image" @click="isImage = !isImage">
          <img loading="lazy" :data-src="`${baseURL}/${product.image_path}`" />
        </div>
        <div class="product-id__content">
          <h4>{{ translateTitle(product) }}</h4>
          <h5>{{ translateDescription(product) }}</h5>
          <!-- <div class="product-id__item-about">
            <span class="bold">{{ $t("weight") }}:</span>
            <span>{{ product.weight }}</span>
          </div>
          <div class="product-id__item-about">
            <span class="bold">{{ $t("srok") }}:</span>
            <span>{{ product.srok }}</span>
          </div> -->
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
  data() {
    return {
      isImage: false,
    };
  },
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
    border: 1px solid;
    border-radius: 12px;
    transition: 0.2s all ease;
    overflow: hidden;
    z-index: 2;
    position: relative;
    font-family: Arial, Helvetica, sans-serif;
    &::before {
      content: "";
    }
    &:hover {
      box-shadow: 5px 20px 30px rgba(0, 0, 0, 0.5);
    }
    h4 {
      color: var(--text);
      font-size: 22px;
      font-weight: 900;
      line-height: 111%;
      margin-bottom: 4px;
    }
    h5 {
      color: var(--text);
      font-size: 18px;
      font-weight: 400;
      line-height: 120%;
      margin-bottom: 10px;
      flex: 1 1 auto;
    }
    &.active {
      .popup-product {
        opacity: 1;
        pointer-events: auto;
      }
    }
    @media (max-width: 767px) {
      h4 {
        font-size: 20px;
      }
      h5 {
        margin-bottom: 14px;
        font-size: 16px;
      }
    }
  }

  &__info {
    position: absolute;
    right: 55px;
    top: 55px;
    z-index: 50;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0 0 200px 200px;
    cursor: auto !important;
    span {
      cursor: auto;
    }
    &:deep(svg) {
      width: 30px;
      height: 30px;
      color: #fff;
    }
  }

  &__content-abs {
    position: absolute;
    height: 100%;
    width: 100%;
    padding: 20px;
    opacity: 0;
    transform: translateY(-200%);
    transition: opacity 0.2s, transform 0.7s;
    display: flex;
    flex-direction: column;
    h4 {
      color: #fff;
      font-weight: 600;
      font-size: 24px;
    }
    h5 {
      color: #fff;
      font-size: 16px;
      font-weight: 400;
    }
  }

  &__content-abs-item-about {
    padding-bottom: 4px;
    border-bottom: 1px solid #fff;
    width: 90%;
    margin-bottom: 10px;
    span {
      color: #fff;
      font-size: 14px;
    }
  }

  &__circle {
    position: absolute;
    right: -50px;
    top: -50px;
    background-color: var(--primary);
    width: 100px;
    height: 100px;
    z-index: 40;
    border-radius: 50%;
    cursor: auto;
    transition: all ease-in-out 0.5s;
    &:hover {
      right: 0;
      top: 0;
      height: 100%;
      width: 100%;
      border-radius: 0 0 12px 12px;
      .product-id__info {
        display: none;
      }
      .product-id__content-abs {
        opacity: 1;
        transform: translateY(0%);
      }
    }
  }

  &__image {
    width: 100%;
    height: 250px;
    margin: 0 auto;
    background-size: 180px;
    position: relative;
    z-index: 30;
    cursor: zoom-in;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      position: absolute;
      z-index: 3;
      border-radius: 12px 12px 0 0;
    }
    @media (max-width: 767px) {
      width: 100%;
    }
  }

  &__content {
    padding: 10px 8px 8px;
  }

  &__item-about {
    display: flex;
    gap: 6px;
    span {
      color: #3e3e3e;
      font-size: 20px;
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
.popup-product {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.4s;
  &__image {
    width: 70vh;
    height: 80vh;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
}
</style>
