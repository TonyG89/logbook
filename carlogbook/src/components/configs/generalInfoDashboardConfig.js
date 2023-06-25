import {
  fullDate
} from '@/helpers/dates.js'

export default function (data) {

  const newItem = data.value[0]
  const oldItem = data.value.at(-1)
  const myTotalOwnDays = new Date(newItem.date) - new Date(oldItem.date)
  // DATE
  const fromBoughtToToday = new Date() - new Date(oldItem.date)
  const countDaysFromLastAction = new Date() - new Date(newItem.date)
  const dataThisYear = data.value?.filter(({ date }) => date.includes('2023'))
  const dataLastYear = data.value?.filter(({ date }) => date.includes('2022'))
  const lastDateKilometers = dataThisYear.at(-1).kilometers || (dataThisYear.at(-2).kilometers + data.value[dataThisYear.length + 1].kilometers) / 2
  const quantityDays = oldItem.date
  const myTotalDistance = newItem.kilometers - oldItem.kilometers
  
  return [{
    title: 'Срок службы:',
    value: fullDate(fromBoughtToToday),
  },
  {
    title: 'Последние манипуляции:',
    value: fullDate(countDaysFromLastAction).join(' ') || 'сегодня',
  },
  {
    title: 'Всего наездил:',
    value: myTotalDistance + ' км',
  },
  ]
}