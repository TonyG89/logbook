import { ref } from 'vue';
import { useNow, useDateFormat } from '@vueuse/core';
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
      name: 'term',
      label: 'Осталось дней',
      field: 'remain_term',
      format: (val) => {
        return val ? val + ' д.' : '-';
      },
      sortable: true,
    },
    {
      name: 'distance',
      label: 'Осталось километров',
      field: 'remain_distance',
      format: (val) => {
        return val ? val + ' км' : '-';
      },
      sortable: true,
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
      sortable: true,
    },
    // {
    //   name: 'quantity',
    //   label: 'Количество',
    //   field: 'quantity',
    // },
  ];

  return { columns };
}
