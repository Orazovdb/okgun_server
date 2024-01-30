<template>
  <div class="about" ref="about">
    <div class="about__container">
      <div class="about__row">
        <div class="about__image" ref="image">
          <img src="@/assets/img/about.png" alt="" />
        </div>
        <div class="about__content" ref="content">
          <h1>{{ $t("about") }}</h1>
          <p v-if="aboutUs">
            {{ translateText(aboutUs) }}
          </p>
          <base-button
            banner
            @clickedButton="$router.push(localeLocation('/about'))"
            >{{ $t("readMore") }}</base-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import translate from "@/mixins/translate";
export default {
  props: {
    aboutUs: {
      type: Object,
      default: () => null,
    },
  },
  mixins: [translate],
  data() {
    return {
      observer: null,
    };
  },

  mounted() {
    if (this.$refs.about) {
      const options =
        {
          rootMargin: "100px 0px 0px 0px",
          threshold: 0.5,
        } || {};
      this.observer = new IntersectionObserver(async ([entry]) => {
        if (entry && entry.isIntersecting) {
          this.$refs.image.classList.add("aos");
          this.$refs.content.classList.add("aos");
          const elemAos = document.querySelectorAll(".aos");
          elemAos.forEach((elem) => {
            if (
              !elem.classList.contains("about__image") &&
              !elem.classList.contains("about__content") &&
              !elem.classList.contains("menu") &&
              !elem.classList.contains("products-swiper-block__wrapper")
            ) {
              elem.classList.remove("aos");
            }
          });
        }
      }, options);
      this.observer.observe(this.$refs.about);
    }
  },
  destroyed() {
    this.observer.disconnect();
  },
};
</script>

<style lang="scss" scoped>
.about {
  position: relative;
  padding: 10px 0;
  background-color: var(--background);
  margin-bottom: 70px;
  @media (max-width: 767px) {
    margin-bottom: 40px;
  }
  &:hover {
    .absolute {
      transform: scale(1.1);
    }
    .about__image {
      img {
        transform: scale(1.05);
      }
    }
  }
  @media (max-width: 767px) {
    padding: 20px 0;
  }
  &__container {
  }

  &__row {
    display: grid;
    grid-template-columns: minmax(400px, 560px) 1fr;
    gap: 40px;
    padding: 30px 0 20px;
    @media (max-width: 767px) {
      grid-template-columns: 1fr;
      gap: 30px;
      padding: 0;
    }
  }

  &__image {
    transform: translate(-200px, -80px);
    transition: 0.4s all;
    opacity: 1;
    height: 550px;
    &.aos {
      opacity: 1;
      transform: translate(-110px, -80px);
      transition: 0.4s all;
      @media (max-width: 767px) {
        transform: translateY(0);
      }
    }
    img {
      width: 100%;
      height: 100%;
      transition: all 0.3s ease 0s;
      object-fit: contain;
    }
    @media (max-width: 767px) {
      order: 2;
      transform: translateY(0);
      height: 370px;
      img {
        object-fit: fill;
      }
    }
  }

  &__content {
    transform: translateX(70px);
    opacity: 0;
    &.aos {
      opacity: 1;
      transform: translateX(-0px);
      transition: 0.4s all;
    }
    h1 {
      color: var(--text);
      font-size: 60px;
      font-weight: 900;
      line-height: calc(65 / 60) * 100%;
      margin-bottom: 30px;
    }

    p {
      color: var(--text);
      font-size: 16px;
      font-weight: 400;
      line-height: 160%;
      letter-spacing: 0.32px;
      margin-bottom: 30px;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 7;
      -webkit-box-orient: vertical;
    }
    @media (max-width: 767px) {
      order: 1;
      -webkit-line-clamp: 4;
      h1 {
        font-size: 30px;
        margin-bottom: 14px;
      }
      p {
        color: #000;
        margin-bottom: 14px;
      }
    }
  }
}
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
</style>
