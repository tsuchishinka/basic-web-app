import { forwardRef, memo, useState } from 'react'
import clsx from 'clsx'
import styles from './index.module.scss'

export interface TextInputProps extends React.HTMLAttributes<HTMLInputElement> {
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
}

const _TextInput = forwardRef<HTMLInputElement, TextInputProps>(function _TextInputFunc(
  {
    value,
    placeholder,
    disabled = false,
    type,
    error,
    onChange,
    onKeyDown,
    onSelect,
    onInput,
    onFocus,
    onBlur,
  }: TextInputProps,
  ref,
) {
  const [focus, setFocus] = useState(false)

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocus(true)
    onFocus?.(e)
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocus(false)
    onBlur?.(e)
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
        ref={ref}
        value={value}
        placeholder={placeholder}
        type={type}
        disabled={disabled}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={onChange}
        onKeyDown={onKeyDown}
        onSelect={onSelect}
        onInput={onInput}
      />
    </div>
  )
})

const TextInput = memo(_TextInput)
export { TextInput }
