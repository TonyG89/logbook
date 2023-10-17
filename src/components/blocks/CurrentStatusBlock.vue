<template>
  <div>
    <h5>Средние значения</h5>

    <ul>
      <li v-for="item in componentData" :key="item">
        {{ item }}
        <span> </span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const componentData = ref(['цена операций', 'стоимость километра', 'затраты:день, месяц, год', 'растояние:день, месяц, год' ]);

const columnsInstance = [
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
  {
    name: 'last',
    label: 'Последняя операция',
    field: 'last',
    format: (time) => useDateFormat(time, 'DD MMM YYYY').value,
  },
];

const tableData = ref([{}]);

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
});
</script>

<style lang="scss" scoped></style>
