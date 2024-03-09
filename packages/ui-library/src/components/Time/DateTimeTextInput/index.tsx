import { memo, useEffect, useRef } from 'react'
import { TextInput } from '@/components/Input/TextInput'
import { toDateTimeDetail } from './textInputUtil'
import { useState } from 'react'
import { MouseEvent } from 'react'
import { DateTimeValues, DateTimeDetail } from './DateTimeTypes'
import Format from './format'

interface Props {
  value?: DateTimeValues
  format?: string
  onChange: (value: DateTimeValues) => void
}

const _DateTimeTextInput = ({ value, format = 'YYYY-MM-DD', onChange }: Props) => {
  const [dateTimeDetail, setDateTimeDetail] = useState(toDateTimeDetail(value))
  const [activeDateTimeKey, setActiveDateTimeKey] = useState<{
    current: keyof DateTimeDetail | undefined
    previous: keyof DateTimeDetail | undefined
  }>({ current: undefined, previous: undefined })
  const [textHighlightTrigger, setTextHighlightTrigger] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const dateTimeFormat = new Format(format)

  useEffect(() => {
    if (activeDateTimeKey.current) {
      hightlightSelectionText(activeDateTimeKey.current)
    }
  }, [activeDateTimeKey, textHighlightTrigger])

  useEffect(() => {
    setDateTimeDetail(toDateTimeDetail(value))
  }, [value])

  const hightlightSelectionText = (dateTimeKey: keyof DateTimeDetail) => {
    const selectionPosition = dateTimeFormat
      .sortedDateTimeKeyList()
      .find((info) => info.dateTimeKey === dateTimeKey)?.position
    if (selectionPosition) {
      inputRef.current?.setSelectionRange(selectionPosition.start, selectionPosition.end)
      inputRef.current?.focus()
    }
  }

  const onSelect = (e: MouseEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.currentTarget.selectionStart === null) {
      return
    }
    const clickPosition = e.currentTarget.selectionStart
    const selectedDateTimeKey = dateTimeFormat
      .sortedDateTimeKeyList()
      .find((info) => clickPosition >= info.position.start && clickPosition <= info.position.end)
      ?.dateTimeKey
    if (selectedDateTimeKey) {
      setActiveDateTimeKey((prev) => {
        return {
          current: selectedDateTimeKey,
          previous: prev.current,
        }
      })
    }
  }

  const onInput = () => {
    setTextHighlightTrigger((prev) => !prev)
  }

  const onKeyDown = (e: React.KeyboardEvent) => console.log(e.code)

  return (
    <TextInput
      ref={inputRef}
      value={dateTimeFormat.getDateTimeText(dateTimeDetail)}
      onSelect={onSelect}
      onInput={onInput}
      onKeyDown={onKeyDown}
    />
  )
}

export const DateTimeTextInput = memo(_DateTimeTextInput)
