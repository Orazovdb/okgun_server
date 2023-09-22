<template>
  <div class="footer" ref="footer">
    <div class="footer__container">
      <div class="footer__row">
        <nuxt-link :to="localeLocation('/')" class="footer__logo">
          <img src="@/assets/img/logo.svg" alt="" />
        </nuxt-link>
        <div class="footer__item mail">
          <h3>{{ $t("email") }}</h3>
          <a href="info@okgun.ru">info@okgun.ru</a>
        </div>
        <div class="footer__item faks">
          <h3>{{ $t("faks") }}</h3>
          <a href="tel:+99364415588">+993 64 41 55 88</a>
        </div>
        <div class="footer__item address">
          <h3>{{ $t("address") }}</h3>
          <p>{{ $t("city") }}</p>
        </div>
        <div class="footer__item icons">
          <h3>{{ $t("contactUs") }}</h3>
          <div class="footer__item-icons">
            <a
              href="https://instagram.com/obbi_dragees?igshid=NGVhN2U2NjQ0Yg=="
              class="icon-hover"
              ><base-icon icon="instagram"
            /></a>
            <a
              href="https://www.linkedin.com/in/okgun-confectionery-factory-54b188238"
              class="icon-hover"
              ><base-icon icon="linkedin" />
            </a>
            <a href="https://www.tiktok.com/@obbi_dragees" class="icon-hover"
              ><base-icon icon="tiktok" />
            </a>
          </div>
        </div>
      </div>
      <p class="footer__security">
        © {{ new Date().getFullYear() }}, Salam@{{ $t("allRigthReserved") }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      observer: null,
    };
  },

  mounted() {
    if (this.$refs.footer) {
      const options =
        {
          rootMargin: "100px 0px 0px 0px",
          threshold: 0.5,
        } || {};
      this.observer = new IntersectionObserver(async ([entry]) => {
        if (entry && entry.isIntersecting) {
          console.log("footer");
          const elemAos = document.querySelectorAll(".aos");
          console.log(elemAos);
          elemAos.forEach((elem) => {
            if (
              !elem.classList.contains("contact__row") &&
              !elem.classList.contains("menu")
            )
              elem.classList.remove("aos");
          });
        }
      }, options);
      this.observer.observe(this.$refs.footer);
    }
  },
  destroyed() {
    this.observer.disconnect();
  },
};
</script>

<style lang="scss" scoped>
.icon-hover {
  transition: 0.2s all;
  &:hover {
    transform: scale(1.2);
  }
}
.footer {
	font-family: sans-serif !important;
  padding: 80px 0;
  background: var(--text);
  @media (max-width: 767px) {
    padding: 20px 0;
  }
  &__container {
  }

  &__row {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 100px;
    @media (max-width: 767px) {
      grid-template-columns: repeat(2, 1fr);
      gap: 30px;
    }
    @media (max-width: 479px) {
      grid-template-columns: repeat(2, 1fr);
      gap: 20px;
    }
  }

  &__logo {
  }

  &__item {
    h3 {
      color: #fff;
      font-size: 16px;
      font-weight: 900;
      line-height: 120%;
      letter-spacing: 1.2px;
      margin-bottom: 14px;
    }
    p,
    a {
      color: #fff;
      font-size: 16px;
      font-weight: 500;
      line-height: 120%;
      letter-spacing: 1.2px;
    }

    &.address {
      width: 251px;
      order: 5;
    }
    &.icons {
      width: 300px;
      order: 2;
    }

    @media (max-width: 767px) {
      &.faks {
        order: 4;
      }

      &.mail {
        order: 3;
      }
      &.address {
        width: 251px;
        order: 5;
      }
      &.icons {
        width: 300px;
        order: 2;
      }
    }
    @media (max-width: 479px) {
      &.address {
        width: 100%;
        order: 5;
      }
      &.icons {
        width: 100%;
        order: 2;
      }
    }
  }

  &__item-icons {
    display: flex;
    gap: 26px;
    padding-bottom: 10px;
    border-bottom: 2px solid #fff;
  }

  &__security {
    margin-top: 50px;
    color: #fff;
    font-size: 16px;
    font-weight: 600;
    line-height: 120%;
    letter-spacing: 1px;
    @media (max-width: 767px) {
      text-align: center;
      font-size: 12px;
      margin-top: 30px;
    }
  }
}
</style>
