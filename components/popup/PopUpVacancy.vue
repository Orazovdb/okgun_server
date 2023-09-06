<template>
  <div>
    <pop-up @close="$emit('close')" title="Wakansiýa goşmak">
      <base-languages @selectLanguage="toggleLanguage" :activeLang="activeLang"></base-languages>
      <base-row>
        <base-col cols="6">
          <base-input @updateValue="(val) => (main[`date`] = val)" :value="main[`date`]" label="Iş wagty" placeholder="08:00-09:00"></base-input>
        </base-col>
        <base-col cols="6">
          <base-input @updateValue="(val) => (main[`age`] = val)" :value="main[`age`]" label="Ýaşy" placeholder="20-45"></base-input>
        </base-col>
        <base-col cols="6">
          <base-input @updateValue="(val) => (main[`salary`] = val)" :value="main[`salary`]" label="Aylygy" placeholder="Aylygy"></base-input>
        </base-col>
        <base-col cols="6">
          <base-input
            @updateValue="(val) => (main[`work_name_${activeLang}`] = val)"
            :value="main[`work_name_${activeLang}`]"
            label="Işiň ady"
            placeholder="Yurist"
          ></base-input>
        </base-col>
        <base-col cols="6">
          <base-input
            @updateValue="(val) => (main[`degree_${activeLang}`] = val)"
            :value="main[`degree_${activeLang}`]"
            label="Hünär derejesi"
            placeholder="Öň işläp gören bolmaly"
          ></base-input>
        </base-col>
        <base-col cols="6">
          <base-input
            @updateValue="(val) => (main[`gender_${activeLang}`] = val)"
            :value="main[`gender_${activeLang}`]"
            label="Jynsy"
            placeholder="Ayal"
          ></base-input>
        </base-col>

        <base-col cols="6">
          <base-input
            @updateValue="(val) => (main[`place_${activeLang}`] = val)"
            :value="main[`place_${activeLang}`]"
            label="Ýerleşýän ýeri"
            placeholder="Mary Gress"
          ></base-input>
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
  import { ADD_JOBS } from '@/api/admin.api'

  export default {
    components: {
      PopUp
    },
    props: {
      item: {
        type: Object,
        default: () => {}
      }
    },
    data() {
      return {
        activeLang: 'tm',

        main: {
          uuid: '',
          date: '',
          degree_tm: '',
          degree_ru: '',
          degree_en: '',
          age: 0,
          salary: 0,
          work_name_tm: '',
          work_name_ru: '',
          work_name_en: '',
          gender_tm: '',
          gender_ru: '',
          gender_en: '',
          place_tm: '',
          place_ru: '',
          place_en: ''
        }
      }
    },
    mounted() {
      if (this.item?.uuid) {
        this.main.date = this.item.date
        this.main.degree_tm = this.item.degree_tm
        this.main.degree_ru = this.item.degree_ru
        this.main.degree_en = this.item.degree_en
        this.main.age = this.item.age
        this.main.salary = this.item.salary
        this.main.work_name_tm = this.item.work_name_tm
        this.main.work_name_ru = this.item.work_name_ru
        this.main.work_name_en = this.item.work_name_en

        this.main.gender_tm = this.item.gender_tm
        this.main.gender_ru = this.item.gender_ru
        this.main.gender_en = this.item.gender_en

        this.main.place_tm = this.item.place_tm
        this.main.place_ru = this.item.place_ru
        this.main.place_en = this.item.place_en
      }
    },
    methods: {
      toggleLanguage(key) {
        this.activeLang = key
      },
      async save() {
        if (
          !this.main.date ||
          !this.main.degree_tm ||
          !this.main.degree_ru ||
          !this.main.degree_en ||
          !this.main.age ||
          !this.main.salary ||
          !this.main.work_name_tm ||
          !this.main.work_name_ru ||
          !this.main.work_name_en ||
          !this.main.gender_tm ||
          !this.main.gender_ru ||
          !this.main.gender_en ||
          !this.main.place_tm ||
          !this.main.place_ru ||
          !this.main.place_en
        ) {
          alert('Dolduryn')
        } else {
          this.main.age = Number(this.main.age)
          this.main.salary = Number(this.main.salary)
          if (this.item?.uuid) this.main.uuid = this.item.uuid
          try {
            const { data, status } = await ADD_JOBS({ data: this.main })
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
