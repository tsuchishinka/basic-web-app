const ARGS_TEMPLATE = `{$PROPS_NAME} = {$PROPS_DEFAULT}`;

const STORYBOOK_TEMPLATE = `import { Meta, StoryObj } from '@storybook/react'
import { {$NAME} } from '.'

const meta = {
  title: '{$NAME}',
  component: {$NAME},
  tags: ['autodocs'],
  args: {
    {$ARGS}
  },
} satisfies Meta<typeof {$NAME}>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
`;

export { STORYBOOK_TEMPLATE, ARGS_TEMPLATE };
