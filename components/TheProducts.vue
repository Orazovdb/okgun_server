<template>
  <div class="products" ref="aos">
    <div class="products__container">
      <a href="#" @click.prevent class="products-title-block">
        <h1>{{ $t('products') }}</h1>
      </a>
      <div class="products-swiper-block swiper">
        <div class="products-swiper-block__wrapper swiper-wrapper">
          <div
            class="products-swiper-block__slide swiper-slide"
            v-for="slide in categories"
            :key="slide.uuid"
            @click.stop="$router.push(localeLocation(`/products/${slide.uuid}`))"
          >
            <div class="products-swiper-block__image" ref="image">
              <img :src="`${baseURL}/uploads/products/${slide.image}`" alt="" />
            </div>
            <p>{{ translateTitle(slide) }}</p>
          </div>
        </div>
        <div class="buttons">
          <div class="buttons__item" v-for="catalog in catalogs" :key="catalog.uuid" @click="seePdf(catalog)">
            <span class="big-text">{{ translateTitle(catalog) }}</span>
            <span class="small-text">{{ $t('productsCatalog') }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import translate from '@/mixins/translate'
  import { mapGetters } from 'vuex'
  export default {
    props: {
      categories: {
        type: Array,
        default: () => []
      },
      products: {
        type: Array,
        default: () => []
      },
      catalogs: {
        type: Array,
        default: () => []
      }
    },
    mixins: [translate],
    data() {
      return {
        selectedId: null,
        observer: null
      }
    },
    computed: {
      ...mapGetters(['baseURL'])
    },
    mounted() {
      if (this.$refs.aos) {
        const options =
          {
            rootMargin: '100px 0px 0px 0px',
            threshold: 1.0
          } || {}
        this.observer = new IntersectionObserver(async ([entry]) => {
          if (entry && entry.isIntersecting) {
            this.$refs.image.classList.add('aos')
          }
        }, options)
        this.observer.observe(this.$refs.aos)
      }
    },
    destroyed() {
      this.observer.disconnect()
    },
    methods: {
      categoryProducts(item) {
        this.selectedId = item.uuid
        this.$emit('categoryProducts', item.uuid)
      },
      seePdf(item) {
        const link = document.createElement('a')
        link.href = `${this.baseURL}/uploads/pdf/${item.pdf_path}`
        link.setAttribute('download', this.translateTitle(item))
        link.setAttribute('target', 'download')
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .products {
    margin-bottom: 60px;
    @media (max-width: 767px) {
      margin-bottom: 30px;
    }
    &__container {
    }
  }
  .products-title-block {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 50px;
    @media (max-width: 767px) {
      padding-bottom: 10px;
    }
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
    &:hover {
      h1 {
        color: var(--primary);
        transform: scale(1.02);
      }
      span {
        color: var(--primary);
        &:deep(svg) {
          color: var(--primary);
        }
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
  .products-swiper-block {
    &__wrapper {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 30px;
      transform: translateY(80px);
      opacity: 0;
      &.aos {
        opacity: 1;
        transform: translateY(0px);
        transition: 0.4s all;
      }
      @media (max-width: 767px) {
        grid-template-columns: repeat(2, 1fr);
      }
      @media (max-width: 479px) {
        grid-template-columns: repeat(1, 1fr);
      }
    }

    &__slide {
      position: relative;
      p {
        display: inline-block;
        position: absolute;
        left: 50%;
        top: 2%;
        width: 100%;
        display: flex;
        justify-content: center;
        border-radius: 10px;
        white-space: nowrap;
        background: #fff;
        padding: 10px 30px;
        transform: translateX(-50%);
        color: #42454a;
        font-size: 20px;
        text-align: center;
        font-weight: 800;
        line-height: 120%;
        @media (max-width: 767px) {
          font-size: 14px;
          margin-top: 16px;
          font-weight: 700;
          top: 0;
          margin-top: 10px;
        }
      }
    }

    &__image {
      width: 100%;
      height: 348px;
      margin: auto auto;
      position: relative;
      display: flex;
      justify-content: center;
      background: #f1f6fa;
      box-shadow: 0.1px 0.1px 10px #d5d5d5;
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        object-position: center;
      }
      @media (max-width: 767px) {
        height: 180px;
      }
    }

    &__navigations {
      margin-top: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 20px;
      @media (max-width: 767px) {
        margin-top: 20px;
      }
    }

    &__navigation {
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.2s ease 0s;
      &:active {
        transform: scale(1.05);
      }
      span {
        background-color: var(--text);
        display: flex;
        justify-content: center;
        align-items: center;
        width: 40px;
        height: 40px;
        border-radius: 6px;
      }
      &:deep(svg) {
        width: 30px;
        height: 30px;
        color: #fff;
      }
      &.swiper-button-disabled {
        cursor: auto;
        span {
          background-color: transparent;
          cursor: auto;
        }
        &:deep(svg) {
          color: var(--text);
          cursor: auto;
        }
      }
      @media (max-width: 767px) {
        span {
          width: 35px;
          height: 35px;
          cursor: none;
          &:deep(svg) {
            width: 25px;
            height: 25px;
          }
        }
      }
    }
  }
  .buttons {
    display: flex;
    justify-content: center;
    gap: 57px;
    padding-top: 100px;
    padding-bottom: 120px;
    cursor: pointer;
    // .buttons__item

    &__item {
      width: 400px;
      padding: 10px 20px;
      text-align: center;
      border-radius: 12.375px;
      border: 1.547px solid #f00;
      background: #f00;
      box-shadow: 6.1875px 6.1875px 0px 0px #e5a89c;
    }
  }
  .big-text {
    margin-right: 10px;
    color: #fff;
    font-family: Roboto;
    font-size: 50px;
    font-style: normal;
    font-weight: 900;
    line-height: 120%; /* 60px */
    text-transform: capitalize;
  }
  .small-text {
    color: #fff;
    font-family: Roboto;
    font-size: 30px;
    font-style: normal;
    font-weight: 400;
    line-height: 120%;
    text-transform: lowercase;
  }
</style>
