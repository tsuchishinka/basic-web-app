import { ReactNode, createContext, useEffect, useState } from 'react'
import styles from './index.module.scss'

const defaultValue: { collomnWidthValues: string[] } = {
  collomnWidthValues: [],
}

const TableContext = createContext(defaultValue)

interface Props {
  collomnWidthList: string[]
  children: ReactNode
}

const Table = ({ children, collomnWidthList = [] }: Props) => {
  const [collomnWidthValues, setCollomnWidthValues] = useState<string[]>([])

  useEffect(() => {
    setCollomnWidthValues(collomnWidthList)
  }, [collomnWidthList])
  return (
    <TableContext.Provider value={{ collomnWidthValues }}>
      <table className={styles.table}>{children}</table>
    </TableContext.Provider>
  )
}

export { Table, TableContext }
