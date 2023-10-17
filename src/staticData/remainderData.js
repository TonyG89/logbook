import CATEGORIES_TYPES from "./types/categoriesType"

export default [
  {
    title: 'Масла двигателя',
    icon: 'oil_barrel',
    distance: 10000,
    tags: [CATEGORIES_TYPES.ENGINE, 'масло']
  },
  {
    title: 'Масло ГУР',
    // icon: 'toll',
    icon: 'filter_tilt_shift',
    distance: 60000,
    term: 36,
    tags: [CATEGORIES_TYPES.COOLING_SYSTEM, 'жидкость']
  },
  {
    title: 'Антифриз',
    icon: 'severe_cold',
    distance: 10000,
    tags: [CATEGORIES_TYPES.HEATING_AND_AIR_CONDITIONING, 'жидкость']
  },
  {
    title: 'Фильтр салона',
    icon: 'filter_list_alt',
    distance: 20000,
    tags: [CATEGORIES_TYPES.INTERIOR, 'фильтр']
  },
  {
    title: 'Воздушный фильтра',
    icon: 'air',
    distance: 30000,
    tags: [CATEGORIES_TYPES.ENGINE, 'фильтр']
  },
  {
    title: 'Ремень РГМ',
    icon: 'belt',
    distance: 50000,
    tags: [CATEGORIES_TYPES.ENGINE, 'фильтр'] // !!!!
  },
  {
    title: 'Тормоза',
    icon: 'brakes',
    distance: 50000,
    tags: [CATEGORIES_TYPES.ENGINE, 'фильтр'] // !!!!
  },
  {
    title: 'Тормозная жидкость',
    icon: '',
    distance: 50000,
    tags: [CATEGORIES_TYPES.ENGINE, 'фильтр'] // !!!!
  },

]