<template>
  <div class="admin-banner">
    <admin-header @clickAdd="openPopUp" />
    <base-table>
      <thead>
        <tr>
          <th>№</th>
          <th>Iş wagty</th>
          <th>Işiň ady</th>
          <th>Hünär derejesi</th>
          <th>Jynsy</th>
          <th>Ýaşy</th>
          <th>Ýerleşýän ýeri</th>
          <th>Aýlyk haky</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in data" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ item.date }}</td>
          <td>{{ item.work_name_tm }}</td>
          <td>{{ item.degree_tm }}</td>
          <td>{{ item.gender_tm }}</td>
          <td>{{ item.age }}</td>
          <td>{{ item.welayat_column }}</td>
          <td>{{ item.salary }}</td>
          <td>
            <div class="flex flex-y-center gap-10">
              <base-icon @clicked="updateVacancy(item)" icon="edit" />
              <base-icon @clicked="deleteVacancyItem(item.uuid)" icon="crash" />
            </div>
          </td>
        </tr>
      </tbody>
    </base-table>
    <div class="pagination">
      <base-pagination
        v-if="paginationCount > 1"
        :modelValue="page"
        @clickPage="(pagination) => updatePage(pagination)"
        :pageCount="paginationCount"
      ></base-pagination>
    </div>
    <pop-up-vacancy
      v-if="isPopUp"
      @close="closePopUp"
      @save="save"
      :item="vacancyItem"
    ></pop-up-vacancy>
  </div>
</template>

<script>
import { DELETE_JOB, GET_JOBS } from "@/api/admin.api";
import PopUpVacancy from "@/components/popup/PopUpVacancy.vue";

export default {
  components: { PopUpVacancy },
  layout: "admin",
  middleware: "auth-admin",
  data() {
    return {
      isPopUp: false,
      data: [],
      limit: 10,
      page: 1,
      paginationCount: 0,
      vacancyItem: null,
    };
  },
  async mounted() {
    await this.fetch();
  },
  methods: {
    async fetch() {
      try {
        const { data, status } = await GET_JOBS({
          params: { limit: this.limit, page: this.page },
        });
        if (status) {
          this.data = data.jobs || [];
          this.paginationCount = Math.ceil(data.count / this.limit);
        }
      } catch (error) {
        console.log(error);
      }
    },
    async deleteVacancyItem(uuid) {
      try {
        const { data, status } = await DELETE_JOB({ data: { uuid: uuid } });
        if (status) {
          await this.fetch();
        }
      } catch (error) {
        console.log(error);
      }
    },

    openPopUp() {
      this.isPopUp = true;
    },
    async closePopUp() {
      this.isPopUp = false;
      if (this.vacancyItem) {
        Object.keys(this.vacancyItem).forEach(
          (key) => (this.vacancyItem[key] = null)
        );
      }
    },
    async save() {
      await this.fetch();
      this.isPopUp = false;
      if (this.vacancyItem) {
        Object.keys(this.vacancyItem).forEach(
          (key) => (this.vacancyItem[key] = null)
        );
      }
    },
    updateVacancy(item) {
      this.isPopUp = true;
      this.vacancyItem = item;
    },
    async updatePage(p) {
      this.page = p;
      await this.fetch();
    },
  },
};
</script>

<style lang="scss" scoped>
.admin-banner {
  height: 100%;
}
</style>
