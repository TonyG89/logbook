<template>
  <div class="container">
    <div>
      <h1>Logbook</h1>
    </div>
    <div class="table">
      <TableBlock :items="tableData" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import TableBlock from '../blocks/TableBlock.vue';

import useLogbook from '../../api/useLogbook';
import { LocalStorage } from 'quasar';

const storageEntity = 'logbook';

const { logbookList, getLogbookList } = useLogbook();

const localData = LocalStorage.getItem(storageEntity); // or null

const tableData = ref([]);
const loading = ref(false);

// TODO: REMOVE TO HELPERS
const samesData = (firstData = 'default', secondData = 'default') => {
  if (firstData === secondData) throw new Error('ARE YOU SURE, DUDE? - function samesData ()');
  const isSame = JSON.stringify(firstData) === JSON.stringify(secondData);
  // debugger;
  return isSame;
};

const getApiData = async () => {
  await getLogbookList();
  // debugger;
  if (samesData(logbookList.value, localData)) return;
  else {
    LocalStorage.set(storageEntity, logbookList.value);
    tableData.value = logbookList.value;
  }
};

const loadData = async () => {
  // debugger;
  if (localData) {
    tableData.value = localData;
    await getApiData();
  } else getApiData();
};

onMounted(async () => loadData());
</script>

<style lang="scss" scoped></style>
