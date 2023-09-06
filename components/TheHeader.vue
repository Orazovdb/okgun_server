<template>
  <div class="header">
    <div class="header__container">
      <div :class="['header__logo', { active: isBodyActive }]" @click="$router.push(localeLocation('/'))">
        <img src="@/assets/img/logo.svg" alt="" />
        <img src="@/assets/img/logo-burger.svg" alt="" class="logo-burger" />
      </div>
      <nav :class="['menu', { _active: isBodyActive }]">
        <div class="menu__body">
          <ul class="menu__list">
            <li class="menu__item" v-for="link in links" :key="link.id">
              <nuxt-link :to="localePath(link.to)" :exact="link.exact" :class="['menu__link']">
                {{ link.name }}
              </nuxt-link>
            </li>
            <div class="menu__languages">
              <nuxt-link v-for="locale in selectedLocale" :key="locale.code" :to="switchLocalePath(locale.code)" @click.native="closeBody"
                >{{ locale.name }}
              </nuxt-link>
              <nuxt-link v-for="locale in availableLocales" :key="locale.code" exact :to="switchLocalePath(locale.code)" @click.native="closeBody">
                {{ locale.name }}
              </nuxt-link>
            </div>
          </ul>
        </div>
      </nav>
      <div class="header__languages">
        <div class="header__languages-active">
          <nuxt-link v-for="locale in selectedLocale" :key="locale.code" :to="switchLocalePath(locale.code)">{{ locale.name }} </nuxt-link>
          <base-icon icon="arrowDown" />
        </div>
        <ul class="header__languages-list">
          <li class="header__languages-item">
            <nuxt-link v-for="locale in availableLocales" :key="locale.code" exact :to="switchLocalePath(locale.code)" class="header__languages-link">
              {{ locale.name }}
            </nuxt-link>
          </li>
        </ul>
      </div>
      <div class="burger-wrapper" @click.stop="showBody">
        <button type="submit" :class="['burger', { active: isBodyActive }]">
          <span></span>
          <span></span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        linkActiveId: null,
        isBodyActive: null
      }
    },
    watch: {
      $route: function () {
        if (this.isBodyActive) {
          this.isBodyActive = false
        }
        if (document.querySelector('.wrapper').classList.contains('_lock')) {
          document.querySelector('.wrapper').classList.remove('_lock')
        }
      }
    },
    methods: {
      showBody() {
        if (document.querySelector('.wrapper').classList.contains('_lock')) {
          document.querySelector('.wrapper').classList.remove('_lock')
        } else {
          document.querySelector('.wrapper').classList.add('_lock')
        }
        this.isBodyActive = !this.isBodyActive
      },
      closeBody() {
        document.querySelector('.wrapper').classList.remove('_lock')
        this.isBodyActive = false
      }
    },

    computed: {
      availableLocales() {
        return this.$i18n.locales.filter((i) => i.code !== this.$i18n.locale)
      },
      selectedLocale() {
        return this.$i18n.locales.filter((i) => i.code === this.$i18n.locale)
      },
      links() {
        return [
          {
            id: 1,
            to: '/',
            name: this.$t('home'),
            exact: true
          },
          {
            id: 2,
            to: '/products',
            name: this.$t('products'),
            exact: false
          },
          {
            id: 3,
            to: '/about',
            name: this.$t('about'),
            exact: false
          },
          {
            id: 4,
            to: '/vacancy',
            name: this.$t('vacancy'),
            exact: false
          }
        ]
      }
    }
  }
</script>

<style lang="scss" scoped>
  .header {
    position: sticky;
    top: 0;
    left: 0;
    width: 100%;
    min-height: 80px;
    z-index: 50;
    background-color: #fff;
    box-shadow: 0.3px 0.3px 5px;
    @media (max-width: 767px) {
      min-height: 60px;
    }
    &__container {
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    &__logo {
      max-width: 150px;
      cursor: pointer;
      .logo-burger {
        display: none;
        position: relative;
        z-index: 102;
      }
      img {
        width: 100%;
        height: 100%;
      }
      &.active {
        img {
          display: none;
        }
        .logo-burger {
          display: block !important;
        }
      }
      @media (max-width: 767px) {
        max-width: 114px;
      }
    }

    &__menu {
    }

    &__languages {
      position: relative;
      &:hover {
        .header__languages-list {
          opacity: 1;
          visibility: visible;
          transform: translateY(0px);
        }
        .header__languages-active {
          .nuxt-link-active,
          .nuxt-link-exact-active {
            color: var(--primary);
            border-bottom: none;
          }
          span {
            color: var(--primary);
          }
        }
      }
      @media (max-width: 767px) {
        display: none;
      }
    }

    &__languages-active {
      display: flex;
      align-items: center;
      gap: 6px;
      cursor: pointer;
      a {
        color: var(--text);
        font-size: 16px;
        font-weight: 800;
        text-transform: uppercase;
        border-bottom: none;
      }
      span {
        color: var(--text);
      }
    }

    &__languages-list {
      position: absolute;
      box-shadow: 0.2px 0.2px 5px;
      width: 100%;
      right: 0;
      border-radius: 6px;
      transition: all 0.3s ease 0s;
      opacity: 0;
      visibility: hidden;
      transform: translateY(-10px);
      z-index: 10;
      background-color: #fff;
    }

    &__languages-item {
    }

    &__languages-link {
      display: block;
      color: var(--text);
      font-size: 16px;
      line-height: calc(19 / 16) * 100%;
      font-weight: 800;
      width: 100%;
      padding: 6px 8px;
      transition: all 0.3s ease 0s;
      border-radius: 6px;
      &:hover {
        background-color: #e5e5e5;
        color: var(--primary);
      }
    }
  }
  .menu {
    &._active {
      .menu__body {
        transition: all 0.3s;
        left: 0;
      }
    }
    &__body {
      @media (max-width: 767px) {
        position: fixed;
        left: -100%;
        top: 0;
        height: 100vh;
        width: 100%;
        background: linear-gradient(0deg, #e7524c 0%, #e7524c 100%), #fff;
        backdrop-filter: blur(3px);
        width: 100%;
        height: 100%;
        z-index: 100;
        transition: all 0.3s;
      }
    }

    &__list {
      display: flex;
      gap: 60px;
      @media (max-width: 767px) {
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100%;
        gap: 20px;
      }
    }

    &__item {
    }

    &__link {
      font-size: 16px;
      font-weight: 800;
      color: var(--text);
      display: block;
      padding-bottom: 4px;
      &:hover {
        color: var(--primary);
      }
      &.active {
        color: var(--primary);
        border-bottom: 1px solid var(--primary);
      }
      @media (max-width: 767px) {
        font-size: 24px;
        font-weight: 400;
        color: #fff;
        flex: 1 1 auto;
        &.active {
          font-weight: 900;
          color: #fff;
          border: transparent;
        }
      }
    }

    &__languages {
      display: none;
      @media (max-width: 767px) {
        display: flex;
        gap: 28px;
        margin-top: 250px;
        a {
          font-size: 22px;
          font-weight: 600;
          text-transform: uppercase;
          color: #fff;
        }
      }
    }
  }
  .burger-wrapper {
    @media (max-width: 767px) {
      background-color: transparent;
      width: 26px;
      height: 26px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 4px;
      position: relative;
      z-index: 101;
      margin-right: 8px;
      &.white {
        margin: 0 0 0 auto;
        padding: 30px;
        justify-content: flex-end;
      }
    }
    @media (max-width: 479px) {
      margin: -1px;
    }
  }
  .burger {
    display: none;
    @media (max-width: 767px) {
      display: block;
      cursor: pointer;
      min-width: 26px;
      height: 14px;
      position: relative;
      z-index: 102;
      background-color: transparent;
      display: flex;
      justify-content: center;
      &.white {
        min-width: 28px;
        height: 18px;
        span {
          background-color: var(--dark-gray);
        }
      }
    }
    span {
      transition: 0.3s;
      height: 3.4px;
      position: absolute;
      border-radius: 10px;
      background-color: var(--dark-gray);
      transition: 0.1s;
      &:nth-child(1) {
        top: 0;
        width: 100%;
        transition: 0.1s;
      }
      &:nth-child(2) {
        top: calc(100% - 2px);
        width: 100%;
        transition: 0.1s;
      }
    }
    &.active {
      min-width: 30px;

      span {
        transition: 0.1s;
        background-color: var(--white);

        &:nth-child(1) {
          top: 50%;
          transform: rotate(45deg);
        }
        &:nth-child(2) {
          transform: rotate(-45deg);
          top: 50%;
        }
      }
    }
  }
  .nuxt-link-active,
  .nuxt-link-exact-active {
    color: var(--primary);
    border-bottom: 1px solid var(--primary);
  }
</style>
