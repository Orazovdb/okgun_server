<template>
  <div>
    <pop-up @close="$emit('close')" title="Slide goshmak">
      <base-languages @selectLanguage="toggleLanguage" :activeLang="activeLang" />
      <base-row>
        <base-col cols="12" style="height: 300px">
          <avatar-uploader
            v-if="activeLang === 'tm'"
            :imgPath="image_path_tm"
            @uploadFile="uploadTmFile"
            :image="photo_tm"
            :activeLang="activeLang"
          />
          <avatar-uploader
            v-if="activeLang === 'ru'"
            :imgPath="image_path_ru"
            @uploadFile="uploadRuFile"
            :image="photo_ru"
            :activeLang="activeLang"
          />
          <avatar-uploader
            v-if="activeLang === 'en'"
            :imgPath="image_path_en"
            @uploadFile="uploadEnFile"
            :image="photo_en"
            :activeLang="activeLang"
          />
        </base-col>
        <base-col cols="12" class="flex gap-20 flex-x-end">
          <base-button @clickedButton="$emit('close')" adminButton> Ýatyrmak </base-button>
          <base-button @clickedButton="save" adminButton>Ýatda saklamak</base-button>
        </base-col>
      </base-row>
    </pop-up>
  </div>
</template>

<script>
  import PopUp from '@/components/popup/PopUp.vue'
  import { ADD_SLIDER } from '@/api/admin.api'
  import { mapGetters } from 'vuex'

  export default {
    components: {
      PopUp
    },
    props: {
      slide: {
        type: Object,
        default: () => null
      },
      image_path_tm: {
        type: String,
        default: () => null
      },
			image_path_ru: {
        type: String,
        default: () => null
      },
			image_path_en: {
        type: String,
        default: () => null
      }
    },
    data() {
      return {
        image_path_tm: '',
        image_path_ru: '',
        image_path_en: '',
        activeLang: 'tm',
        photo_tm: null,
        photo_en: null,
        photo_ru: null,
        main: {
          photo_tm: null,
          photo_ru: null,
          photo_en: null
        }
      }
    },
    computed: {
      ...mapGetters(['baseURL'])
    },
    mounted() {
      this.image_path_ru = ''
      this.image_path_en = ''
      this.image_path_tm = ''
      if (this.slide.uuid) {
        this.main.photo_en = this.main.photo_ru = this.main.photo_tm = ''
        this.image_path_en = `${this.baseURL}/uploads/slider/${this.slide.image_path_en}`
        this.image_path_ru = `${this.baseURL}/uploads/slider/${this.slide.image_path_ru}`
        this.image_path_tm = `${this.baseURL}/uploads/slider/${this.slide.image_path_tm}`
      }
    },
    methods: {
      toggleLanguage(key) {
        console.log(key)
        this.activeLang = key
      },
      uploadTmFile(file) {
        this.main.photo_tm = file
        this.photo_tm = URL.createObjectURL(file)
        this.image_path_tm = ''
      },
      uploadEnFile(file) {
        this.main.photo_en = file
        this.photo_en = URL.createObjectURL(file)
        this.image_path_en = ''
      },
      uploadRuFile(file) {
        this.main.photo_ru = file
        this.photo_ru = URL.createObjectURL(file)
        this.image_path_ru = ''
      },
      async save() {
        if (this.slide.uuid) this.main.uuid = this.slide.uuid
        try {
          const { data, status } = await ADD_SLIDER({ data: this.main })
          if (status) {
            this.$emit('save')
          }
        } catch (error) {
          console.log(error)
        }
        console.log(this.photo_en)
      }
    }
  }
</script>

<style lang="scss" scoped></style>
