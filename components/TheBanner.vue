<template>
  <div class="swiper-block">
    <div v-swiper:mySwiper="options" class="swiper-block__swiper swiper">
      <div class="swiper-block__wrapper swiper-wrapper">
        <div class="swiper-block__slide swiper-slide" v-for="slider in sliders" :key="slider.id">
          <div class="swiper-block__image">
            <img :src="`${baseURL}/uploads/slider/${translateImage(slider)}`" alt="" />
          </div>
        </div>
      </div>
      <div class="swiper-block__prev-navigation swiper-button-prev">
        <base-icon icon="prevNavigation" />
      </div>
      <div class="swiper-block__next-navigation swiper-button-next">
        <base-icon icon="nextNavigation" />
      </div>
      <div class="swiper-block__bullets-wrapper">
        <div class="swiper-block__bullets swiper-pagination-bullet"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import translate from '@/mixins/translate'
  import { mapGetters } from 'vuex'
  export default {
    props: {
      sliders: {
        type: Array,
        default: () => []
      }
    },
    mixins: [translate],
    data() {
      return {
        sliderImages: [],
        options: {
          loop: true,
          slidesPerView: 1,
          speed: 200,
          spaceBetween: 20,
          autoplay: {
            delay: 4000
          },
          navigation: {
            nextEl: '.swiper-block__next-navigation',
            prevEl: '.swiper-block__prev-navigation'
          },
          pagination: {
            el: '.swiper-pagination-bullet',
            clickable: true
          },
          breakpoints: {
            479: {
              speed: 1000
            }
          }
        }
      }
    },
    computed: {
      ...mapGetters(['baseURL'])
    }
  }
</script>

<style lang="scss" scoped>
  .swiper-block {
    height: calc(100vh - 25vh);
    background-color: #f7f7f7;
    margin-bottom: 40px;
    @media (max-width: 992px) {
      height: auto;
    }
    @media (max-width: 767px) {
      margin-top: 30px;
    }
    @media (max-width: 479px) {
    }
    // .swiper-block__swiper

    &__swiper {
      height: 100%;
      position: relative;
      padding-bottom: 10px;
    }

    // .swiper-block__wrapper

    &__wrapper {
      display: flex;
      width: fit-content;
      height: 100%;
    }

    // .swiper-block__slide

    &__slide {
      position: relative;
      height: 100%;
      @media (max-width: 992px) {
        display: flex;
        flex-direction: column;
      }
    }

    // .swiper-block__image

    &__image {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      z-index: 30;
      padding: 0 20px 0 0;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
      }
      @media (max-width: 992px) {
        position: relative;
        order: 2;
        width: calc(100% - 20%);
        height: 100%;
        transform: translate(0);
        margin-top: 60px;
        &::before {
          content: '';
          position: absolute;
          left: 20px;
          z-index: -1;
          width: calc(100% - 40%);
          height: calc(100% + 20%);
          background-color: #efead5;
          top: 50%;
          transform: translateY(-50%);
          border-radius: 0 100px 100px 0;
        }
      }
      @media (max-width: 767px) {
        width: 100%;
        padding: 0 20px;
        margin-top: 50px;
      }
    }

    &__prev-navigation {
      position: absolute;
      z-index: 5;
      top: 50%;
      left: 3%;
      transform: translateY(-50%);
      background-color: rgba(249, 86, 86, 0.221);
      border-radius: 50%;
      width: 50px;
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      &:deep() {
        svg {
          color: var(--primary);
          width: 40px;
          height: 40px;
        }
      }
      @media (max-width: 767px) {
        width: 30px;
        height: 30px;
        &:deep() {
          svg {
            width: 20px;
            height: 20px;
          }
        }
      }
    }

    &__next-navigation {
      position: absolute;
      z-index: 5;
      top: 50%;
      right: 3%;
      transform: translateY(-50%);
      background-color: rgba(249, 86, 86, 0.221);
      border-radius: 50%;
      width: 50px;
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      &:deep() {
        svg {
          color: var(--primary);
          width: 40px;
          height: 40px;
          font-weight: 900;
        }
      }
      @media (max-width: 767px) {
        width: 30px;
        height: 30px;
        &:deep() {
          svg {
            width: 20px;
            height: 20px;
          }
        }
      }
    }

    &__container {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      height: 100%;
      @media (max-width: 992px) {
        order: 1;
        justify-content: flex-start;
        align-items: flex-start;
      }
    }

    &__content {
      max-width: 650px;
      h1 {
        color: var(--text);
        text-align: center;
        font-size: 40px;
        font-weight: 900;
        margin-bottom: 50px;
      }

      p {
        color: var(--text);
        text-align: center;
        font-size: 20px;
        font-weight: 500;
        line-height: 150%;
        margin-bottom: 40px;
      }
      @media (max-width: 992px) {
        h1 {
          text-align: left;
        }
        p {
          text-align: left;
        }
      }
      @media (max-width: 767px) {
        h1 {
          font-size: 30px;
          margin-bottom: 20px;
        }
        p {
          text-align: left;
          margin-bottom: 20px;
        }
      }
    }

    &__button-wrapper {
      display: flex;
      justify-content: center;
      @media (max-width: 992px) {
        justify-content: flex-start;
      }
    }

    // .swiper-block__title

    &__title {
      position: absolute;
      z-index: 10;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 100%;
      h1 {
        max-width: 1000px;
        margin: 0 auto;
        color: #fff;
        text-align: center;
        font-size: 100px;
        font-weight: 400;
      }
      @media (max-width: 767px) {
        h1 {
          max-width: calc(100% - 30%);
          font-size: 44px;
        }
      }
      @media (max-width: 479px) {
        h1 {
          max-width: calc(100% - 20%);
          font-size: 30px;
        }
      }
    }

    // .swiper-block__bullets-wrapper

    &__bullets-wrapper {
      position: absolute;
      bottom: 30px;
      left: 50%;
      transform: translateX(-50%);
      width: 30%;
      z-index: 10;
      @media (max-width: 767px) {
        bottom: 0px;
      }
    }

    // .swiper-block__bullets

    &__bullets {
      display: flex;
      justify-content: center;
      gap: 10px;
      &:deep {
        .swiper-pagination-bullet {
          cursor: pointer;
          width: 100%;
          height: 3px;
          background-color: #4a4a4a;
        }
        .swiper-pagination-bullet-active {
          background-color: #d9d9d9;
        }
      }
    }
  }

  .vacancy-popup {
    position: absolute;
    bottom: 30px;
    right: 0;
    width: 420px;
    border-radius: 15px;
    z-index: 10;
    @media (max-width: 767px) {
      display: none;
    }
    &__header {
      background-color: #13bf24;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px;
      border-radius: 15px 15px 0 0;
      h3 {
        color: #fff;
        font-size: 14px;
        font-weight: 700;
        line-height: 120%;
      }
    }

    &__body {
      padding: 20px;
      border-radius: 0 0 15px 15px;
      background-color: #fff;
      box-shadow: 0px 24px 128px 0px rgba(0, 0, 0, 0.14);
      height: 110px;
      p {
        font-size: 18px;
        font-weight: 500;
        line-height: 120%;
      }
    }
  }
  .relative {
    position: relative;
  }
</style>
