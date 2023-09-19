<template>
  <div class="wrapper">
    <the-header></the-header>
    <div ref="main"></div>
    <main class="main">
      <nuxt />
      <client-only>
        <the-contact />
      </client-only>
    </main>
    <client-only>
      <the-footer></the-footer>
    </client-only>
  </div>
</template>

<script>
export default {
  watch: {
    $route() {
      document.querySelector(".wrapper").scrollTop = 0;
    },
  },
  data() {
    return {
      observer: null,
    };
  },
  head() {
    return this.$nuxtI18nHead();
  },
  mounted() {
    if (this.$refs.main) {
      const options =
        {
          rootMargin: "100px 0px 0px 0px",
          threshold: 0.4,
        } || {};
      this.observer = new IntersectionObserver(async ([entry]) => {
        if (entry && entry.isIntersecting) {
          const elemAos = document.querySelectorAll(".aos");
          console.log(elemAos);
          elemAos.forEach((elem) => {
            if (!elem.classList.contains("menu")) {
              elem.classList.remove("aos");
            }
          });
        }
      }, options);
      this.observer.observe(this.$refs.main);
    }
  },
  destroyed() {
    this.observer.disconnect();
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow-x: hidden;
  &._lock {
    overflow: hidden;
    -ms-touch-action: none;
    touch-action: none;
    height: 100vh;
  }
}
.main {
  flex: 1 1 auto;
  // margin-top: 150px;
  @media (max-width: 767px) {
    // margin-top: 76px;
  }
}
</style>
