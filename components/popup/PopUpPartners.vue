<template>
  <div>
    <pop-up @close="$emit('close')" title="Hyzmatdaş goşmak">
      <base-row>
        <base-col rows="12" cols="12">
          <avatar-uploader :imgPath="image_path" @uploadFile="uploadFile"></avatar-uploader>
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
  import { ADD_PARTNER } from '@/api/admin.api'
  import { mapGetters } from 'vuex'
  export default {
    components: {
      PopUp
    },
    data() {
      return {
        image_path: '',
        main: {
          photo: null
        }
      }
    },
    computed: {
      ...mapGetters(['baseURL'])
    },
    methods: {
      uploadFile(file) {
        this.main.photo = file
        this.image_path = ''
      },
      async save() {
        try {
          const { data, status } = await ADD_PARTNER({ data: this.main })
          if (status) {
            this.$emit('save')
          }
        } catch (error) {
          console.log(error)
        }
      }
    }
  }
</script>

<style lang="scss" scoped></style>
