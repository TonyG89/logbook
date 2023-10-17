<template>
  <div class="q-pa-md">
    <q-table
      v-model:fullscreen="isFullscreen"
      class="my-sticky-dynamic"
      flat
      bordered
      title="Aveo T255 2008"
      :rows="tableRows"
      :columns="columns"
      :loading="loading"
      row-key="index"
      computedRowsNumber="3"
    >
      <template #bottom>
        <div class="container">
          <div class="row">
            <div class="col">период с {{ componentState.dateFrom }} по {{ componentState.dateTo }}</div>
            <div class="col">
              <b>Всего:</b>
            </div>
            <div class="col">
              {{ componentState.distance }}
            </div>
            <div class="col">
              {{ componentState.sum }}
            </div>
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
import { ref, computed, nextTick } from 'vue';
import tableConfig from './tableConfig';
import { useDateFormat } from '@vueuse/core';
import dateDiffInDays from '@/helpers/date/dateDiffInDays';
import convertDaysToMonthsAndYears from '@/helpers/date/convertDaysToMonthsAndYears';

const componentState = computed(() => {
  const firstTableRow = tableRows.value?.[tableRows.value.length - 1];
  // debugger
  return {
    // dateFrom: 'xxx',
    dateFrom: useDateFormat(tableRows[0]?.date, 'MMMM YYYY'),
    dateTo: useDateFormat(firstTableRow?.date, 'MMMM YYYY'),
    days: convertDaysToMonthsAndYears(dateDiffInDays(tableRows.value[0]?.date, firstTableRow?.date)),
    distance: tableRows.value[0]?.kilometers - firstTableRow?.kilometers + ' км',
    sum: tableRows.value.reduce((acc, row) => acc + +row.work + +row.details, 0)+ ' грн',
  };
});

const { columns, setData } = tableConfig();

const isFullscreen = ref(false);

const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
});

const tableRows = computed(() => setData(props.items));

console.log(columns);
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
