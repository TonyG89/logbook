<template>
  <div class="container">
    <div>
      <h1>Logbook</h1>
    </div>
    <div class="table">
      <TableBlock :items="tableData"/>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import TableBlock from '../blocks/TableBlock.vue';

import useLogbook from "../../api/useLogbook";


const { logbookList, getLogbookList } = useLogbook();

const tableData = ref([]);
const loading = ref(false);

const loadData = async () => {
  await getLogbookList();
  tableData.value = logbookList.value;
  console.log(tableData.value);
};


onMounted(async () => loadData());
</script>

<style lang="scss" scoped></style>
