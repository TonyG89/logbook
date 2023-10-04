<template>
  <div>
    <h3>Запланированные события</h3>
    <ul>
      <li v-for="event in dataInstance" :key="event.title">
        <div>
          {{ event.title }}<span> {{ event.kilometers }} km {{ event.term ? '| ' + event.term + ' мес' : '' }}</span>
        </div>
      </li>
    </ul>
    <q-table
      flat
      bordered
      title="Aveo T255 2008"
      :rows="tableRows"
      :columns="columnsInstance"
      :loading="loading"
    />
  </div>
</template>

<script setup>
import { ref, computed, nextTick, reactive } from 'vue';
import tableConfig from './tableConfig';
import { useNow, useDateFormat } from '@vueuse/core';
import remainderData from '../../staticData/remainderData';

const columnsInstance = [
  {
    name: 'index',
    label: '#',
    field: 'index',
    format: (val) => val + 1,
  },
];

const dataInstance = computed(() =>
  remainderData.map((item) => ({
    title: item.title,
    remain: '',
    kilometers: item.kilometers,
    term: item.term,
  }))
);
</script>

<style lang="scss" scoped></style>
