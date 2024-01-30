<template>
  <div>
    <pop-up @close="$emit('close')" title="Önüm goşmak">
      <base-languages
        @selectLanguage="toggleLanguage"
        :activeLang="activeLang"
      ></base-languages>
      <base-row>
        <base-col cols="12">
          <base-input
            @updateValue="(val) => (main[`title_${activeLang}`] = val)"
            :value="main[`title_${activeLang}`]"
            label="Önümiň ady"
            placeholder="Önümiň ady"
          ></base-input>
        </base-col>
        <base-col cols="12">
          <base-input
            @updateValue="(val) => (main[`description_${activeLang}`] = val)"
            :value="main[`description_${activeLang}`]"
            label="Description"
            placeholder="Description"
          ></base-input>
        </base-col>
        <base-col cols="8">
          <base-input
            @updateValue="(val) => (main[`weight`] = val)"
            :value="main[`weight`]"
            label="Agramy"
            placeholder="8 gr/ 1pc (30 pcs/ packing)"
          ></base-input>
        </base-col>
        <base-col rows="2" cols="4">
          <avatar-uploader
            :imgPath="image_path"
            @uploadFile="uploadFile"
          ></avatar-uploader>
        </base-col>
        <base-col cols="8">
          <base-input
            @updateValue="(val) => (main[`srok`] = val)"
            :value="main[`srok`]"
            label="Ýaramlylyk möhleti"
            placeholder="Ýaramlylyk möhleti"
          ></base-input>
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
import { ADD_PRODUCT } from "@/api/admin.api";
import PopUp from "@/components/popup/PopUp.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    PopUp,
  },
  props: {
    categoryId: {
      type: String,
      default: "",
    },
    item: {
      type: Object,
      default: () => {},
    },
  },
  mounted() {
    this.image_path = "";
    if (this.item?.uuid) {
      this.main.title_tm = this.item.title_tm;
      this.main.title_ru = this.item.title_ru;
      this.main.title_en = this.item.title_en;
      this.main.description_tm = this.item.description_tm;
      this.main.description_ru = this.item.description_ru;
      this.main.description_en = this.item.description_en;
      this.main.weight = this.item.weight;
      this.main.srok = this.item.srok;
      this.main.category_id = this.item.category_id;
      this.image_path = `${this.baseURL}/${this.item.image_path}`;
    }
  },
  data() {
    return {
      activeLang: "tm",
      image_path: "",
      main: {
        title_tm: "",
        title_ru: "",
        title_en: "",
        description_tm: "",
        description_ru: "",
        description_en: "",
        weight: "",
        srok: "",
        category_id: "",
        photo: "",
        uuid: "",
      },
    };
  },
  computed: {
    ...mapGetters(["baseURL"]),
  },
  methods: {
    toggleLanguage(key) {
      this.activeLang = key;
    },
    uploadFile(file) {
      this.main.photo = file;
      this.image_path = "";
    },
    async save() {
      if (!this.main.title_tm || !this.main.title_ru || !this.main.title_en) {
        alert("Doldur");
      } else {
        if (this.item?.uuid) this.main.uuid = this.item.uuid;
        this.main.category_id = this.categoryId;
        try {
          const { data, status } = await ADD_PRODUCT({ data: this.main });
          if (status) {
            this.$emit("close");
          }
        } catch (error) {
          console.log(error);
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
