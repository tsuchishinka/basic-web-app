import exp from 'constants'
import { DateTimeValues, DateTimeDetail } from './DateTimeTypes'

type FormatItem = 'YYYY' | 'MM' | 'DD' | 'hh' | 'mm' | 'ss'

const FORMAT_DATETIMEKEY_MAP_ARRAY: {
  dateTimeKey: keyof DateTimeValues
  formatItem: FormatItem
}[] = [
  { dateTimeKey: 'year', formatItem: 'YYYY' },
  { dateTimeKey: 'month', formatItem: 'MM' },
  { dateTimeKey: 'day', formatItem: 'DD' },
  { dateTimeKey: 'hour', formatItem: 'hh' },
]
class Format {
  formatText: string
  constructor(format: string) {
    this.formatText = format
  }
  sortedDateTimeKeyList = (): {
    dateTimeKey: keyof DateTimeDetail
    position: { start: number; end: number }
  }[] => {
    const dateTimeInfoList = FORMAT_DATETIMEKEY_MAP_ARRAY.map((formatMap) => {
      const positionIndex = this.formatText.indexOf(formatMap.formatItem)
      if (positionIndex === -1) {
        return {
          dateTimeKey: formatMap.dateTimeKey,
          position: {
            start: -1,
            end: -1,
          },
        }
      }
      return {
        dateTimeKey: formatMap.dateTimeKey,
        position: {
          start: positionIndex,
          end: positionIndex + formatMap.formatItem.length,
        },
      }
    })
    return dateTimeInfoList
      .filter((info) => info.position.start >= 0)
      .sort((a, b) => {
        return a.position.start - b.position.start
      })
  }

  getDateTimeText = (dateTimeDetal: DateTimeDetail): string => {
    if (!dateTimeDetal) {
      return ''
    }
    let dateTimeText = this.formatText
    FORMAT_DATETIMEKEY_MAP_ARRAY.forEach((formatMap) => {
      const dateTimeValue = dateTimeDetal[formatMap.dateTimeKey]?.value
      if (!dateTimeValue) {
        return
      }

      dateTimeText = dateTimeText.replace(
        formatMap.formatItem,
        dateTimeValue.toString().padStart(formatMap.formatItem.length, '0'),
      )
    })
    return dateTimeText
  }
}

export default Format
