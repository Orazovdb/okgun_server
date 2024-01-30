<template>
  <div class="admin-banner">
    <admin-header @clickAdd="openPopUp" />
    <base-table>
      <thead>
        <tr>
          <th>№</th>
          <th>Surat</th>
          <th>Text</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in data" :key="item.id">
          <td>{{ index + 1 }}</td>
          <td class="img">
            <div class="img">
              <img
                :src="`${baseURL}/uploads/catalog/${item.image_path}`"
                alt=""
              />
            </div>
          </td>
          <td>
            {{ item.title_tm }}
          </td>
          <td>
            <div class="flex flex-y-center gap-10">
              <base-icon @clicked="update(item)" icon="edit" />
              <base-icon @clicked="deleteItem(item.uuid)" icon="crash" />
            </div>
          </td>
        </tr>
      </tbody>
    </base-table>
    <pop-up-catalog
      v-if="isPopUp"
      @close="closePopUp"
      :item="catalogItem"
    ></pop-up-catalog>
  </div>
</template>

<script>
import { DELETE_CATALOG, GET_CATALOG } from "@/api/admin.api";
import PopUpCatalog from "@/components/popup/PopUpCatalog.vue";
import { mapGetters } from "vuex";

export default {
  layout: "admin",
  components: { PopUpCatalog },
  middleware: "auth-admin",
  data() {
    return {
      isPopUp: false,
      data: [],
      catalogItem: null,
    };
  },
  async mounted() {
    await this.fetch();
  },
  computed: {
    ...mapGetters(["baseURL"]),
  },
  methods: {
    async fetch() {
      try {
        const { data, status } = await GET_CATALOG();
        if (status) {
          this.data = data || [];
        }
      } catch (error) {
        console.log(error);
      }
    },
    async deleteItem(uuid) {
      try {
        const { data, status } = await DELETE_CATALOG({ data: { uuid: uuid } });
        if (status) {
          await this.fetch();
        }
      } catch (error) {
        console.log(error);
      }
    },
    update(item) {
      this.isPopUp = true;
      this.catalogItem = item;
    },
    async closePopUp() {
      this.isPopUp = false;
      if (this.catalogItem) {
        Object.keys(this.catalogItem).forEach(
          (key) => (this.catalogItem[key] = null)
        );
      }
      await this.fetch();
    },
    openPopUp() {
      this.isPopUp = true;
    },
    async save() {
      await this.fetch();
      this.isPopUp = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.admin-banner {
  height: 100%;
}
</style>
