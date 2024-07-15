import styles from './index.module.scss'

interface Props {
  size: 'small' | 'medium' | 'large'
}

const Loading = ({ size }: Props) => {
  const getWidth = () => {
    switch (size) {
      case 'small':
        return '1.5rem'
      case 'medium':
        return '3rem'
      case 'large':
        return '5rem'
    }
  }

  return <div className={styles.loading} style={{ width: getWidth() }}></div>
}

export { Loading }
