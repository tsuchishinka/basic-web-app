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

const _TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
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
    }: TextInputProps,
    ref,
  ) => {
    const [focus, setFocus] = useState(false)

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
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          onChange={onChange}
          onKeyDown={onKeyDown}
          onSelect={onSelect}
          onInput={onInput}
        />
      </div>
    )
  },
)

export const TextInput = memo(_TextInput)
