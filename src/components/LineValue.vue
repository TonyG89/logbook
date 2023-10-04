<template>
  <div class="q-flex">
    <div>
      <h3>Запланированные события</h3>
    </div>
    <ul>
      <li v-for="(event) in events" :key="event.title"><h4>{{ event.title }}<span> {{ event.remain }}</span></h4></li>
    </ul>
  </div>
</template>

<script setup>
class Event {
  constructor(title, remain, limits) {
    this.title = title;
    this.remain = remain;
    this.limits = limits;
  }

}
const events=[{
  title:'Замена масла',
  remain:'soon',
},
{title:'Замена фильтра салона'},
{title:'Замена воздушного фильтра'},
{title:'Замена ГРМ'},
]
</script>

<style lang="scss" scoped>

</style>