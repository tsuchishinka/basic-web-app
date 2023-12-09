import { Button, ButtonProps } from '@mui/material'
export default {
  title: 'MUI/Button',
  component: Button,
  args: { autoFocus: true } as ButtonProps,
}

export const All = ({ ...args }: ButtonProps) => {
  return (
    <>
      <div style={componentStyle}>
        <Button {...args}>tsucid</Button>
      </div>
    </>
  )
}

const componentStyle: React.CSSProperties = {
  padding: 20,
  display: 'flex',
}
