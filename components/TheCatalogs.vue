<template>
  <div class="catalogs">
    <div class="catalogs__container">
      <div class="catalogs__row">
        <div class="catalogs-item" v-for="catalog in catalogs" :key="catalog.uuid">
          <div class="catalogs-item__left">
            <h1>{{ translateTitle(catalog) }}</h1>
            <h3>{{ $t('productsCatalog') }}</h3>
            <base-button catalog @clickedButton="seePdf(catalog)">{{ $t('seeCatalog') }}</base-button>
          </div>
          <div class="catalogs-item__right">
            <div class="catalogs-item__right-image">
              <img :src="`${baseURL}/uploads/catalog/${catalog.image_path}`" alt="img" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import translate from '@/mixins/translate'
  import { mapGetters } from 'vuex'
  export default {
    props: {
      catalogs: {
        type: Array,
        default: () => []
      }
    },
    mixins: [translate],
    computed: {
      ...mapGetters(['baseURL'])
    },
    methods: {
      seePdf(item) {
        const link = document.createElement('a')
        link.href = `${this.baseURL}/uploads/pdf/${item.pdf_path}`
        link.setAttribute('download', this.translateTitle(item))
        link.setAttribute('target', 'download')
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .catalogs {
    margin-bottom: 100px;
    @media (max-width: 767px) {
      margin-bottom: 30px;
    }

    &__container {
    }

    &__row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 40px;
      @media (max-width: 767px) {
        grid-template-columns: 1fr;
        gap: 20px;
      }
    }
  }
  .catalogs-item {
    padding: 30px 60px;
    background-color: var(--background);
    border-radius: 30px;
    display: grid;
    grid-template-columns: 229px 1fr;
    gap: 100px;
    height: 250px;
    @media (max-width: 767px) {
      padding: 20px;
      grid-template-columns: 150px 1fr;
      gap: 20px;
      height: 150px;
    }
    &__left {
      display: flex;
      flex-direction: column;
      h1 {
        color: var(--text);
        font-size: 30px;
        font-weight: 900;
        line-height: 120%;
        text-transform: uppercase;
        margin-bottom: 6px;
      }

      h3 {
        color: var(--text);
        font-size: 20px;
        font-weight: 700;
        line-height: 120%;
        text-transform: uppercase;
        flex: 1 1 auto;
      }
      @media (max-width: 767px) {
        h1 {
          font-size: 18px;
        }

        h3 {
          font-size: 12px;
        }
      }
    }

    &__right {
      margin: auto;
    }

    &__right-image {
      width: 354px;
      height: 127px;
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        object-position: center;
      }
    }
  }
</style>
