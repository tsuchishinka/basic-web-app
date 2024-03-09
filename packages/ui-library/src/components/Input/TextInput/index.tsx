import { memo, useState } from 'react'
import clsx from 'clsx'
import styles from './TextInput.module.scss'

export type TextInputProps = {
  /** value  */
  value?: string
  /** 非活性になるか否か */
  disabled?: boolean
  /** エラーの見た目にするか否か */
  error?: boolean
  /** プレースホルダー */
  placeholder?: string
  /** type */
  type?: React.HTMLInputTypeAttribute
  /** valueの値が変わった際のイベントハンドラ */
  onChange: (val: string) => void
}

const _TextInput = ({ value, onChange, placeholder, disabled, type, error }: TextInputProps) => {
  const [focus, setFocus] = useState(false)

  const onChangeEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
  }

  const styleWrapper = () => {
    const styleArray = [styles['text-input']]
    if (disabled) {
      styleArray.push(styles.disabled)
    }
    if (error) {
      styleArray.push(styles.error)
    }
    if (focus) {
      styleArray.push(styles.focus)
    }
    return styleArray
  }

  return (
    <div className={clsx(styleWrapper())}>
      <input
        value={value}
        placeholder={placeholder}
        type={type}
        disabled={disabled}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        onChange={onChangeEvent}
      />
    </div>
  )
}

export const TextInput = memo(_TextInput)
