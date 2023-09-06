<template>
  <div>
    <pop-up @close="$emit('close')" title="Goşmak">
      <base-languages @selectLanguage="toggleLanguage" :activeLang="activeLang"></base-languages>
      <base-row>
        <base-col cols="8">
          <base-textarea label="TEXT" @updateValue="(val) => (main[`text_${activeLang}`] = val)" :value="main[`text_${activeLang}`]"></base-textarea>
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
  import { ADD_ABOUT } from '@/api/admin.api'

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
        main: {
          text_tm: '',
          text_ru: '',
          text_en: ''
        }
      }
    },
    mounted() {
      if (this?.item?.uuid) {
        this.main.text_tm = this.item.text_tm
        this.main.text_ru = this.item.text_ru
        this.main.text_en = this.item.text_en
      }
    },
    methods: {
      toggleLanguage(key) {
        this.activeLang = key
      },
      async save() {
        if (!this.main.text_en || !this.main.text_ru || !this.main.text_tm) {
          alert('Doldur')
        } else {
          if (this.item?.uuid) this.main.uuid = this.item.uuid
          try {
            const { data, status } = await ADD_ABOUT({ data: this.main })
            if (status) {
              this.$emit('save')
            }
          } catch (error) {
            console.log(error)
          }
        }
      }
    }
  }
</script>

<style lang="scss" scoped></style>
