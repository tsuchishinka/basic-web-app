import type { Preview } from '@storybook/react'
import '../src/utils/common.scss'

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
      expandted: true,
    },
  },
}

export default preview
