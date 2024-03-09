import { Meta, StoryObj } from '@storybook/react'
import { DateTimeTextInput } from '.'

const meta = {
  title: 'TimeInput/DateTimeTextInput',
  component: DateTimeTextInput,
  tags: ['autodocs'],
} satisfies Meta<typeof DateTimeTextInput>

export default meta
type Story = StoryObj<typeof meta>

const date = new Date()

export const Default: Story = {
  args: {
    value: {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
    },
  },
}
