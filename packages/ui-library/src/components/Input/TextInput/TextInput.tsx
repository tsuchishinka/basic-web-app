import React from 'react'
import clsx from 'clsx'
import styles from './TextInput.module.scss'

export type TextInputProps = {
  value?: string
  disabled?: boolean
  onChange: (val: string) => void
}

const _TextInput = ({ value, onChange, disabled }: TextInputProps) => {
  const onChangeEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
  }
  const styleWrapper = () => {
    const styleArray = [styles['text-input']]
    if (disabled) {
      styleArray.push(styles.disabled)
    }
    return styleArray
  }
  return (
    <div className={clsx(styleWrapper())}>
      <input value={value} disabled={disabled} onChange={onChangeEvent} />
    </div>
  )
}

export const TextInput = React.memo(_TextInput)
