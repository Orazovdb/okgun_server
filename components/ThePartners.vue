<template>
  <div class="partners">
    <h1>{{ $t('partners') }}</h1>
    <div class="partners__swiper-wrapper">
      <div class="partners__container">
        <div v-swiper:mySwiper="options" class="partners-swiper swiper">
          <div class="partners-swiper__wrapper swiper-wrapper">
            <div class="partners-swiper__slide swiper-slide" v-for="service in services" :key="service.uuid">
              <div class="partners-swiper__image">
                <img :src="`${baseURL}/uploads/service/${service.image_path}`" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    props: {
      services: Array,
      default: () => []
    },
    data() {
      return {
        sliderImages: [],
        options: {
          loop: true,
          slidesPerView: 2,
          speed: 3000,
          spaceBetween: 20,
          pauseOnMouseEnter: false,
          autoplay: {
            delay: 1,
            disableOnInteraction: false
          },
          breakpoints: {
            370: {
              slidesPerView: 1.4,
              speed: 2000
            },
            479: {
              slidesPerView: 2,
              spaceBetween: 40,
              speed: 2000
            },
            767: {
              slidesPerView: 3,
              spaceBetween: 60
            },
            992: {
              slidesPerView: 3,
              spaceBetween: 50
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
  .swiper-wrapper {
    transition-timing-function: linear;
  }
  .partners {
    margin-bottom: 70px;
    @media (max-width: 767px) {
      margin-bottom: 40px;
    }
    h1 {
      color: var(--text);
      text-align: center;
      font-size: 40px;
      font-weight: 900;
      line-height: 120%;
      margin-bottom: 50px;
      @media (max-width: 767px) {
        font-size: 27px;
        text-align: left;
        padding: 0 20px;
        margin-bottom: 30px;
      }
    }
    // .partners__container

    &__container {
      max-width: 1200px;
    }

    &__swiper-wrapper {
      border-top: 1px solid var(--text2);
      border-bottom: 1px solid var(--text2);
      padding: 50px 0;
      @media (max-width: 767px) {
        padding: 30px 0;
      }
    }
  }
  .partners-swiper {
    width: 100%;
    overflow-x: hidden;
    &__wrapper {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      grid-auto-flow: column;
      transition-timing-function: linear;
    }

    &__slide {
    }

    &__image {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 160px;
        min-height: 60px;
      }
      @media (max-width: 767px) {
        img {
          width: 140px;
          min-height: 40px;
        }
      }
    }
  }
</style>
