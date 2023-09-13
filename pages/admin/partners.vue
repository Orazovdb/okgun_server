<template>
  <div>
    <admin-header @clickAdd="openPopUp" />
    <div class="partners">
      <div class="partners__row">
        <div class="partners__item" v-for="item in data" :key="item.uuid">
          <div class="partners__item-top">
            <div class="flex flex-x-end gap-4">
              <base-icon @clicked="updateCategory(item)" icon="edit" />
              <base-icon @clicked="deleteItem(item.uuid)" icon="crash" />
            </div>
          </div>
          <div class="partners__item-image">
            <img :src="`${baseURL}/uploads/service/${item.image_path}`" alt="" />
          </div>
        </div>
      </div>

      <pop-up-partners v-if="isPopUp" @close="closePopUp" @save="save" :item="partnersItem" />
    </div>
  </div>
</template>

<script>
  import PopUpPartners from '@/components/popup/PopUpPartners.vue'
  import { GET_PARTNERS, DELETE_PARTNER } from '@/api/admin.api'
  import { mapGetters } from 'vuex'

  export default {
    components: { PopUpPartners },
    middleware: ['auth-admin'],
    data() {
      return {
        isPopUp: false,
        partnersItem: null,
        data: []
      }
    },
    computed: {
      ...mapGetters(['baseURL'])
    },
    async mounted() {
      await this.fetch()
    },
    methods: {
      openPopUp() {
        this.isPopUp = true
      },
      updateCategory(item) {
        this.isPopUp = true
        this.partnersItem = item
      },
      async fetch() {
        try {
          const { data, status } = await GET_PARTNERS()
          if (status) {
            this.data = data || []
          }
        } catch (error) {
          console.log(error)
        }
      },
      async deleteItem(uuid) {
        try {
          const { data, status } = await DELETE_PARTNER({ data: { uuid: uuid } })
          if (status) {
            await this.fetch()
          }
        } catch (error) {
          console.log(error)
        }
      },
      async closePopUp() {
        this.isPopUp = false
        await this.fetch()
        if (this.partnersItem) {
          Object.keys(this.partnersItem).forEach((key) => (this.partnersItem[key] = null))
        }
      },
      async save() {
        await this.fetch()
        this.isPopUp = false
      }
    },
    layout: 'admin'
  }
</script>

<style lang="scss" scoped>
  .pagination {
    border-top: 1px solid #f5f6f7;
    position: absolute;
    bottom: 0;
    left: 0;
    height: 68px;
    background-color: #fff;
    z-index: 10;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .partners {
    background-color: #fff;
    height: calc(100% - 11%);
    border-radius: 6px;
    padding: 20px;
    position: relative;

    &__row {
      display: grid;
      grid-template-columns: repeat(6, 1fr);
      gap: 20px;
    }

    &__item {
      border: 1px solid #edeff2;
    }

    &__item-top {
      padding: 8px 10px;
    }

    &__item-image {
      padding: 10px;
      height: 180px;
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        object-position: center;
      }
    }
  }
</style>
