<template>
  <div class="avatar">
    <div v-if="imgPath" class="avatar__image">
      <img :src="imgPath" alt="" />
    </div>
    <div v-else-if="!img && !blobImg" class="avatar__default">
      <base-icon :name="icon"></base-icon>
    </div>
    <div v-else-if="blobImg" class="avatar__image">
      <img :src="blobImg" alt="" />
      
    </div>
    <div v-else class="avatar__image">
      
      <img :src="`${baseURL}/${img}`" alt="" />

    </div>
    <div class="avatar__input">
      <div class="avatar__input-body">
        <input
          v-if="multiple"
          @change="changeMultiFile"
          accept=".jpg, .png, .jpeg"
          :multiple="multiple"
          type="file"
        />
        <input
          v-else
          @change="changeFile"
          accept=".jpg, .png, .jpeg"
          type="file"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ADD_FILE } from "@/api/admin.api";
import BaseIcon from "@/components/base/BaseIcon.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    BaseIcon,
  },
  computed: {
    ...mapGetters(["baseURL"]),
  },
  props: {
    multiple: {
      type: Boolean,
      default: () => false,
    },
    image: {
      type: String,
      default: () => null,
    },
    icon: {
      type: String,
      default: () => "",
    },
    imgPath: {
      type: String,
      default: () => "",
    },
    label: {
      type: String,
      default: () => "",
    },
    activeLang: {
      type: String,
      default: () => "tm",
    },
  },
  data() {
    return {
      img: null,
      blobImg: null,
    };
  },
  watch: {
    activeLang: function (val) {
      this.img = this.image ? this.image : null;
    },
  },
  methods: {
    async changeFile(e) {
      if (!e.target.files[0]) return;
      try {
        const { data, status } = await ADD_FILE({
          data: { file: e.target.files[0] },
        });
        if (status) {
          this.img = data;
          this.$emit("uploadFile", data);
        }
      } catch (error) {
        console.log(error);
      }
    },
    changeMultiFile(e) {
      this.blobImg = URL.createObjectURL(e.target.files[0]);
      this.$emit("uploadMultiFile", e.target.files);
    },
  },
};
</script>

<style lang="scss" scoped>
.avatar {
  width: 100%;
  height: 100%;
  position: relative;
  border: 2px dashed #ccc;
  position: relative;
  &__label {
    position: absolute;
    top: -10%;
    left: 0%;
  }
  &__default {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background-color: var(--background-second);
    user-select: none;
    .icon {
      width: 50px;
      height: 50px;
    }
  }
  &__image {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
  &__input {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;

    &-body {
      position: relative;
      width: 100%;
      height: 100%;

      input {
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 100%;
        opacity: 0;
        z-index: 1;
        cursor: pointer;
      }
    }
    &-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 8px;
      width: 34px;
      height: 34px;
    }
  }
}
</style>
