
import { ref } from 'vue'
import { useNow, useDateFormat } from '@vueuse/core'
export default function tableConfig() {

  const setData = (data) => data?.map((row, index) => ({
    index,
    date: row.date,
    kilometers: row.kilometers,
    categories: row.categories,
    actions: row.actions,
    details: row.details,
    work: row.work,
    sum: row.sum,
    status: row.status,
  }))

  const columns = [
    {
      name: 'index',
      label: '#',
      field: 'index',
      format: val => val + 1
    },
    {
      name: 'date',
      required: true,
      label: 'Дата',
      align: 'left',
      field: 'date',
      format: val => useDateFormat(val, 'DD.MM.YY').value
      ,
      sortable: true
    },
    { name: 'kilometers', align: 'center', label: 'Пробег', field: 'kilometers', sortable: true },
    { name: 'categories', label: 'Категория', field: 'categories', sortable: true },
    { name: 'actions', label: 'Что делали', field: 'actions' },
    { name: 'details', label: 'Детали', field: 'details', format: val => val ? val + ' грн' : '-' },
    { name: 'work', label: 'Работа', field: 'work', format: val => val ? val + ' грн' : '-' },
    { name: 'sum', label: 'Сума', field: 'sum', format: (_, row) => row.details + row.work + ' грн', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
    { name: 'status', label: 'Статус', field: 'status', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) }
  ]


  return { columns, setData }
}