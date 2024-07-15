import { ReactNode } from 'react'
import styles from './index.module.scss'

interface Props {
  children: ReactNode
}

const TableHeader = ({ children }: Props) => {
  return <thead className={styles['table-header']}>{children}</thead>
}

export { TableHeader }
