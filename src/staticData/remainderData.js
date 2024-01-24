import CATEGORIES_TYPES from './types/categoriesType';
import brakeIcon from '@/assets/brake-icon.svg';

export default [
  {
    title: 'Масла двигателя',
    icon: 'oil_barrel',
    distance: 10000,
    tags: [CATEGORIES_TYPES.ENGINE, 'масло'],
  },
  {
    title: 'Масло ГУР',
    // icon: 'toll',
    icon: 'filter_tilt_shift',
    distance: 60000,
    term: 36,
    tags: [CATEGORIES_TYPES.COOLING_SYSTEM, 'жидкость'],
  },
  {
    title: 'Антифриз',
    icon: 'severe_cold',
    distance: 60000,
    term: 36,
    tags: [CATEGORIES_TYPES.COOLING_SYSTEM, 'жидкость'],
  },
  {
    title: 'Фильтр салона',
    icon: 'filter_list_alt',
    distance: 20000,
    tags: [CATEGORIES_TYPES.INTERIOR, 'фильтр'],
  },
  {
    title: 'Воздушный фильтра',
    icon: 'air',
    distance: 30000,
    tags: [CATEGORIES_TYPES.ENGINE, 'фильтр'],
  },
  {
    title: 'Ремень ГРМ',
    icon: 'fa-solid fa-bacon',
    distance: 50000,
    tags: [CATEGORIES_TYPES.ENGINE, 'ремень'],
  },
  {
    title: 'Тормоза передние',
    icon: brakeIcon,
    distance: 50000,
    tags: [CATEGORIES_TYPES.BRAKE_SYSTEM, 'колодки'],
  },
  {
    title: 'Тормоза задние',
    icon: brakeIcon,
    distance: 50000,
    tags: [CATEGORIES_TYPES.BRAKE_SYSTEM, 'барабаны'],
  },
  {
    title: 'Тормозная жидкость',
    icon: 'fa-sharp fa-regular fa-circle-dot',
    distance: 50000, // !!!
    tags: [CATEGORIES_TYPES.BRAKE_SYSTEM, 'жидкость'],
  },
  {
    title: 'Заправка бензином',
    icon: 'fa fa-gas-pump',
    term: 6,
    tags: [CATEGORIES_TYPES.REFUELING, 'бензин'],
  },
];
