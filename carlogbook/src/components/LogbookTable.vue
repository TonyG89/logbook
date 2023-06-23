<template>
  <div class="d-flex flex-column w-100">
    <v-row class="ma-2">
      <InfoDashboard
        :entity="allStatisticSinceBought"
        title="Общая информация:"
      />
      <InfoDashboard :entity="dashBoardInfo" title="Расход на километр" />
      <InfoDashboard :entity="dashBoardInfo" title="Расход в ход" />
      <InfoDashboard
        :entity="averageStatisticInfo"
        title="Средняя статистика"
      />
      <InfoDashboard :entity="dashBoardInfo" title="ПОТРАЧЕНО(wastedMoney)" />
    </v-row>
    <v-list class="d-flex bg-secondary">
      <v-list-item v-for="item in statusFilter" :key="item">
        <v-chip @click="changeFilterStatus(item)">{{ item }}</v-chip>
      </v-list-item>
    </v-list>
    <button @click="isLoading = !isLoading">developer flag</button>
    <div v-if="isLoading">
      <Loader />
    </div>
    <ag-grid-vue
      v-else
      class="ag-theme-alpine"
      style="min-width: 300px; height: 500px"
      :columnDefs="tableData.value.headerTitle"
      :rowData="tableData.value.items"
      :defaultColDef="defaultColDef.pinnedBottomRowConfig"
      rowSelection="multiple"
      animateRows="true"
      @cell-clicked="cellWasClicked"
      @grid-ready="onGridReady"
    >
    </ag-grid-vue>
  </div>
</template>

<script setup>
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { AgGridVue } from "ag-grid-vue3"; // the AG Grid Vue Component
import { computed, onMounted, reactive, ref } from "vue";
import Loader from "./Loader.vue";
import InfoDashboard from "./InfoDashboard.vue";
import useLogbook from "../composables/useLogbook";
import logbookConfig from "./config/logbookConfig";
import computedData from "../composables/computedData";

const gridApi = ref(null); // Optional - for accessing Grid's API
const { colDefs, row, processProps, tableData, defaultColDef } =
  logbookConfig();
const { allStatistic, averageStatistic } = computedData();

const { logbookList, getLogbookList } = useLogbook();

const allStatisticSinceBought = ref([]);
const averageStatisticInfo = ref([]);
// Obtain API from grid's onGridReady event
const onGridReady = (params) => {
  gridApi.value = params.api;
};

const statusFilter = computed(() => {
  console.log(tableData.value?.items);
  if (tableData.value?.items) {
    const statusArr = tableData.value.items.map((item) => item.status);
    const uniqStatus = [...new Set(statusArr)];
    console.log(uniqStatus);
    return uniqStatus;
  }
});

const isLoading = ref(true);

// обновляет данные дашбордов
const infoDashboardsRender = () => {
  allStatisticSinceBought.value = allStatistic(logbookList);
  averageStatisticInfo.value = averageStatistic(logbookList);
};

const loadData = async () => {
  // TODO: проверка на наявность в локал стораже... и кнопка обновить базу.
  isLoading.value = true;
  await getLogbookList();
  processProps(logbookList);
  infoDashboardsRender();
  console.log(tableData.value.items);
  console.log(allStatisticSinceBought.value);
  // if (logbookList.value.length) {
  //   headerArray.value = Object.keys(logbookList.value?.[0]);
  // }

  // // ЗАГОЛОВОК
  // columnDefs.value = headerArray.value
  //   .map((title) => {
  //     return {
  //       headerName: title.toUpperCase(),
  //       field: title.toLowerCase(),
  //     };
  //   })
  //   .filter((item) => item.field !== 'comments') // скрыть комментарии
  //   .map((item) => {
  //     console.log(item);
  //     // В НАЧАЛЕ Мэпа...
  //     if (item.field === 'details') {
  //       item.headerName = 'xxx';
  //       item.children = [
  //         {
  //           headerName: 'title.toUpperCase()',
  //           field: 'sSSSSS'.toLowerCase(),
  //         },
  //       ];
  //     }
  //     return {
  //       ...item,
  //     };
  //   });
  isLoading.value = false;
};

const changeFilterStatus = (filterValue) => {
  const filtredLogbookList =  logbookList.value?.filter(({ status }) => status === filterValue);
  console.log(filterValue)
  debugger
  console.log(filtredLogbookList)
  processProps(filtredLogbookList);
};

onMounted(async () => loadData());
</script>

<style>
</style>
