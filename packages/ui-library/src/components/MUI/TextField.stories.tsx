import { TextField, BaseTextFieldProps } from '@mui/material'
export default {
  title: 'MUI/TextFiled',
  component: TextField,
  args: {
    autoComplete: 'on',
    minRows: 3,
    maxRows: 6,
    multiline: true,
    helperText: <div>help</div>,
    label: 'ユーザー名',
    variant: 'outlined',
    placeholder: 'ユーザー名を入力',
    children: <div>text</div>,
  } as BaseTextFieldProps,
}

export const All = ({ ...args }: BaseTextFieldProps) => {
  return (
    <>
      <div style={componentStyle}>
        <TextField {...args}>テキストのみ</TextField>
      </div>
      <div style={componentStyle}>
        <TextField variant='filled'>
          <div>テキストのみ</div>
        </TextField>
      </div>
    </>
  )
}

const componentStyle: React.CSSProperties = {
  padding: 20,
  display: 'flex',
}
