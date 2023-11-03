
import { ref } from 'vue'
import { useNow, useDateFormat } from '@vueuse/core'
export default function configData() {

  const columns = [
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


  return { columns }
}