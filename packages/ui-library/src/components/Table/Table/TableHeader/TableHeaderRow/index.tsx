import { Children, ReactNode, cloneElement } from 'react'

interface Props {
  children: ReactNode
}

const TableHeaderRow = ({ children }: Props) => {
  return (
    <tr>
      {Children.map(children, (child, index) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return cloneElement(child as any, {
          index,
        })
      })}
    </tr>
  )
}

export { TableHeaderRow }
