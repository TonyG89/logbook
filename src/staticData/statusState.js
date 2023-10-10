import STATUS_TYPE from './types/statusType'

export default {
  normal: {
    value: 'normal',
    color: 'normal-color',
    limits: STATUS_TYPE.NORMAL
  },
  warning: {
    value: 'warning',
    color: 'warning-color',
    limits: STATUS_TYPE.WARNING
  },
  danger: {
    value: 'danger',
    color: 'danger-color',
    limits: STATUS_TYPE.DANGER
  },
  alerta: {
    value: 'alerta',
    color: 'alerta-color',
    limits: STATUS_TYPE.ALERTA
  }
}