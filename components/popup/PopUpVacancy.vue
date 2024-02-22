<template>
  <div>
    <pop-up @close="$emit('close')" title="Wakansiýa goşmak">
      <base-languages
        @selectLanguage="toggleLanguage"
        :activeLang="activeLang"
      ></base-languages>
      <base-row>
        <base-col cols="6">
          <base-input
            @updateValue="(val) => (main[`date`] = val)"
            :value="main[`date`]"
            label="Iş wagty"
            placeholder="08:00-09:00"
          ></base-input>
        </base-col>
        <base-col cols="6">
          <base-input
            @updateValue="(val) => (main[`age`] = val)"
            :value="main[`age`]"
            label="Ýaşy"
            placeholder="20-45"
          ></base-input>
        </base-col>
        <base-col cols="6">
          <base-input
            @updateValue="(val) => (main[`salary`] = val)"
            :value="main[`salary`]"
            label="Aylygy"
            placeholder="Aylygy"
          ></base-input>
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
          <div class="dropdown">
            <label for="velayats">Welaýaty saýlaň:</label>
            <select v-model="selected" name="velayats" id="velayats">
              <option
                v-for="velayat in velayats"
                :key="velayat.uuid"
                :value="velayat.uuid"
              >
                {{ velayat.welayat_name }}
              </option>
            </select>
          </div>
        </base-col>

        <base-col cols="12" class="flex gap-20 flex-x-end">
          <base-button @clickedButton="$emit('close')" adminButton
            >Ýatyrmak</base-button
          >
          <base-button @clickedButton="save" adminButton
            >Ýatda saklamak</base-button
          >
        </base-col>
      </base-row>
    </pop-up>
  </div>
</template>

<script>
import { ADD_JOBS, GET_JOBS_VELAYATS } from "@/api/admin.api";
import PopUp from "@/components/popup/PopUp.vue";

export default {
  components: {
    PopUp,
  },
  props: {
    item: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      activeLang: "tm",
      velayats: [],
      selected: null,
      main: {
        uuid: "",
        date: "",
        degree_tm: "",
        degree_ru: "",
        degree_en: "",
        age: 0,
        salary: 0,
        work_name_tm: "",
        work_name_ru: "",
        work_name_en: "",
        gender_tm: "",
        gender_ru: "",
        gender_en: "",
      },
    };
  },
  mounted() {
    if (this.item) {
      console.log(this.item);
      this.main.date = this.item.date;
      this.main.degree_tm = this.item.degree_tm;
      this.main.degree_ru = this.item.degree_ru;
      this.main.degree_en = this.item.degree_en;
      this.main.age = this.item.age;
      this.main.salary = this.item.salary;
      this.main.work_name_tm = this.item.work_name_tm;
      this.main.work_name_ru = this.item.work_name_ru;
      this.main.work_name_en = this.item.work_name_en;

      this.main.gender_tm = this.item.gender_tm;
      this.main.gender_ru = this.item.gender_ru;
      this.main.gender_en = this.item.gender_en;
    }
    this.fetchJobsVelayats();
  },
  methods: {
    async fetchJobsVelayats() {
      try {
        const { data, status } = await GET_JOBS_VELAYATS();

        if (status) {
          this.velayats = data || [];
          if (this.item?.welayat_id) {
            this.selected = this.item.welayat_id;
          } else {
            this.selected = this.velayats[0].uuid;
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
    toggleLanguage(key) {
      this.activeLang = key;
    },
    async save() {
      console.log(this.selected);
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
        !this.main.gender_en
      ) {
        alert("Dolduryn");
      } else {
        this.main.age = Number(this.main.age);
        this.main.salary = Number(this.main.salary);
        if (this.item?.uuid) this.main.uuid = this.item.uuid;
        try {
          const { data, status } = await ADD_JOBS({
            data: {
              ...this.main,
              welayat_id: this.selected,
            },
          });
          if (status) {
            this.$emit("save");
          }
        } catch (error) {
          console.log(error);
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.dropdown {
  display: flex;
  flex-direction: column;
  label {
    font-weight: 700;
    font-size: 16px;
    line-height: 120%;
    color: var(--text);
    margin-bottom: 10px;
    font-size: 16px;
  }
  select {
    border-radius: 16px;
    color: var(--text);
    font-size: 16px;
    width: 100%;
    height: 60px;
    transition: 0.3s ease 0s;
    padding: 12px;
    background: #fff;
    position: relative;
    border: 1px solid var(--border) !important;
  }
}
</style>
