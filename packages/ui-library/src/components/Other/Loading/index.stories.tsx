import { title } from 'process'
import { Loading } from '.'
import { Meta, StoryObj } from '@storybook/react'
import { Button } from '@/components/Button'

const meta = {
  title: 'Other/Loading',
  component: Loading,
} satisfies Meta<typeof Loading>

export default meta

type Story = StoryObj<typeof Loading>

export const Default: Story = {
  args: {
    size: 'medium',
  },
}
