import { endOfMonth } from 'date-fns'
import { DateTimeKey, DateTimeValues, FormatItem } from './index.types'

const FORMAT_DATETIMEKEY_MAP_ARRAY: {
  dateTimeKey: keyof DateTimeValues
  formatItem: FormatItem
}[] = [
  { dateTimeKey: 'year', formatItem: 'YYYY' },
  { dateTimeKey: 'month', formatItem: 'MM' },
  { dateTimeKey: 'day', formatItem: 'DD' },
  { dateTimeKey: 'hour', formatItem: 'hh' },
  { dateTimeKey: 'minute', formatItem: 'mm' },
  { dateTimeKey: 'second', formatItem: 'ss' },
]

const dateTimeRange = (value: DateTimeValues) => {
  return {
    year: {
      min: 1,
      max: 9999,
      digitCount: 4,
    },
    month: {
      min: 1,
      max: 12,
      digitCount: 2,
    },
    day: {
      min: 1,
      max:
        value.year && value.month
          ? endOfMonth(new Date(value.year, value.month - 1)).getDate()
          : 31,
      digitCount: 2,
    },
    hour: {
      min: 0,
      max: 23,
      digitCount: 2,
    },
    minute: {
      min: 0,
      max: 59,
      digitCount: 2,
    },
    second: {
      min: 0,
      max: 59,
      digitCount: 2,
    },
  }
}

const clamp = (min: number, value: number, max: number) => {
  return Math.min(Math.max(value, min), max)
}

const sortedDateTimeKeyInfo = (format: string) => {
  const dateTimeInfoList = FORMAT_DATETIMEKEY_MAP_ARRAY.map((formatMap) => {
    const positionIndex = format.indexOf(formatMap.formatItem)
    return {
      dateTimeKey: formatMap.dateTimeKey,
      positionIndex,
      formatItem: formatMap.formatItem,
    }
  })
  return dateTimeInfoList
    .filter((info) => info.positionIndex >= 0)
    .sort((a, b) => {
      return a.positionIndex - b.positionIndex
    })
    .map((dateTimeInfo) => {
      return {
        dateTimeKey: dateTimeInfo.dateTimeKey,
        formatItem: dateTimeInfo.formatItem,
      }
    })
}

const getDateTimeKeyStrPositionList = (format: string) => {
  return sortedDateTimeKeyInfo(format).map((dateTimeKeyInfo) => {
    const posIndex = format.indexOf(dateTimeKeyInfo.formatItem)
    return {
      dateTimeKey: dateTimeKeyInfo.dateTimeKey,
      position: {
        start: posIndex,
        end: posIndex + dateTimeKeyInfo.formatItem.length,
      },
    }
  })
}

const getDateTimeKey = (clickedPos: number, format: string) => {
  const dateTimeKeyStrPositionList = getDateTimeKeyStrPositionList(format)
  return dateTimeKeyStrPositionList.find(
    (dtKeyInfo) => clickedPos >= dtKeyInfo.position.start && clickedPos < dtKeyInfo.position.end,
  )?.dateTimeKey
}

const getSelectionRange = (dateTimeKey: DateTimeKey, format: string) => {
  return getDateTimeKeyStrPositionList(format).find(
    (dtKeyInfo) => dtKeyInfo.dateTimeKey === dateTimeKey,
  )?.position
}

const getNextActiveDateTimeKey = (
  currentDateTimeKey: DateTimeKey,
  moveStep: number,
  format: string,
) => {
  const dateTimeKeyStrPositionList = getDateTimeKeyStrPositionList(format)
  const currentIndex = dateTimeKeyStrPositionList.findIndex(
    (dtKeyPos) => dtKeyPos.dateTimeKey === currentDateTimeKey,
  )
  const nextIndex = clamp(0, currentIndex + moveStep, dateTimeKeyStrPositionList.length - 1)

  return dateTimeKeyStrPositionList[nextIndex]!.dateTimeKey
}

const getDateTimeText = (dateTimeValue: DateTimeValues | undefined, format: string) => {
  if (!dateTimeValue) {
    return ''
  }
  let text = format
  sortedDateTimeKeyInfo(format).forEach((formatMap) => {
    const dateTimeItem = dateTimeValue[formatMap.dateTimeKey]
    if (!dateTimeItem) {
      return
    }

    text = text.replace(
      formatMap.formatItem,
      dateTimeItem.toString().padStart(formatMap.formatItem.length, '0'),
    )
  })
  return text
}

const calcNewValuePressingIncrementKey = (
  keyCode: string,
  dateTimeValue: DateTimeValues,
  currentActiveKey: DateTimeKey,
): DateTimeValues => {
  if (dateTimeValue[currentActiveKey] === undefined) {
    if (currentActiveKey === 'year') {
      return {
        ...dateTimeValue,
        year: new Date().getFullYear(),
      }
    } else if (keyCode === 'ArrowUp' || keyCode === 'PageUp') {
      return {
        ...dateTimeValue,
        [currentActiveKey]: dateTimeRange(dateTimeValue)[currentActiveKey].min,
      }
    } else {
      return {
        ...dateTimeValue,
        [currentActiveKey]: dateTimeRange(dateTimeValue)[currentActiveKey].max,
      }
    }
  }

  let addedNum = 1
  if (keyCode === 'ArrowDown') {
    addedNum = -1
  }
  if (keyCode === 'PageUp') {
    addedNum = 5
  }
  if (keyCode === 'PageDown') {
    addedNum = -5
  }
  const newNum = dateTimeValue[currentActiveKey]! + addedNum
  const range = dateTimeRange(dateTimeValue)[currentActiveKey]
  if (newNum > range.max) {
    const overMaxNum = newNum - range.max
    return {
      ...dateTimeValue,
      [currentActiveKey]: range.min - 1 + overMaxNum,
    }
  } else if (newNum < range.min) {
    const underMinNum = range.min - newNum
    return {
      ...dateTimeValue,
      [currentActiveKey]: range.max + 1 - underMinNum,
    }
  } else {
    return {
      ...dateTimeValue,
      [currentActiveKey]: newNum,
    }
  }
}

const calcNewValuePressingNumberKey = (
  keyNumber: number,
  dateTimeValue: DateTimeValues,
  activeDateTimeKey: {
    current: DateTimeKey
    previous: DateTimeKey | undefined
  },
  zeroPaddedCount: number,
): DateTimeValues => {
  let newNum = keyNumber
  if (activeDateTimeKey.current === activeDateTimeKey.previous) {
    const previousNum = dateTimeValue[activeDateTimeKey.current] ?? 0
    newNum = previousNum * 10 + newNum
  }
  const rangeInfo = dateTimeRange(dateTimeValue)[activeDateTimeKey.current]
  newNum = Math.min(newNum, rangeInfo.max)
  if (zeroPaddedCount + newNum.toString().length >= rangeInfo.digitCount) {
    newNum = Math.max(newNum, rangeInfo.min)
  }
  console.log(`keyNumber: ${keyNumber}`)
  console.log(`newNum: ${newNum}`)
  return {
    ...dateTimeValue,
    [activeDateTimeKey.current]: newNum,
  }
}

const updateDateTimeValue = (
  keyCode: string,
  dateTimeValue: DateTimeValues,
  activeDateTimeKey: {
    current: DateTimeKey
    previous: DateTimeKey | undefined
  },
  zeroPaddedCount: number,
) => {
  console.log(`keycode oomoto: ${keyCode}`)
  if (keyCode === 'Home') {
    return {
      ...dateTimeValue,
      [activeDateTimeKey.current!]: dateTimeRange(dateTimeValue)[activeDateTimeKey.current].min,
    }
  } else if (keyCode === 'End') {
    return {
      ...dateTimeValue,
      [activeDateTimeKey.current!]: dateTimeRange(dateTimeValue)[activeDateTimeKey.current].max,
    }
  } else if (keyCode === 'Delete' || keyCode === 'Backspace') {
    return {
      ...dateTimeValue,
      [activeDateTimeKey.current!]: undefined,
    }
  } else if (
    keyCode === 'ArrowUp' ||
    keyCode === 'ArrowDown' ||
    keyCode === 'PageUp' ||
    keyCode === 'PageDown'
  ) {
    return calcNewValuePressingIncrementKey(keyCode, dateTimeValue, activeDateTimeKey.current)
  } else if (getNumberKey(keyCode) !== undefined) {
    return calcNewValuePressingNumberKey(
      getNumberKey(keyCode)!,
      dateTimeValue,
      activeDateTimeKey,
      zeroPaddedCount,
    )
  } else {
    return dateTimeValue
  }
}

const getNumberKey = (keyCode: string) => {
  const numKeyCodeList = ['Digit', 'Numpad']
  const numKeyCodeIndex = ['Digit', 'Numpad'].findIndex((numKey) => keyCode.includes(numKey))
  if (numKeyCodeIndex === -1) {
    return undefined
  }
  return Number(keyCode.split(numKeyCodeList[numKeyCodeIndex]!)[1])
}

const isMoveNextFocusFromNewValue = (
  newValue: DateTimeValues,
  currentActiveKey: DateTimeKey,
  zeroPaddingCount: number,
) => {
  const newNum = newValue[currentActiveKey]
  if (newNum === undefined) {
    return false
  }

  const rangeInfo = dateTimeRange(newValue)[currentActiveKey]
  return (
    newNum * 10 > rangeInfo.max ||
    newNum.toString().length + zeroPaddingCount >= rangeInfo.digitCount
  )
}

export {
  getDateTimeKey,
  getSelectionRange,
  getNextActiveDateTimeKey,
  getDateTimeText,
  dateTimeRange,
  sortedDateTimeKeyInfo,
  updateDateTimeValue,
  isMoveNextFocusFromNewValue,
  getNumberKey,
}
