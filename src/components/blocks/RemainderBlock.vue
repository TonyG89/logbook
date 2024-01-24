<template>
  <div>
    <h5 @mouseover="showTooltip = true">{{ dataInstance[0]?.actions }}</h5>
    <div>
      <q-table
        bordered
        dense
        title="Запланированная замена"
        :table-style="{ backgroundColor: '#f5f5f' }"
        virtual-scroll-sticky-size-start="10"
        :rows="dataInstance"
        :columns="columns"
        :loading="loading"
        :rows-per-page-options="[0]"
        :pagination="{ sortBy: 'remain', descending: true }"
        hide-bottom
      >
        <template v-slot:body-row="props">
          <!-- Access the data for this row -->
          <q-tr
            :props="props"
            :class="props.row"
          >
            <template
              v-for="col in columns"
              :key="col.name"
            >
              <q-td
                :props="props"
                :style="{ backgroundColor: getRowBgColor(props.row) }"
              >
                {{ props.row[col.name] }}
              </q-td>
            </template>
          </q-tr>
        </template>
        <!-- <template #top>
        <button >статическая/динамическая</button>
      </template> -->
        <template #body-cell-title="props">
          <q-td
            :props="props"
            class="flex items-center"
            :style="{ backgroundColor: getRowBgColor(props.row) }"
          >
            <img
              v-if="props.row.icon?.includes('svg')"
              :src="props.row.icon"
              style="width: 13px"
            />
            <q-icon
              v-else
              :name="props.row.icon"
            />
            <span class="q-ml-xs">
              {{ props.row.title }}
            </span>
          </q-td>
          <q-tooltip
            v-model="showTooltip"
            anchor="top right "
            self="top right "
            offset="5px"
            size="lg"
          >
            {{ Object.entries(props.row).map(([key, value]) => key + ' - ' + value).join('\n') }}
            {{ dataInstance[0]?.distance }} км
          </q-tooltip>
        </template>
      </q-table>
    </div>
    <!-- ВСПЛЫВАЮЩЕЕ -->
  </div>
</template>

<script setup>
import { ref, computed, nextTick, reactive, onBeforeMount } from 'vue';
import REMAINDER_DATA from '@/staticData/remainderData';
import STATUS from '@/staticData/statusState';
import CATEGORIES_TYPE from '@/staticData/types/categoriesType';
import { useDateFormat } from '@vueuse/core';
import useLastAction from '@/helpers/lastAction';
import configData from './remainderConfig';

const { columns } = configData();

const currentStatusState = reactive(STATUS.normal); // {value, color}

const showTooltip = ref(false);

// configData

const dataInstance = computed(() =>
  REMAINDER_DATA.map((item) => ({
    title: item.title,
    remain_term: remainTime(item),
    remain_distance: remainDistance(item),
    distance: item.distance || null,
    term: item.term || null,
    last: lastCurrentItem(item)?.date,
    icon: item.icon,
    quantity: '',
  })).sort((a, b) => a.remain_distance - b.remain_distance)
);

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
});

// TODO: в remainDistance отнимать вместо lastDistance неявное расстояние проехавшего после последней записи. параметры(средний км/день, разница дней)
const remainDistance = (obj) => {
  if (!props.items.length || !obj?.distance) return;

  const { lastDistance } = useLastAction(props.items);
  console.log(obj, lastDistance, lastCurrentItem(obj));
  const curAction = lastCurrentItem(obj)
  console.log(curAction)
  debugger
  return obj.distance - (lastDistance - curAction.kilometers);
};

const remainTime = (obj) => {
  if (!props.items.length || !obj?.term) return;

  const { date: lastActionDate } = lastCurrentItem(obj)
  debugger
  const lastActionTime = new Date(lastActionDate).getTime();
  const timeAway = today - lastActionTime;
  const daysAway = transferTimeToDay(timeAway);
  const remainDays = obj.term * 30 - daysAway;

  return remainDays;
};

/**
 * Finds the last current action for the given item
 * @param {Object} filteredItem - The item to search for
 * @returns {Object} - The last current action found
 */
function lastCurrentItem(filteredItem) {
  return findLastCurrentAction(filteredItem.tags);
}
/**
 * Find the last current action item based on the provided tags.
 *
 * @param {Array} tags - The array of tags to filter the items.
 * @return {Object} The last current action item found, or undefined if not found.
 */
const findLastCurrentAction = (tags) => {
  const lastCurItem = props.items?.find((item) => {
    const filterItem = tags.includes(item.categories) && tags.includes(item.detail_com);
    return filterItem;
  });
  return lastCurItem;
};

// TODO: DATE HELPER
const today = new Date().getTime();

const transferTimeToDay = (time) => Math.floor(time / (1000 * 60 * 60 * 24));

const onChangeToWarningColor = (item) => {
  item.remain = 'warning';
};

const getRowBgColor = (row) => {
  const termState = !!row?.remain_term ? Infinity : row.remain_term;
  const distanceState = !!row?.remain_distance ? Infinity : row.remain_distance;

  switch (true) {
    case termState < 0 || distanceState < 0:
      return '#CC0000'
    case termState < 200 || distanceState < 14:
      return '#FF6600';
    case termState < 500 || distanceState < 30:
      return '#FFFF33';
    case termState < 1000 || distanceState < 60:
      return '#FFFFCC';
    case termState < 2000 || distanceState < 120:
      return '#99FF99';
  }

};



</script>

<style lang="scss" scoped></style>
