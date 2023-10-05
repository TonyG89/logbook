<template>
  <div>
    <TopHeader/>
    <UpdateDialog/>
    <DelayDialog/>
    <!-- <LineValue>x</LineValue> -->
    <Home msg="LOGBOOK" />
  </div>
</template>
<script setup>

import Home from './components/pages/HomePage.vue';
import LineValue from './components/LineValue.vue';
import TopHeader from './components/common/TopHeader.vue';
import DelayDialog from './components/dialogs/DelayDialog.vue';
import UpdateDialog from './components/dialogs/UpdateDialog.vue';


</script>

<style scoped></style>
