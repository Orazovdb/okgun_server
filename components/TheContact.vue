<template>
  <div class="contact" ref="aos">
    <div class="contact__container">
      <h1 class="contact__title">{{ $t("contactUs") }}</h1>
      <div class="contact__row" ref="image">
        <base-input
          :label="$t('name')"
          placeholder="..."
          :value="send.name"
          @updateValue="(val) => (send.name = val)"
        />
        <base-input
          :label="$t('text')"
          placeholder="..."
          :value="send.name"
          @updateValue="(val) => (send.name = val)"
        />
        <base-textarea
          :label="$t('theme')"
          placeholder="..."
          :value="send.context"
          @updateValue="(val) => (send.context = val)"
          class="rowspan"
        />
        <base-input
          :label="$t('email')"
          type="email"
          placeholder="..."
          :value="send.email"
          @updateValue="(val) => (send.email = val)"
        />
      </div>
      <div class="flex flex-x-end mt-2">
        <base-button banner @clickedButton="sendLetter">{{
          $t("send")
        }}</base-button>
      </div>
    </div>
  </div>
</template>

<script>
import { CONTACT_ADD } from "@/api/home.api";
export default {
  data() {
    return {
      observer: null,
      send: {
        name: null,
        email: null,
        // number: null,
        context: null,
      },
    };
  },
  methods: {
    async sendLetter() {
      if (!this.send.name || !this.send.email || !this.send.context) {
        alert(this.$t("isEmpty"));
        return;
      }
      try {
        const { data, status } = await CONTACT_ADD({ data: this.send });
        if (status) {
          alert(this.$t("successSend"));
          Object.keys(this.send).forEach((key) => (this.send[key] = null));
        }
      } catch (error) {
        console.log(error);
      }
    },
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
          this.$refs.image.classList.add("aos");
          const elemAos = document.querySelectorAll(".aos");
          elemAos.forEach((elem) => {
            if (
              !elem.classList.contains("contact__row") &&
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
};
</script>

<style lang="scss" scoped>
.contact {
  background-color: #efefef;
  padding: 60px 0;
  @media (max-width: 767px) {
    padding: 40px 0;
  }
  &__container {
    max-width: 1100px;
    margin: 0 auto;
    box-shadow: 0.2px 0.2px 5px;
    border-radius: 10px;
    padding: 20px 40px;
  }

  &__title {
    color: var(--text);
    font-size: 60px;
    font-weight: 900;
    line-height: 120%;
    margin-bottom: 40px;
    @media (max-width: 767px) {
      margin-bottom: 30px;
      font-size: 30px;
    }
  }

  &__row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;
    .rowspan {
      grid-column-start: 2;
      grid-row-start: 4;
      grid-row-end: 1;
      textarea {
        height: 100% !important;
      }
      @media (max-width: 767px) {
        grid-column-start: auto;
        grid-row-start: auto;
        grid-row-end: auto;
      }
    }
    @media (max-width: 767px) {
      grid-template-columns: 1fr;
      gap: 16px;
    }
    transform: translateY(80px);
    opacity: 0;
    &.aos {
      opacity: 1;
      transform: translateY(0px);
      transition: 0.4s all;
    }
  }
}
</style>
