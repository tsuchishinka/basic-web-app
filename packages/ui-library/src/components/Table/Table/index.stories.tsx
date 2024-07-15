import { Meta, StoryObj } from '@storybook/react'
import { title } from 'process'
import { Table } from '.'
import { TableHeader } from './TableHeader'
import { TableHeaderRow } from './TableHeader/TableHeaderRow'
import { TableHeaderData } from './TableHeader/TableHeaderRow/TableHeaderData'
import { TableBody } from './TableBody'
import { TableBodyRow } from './TableBody/TableBodyRow'
import { TableBodyData } from './TableBody/TableBodyRow/TableBodyData'

const meta = {
  title: 'Table/Table',
  component: Table,
  tags: ['autodocs'],
  args: {
    children: (
      <>
        <TableHeader>
          <TableHeaderRow>
            <TableHeaderData>header1</TableHeaderData>
            <TableHeaderData>header2</TableHeaderData>
          </TableHeaderRow>
          <TableHeaderRow>
            <TableHeaderData>header14343434</TableHeaderData>
            <TableHeaderData>header2</TableHeaderData>
          </TableHeaderRow>
        </TableHeader>
        <TableBody>
          <TableBodyRow>
            <TableBodyData>body1</TableBodyData>
            <TableBodyData>body2</TableBodyData>
          </TableBodyRow>
          <TableBodyRow>
            <TableBodyData>body1</TableBodyData>
            <TableBodyData>body2</TableBodyData>
          </TableBodyRow>
          <TableBodyRow>
            <TableBodyData>body1</TableBodyData>
            <TableBodyData>body2</TableBodyData>
          </TableBodyRow>
        </TableBody>
      </>
    ),
  },
} satisfies Meta<typeof Table>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    collomnWidthList: ['5rem', '4rem'],
  },
}
