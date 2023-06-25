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
    title: 'Пробег:',
    value: newItem.kilometers + ' км',
  },
  {
    title: 'Всего наездил:',
    value: myTotalDistance + ' км',
  },
  {
    title: '2019 год:',
    value: annualDistance(2019) + ' км',
  },
  {
    title: '2020: год',
    value: annualDistance(2020) + ' км',
  },
  {
    title: '2021 год:',
    value: annualDistance(2021) + ' км',
  },
  {
    title: 'Прошлый год:',
    value: annualDistance(2022) + ' км',
  },
  {
    title: 'Текущий год:',
    value: annualDistance(2023) + ' км',
  },
  {
    title: 'Среднее за год:', // весь километраж с первой записи по последнею / количество дней/365
    value: parseInt(myTotalDistance / totalDays * 365) + ' км',
  }]
  return infoDashboard
}