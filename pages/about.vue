<template>
  <div class="about" ref="aos">
    <img src="@/assets/img/about-icon_1.svg" alt="" class="absolute icon-left-1" />
    <img src="@/assets/img/about-icon_2.svg" alt="" class="absolute icon-left-2" />
    <img src="@/assets/img/about-icon_1.svg" alt="" class="absolute icon-left-3" />
    <img src="@/assets/img/about-icon_2.svg" alt="" class="absolute icon-left-4" />
    <img src="@/assets/img/about-icon_2.svg" alt="" class="absolute icon-left-5" />
    <img src="@/assets/img/about-icon_1.svg" alt="" class="absolute icon-left-6" />
    <img src="@/assets/img/about-icon_2.svg" alt="" class="absolute icon-left-7" />
    <div class="about__container">
      <div class="about__row" ref="image">
        <div class="about__image">
          <img src="@/assets/img/about.svg" alt="" />
        </div>
        <div class="about__content">
          <h2>{{ $t('about') }}</h2>
          <p v-if="aboutUs && aboutUs.length > 0">
            {{ translateText(aboutUs[0]) }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import translate from '@/mixins/translate'
  import { GET_ABOUTUS } from '@/api/home.api'
  export default {
    mixins: [translate],
    head() {
      return {
        title: this.$t('about'),
        meta: [
          {
            name: 'content-type',
            content: 'about'
          },
          {
            name: 'keywords',
            content: this.$t('keywords')
          }
        ]
      }
    },
    data() {
      return {
        aboutUs: null,
        observer: null
      }
    },
    async fetch() {
      await this.fetchAbousUs()
    },
    mounted() {
      if (this.$refs.aos) {
        const options =
          {
            rootMargin: '100px 0px 0px 0px',
            threshold: 0.4
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
      async fetchAbousUs() {
        try {
          const { data, status } = await GET_ABOUTUS()
          if (status) {
            this.aboutUs = data || []
          }
        } catch (error) {
          console.log(error)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .absolute {
    position: absolute;
    z-index: 10;
    transition: all 0.3s ease 0s;
    @media (max-width: 767px) {
      display: none;
    }
  }
  .icon-left-1 {
    top: 5%;
    left: 0%;
    width: 130px;
    height: 130px;
  }
  .icon-left-2 {
    top: 25%;
    left: 4%;
    width: 80px;
    height: 80px;
  }
  .icon-left-3 {
    top: 35%;
    width: 120px;
    height: 120px;
  }
  .icon-left-4 {
    top: 50%;
    left: 2.6%;
    width: 80px;
    height: 80px;
  }
  .icon-left-5 {
    top: 53%;
    left: 6%;
    width: 180px;
    height: 180px;
  }
  .icon-left-6 {
    top: 68%;
    left: 4%;
    width: 110px;
    height: 110px;
  }
  .icon-left-7 {
    top: 75%;
    left: 6.6%;
    width: 180px;
    height: 180px;
  }
  .about {
    margin-top: 40px;
    margin-bottom: 100px;
    position: relative;
    @media (max-width: 767px) {
      margin: 40px 0;
    }
    &__container {
    }

    &__row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 30px;
      transform: translateY(80px);
      opacity: 0;
      &.aos {
        opacity: 1;
        transform: translateY(0px);
        transition: 0.4s all;
      }
      @media (max-width: 767px) {
        grid-template-columns: 1fr;
        gap: 20px;
      }
    }

    &__image {
      width: 500px;
      height: 500px;
      margin: 0 0 0 auto;
      img {
        width: 100%;
        height: 100%;
      }
      @media (max-width: 767px) {
        width: 100%;
        height: 350px;
        margin: 0 auto;
        order: 2;
      }
    }

    &__content {
      h2 {
        color: var(--text);
        font-size: 60px;
        font-weight: 900;
        line-height: 120%;
        margin-bottom: 20px;
      }
      p {
        color: var(--text);
        font-size: 16px;
        font-weight: 400;
        line-height: 160%;
        letter-spacing: 0.32px;
      }
      @media (max-width: 767px) {
        order: 1;
        h2 {
          font-size: 30px;
        }
        p {
          font-size: 14px;
        }
      }
    }
  }
</style>
