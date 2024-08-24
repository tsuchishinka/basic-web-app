import { ReactNode, useContext } from 'react'
import { TableContext } from '../../..'
import styles from './index.module.scss'

interface Props {
  children: ReactNode
  index?: number
}

const TableHeaderData = ({ children, index }: Props) => {
  const cellIndex = index ?? 0
  const { columnWidthValues } = useContext(TableContext)
  const width =
    columnWidthValues !== undefined && cellIndex < columnWidthValues.length
      ? columnWidthValues[cellIndex]
      : undefined
  return (
    <th className={styles['header-data']} style={{ width }}>
      {children}
    </th>
  )
}

export { TableHeaderData }
