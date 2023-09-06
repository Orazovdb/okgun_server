<template>
  <div class="footer">
    <div class="footer__container">
      <div class="footer__row">
        <nuxt-link :to="localeLocation('/')" class="footer__logo">
          <img src="@/assets/img/logo.svg" alt="" />
        </nuxt-link>
        <div class="footer__item mail">
          <h3>{{ $t("email") }}</h3>
          <a href="mailto:okgun@mail.ru">okgun@mail.ru</a>
        </div>
        <div class="footer__item faks">
          <h3>{{ $t("faks") }}</h3>
          <a href="tel:+99365960081">+993 65 960081</a>
          <a href="tel:+99362558736">+993 62 558736</a>
        </div>
        <div class="footer__item address">
          <h3>{{ $t("address") }}</h3>
          <p>{{ $t("city") }}</p>
        </div>
        <div class="footer__item icons">
          <h3>{{ $t("contactUs") }}</h3>
          <div class="footer__item-icons">
            <base-icon icon="linkedin" />
            <base-icon icon="instagram" />
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
export default {};
</script>

<style lang="scss" scoped>
.footer {
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
