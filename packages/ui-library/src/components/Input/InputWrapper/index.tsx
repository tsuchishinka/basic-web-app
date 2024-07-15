import { CSSProperties, ReactNode, useState } from 'react'
import styles from './index.module.scss'
import clsx from 'clsx'

interface Props {
  children: ReactNode
  labelPosition?: 'top' | 'left'
  errorMessage?: string
  labelWidth?: string
  label: ReactNode
}

const InputWrapper = ({
  children,
  labelPosition = 'top',
  errorMessage,
  labelWidth,
  label,
}: Props) => {
  const [] = useState('')
  const inputWrapperStyle = () => {
    const style: CSSProperties = {}
    if (labelPosition === 'left') {
      style.gridTemplateColumns = `${labelWidth} auto`
    }
    return style
  }
  return (
    <div className={clsx(styles[`input-wrapper-${labelPosition}`])} style={inputWrapperStyle()}>
      <label className={clsx(labelPosition === 'left' && styles['label-left'], styles.label)}>
        {label}
      </label>
      <div className={clsx(labelPosition === 'left' && styles['children-left'])}>{children}</div>
      <div
        className={clsx(
          labelPosition === 'left' && styles['error-message-left'],
          styles['error-message'],
        )}
      >
        {errorMessage}
      </div>
    </div>
  )
}

export { InputWrapper }
