import clsx from 'clsx'
import styles from './Button.module.scss'

export type ButtonProps = {
  /**
   * Is this the principal call to action on the page?
   */
  variant?: 'secondary' | 'primary'
  /**
   * What background color to use
   */
  color?: 'blue' | 'red' | 'gray' | 'green'
  /**
   * How large should the button be?
   */
  size?: 'small' | 'medium' | 'large'
  /**
   * Button contents
   */
  label: string
  /**
   * Optional click handler
   */
  onClick?: () => void
}

/**
 * Primary UI component for user interaction
 */
export const Button = ({
  variant = 'secondary',
  size = 'medium',
  color = 'blue',
  label,
  onClick = () => {},
}: ButtonProps) => {
  return (
    <button
      type='button'
      className={clsx([
        styles.button,
        styles[`button-${variant}`],
        styles[`button-${variant}-${color}`],
        styles[`button-${size}`],
      ])}
      onClick={() => onClick()}
    >
      {label}
    </button>
  )
}
