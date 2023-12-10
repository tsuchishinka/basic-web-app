import { Button, ButtonOwnProps } from '@mui/material'
export default {
  title: 'MUI/Button',
  component: Button,
  args: {
    autoFocus: true,
    disableRipple: false,
    variant: 'contained',
    sx: { width: 'sm' },
    disableElevation: false,
    fullWidth: true,
    size: 'large',
    disableFocusRipple: true,
  } as ButtonOwnProps,
}

export const All = ({ ...args }: ButtonOwnProps) => {
  return (
    <>
      <div style={componentStyle}>
        <Button {...args} variant={args.variant}>
          テキストのみ
        </Button>
      </div>
    </>
  )
}

const componentStyle: React.CSSProperties = {
  padding: 20,
  display: 'flex',
}
