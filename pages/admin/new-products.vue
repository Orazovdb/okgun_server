<template>
  <div>
    <admin-header @clickAdd="openPopUp" />
    <div class="admin-layout__body">
      <div class="admin">
        <base-table class="table">
          <thead>
            <tr>
              <th>№</th>
              <th class="img">Photo</th>
              <th>Title</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in products" :key="index">
              <td>{{ index + 1 }}</td>
              <td class="img">
                <div class="img">
                  <img :src="`${baseURL}/${item.image_path}`" alt="" />
                </div>
              </td>
              <td>{{ item.title_tm }}</td>
              <td>
                <div class="flex flex-y-center gap-10">
                  <base-icon @clicked="updateProduct(item)" icon="edit" />
                  <base-icon
                    @clicked="deleteProductItem(item.uuid)"
                    icon="crash"
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </base-table>
        <div class="pagination">
          <!-- <base-pagination
            v-if="paginationCount > 1"
            :modelValue="page"
            @clickPage="(pagination) => updatePage(pagination)"
            :pageCount="paginationCount"
          ></base-pagination> -->
        </div>
      </div>
    </div>
    <pop-up-products-new
      v-if="isPopUp"
      @close="closeProductPopUp"
      :categoryId="selectedId"
      :item="productItem"
    ></pop-up-products-new>
  </div>
</template>

<script>
import { DELETE_PRODUCT_NEW, GET_PRODUCT_NEW } from "@/api/admin.api";
import PopUpProductsNew from "@/components/popup/PopUpProductsNew.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    PopUpProductsNew,
  },
  layout: "admin",
  middleware: "auth-admin",
  data() {
    return {
      isPopUp: false,
      isPopUpCategory: false,
      selectedId: null,
      productItem: null,
      buttons: [],
      products: [],
      limit: 1000,
      page: 1,
      // paginationCount: 0,
    };
  },
  async mounted() {
    await this.fetchProductsNew();
  },
  computed: {
    ...mapGetters(["baseURL"]),
  },
  methods: {
    async fetchProductsNew() {
      try {
        const { data, status } = await GET_PRODUCT_NEW({
          data: { limit: this.limit, page: this.page },
        });
        if (status) {
          this.products = data || [];
          console.log(data);
          // this.paginationCount = Math.ceil(data.count / this.limit);
        }
      } catch (error) {
        console.log(error);
      }
    },

    async deleteProductItem(uuid) {
      try {
        const { data, status } = await DELETE_PRODUCT_NEW({
          data: { uuid: uuid },
        });
        if (status) {
          this.fetchProductsNew();
        }
      } catch (error) {
        console.log(error);
      }
    },

    openPopUp() {
      this.isPopUp = true;
    },

    updateProduct(item) {
      this.isPopUp = true;
      this.productItem = item;
    },
    async closeProductPopUp() {
      this.isPopUp = false;
      this.fetchProductsNew();
      if (this.productItem) {
        Object.keys(this.productItem).forEach(
          (key) => (this.productItem[key] = null)
        );
      }
    },
    async updatePage(p) {
      this.page = p;
      await this.fetchProductsNew;
    },
  },
};
</script>

<style lang="scss" scoped>
.admin {
  height: 100%;
  margin-top: 20px;
  &__buttons-wrapper {
    padding: 6px 14px;
    border: 1px solid #f2f4f7;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__buttons {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  &__button {
    padding: 12px 16px;
    color: #637083;
    cursor: pointer;
    background: transparent;
    font-size: 16px;
    font-weight: 600;
    border-radius: 6px;

    &.active {
      color: #1975ff;
      background-color: #fff;
      box-shadow: 0px 2px 4px 0px rgba(52, 64, 81, 0.12);
    }
  }
}
.table {
  height: calc(100vh - 212px);
}
</style>
