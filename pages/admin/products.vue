<template>
  <div>
    <admin-header @clickAdd="openPopUp" />
    <div class="admin-layout__body">
      <div class="admin">
        <div class="admin__buttons-wrapper">
          <div class="admin__buttons">
            <button v-for="button in buttons" :key="button.uuid" :class="['admin__button', ' flex', { active: selectedId === button.uuid }]">
              <p @click="selectedId = button.uuid">{{ button.title_tm }}</p>
              <div class="flex flex-y-center gap-10 ml-1">
                <base-icon @clicked="updateCategory(button)" icon="edit" />
                <base-icon @clicked="deleteCategoryItem(button.uuid)" icon="crash" />
              </div>
            </button>
          </div>
          <base-icon @clicked="openPopUpCategory" icon="add"></base-icon>
        </div>
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
                  <img :src="`${baseURL}/uploads/products/${item.image_path}`" alt="" />
                </div>
              </td>
              <td>{{ item.title_tm }}</td>
              <td>
                <div class="flex flex-y-center gap-10">
                  <base-icon @clicked="updateProduct(item)" icon="edit" />
                  <base-icon @clicked="deleteProductItem(item.uuid)" icon="crash" />
                </div>
              </td>
            </tr>
          </tbody>
        </base-table>
        <div class="pagination">
          <base-pagination
            v-if="paginationCount > 1"
            :modelValue="page"
            @clickPage="(pagination) => updatePage(pagination)"
            :pageCount="paginationCount"
          ></base-pagination>
        </div>
      </div>
    </div>
    <pop-up-products v-if="isPopUp" @close="closeProductPopUp" :categoryId="selectedId" :item="productItem"></pop-up-products>
    <pop-up-category v-if="isPopUpCategory" @close="closeCategoryPopUp" :item="categoryItem"></pop-up-category>
  </div>
</template>

<script>
  import PopUpProducts from '@/components/popup/PopUpProducts.vue'
  import PopUpCategory from '@/components/popup/PopUpCategory.vue'
  import { mapGetters } from 'vuex'
  import { GET_CATEGORY, DELETE_CATEGORY, GET_PRODUCT, DELETE_PRODUCT } from '@/api/admin.api'

  export default {
    components: {
      PopUpProducts,
      PopUpCategory
    },
    layout: 'admin',
    middleware: ['auth-admin'],
    data() {
      return {
        isPopUp: false,
        isPopUpCategory: false,
        selectedId: null,
        categoryItem: null,
        productItem: null,
        buttons: [],
        products: [],
        limit: 10,
        page: 1,
        paginationCount: 0
      }
    },
    async mounted() {
      this.fetchCategory()
    },
    watch: {
      selectedId(val) {
        this.fetchProductsById(val)
      }
    },
    computed: {
      ...mapGetters(['baseURL'])
    },
    methods: {
      async fetchCategory() {
        try {
          const { data, status } = await GET_CATEGORY()
          if (status) {
            this.buttons = data || []
            this.selectedId = data[0].uuid
          }
        } catch (error) {
          console.log(error)
        }
      },
      async fetchProductsById(uuid) {
        try {
          const { data, status } = await GET_PRODUCT({
            data: { uuid: uuid, limit: this.limit, page: this.page }
          })
          if (status) {
            this.products = data.products || []
            this.paginationCount = Math.ceil(data.count / this.limit)
          }
        } catch (error) {
          console.log(error)
        }
      },
      async deleteCategoryItem(uuid) {
        try {
          const { data, status } = await DELETE_CATEGORY({
            data: { uuid: uuid }
          })
          if (status) {
            await this.fetchCategory()
          }
        } catch (error) {
          console.log(error)
        }
      },

      async deleteProductItem(uuid) {
        try {
          const { data, status } = await DELETE_PRODUCT({ data: { uuid: uuid } })
          if (status) {
            this.fetchProductsById(this.selectedId)
          }
        } catch (error) {
          console.log(error)
        }
      },

      openPopUp() {
        this.isPopUp = true
      },
      openPopUpCategory() {
        this.isPopUpCategory = true
      },
      async closeCategoryPopUp() {
        this.isPopUpCategory = false
        await this.fetchCategory()
        if (this.categoryItem) {
          Object.keys(this.categoryItem).forEach((key) => (this.categoryItem[key] = null))
        }
      },
      updateCategory(item) {
        this.isPopUpCategory = true
        this.categoryItem = item
      },
      updateProduct(item) {
        this.isPopUp = true
        this.productItem = item
      },
      async closeProductPopUp() {
        this.isPopUp = false
        this.fetchProductsById(this.selectedId)
        if (this.productItem) {
          Object.keys(this.productItem).forEach((key) => (this.productItem[key] = null))
        }
      },
      async updatePage(p) {
        this.page = p
        await this.fetchProductsById(this.selectedId)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .admin {
    height: 100%;
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
