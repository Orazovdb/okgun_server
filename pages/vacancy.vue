<template>
  <div class="vacancy" ref="aos">
    <div class="vacancy__container">
      <div class="vacancy__table-wrapper" ref="image">
        <div class="vacancy__title-block">
          <h2>{{ $t('vacancy') }}</h2>
          <button class="vacancy__button">{{ $t('allRegions') }}</button>
        </div>
        <table>
          <thead>
            <tr>
              <th v-for="table in tableHead" :key="table.id">
                <div class="flex gap-4">
                  <span>{{ $t(table.name) }}</span>
                  <!-- <base-icon icon="arrowDownTable" /> -->
                </div>
              </th>
            </tr>
          </thead>
          <tbody v-for="item in vacancy" :key="item.uuid">
            <tr>
              <td class="time">09:00 - 18:00</td>
              <td>{{ item[`work_name_${$i18n.locale}`] }}</td>
              <td>{{ item[`degree_${$i18n.locale}`] }}</td>
              <td>{{ item[`gender_${$i18n.locale}`] }}</td>
              <td>{{ item.age }}</td>
              <td>
                <button class="vacancy__table-button">
                  <span></span>
                  <span>{{ item[`place_${$i18n.locale}`] }}</span>
                </button>
              </td>
              <td>{{ item.salary }} man</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <base-pagination
      v-if="paginationCount > 1"
      :modelValue="page"
      @clickPage="(pagination) => updatePage(pagination)"
      :pageCount="paginationCount"
    ></base-pagination>
  </div>
</template>

<script>
  import { GET_VACANCY } from '@/api/home.api'
  export default {
    head() {
      return {
        title: this.$t('vacancy'),
        meta: [
          {
            name: 'content-type',
            content: 'vacancy'
          },
          {
            name: 'keywords',
            content: this.$t('keywords')
          }
        ]
      }
    },
    data() {
      return {
        limit: 10,
        page: 1,
        paginationCount: 0,
        vacancy: null,
        observer: null,
        tableHead: [
          { id: 1, count: 0, name: 'workTime' },
          { id: 2, count: 0, name: 'workName' },
          { id: 3, count: 0, name: 'workStasis' },
          { id: 4, count: 0, name: 'gender' },
          { id: 5, count: 0, name: 'age' },
          { id: 6, count: 0, name: 'workPlace' },
          { id: 7, count: 0, name: 'salary' }
        ]
      }
    },
    mounted() {
      if (this.$refs.aos) {
        const options =
          {
            rootMargin: '100px 0px 0px 0px',
            threshold: 0.4
          } || {}
        this.observer = new IntersectionObserver(async ([entry]) => {
          if (entry && entry.isIntersecting) {
            this.$refs.image.classList.add('aos-vacancy')
          }
        }, options)
        this.observer.observe(this.$refs.aos)
      }
    },
    destroyed() {
      this.observer.disconnect()
    },
    async fetch() {
      await this.fetchVacancy()
    },
    methods: {
      async fetchVacancy() {
        try {
          const { data, status } = await GET_VACANCY({
            params: { l: this.limit, p: this.page }
          })
          if (status) {
            this.paginationCount = Math.ceil(data.count / this.limit)
            this.vacancy = data.news || []

            console.log(data.news)
          }
        } catch (error) {
          console.log(error)
        }
      },
      async updatePage(p) {
        this.page = p
        await this.fetchVacancy()
      }
    }
  }
</script>

<style lang="scss" scoped>
  @media (max-width: 767px) {
    .tc {
      justify-content: center;
    }
  }
  .vacancy {
    margin: 40px 0 100px 0;
    @media (max-width: 767px) {
      margin: 40px 0;
    }
    &__container {
    }

    &__table-wrapper {
      border: 1px solid #d9d9d9;
      border-radius: 8px;
      width: 100%;
      overflow-x: auto;
      transform: translateY(80px);
      opacity: 0;
      &.aos-vacancy {
        opacity: 1;
        transform: translateY(0px);
        transition: 0.4s all;
      }
      &::-webkit-scrollbar {
        width: 4px;
        height: 4px;
        @media (max-width: 767px) {
          width: 4px;
          height: 4px;
        }
      }

      &::-webkit-scrollbar-track {
        background-color: #d5d5d5;
      }

      &::-webkit-scrollbar-thumb {
        background: var(--primary);
        border-radius: 3px;
      }
    }

    &__title-block {
      padding: 20px 24px;
      display: flex;
      gap: 16px;
      h2 {
        color: #101828;
        font-size: 18px;
        font-weight: 500;
        line-height: 28px;
      }
      @media (max-width: 767px) {
        padding: 14px 24px;
        h2 {
          font-size: 14px;
        }
      }
    }

    &__button {
      background-color: var(--background);
      color: #ff0000;
      padding: 4px 16px;
      border-radius: 16px;
      font-size: 12px;
      font-weight: 700;
      line-height: 18px;
      @media (max-width: 767px) {
        font-size: 10px;
      }
    }

    &__table-button {
      padding: 8px 20px;
      background-color: #f2f4f7;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 4px;
      border-radius: 16px;
      color: #364254;
      font-size: 14px;
      font-weight: 500;
      line-height: 120%;
      span {
        display: block;
        &:first-child {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background-color: #6c778b;
        }
      }
      @media (max-width: 767px) {
        font-size: 12px;
        span {
          &:first-child {
            width: 8px;
            height: 8px;
          }
        }
      }
    }

    table {
      border-top: 1px solid #d9d9d9;
      border-collapse: collapse;
      width: 100%;
      thead {
        background-color: #fcfcfd;
        tr {
          th {
            padding: 12px 24px;
            border-bottom: 1px solid #d9d9d9;
            color: #667085;
            font-size: 12px;
            font-weight: 700;
            line-height: 18px;
            @media (max-width: 767px) {
              padding: 12px 20px;
              white-space: nowrap;
            }
          }
        }
      }

      tbody {
        tr {
          td {
            padding: 12px 24px;
            color: #101828;
            font-size: 16px;
            font-weight: 500;
            line-height: 120%;
            white-space: nowrap;
            &.time {
              color: #667085;
            }
          }
          &:not(:last-child) {
            td {
              border-bottom: 1px solid #d9d9d9;
            }
          }
        }
      }
    }
  }
</style>
