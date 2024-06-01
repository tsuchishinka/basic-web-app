import { Meta, StoryObj } from '@storybook/react'
import { title } from 'process'
import { InputWrapper } from '.'
import { TextInput } from '../TextInput'

const meta = {
  title: 'Input/InputWrapper',
  component: InputWrapper,
  tags: ['autodocs'],
  args: {
    label: <div>label</div>,
    children: <TextInput></TextInput>,
    errorMessage: 'errorMessage',
  },
} satisfies Meta<typeof InputWrapper>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const LablePositionLeft: Story = {
  args: {
    labelPosition: 'left',
    labelWidth: '10rem',
  },
}
