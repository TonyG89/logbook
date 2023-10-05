<template>
  <div class="q-pa-md q-gutter-sm">
    <q-bar dense class="bg-black text-white">
      <div>mobi-net</div>
      <q-icon name="email" />
      <q-space />
      <q-space />
      <q-space />
      <div>без обслуживания</div>
      <q-icon name="build_circle" />
      <div>2дн</div>
      <q-icon name="height" />
      <div>71,8 тыс.км</div>
      <div>
        3.35
        <q-icon name="attach-money" />
      </div>
      <q-icon name="local-gas-station" />
      <q-space />
      <q-icon name="bluetooth" />
      <q-icon name="signal_wifi_4_bar" />
      <q-icon name="signal_cellular_4_bar" />
      <div></div>
      <div>{{ nowTime }}</div>
    </q-bar>
  </div>
</template>

<script setup>
import { useNow, useDateFormat } from '@vueuse/core';
import { computed } from 'vue';

const nowTime = computed(() => useDateFormat(useNow(), 'DD MMMM HH:mm'));
</script>

<style lang="scss" scoped></style>
