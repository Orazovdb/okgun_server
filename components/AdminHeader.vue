<template>
  <div class="admin-header">
    <div class="admin-header__left">
      <div class="admin-header__input">
        <div class="admin-header__input-icon">
          <base-icon icon="adminSearch" />
        </div>
        <input type="text" placeholder="Gözlaň..." />
      </div>
      <base-button v-if="button" @clickedButton="$emit('clickAdd')" adminButton
        >Goşmak</base-button
      >
    </div>
    <div class="admin-header__right">
      <div class="flex gap-6 flex-y-center">
        <base-icon icon="adminProfile" />
        <span class="admin-name">admin</span>
      </div>
      <div @click="logOut">
        <base-icon icon="logout"></base-icon>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    button: {
      type: Boolean,
      default: () => true,
    },
  },
  methods: {
    logOut() {
      localStorage.removeItem("Authorization");
      this.$cookies.remove("Authorization");
      this.$router.push("/admin/login");
    },
  },
};
</script>

<style lang="scss" scoped>
.admin-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 20px;
  min-height: 66px;
  background-color: #fff;
  &__left {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  &__input {
    position: relative;
    input {
      width: 315px;
      border-radius: 8px;
      border: 1px solid #f5f6f7;
      background: #f7f8fa;
      box-shadow: 0px 2px 5px 0px rgba(38, 51, 77, 0.03);
      transition: 0.2s ease 0s;
      padding: 8px 20px 8px 54px;
      height: 40px;
      &:focus {
        border: 1px solid var(--text);
      }
      &::placeholder {
        color: #57647d;
        font-size: 14px;
        font-weight: 400;
        line-height: 120%;
      }
    }
  }

  &__input-icon {
    position: absolute;
    top: 50%;
    left: 20px;
    transform: translateY(-50%);
  }

  &__right {
    display: flex;
    align-items: center;
    gap: 20px;
  }
}
.admin-name {
  color: #57647d;
  font-size: 14px;
  font-weight: 700;
  line-height: 120%;
}
</style>
