import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

const TableBodyRow = ({ children }: Props) => {
  return <tr>{children}</tr>
}

export { TableBodyRow }
