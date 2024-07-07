import { ReactNode } from 'react'
import styles from './index.module.scss'

interface Props {
  children: ReactNode
}

const TableBody = ({ children }: Props) => {
  return <tbody className={styles['table-body']}>{children}</tbody>
}

export { TableBody }
