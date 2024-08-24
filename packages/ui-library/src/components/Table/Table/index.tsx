import { ReactNode, createContext, useEffect, useState } from 'react'
import styles from './index.module.scss'

const defaultValue: { columnWidthValues: string[] } = {
  columnWidthValues: [],
}

const TableContext = createContext(defaultValue)

interface Props {
  columnWidthList: string[]
  children: ReactNode
}

const Table = ({ children, columnWidthList = [] }: Props) => {
  const [columnWidthValues, setColumnWidthValues] = useState<string[]>([])

  useEffect(() => {
    setColumnWidthValues(columnWidthList)
  }, [columnWidthList])
  return (
    <TableContext.Provider value={{ columnWidthValues }}>
      <table className={styles.table}>{children}</table>
    </TableContext.Provider>
  )
}

export { Table, TableContext }
