import type { Meta, StoryObj } from '@storybook/react'
import { TextInput } from '.'

const meta = {
  title: 'Input/TextInput',
  component: TextInput,
  tags: ['autodocs'],
} satisfies Meta<typeof TextInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
