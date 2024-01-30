<template>
  <div>
    <pop-up @close="$emit('close')" title="Kategoriýa goşmak">
      <base-languages
        @selectLanguage="toggleLanguage"
        :activeLang="activeLang"
      ></base-languages>
      <base-row>
        <base-col cols="8">
          <base-textarea
            label="TEXT"
            @updateValue="(val) => (main[`title_${activeLang}`] = val)"
            :value="main[`title_${activeLang}`]"
          ></base-textarea>
        </base-col>
        <base-col rows="2" cols="4">
          <avatar-uploader
            :imgPath="image_path"
            @uploadFile="uploadFile"
          ></avatar-uploader>
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
import PopUp from "@/components/popup/PopUp.vue";
import { ADD_CATEGORY } from "@/api/admin.api";
import { mapGetters } from "vuex";

export default {
  components: {
    PopUp,
  },
  props: {
    item: {
      type: Object,
      default: () => null,
    },
  },
  data() {
    return {
      activeLang: "tm",
      image_path: "",
      main: {
        uuid: "",
        title_tm: "",
        title_ru: "",
        title_en: "",
        image: "",
      },
    };
  },
  computed: {
    ...mapGetters(["baseURL"]),
  },
  mounted() {
    if (this.item?.uuid) {
      this.main.title_tm = this.item.title_tm;
      this.main.title_ru = this.item.title_ru;
      this.main.title_en = this.item.title_en;
      this.image_path = `${this.baseURL}/${this.item.image_path}`;
    }
  },
  methods: {
    toggleLanguage(key) {
      this.activeLang = key;
    },
    uploadFile(file) {
      this.main.image = file;
      this.image_path = "";
    },
    async save() {
      if (!this.main.title_tm || !this.main.title_ru || !this.main.title_en) {
        alert("Doldur");
      } else {
        if (this.item?.uuid) this.main.uuid = this.item.uuid;
        try {
          const { data, status } = await ADD_CATEGORY({ data: this.main });
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
