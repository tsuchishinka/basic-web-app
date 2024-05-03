type DateTimeValues = {
  year?: number
  month?: number
  day?: number
  hour?: number
  minute?: number
  second?: number
}

type FormatItem = 'YYYY' | 'MM' | 'DD' | 'hh' | 'mm' | 'ss'

type DateTimeKey = keyof DateTimeValues

export type { DateTimeValues, FormatItem, DateTimeKey }
