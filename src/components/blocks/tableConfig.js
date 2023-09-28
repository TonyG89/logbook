
import { ref } from 'vue'

export default function tableConfig() {

  const columns = [
    {
      name: 'index',
      label: '#',
      field: 'index'
    },
    {
      name: 'name',
      required: true,
      label: 'Dessert (100g serving)',
      align: 'left',
      field: row => row.name,
      format: val => val,
      sortable: true
    },
    { name: 'calories', align: 'center', label: 'Calories', field: 'calories', sortable: true },
    { name: 'fat', label: 'Fat (g)', field: 'fat', sortable: true },
    { name: 'carbs', label: 'Carbs (g)', field: 'carbs' },
    { name: 'protein', label: 'Protein (g)', field: 'protein' },
    { name: 'sodium', label: 'Sodium (mg)', field: 'sodium' },
    { name: 'calcium', label: 'Calcium (%)', field: 'calcium', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
    { name: 'iron', label: 'Iron (%)', field: 'iron', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) }
  ]

  const setData = (data) => data?.map((row) => ({
    name: row.actions,
    calories: row.date,
    fat: row.kilometers,
    carbs: row.status,
    protein: row.work,
    sodium: row.details,
    calcium: row.categories,
    iron: row.commets,
  })
  )
  return { columns, setData }
}