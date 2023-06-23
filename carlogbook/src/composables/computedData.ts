import { computed } from 'vue';
import {
  fullDate, quantityDay
} from '../helpers/dates.js'
export default function computedData(params) {
  interface dashBoardInformationArray {
    title: string;
    value: number | string | [number | string];
  }

  const allStatistic = (data: { value: [{}] }): dashBoardInformationArray[] => {
    const newItem = data.value[0]
    const oldItem = data.value.at(-1)



    // DATE
    const fromBoughtToToday = new Date() - new Date(oldItem.date)
    const countDaysFromLastAction = new Date() - new Date(newItem.date)
    const dataThisYear = data.value?.filter(({ date }) => date.includes('2023'))
    const lastDateKilometers = dataThisYear.at(-1).kilometers || (dataThisYear.at(-2).kilometers + data.value[dataThisYear.length + 1].kilometers) / 2

    return [{
      title: 'Срок службы:',
      value: fullDate(fromBoughtToToday),
    },
    {
      title: 'Последние манипуляции:',
      value: fullDate(countDaysFromLastAction).join(' '),
    },
    {
      title: 'Все наездил:',
      value: newItem.kilometers - oldItem.kilometers + 'км',
    },
    {
      title: 'В этом году проехал:',
      value: dataThisYear[0].kilometers - lastDateKilometers + 'км',
    }
    ]
  }

  //! сделать с кнопкой выбора года а пока используем averageStatistic
  // const averageOfYear = (year: number): dashBoardInformationArray[] => [{
  //   title: 'Километров проехал',
  //   value: null,
  // },
  // // ВКЛАДКА: ПОТРАЧЕНО
  // {
  //   title: 'на детали',
  //   value: null
  // },
  // {
  //   title: 'на работу',
  //   value: null
  // },
  // {
  //   title: 'сумма',
  //   value: null
  // },
  // {
  //   title: 'Километров проехал',
  //   value: null
  // },
  // ]

  const averageStatistic = (data: { value: [{}] }): dashBoardInformationArray[] => {
    const newItem = data.value[0]
    const oldItem = data.value.at(-1)

    // DATE
    const fromBoughtToToday = new Date() - new Date(oldItem.date)
    const countDaysFromLastAction = new Date() - new Date(newItem.date)

    const totalDays = quantityDay(fromBoughtToToday)
    const totalDistance = newItem.kilometers - oldItem.kilometers

    return [{
      title: 'дней в эксплуатации',
      value: [totalDays + 'дней'],
    },
    {
      title: 'Общее растояние',
      value: totalDistance + 'км',
    },
    {
      title: 'Средняя растояние',
      value: Math.round(totalDistance / totalDays * 365) + 'км/год',
    },
    {
      title: 'Средняя растояние',
      value: (totalDistance / totalDays).toFixed(2) + 'км/день',
    },
    // ВКЛАДКА: ПОТРАЧЕНО <HR>
    {
      title: 'Общее потрачено',
      value: null
    },
    {
      title: 'Тратиться в среднем за год',
      value: null
    },
    {
      title: 'Тратиться в среднем за месяц',
      value: null
    },
    ]
  }

  const wastedMoney = (data: { value: [{}] }): dashBoardInformationArray[] => {
    // ВКЛАДКА: ПОТРАЧЕНО <HR>
    return [{
      title: 'на детали',
      value: '',
      // data.value?.reduce((acc, { details }) => ({
      //   acc + details
      // }, 0))
    },
    {
      title: 'на работу',
      value: null
    },
    {
      title: 'сумма',
      value: null
    }]
  }

  const valueMinMax = (data: { value: [{}] }): dashBoardInformationArray[] => {
    return [
      // MIN
      {
        title: 'самый дешевый год по затратам',
        value: null
      },
      {
        title: 'меньше всего выкатал',
        value: null
      },
      {
        title: 'меньше всего ремонтировал за год и количество',
        value: null
      },
      // MAX
    ]
  }


  return {
    allStatistic,
    // averageOfYear,
    averageStatistic,
    wastedMoney,
  }
};
