<template>
  <div class="products" ref="aos">
    <div class="products__container">
      <nuxt-link
        :to="localeLocation('/products')"
        @click.prevent
        class="products-title-block"
      >
        <h1>{{ $t("products") }}</h1>
      </nuxt-link>
      <div class="products-swiper-block swiper">
        <div class="products-swiper-block__wrapper swiper-wrapper" ref="image">
          <div
            class="products-swiper-block__slide"
            @click="$router.push(localeLocation('/products-all'))"
          >
            <p>{{ $t('newProducts') }}</p>
            <div class="products-swiper-block__image">
              <img src="@/assets/img/okgun.png" alt="" />
            </div>
          </div>
          <div
            class="products-swiper-block__slide swiper-slide"
            v-for="slide in categories"
            :key="slide.uuid"
            @click.stop="
              $router.push(localeLocation(`/products/${slide.uuid}`))
            "
          >
            <p>{{ translateTitle(slide) }}</p>
            <div class="products-swiper-block__image">
              <img :src="`${baseURL}/${slide.image}`" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import translate from "@/mixins/translate";
import { mapGetters } from "vuex";
export default {
  props: {
    categories: {
      type: Array,
      default: () => [],
    },
    products: {
      type: Array,
      default: () => [],
    },
    catalogs: {
      type: Array,
      default: () => [],
    },
  },
  mixins: [translate],
  data() {
    return {
      selectedId: null,
      observer: null,
      // catalogs: [
      //   {
      //     id: 1,
      //     download: "/Obby.pdf",
      //     img: "/obbi.png",
      //   },
      //   {
      //     id: 2,
      //     download: "/Okgun.pdf",
      //     img: "/okgun.png",
      //   },
      // ],
    };
  },
  computed: {
    ...mapGetters(["baseURL"]),
  },
  mounted() {
    if (this.$refs.aos) {
      const options =
        {
          rootMargin: "50px 0px 0px 0px",
          threshold: 0.4,
        } || {};
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry && entry.isIntersecting) {
            this.$refs.image.classList.add("aos");
            const elemAos = document.querySelectorAll(".aos");
            console.log(elemAos);
            elemAos.forEach((elem) => {
              if (
                !elem.classList.contains("products-swiper-block__wrapper") &&
                !elem.classList.contains("menu") &&
                !elem.classList.contains("about__image") &&
                !elem.classList.contains("about__content")
              ) {
                elem.classList.remove("aos");
              }
            });
          }
        });
      }, options);
    }
    this.observer.observe(this.$refs.aos);
  },
  destroyed() {
    this.observer.disconnect();
  },
  methods: {
    categoryProducts(item) {
      this.selectedId = item.uuid;
      this.$emit("categoryProducts", item.uuid);
    },
    seePdf(item) {
      const link = document.createElement("a");
      link.href = `${this.baseURL}/uploads/pdf/${item.pdf_path}`;
      link.setAttribute("download", this.translateTitle(item));
      link.setAttribute("target", "download");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    downloadPdf(file) {
      const link = document.createElement("a");
      link.download = file;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
  },
};
</script>

<style lang="scss" scoped>
.products {
  margin-bottom: 60px;
  @media (max-width: 767px) {
    margin-bottom: 30px;
  }
  &__container {
  }

  &__all-item {
    margin: 30px auto 0 auto;
    width: 80%;
    border-radius: 10px;
    background: #d9e5ee;
    height: 120px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.2s all;
    &:hover {
      transform: scale(1.02);
      cursor: pointer;
    }
    h1 {
      color: #42454a;
      font-size: 20px;
      font-weight: 600;
      line-height: 120%;
    }
  }
}
.products-title-block {
  display: flex;
  align-items: center;
  justify-content: center;
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
    grid-template-columns: repeat(5, 1fr);
    gap: 20px;
    transform: translateY(80px);
    opacity: 0;
    &.aos {
      opacity: 1;
      transform: translateY(0px);
      transition: 1s all;
    }
    @media (max-width: 767px) {
      grid-template-columns: repeat(2, 1fr);
      @media (max-width: 767px) {
        transform: translateY(40px);
        opacity: 1;
      }
    }
    @media (max-width: 479px) {
      grid-template-columns: repeat(1, 1fr);
    }
  }

  &__slide {
    position: relative;
    cursor: pointer;
    transition: 0.2s all;
    &:hover {
      transform: scale(1.02);
    }
    p {
      width: 100%;
      display: flex;
      justify-content: center;
      border-radius: 6px 6px 0 0;
      white-space: nowrap;
      background: #fff;
      padding: 10px 30px;
      color: var(--white);
      font-size: 17px;
      text-align: center;
      font-weight: 800;
      line-height: 120%;
      background-color: var(--primary);
      @media (max-width: 767px) {
        font-size: 14px;
        font-weight: 700;
        top: 0;
      }
    }
  }

  &__image {
    width: 100%;
    height: 300px;
    margin: auto auto;
    position: relative;
    display: flex;
    justify-content: center;
    background: #f1f6fa;
    box-shadow: 0.1px 0.1px 10px #d5d5d5;
    border-radius: 0 0 10px 10px;
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
  padding-top: 80px;
  padding-bottom: 100px;
  @media (max-width: 767px) {
    display: grid;
    grid-template-columns: 1fr;
    gap: 30px;
    padding: 40px 0;
  }

  // .buttons__item
  &__item {
    width: 300px;
    padding: 20px 20px;
    height: 150px;
    border-radius: 50%;
    text-align: center;
    border-radius: 12.375px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    background: var(--primary);
    box-shadow: 1px 1px 7px #f00;
    img {
      width: 200px;
    }
    @media (max-width: 767px) {
      width: 100%;
    }
  }
}
.big-text {
  margin-right: 10px;
  color: #fff;
  font-family: Roboto;
  font-size: 44px;
  font-style: normal;
  font-weight: 900;
  line-height: 120%; /* 60px */
  text-transform: capitalize;
  display: block;
  @media (max-width: 767px) {
    font-size: 30px;
  }
}
.small-text {
  color: #fff;
  font-family: Roboto;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: 120%;
  text-transform: lowercase;
  display: block;
}
</style>
