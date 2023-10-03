<template>
  <div>
    <h3>Запланированные события</h3>
    <ul>
      <li v-for="event in componentFilling" :key="event.title">
        <div>
          {{ event.title }}<span> {{ event.kilometers }} km {{ event.term ? '| ' + event.term + ' мес' : '' }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue';
import tableConfig from './tableConfig';
import { useNow, useDateFormat } from '@vueuse/core';
import remainderData from '../../staticData/remainderData';

const componentFilling = computed(() =>
  remainderData.map((item) => ({
    title: item.title,
    remain: '',
    kilometers: item.kilometers,
    term: item.term,
  }))
);
</script>

<style lang="scss" scoped></style>
