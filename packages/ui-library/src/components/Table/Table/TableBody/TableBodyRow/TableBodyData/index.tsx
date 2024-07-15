import { ReactNode } from 'react'
import styles from './index.module.scss'

interface Props {
  children: ReactNode
}

const TableBodyData = ({ children }: Props) => {
  return <td className={styles.data}>{children}</td>
}

export { TableBodyData }
