<template>
  <div class="admin-layout">
    <div class="admin-layout__row">
      <admin-sidebar />
      <div class="admin-layout__body-wrapper">
        <nuxt />
        <!-- <admin-header />
        <div class="admin-layout__body">
          <nuxt />
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: ["auth-admin"],
};
</script>

<style lang="scss" scoped>
.admin-layout {
  width: 100%;
  height: 100vh;
  background-color: var(--admin-background);
  overflow: hidden;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif !important;
  &__row {
    display: grid;
    grid-template-columns: 290px 1fr;
    height: 100%;
  }

  &__body-wrapper {
    position: relative;
  }

  &__body {
    margin: 20px;
    height: 100%;
  }
}
</style>
