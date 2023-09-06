<template>
  <div :class="{ opacity: status }">
    <pop-up @close="$emit('close')" title="Slide goşmak">
      <base-languages @selectLanguage="toggleLanguage" :activeLang="activeLang"></base-languages>
      <base-row>
        <base-col cols="8">
          <base-input label="Title" @updateValue="(val) => (main[`title_${activeLang}`] = val)" :value="main[`title_${activeLang}`]"></base-input>
        </base-col>
        <base-col rows="3" cols="3">
          <avatar-uploader :imgPath="image_path" @uploadFile="uploadFile"></avatar-uploader>
        </base-col>
        <base-col cols="8">
          <input @change="changeFile" type="file" />
        </base-col>
        <base-col cols="12" class="flex gap-20 flex-x-end">
          <base-button @clickedButton="$emit('close')" adminButton>Ýatyrmak</base-button>
          <base-button @clickedButton="save" adminButton>Ýatda saklamak</base-button>
        </base-col>
      </base-row>
    </pop-up>
  </div>
</template>

<script>
  import PopUp from '@/components/popup/PopUp.vue'
  import { ADD_CATALOG } from '@/api/admin.api'
  import { mapGetters } from 'vuex'

  export default {
    components: {
      PopUp
    },
    props: {
      item: {
        type: Object,
        default: () => null
      }
    },
    data() {
      return {
        activeLang: 'tm',
        image_path: '',
        pdf_path: '',
        status: false,
        main: {
          title_tm: '',
          title_ru: '',
          title_en: '',
          photo: null,
          file: null
        }
      }
    },
    computed: {
      ...mapGetters(['baseURL'])
    },
    mounted() {
      this.image_path = ''
      if (this.item?.uuid) {
        this.main.photo = ''
        this.main.file = ''
        this.main.title_tm = this.item.title_tm
        this.main.title_ru = this.item.title_ru
        this.main.title_en = this.item.title_en
        this.image_path = `${this.baseURL}/uploads/catalog/${this.item.image_path}`
      }
    },
    methods: {
      toggleLanguage(key) {
        this.activeLang = key
      },
      uploadFile(file) {
        this.main.photo = file
        this.image_path = ''
      },
      changeFile(file) {
        this.main.file = file.target.files[0]
      },
      async save() {
        if (!this.main.title_tm || !this.main.title_ru || !this.main.title_en) {
          alert('Dolduryn')
        } else {
          this.status = true
          if (this.item?.uuid) this.main.uuid = this.item.uuid
          try {
            const { data, status } = await ADD_CATALOG({ data: this.main })
            if (status) {
              this.$emit('close')
            }
          } catch (error) {
            console.log(error)
          } finally {
            this.status = false
          }
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .opacity {
    pointer-events: none;
    opacity: 0.5;
  }
</style>
