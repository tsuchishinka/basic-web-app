import { DateTimeDetail, DateTimeValues } from './DateTimeTypes'

export const toDateTimeDetail = (value?: DateTimeValues): DateTimeDetail => {
  return {
    year: {
      value: value?.year,
      preZeroCount: 0,
    },
    month: {
      value: value?.month,
      preZeroCount: 0,
    },
    day: {
      value: value?.day,
      preZeroCount: 0,
    },
    hour: {
      value: value?.hour,
      preZeroCount: 0,
    },
    minute: {
      value: value?.minute,
      preZeroCount: 0,
    },
    second: {
      value: value?.second,
      preZeroCount: 0,
    },
  }
}
