import { Meta, StoryObj } from '@storybook/react'
import { DateTimeTextInput } from '.'

const meta = {
  title: 'TimeInput/DateTimeTextInput',
  component: DateTimeTextInput,
  tags: ['autodocs'],
} satisfies Meta<typeof DateTimeTextInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
