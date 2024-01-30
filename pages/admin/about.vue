<template>
  <div class="admin-banner">
    <admin-header :button="!data.length >= 1" @clickAdd="openPopUp" />
    <base-table>
      <thead>
        <tr>
          <th>№</th>
          <th>Text</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in data" :key="item.id">
          <td>01</td>

          <td>
            {{ item.text_tm }}
          </td>
          <td>
            <div class="flex flex-y-center gap-10">
              <base-icon @clicked="update(item)" icon="edit" />
            </div>
          </td>
        </tr>
      </tbody>
    </base-table>

    <pop-up-about
      v-if="isPopUp"
      @close="isPopUp = false"
      @save="save"
      :item="aboutUs"
    ></pop-up-about>
  </div>
</template>

<script>
import { GET_ABOUT } from "@/api/admin.api";
import PopUpAbout from "@/components/popup/PopUpAbout.vue";

export default {
  components: { PopUpAbout },
  middleware: "auth-admin",
  data() {
    return {
      isPopUp: false,
      data: [],
      aboutUs: null,
    };
  },
  async mounted() {
    await this.fetch();
  },
  methods: {
    async fetch() {
      try {
        const { data, status } = await GET_ABOUT();
        if (status) {
          this.data = data || [];
        }
      } catch (error) {
        console.log(error);
      }
    },
    update(item) {
      this.isPopUp = true;
      this.aboutUs = item;
    },
    closePopUp() {
      this.isPopUp = false;
      Object.keys(this.aboutUs).forEach((key) => (this.aboutUs[key] = null));
    },
    openPopUp() {
      this.isPopUp = true;
    },
    async save() {
      await this.fetch();
      this.isPopUp = false;
    },
  },
  layout: "admin",
};
</script>

<style lang="scss" scoped>
.admin-banner {
  height: 100%;
}
</style>
