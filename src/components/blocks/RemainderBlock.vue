<template>
  <div>
    <h5 @mouseover="showTooltip = true">{{ dataInstance[0]?.actions }}</h5>
    <q-table
      bordered
      dense
      title="Запланированная замена"
      :rows="dataInstance"
      :columns="columnsInstance"
      :loading="loading"
    >
      <template #top-row>
        <!-- <button >статическая/динамическая</button> -->
      </template>
      <template #body-cell-title="props">
        <q-td :props="props">
          <q-icon :name="props.row.icon" />
          {{ props.row.title }}
        </q-td>
        <q-tooltip v-model="showTooltip" anchor="top right " self="top right " offset="5px">
          {{ Object.values(props.row).join('; ') }}
          {{ dataInstance[0]?.distance }} км бля)
        </q-tooltip>
      </template>
    </q-table>
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

const currentStatusState = reactive(STATUS.normal); // {value, color}

const showTooltip = ref(false);

// configData
const columnsInstance = [
  // {
  //   name: 'index',
  //   label: '#',
  //   field: 'index',
  //   format: (val) => val + 1,
  // },
  {
    name: 'title',
    label: 'Название',
    field: 'title',
    align: 'left',
  },
  {
    name: 'remain',
    label: 'Осталось',
    field: 'remain',
    format: (val, row, index) => {
      console.log(row);
      return val + (row.term ? ' д.' : ' км');
    },
  },
  // {
  //   name: 'distance',
  //   label: 'Километраж',
  //   field: 'distance',
  // },
  // {
  //   name: 'term',
  //   label: 'Срок',
  //   field: 'term',
  // },
  {
    name: 'last',
    label: 'Последняя операция',
    field: 'last',
    format: (time) => useDateFormat(time, 'DD MMM YYYY').value,
  },
  // {
  //   name: 'quantity',
  //   label: 'Количество',
  //   field: 'quantity',
  // },
];

const dataInstance = computed(() =>
  REMAINDER_DATA.map((item) => ({
    title: item.title,
    remain: remainTime(item) || remainDistance(item),
    distance: item.distance,
    term: item.term,
    last: lastCurrentItem(item)?.date,
    icon: item.icon,
    quantity: '',
  }))
);

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
});

// TODO: в remainDistance отнимать вместо lastDistance неявное расстояние проехавшего после последней записи. параметры(средний км/день, разница дней)
const remainDistance = (obj) => {
  const { lastDistance } = useLastAction(props.items);
  return obj.distance - (lastDistance - lastCurrentItem(obj)?.kilometers);
};

const remainTime = (obj) => {
  const lastActionDate = lastCurrentItem(obj)?.date;
  const lastActionTime = new Date(lastActionDate).getTime();
  const timeAway = today - lastActionTime;
  const daysAway = transferTimeToDay(timeAway);
  const remainDays = obj.term * 30 - daysAway;
  return remainDays;
};

// TODO: DATE HELPER LAST CURRENT ITEM
const lastCurrentItem = (item) => findLastCurrentAction(item.tags);
const findLastCurrentAction = (tags) => {
  const lastCurrentItem = props.items?.find((item) => {
    const filterItem = tags.includes(item.categories) && tags.includes(item.detail_com);
    return filterItem;
  });
  console.log(lastCurrentItem);
  return lastCurrentItem;
};

// TODO: DATE HELPER
const today = new Date().getTime();

const transferTimeToDay = (time) => Math.floor(time / (1000 * 60 * 60 * 24));

const onChangeToWarningColor = (item) => {
  item.remain = 'warning';
};
</script>

<style lang="scss" scoped></style>
