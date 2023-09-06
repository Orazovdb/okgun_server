<template>
  <div class="contact">
    <div class="contact__container">
      <h1 class="contact__title">{{ $t("contactUs") }}</h1>
      <div class="contact__row">
        <base-input
          :label="$t('name')"
          placeholder="..."
          :value="send.name"
          @updateValue="(val) => (send.name = val)"
        />
        <base-input
          :label="$t('phoneNumber')"
          placeholder="..."
          type="number"
          :value="send.number"
          @updateValue="(val) => (send.number = val)"
        />
        <base-input
          :label="$t('email')"
          type="email"
          placeholder="..."
          :value="send.email"
          @updateValue="(val) => (send.email = val)"
        />
        <base-textarea
          :label="$t('text')"
          placeholder="..."
          :value="send.context"
          @updateValue="(val) => (send.context = val)"
        />
      </div>
      <div class="flex flex-x-end">
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
      send: {
        name: null,
        email: null,
        number: null,
        context: null,
      },
    };
  },
  methods: {
    async sendLetter() {
      if (
        !this.send.name ||
        !this.send.email ||
        !this.send.number ||
        !this.send.context
      ) {
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
};
</script>

<style lang="scss" scoped>
.contact {
  background-color: #fafafa;
  padding: 100px 0;
  @media (max-width: 767px) {
    padding: 40px 0;
  }
  &__container {
    max-width: 1100px;
    margin: 0 auto;
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
    gap: 40px;
    margin-bottom: 30px;
    @media (max-width: 767px) {
      grid-template-columns: 1fr;
      gap: 16px;
    }
  }
}
</style>
