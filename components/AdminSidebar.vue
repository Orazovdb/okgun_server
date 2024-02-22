<template>
  <div class="admin-sidebar">
    <div class="admin-sidebar__body">
      <div class="admin-sidebar__logo">
        <img src="@/assets/img/logo.svg" alt="" />
      </div>
      <nav class="admin-sidebar-menu">
        <ul class="admin-sidebar-menu__list">
          <li
            class="admin-sidebar-menu__item"
            v-for="link in links"
            :key="link.id"
          >
            <nuxt-link
              :to="`/admin${link.to}`"
              exact
              class="admin-sidebar-menu__link"
            >
              <base-icon :icon="link.icon" />
              <span>{{ link.name }}</span>
            </nuxt-link>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      links: [
        {
          id: "1",
          to: "/",
          icon: "adminBanner",
          name: "Banner",
        },
        {
          id: "2",
          to: "/products",
          icon: "adminProduct",
          name: "Önümlerimiz",
        },
        {
          id: "6",
          to: "/catalog",
          icon: "adminProduct",
          name: "Katalog",
        },
        {
          id: "3",
          to: "/about",
          icon: "adminAbout",
          name: "Biz barada",
        },
        {
          id: "4",
          to: "/partners",
          icon: "adminPartners",
          name: "Hyzmatdaşlar",
        },
        {
          id: "5",
          to: "/vacancy",
          icon: "adminProfile",
          name: "Wakansiýa",
        },
        {
          id: "6",
          to: "/new-products",
          icon: "adminProduct",
          name: "Täze önümler",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.admin-sidebar {
  width: 290px;
  padding: 20px;
  background-color: #fff;
  &__body {
  }

  &__logo {
    margin-bottom: 40px;
  }
}
.admin-sidebar-menu {
  &__list {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  &__logo {
    margin-bottom: 40px;
  }
}
.admin-sidebar-menu {
  height: calc(100vh - 130px);
  overflow-y: auto;
  &__list {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  &__item {
  }

  &__link {
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 15px;
    transition: 0.2s ease 0s;
    border: 1px solid transparent;
    &:hover {
      border-radius: 10px;
      border: 1px solid #edeff2;
      background: #f7f8fa;
      box-shadow: 0px 2px 5px 0px rgba(38, 51, 77, 0.03);
    }
    &.nuxt-link-active,
    &.nuxt-link-exact-active {
      border-radius: 10px;
      border: 1px solid #edeff2;
      background: #f7f8fa;
      box-shadow: 0px 2px 5px 0px rgba(38, 51, 77, 0.03);
    }
    span {
      color: #57647d;
      font-size: 13px;
      font-weight: 900;
      line-height: 120%;
    }
  }
}
</style>
