<template>
  <div class="q-pa-md">
    <q-table
      v-model:fullscreen="isFullscreen"
      class="my-sticky-dynamic"
      flat
      bordered
      title="Aveo T255 2008"
      :rows="filterLogbook"
      :columns="columns"
      :loading="loading"
      row-key="index"
      computedRowsNumber="3"
    >
      <template #top>
        <div class="row ">
          <div>
            Aveo T255 2008
          </div>
          <input
            type="text"
            placeholder="Пошук"
            v-model="inputSearch"
          />
        </div>
      </template>
      <template #bottom>
        <div class="container">
          <div class="row">
            <div class="col">период с {{ componentState.dateFrom }} по {{ componentState.dateTo }}</div>
            <div class="col">
              <b>Всего:</b>
            </div>
            <div class="col">проехал: {{ componentState.distance }}</div>
            <div class="col">потратил: {{ componentState.sum }}</div>
            <div class="col">
              {{ componentState.days }}
            </div>
          </div>
        </div>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { ref, computed, nextTick, onMounted } from 'vue';
import tableConfig from './tableConfig';
import { useDateFormat } from '@vueuse/core';
import dateDiffInDays from '@/helpers/date/dateDiffInDays';
import convertDaysToMonthsAndYears from '@/helpers/date/convertDaysToMonthsAndYears';

const inputSearch = ref('');

const { columns, setData } = tableConfig();

const isFullscreen = ref(false);
const logbook = ref([])

const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
});

const mainData = computed(() => {
  if (!logbook.value.length) {
    logbook.value = setData(props.items)
  }
  return logbook.value
})




const componentState = computed(() => {
  const firstTableRow = mainData.value?.[mainData.value.length - 1];
  // debugger
  return {
    // dateFrom: 'xxx',
    dateTo: useDateFormat(mainData[0]?.date, 'MMMM YYYY'),
    dateFrom: useDateFormat(firstTableRow?.date, 'MMMM YYYY'),
    days: convertDaysToMonthsAndYears(dateDiffInDays(mainData.value[0]?.date, firstTableRow?.date)),
    distance: mainData.value[0]?.kilometers - firstTableRow?.kilometers + ' км',
    sum: mainData.value.reduce((acc, row) => acc + +row.work + +row.details, 0) + ' грн',
  };
});

const filterLogbook = computed(() => mainData.value.filter(row => {
  const lowInput = inputSearch.value.toLowerCase()
  const res = row.categories.toLowerCase().includes(lowInput) || row.actions.toLowerCase().includes(lowInput) || row.status.toLowerCase().includes(lowInput)
  return res
}))

// allPropertiesMatch 


</script>

<style lang="scss" scoped>
.my-sticky-dynamic {
  height: 410px;
}

.q-table__top,
.q-table__bottom,
thead tr:first-child th {
  background-color: #00b4ff;
}

thead tr th {
  position: sticky;
  z-index: 1;
}

thead tr:last-child th {
  top: 48px;
}

thead tr:first-child th {
  top: 0;
}

tbody {
  scroll-margin-top: 48px;
}

.container {
  width: 100%;
}
</style>
