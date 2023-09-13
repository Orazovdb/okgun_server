<template>
  <div>
    <admin-header @clickAdd="openPopUp" />
    <div class="admin-layout__body">
      <div class="admin-banner">
        <div class="table">
          <table>
            <thead>
              <tr>
                <th>№</th>
                <th class="img">Photo</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in data" :key="item.uuid">
                <td>{{ index + 1 }}</td>
                <td class="img">
                  <div class="img">
                    <img :src="`${baseURL}/uploads/slider/${item.image_tm}`" alt="" />
                  </div>
                </td>
                <td>
                  <div class="flex flex-y-center gap-10">
                    <base-icon @clicked="update(item)" icon="edit" />
                    <base-icon @clicked="deleteItem(item.uuid)" icon="crash" />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <pop-up-banner
      v-if="isPopUp"
      @close="closePopUp"
      @save="save"
      :slide="slide"
      :image_path_tm="image_path_tm"
      :image_path_ru="image_path_ru"
      :image_path_en="image_path_en"
    ></pop-up-banner>
  </div>
</template>

<script>
  import PopUpBanner from '@/components/popup/PopUpBanner'
  import { GET_SLIDER, DELETE_SLIDER } from '@/api/admin.api'
  import { mapGetters } from 'vuex'

  export default {
    layout: 'admin',
    middleware: ['auth-admin'],
    components: {
      PopUpBanner
    },
    data() {
      return {
        isPopUp: false,
        data: [],
        slide: {},
        image_path_tm: '',
        image_path_ru: '',
        image_path_en: ''
      }
    },
    computed: {
      ...mapGetters(['baseURL'])
    },
    async mounted() {
      await this.fetch()
    },
    methods: {
      async fetch() {
        try {
          const { data, status } = await GET_SLIDER()
          if (status) {
            this.data = data || []
          }
        } catch (error) {
          console.log(error)
        }
      },
      async deleteItem(uuid) {
        try {
          const { data, status } = await DELETE_SLIDER({ data: { uuid: uuid } })
          if (status) {
            await this.fetch()
          }
        } catch (error) {
          console.log(error)
        }
      },
      update(item) {
        this.isPopUp = true
        this.slide = item
        this.image_path_tm = `${this.baseURL}/uploads/category/${item.photo_tm}`
        this.image_path_ru = `${this.baseURL}/uploads/category/${item.photo_ru}`
        this.image_path_en = `${this.baseURL}/uploads/category/${item.photo_en}`
      },
      openPopUp() {
        this.isPopUp = true
      },
      async closePopUp() {
        this.isPopUp = false
        Object.keys(this.slide).forEach((key) => (this.slide[key] = null))
      },
      async save() {
        await this.fetch()
        this.isPopUp = false
      }
    }
  }
</script>

<style lang="scss" scoped>
  .admin-banner {
    height: 100%;
  }
</style>
