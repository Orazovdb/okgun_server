<template>
  <div class="about" ref="aos">
    <div class="__container">
      <div class="about__row" ref="image">
        <div class="about__image">
          <img src="@/assets/img/about.png" alt="" />
        </div>
        <div class="about__content">
          <h2>{{ $t("about") }}</h2>
          <p v-if="aboutUs && aboutUs.length > 0">
            {{ translateText(aboutUs[0]) }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { GET_ABOUTUS } from "@/api/home.api";
import translate from "@/mixins/translate";
export default {
  mixins: [translate],
  head() {
    return {
      title: this.$t("about"),
      meta: [
        {
          name: "content-type",
          content: "about",
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
      aboutUs: null,
      observer: null,
    };
  },
  async fetch() {
    await this.fetchAboutUs();
  },
  mounted() {
    if (this.$refs.aos) {
      const options =
        {
          rootMargin: "100px 0px 0px 0px",
          threshold: 0.4,
        } || {};
      this.observer = new IntersectionObserver(async ([entry]) => {
        if (entry && entry.isIntersecting) {
          this.$refs.image.classList.add("aos-animate");
          const elemAos = document.querySelectorAll(".aos");
          console.log(elemAos);
          elemAos.forEach((elem) => {
            if (
              !elem.classList.contains("about__row") &&
              !elem.classList.contains("menu")
            ) {
              elem.classList.remove("aos");
            }
          });
        }
      }, options);
      this.observer.observe(this.$refs.aos);
    }
  },
  destroyed() {
    this.observer.disconnect();
  },
  methods: {
    async fetchAboutUs() {
      try {
        const { data, status } = await GET_ABOUTUS();
        if (status) {
          this.aboutUs = data || [];
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
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
    gap: 0px;
    @media (max-width: 767px) {
      grid-template-columns: 1fr;
      gap: 20px;
    }
  }

  &__image {
    width: 600px;
    height: 600px;
    transform: translateX(-80px);
    transition: 0.8s all;
    &.aos {
      transform: translateX(-30px);
      transition: 0.8s all;
      @media (max-width: 767px) {
        transform: translateX(0);
      }
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
    @media (max-width: 767px) {
      width: 100%;
      height: 350px;
      margin: 0 auto;
      order: 2;
      transform: translateX(0);
    }
  }

  &__content {
    transform: translateX(70px);
    &.aos {
      transform: translateX(-0px);
      transition: 0.8s all;
    }
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
      transform: translateX(0);
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
