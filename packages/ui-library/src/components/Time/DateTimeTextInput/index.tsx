import { memo, useCallback, useEffect, useRef } from 'react'
import { getDateTimeText, getNextActiveDateTimeKey, getNumberKey } from './dateTimeHelpers'
import { TextInput } from '@/components/Input/TextInput'
import { useState } from 'react'
import { MouseEvent } from 'react'
import { DateTimeKey, DateTimeValues } from './index.types'
import {
  getSelectionRange,
  sortedDateTimeKeyInfo,
  getDateTimeKey,
  updateDateTimeValue,
  isMoveNextFocusFromNewValue,
} from './dateTimeHelpers'

interface Props {
  value?: DateTimeValues
  format?: string
  onChange: (value: DateTimeValues) => void
}

const _DateTimeTextInput = ({ value, format = 'YYYY-MM-DD', onChange }: Props) => {
  const [textHighlightTrigger, setTextHighlightTrigger] = useState(false)
  const [dateTimeValue, setDateTimeValue] = useState<DateTimeValues | undefined>(value)
  const [activeDateTimeKey, setActiveDateTimeKey] = useState<{
    current: DateTimeKey | undefined
    previous: DateTimeKey | undefined
  }>({ current: undefined, previous: undefined })
  const [zeroPaddingCount, setZeroPaddingCount] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setDateTimeValue(value)
  }, [value])

  useEffect(() => {
    if (activeDateTimeKey.current) {
      hightlightSelectionText(activeDateTimeKey.current)
    }
  }, [activeDateTimeKey, textHighlightTrigger])

  const hightlightSelectionText = (dateTimeKey: DateTimeKey | undefined) => {
    if (dateTimeKey === undefined) {
      return
    }
    const selectionPosition = getSelectionRange(dateTimeKey, format)
    if (selectionPosition) {
      inputRef.current?.setSelectionRange(selectionPosition.start, selectionPosition.end)
      inputRef.current?.focus()
    }
  }

  const handleSelect = useCallback(
    (e: MouseEvent<HTMLInputElement>) => {
      e.preventDefault()
      const clickedPosition = e.currentTarget.selectionStart
      if (clickedPosition === null) {
        return
      }

      const selectedDateTimeKey = getDateTimeKey(clickedPosition, format)
      if (selectedDateTimeKey === activeDateTimeKey.current) {
        hightlightSelectionText(selectedDateTimeKey)
        return
      }

      if (!selectedDateTimeKey) {
        const lastDtKey = sortedDateTimeKeyInfo(format).slice(-1)[0]?.dateTimeKey
        setActiveDateTimeKey({
          current:
            activeDateTimeKey.current === lastDtKey
              ? lastDtKey
              : sortedDateTimeKeyInfo(format)[0]?.dateTimeKey,
          previous: activeDateTimeKey.current,
        })
      }
      setActiveDateTimeKey({
        current: selectedDateTimeKey,
        previous: activeDateTimeKey.current,
      })
    },
    [activeDateTimeKey],
  )

  const handleInput = useCallback(() => {
    setTextHighlightTrigger((prev) => !prev)
  }, [])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (activeDateTimeKey.current === undefined || dateTimeValue === undefined) {
        return
      }

      const newValue = updateDateTimeValue(
        e.code,
        dateTimeValue!,
        activeDateTimeKey as { current: DateTimeKey; previous: DateTimeKey | undefined },
        zeroPaddingCount,
      )
      setDateTimeValue(newValue)
      const isFilledAllKey = Object.keys(newValue).every(
        (key) => newValue[key as DateTimeKey] !== undefined,
      )
      if (isFilledAllKey) {
        onChange(newValue)
      }
      if (newValue && newValue[activeDateTimeKey.current] === 0) {
        setZeroPaddingCount((prev) => prev++)
      }

      let moveStep =
        isMoveNextFocusFromNewValue(newValue, activeDateTimeKey.current, zeroPaddingCount) &&
        getNumberKey(e.code)
          ? 1
          : 0
      if (e.code === 'ArrowRight' || e.code === 'Tab') {
        moveStep = 1
      }
      if (e.code === 'ArrowLeft' || (e.code === 'Tab' && e.shiftKey)) {
        moveStep = -1
      }
      const nextActiveKey = getNextActiveDateTimeKey(activeDateTimeKey.current, moveStep, format)
      setActiveDateTimeKey((prev) => {
        return { current: nextActiveKey, previous: prev.current }
      })
      if (e.code === 'Tab' && nextActiveKey === activeDateTimeKey.current) {
        return
      }
      e.preventDefault()
    },
    [activeDateTimeKey, dateTimeValue],
  )

  const handleFocus = useCallback(() => {
    if (dateTimeValue === undefined) {
      setDateTimeValue({
        year: undefined,
        month: undefined,
        day: undefined,
        hour: undefined,
        minute: undefined,
        second: undefined,
      })
    }
  }, [dateTimeValue])

  const handleBlur = useCallback(() => {
    const isAllKeyUndefined = Object.keys(dateTimeValue!).every(
      (key) => dateTimeValue![key as keyof DateTimeValues] === undefined,
    )
    if (isAllKeyUndefined) {
      setDateTimeValue(undefined)
    }
    setActiveDateTimeKey({
      current: undefined,
      previous: undefined,
    })
  }, [dateTimeValue])

  return (
    <TextInput
      ref={inputRef}
      value={getDateTimeText(dateTimeValue, format)}
      onSelect={handleSelect}
      onInput={handleInput}
      onKeyDown={handleKeyDown}
      onFocus={handleFocus}
      onBlur={handleBlur}
    />
  )
}

export const DateTimeTextInput = memo(_DateTimeTextInput)
