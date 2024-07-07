import { Children, ReactNode, cloneElement } from 'react'

interface Props {
  children: ReactNode
}

const TableHeaderRow = ({ children }: Props) => {
  return (
    <tr>
      {Children.map(children, (child, index) => {
        return cloneElement(child as any, {
          index,
        })
      })}
    </tr>
  )
}

export { TableHeaderRow }
