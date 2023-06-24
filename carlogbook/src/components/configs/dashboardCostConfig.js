import {
  fullDate, quantityDay
} from '@/helpers/dates.js'
export default function (data) {
  const newItem = data.value[0]
  const oldItem = data.value.at(-1)
  const myTotalOwnDays = new Date(newItem.date) - new Date(oldItem.date)

  const totalDays = quantityDay(myTotalOwnDays)
  /**
   * @title Фильтрация по году
   * @param {number} год, по которому будет осуществляться фильтрация
   * @return {Array} отфильтрованные данные
   */
  const getDataYear = (year) => {
    return data.value?.filter(({ date }) => date.includes(year))
  }
  /**
   * Рассчитывает годовое расстояние, пройденное транспортным средством в зависимости от года.
   *
   * @param {number} Год, для которого рассчитывается расстояние.
   * @return {number} Возвращает расстояние, пройденное в километрах в течение года.
   */
  // 
  const annualDistance = (year) => getDataYear(year)[0].kilometers - getDataYear(year).at(-1).kilometers

  const myTotalDistance = newItem.kilometers - oldItem.kilometers

  const infoDashboard = [{
    title: 'Потрачено:',
    value: newItem.kilometers,
  },
  {
    title: 'на работу:',
    value: myTotalDistance,
  },
  {
    title: 'на детали:',
    value: annualDistance(2019),
  },
  {
    title: 'Расходка',
    value: annualDistance(2020),
  },
  {
    title: 'Шиномонтаж:',
    value: annualDistance(2021),
  },
  {
    title: 'Расходка:',
    value: annualDistance(2022),
  },
  {
    title: 'Поломка и износ:',
    value: annualDistance(2023),
  },
  {
    title: 'Поломка по моей вине:',
    value: annualDistance(2023),
    hint: 'Сумма включена в раздел "Поломка и износ"'
  },
  {
    title: 'Диагностика:',
    value: annualDistance(2022),
  },
  {
    title: 'Тюнинг:', // весь километраж с первой записи по последнею / количество дней/365
    value: parseInt(myTotalDistance / totalDays * 365) + ' км',
  }]
  return infoDashboard.map((obj) => ({ ...obj, value: obj.value + ' грн' }))
}