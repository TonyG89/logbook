<template>
  <template>
    <h1>123</h1>
    <div class="q-pa-md">
      <q-btn no-caps color="purple" @click="showNotif" label="UpdateDialog Show updatable notification" />
    </div>
  </template>
</template>

<script setup>
import { useQuasar } from 'quasar';
import { onMounted, ref } from 'vue';

const $q = useQuasar();

const showNotif = () => {
  const notif = $q.notify({
    group: false,
    timeout: 0,
    spinner: true,
    message: 'Uploading file...',
    caption: '0%',
    position: 'top-right',
  });

  let percentage = ref(0);
  const interval = setInterval(() => {
    percentage.value = Math.min(100, percentage.value + Math.floor(Math.random() * 22));

    notif({
      caption: `${percentage.value}%`,
    });

    if (percentage.value === 100) {
      notif({
        icon: 'done',
        spinner: false,
        message: 'Uploading done!',
        timeout: 2500,
      });
      clearInterval(interval);
    }
  }, 500);
};

onMounted(showNotif);
</script>

<style lang="scss" scoped></style>
